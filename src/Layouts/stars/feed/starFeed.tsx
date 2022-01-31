import { useState, useEffect, useCallback } from 'react';
import StarActivity from './starActivity';
import StarDesc from './starDesc';
import StarNotes from './starNotes';
import '../styles/feed.css';
import {
  addActivity,
  addNote, deleteNotes, getActivities, getNotes,
} from '../../../API';

interface starProps {
  star: IStar;
  updateStar: (starId: string, formData: IStar) => void;
}

const StarFeed = ({ star, updateStar }: starProps) => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [activity, setActivity] = useState<IActivity[]>([]);

  const fetchNotes = useCallback((): void => {
    getNotes(star._id)
      .then((res) => {
        setNotes(res.data.notes);
      })
      .catch((err: Error) => console.log(err));
  }, [star._id]);

  const fetchActivity = useCallback((): void => {
    getActivities(star._id)
      .then((res) => {
        console.log(res);
        setActivity(res.data.activities);
      })
      .catch((err: Error) => console.log(err));
  }, [star._id]);

  useEffect(() => {
    fetchNotes();
    fetchActivity();
    return () => {
      setNotes([]); // This worked for me
      setActivity([]);
    };
  }, [fetchActivity, fetchNotes]);

  const handleAddActivity = (activityData: IActivity): void => {
    activityData.starId = star._id;
    addActivity(activityData)
      .then(({ status }) => {
        if (status !== 201) {
          throw new Error('Error! note not saved');
        }
        fetchActivity();
      })
      .catch((err: string) => console.log(err));
  };

  const handleAddNote = (noteData: INote): void => {
    noteData.starId = star._id;
    addNote(noteData)
      .then(({ status }) => {
        if (status !== 201) {
          throw new Error('Error! note not saved');
        }
        fetchNotes();
        handleAddActivity({
          _id: '0',
          starId: star._id,
          publisher: noteData.publisher,
          action: ' הוסיפ/ה הערה חדשה',
        });
      })
      .catch((err: string) => console.log(err));
  };

  const handleDeleteNote = (noteId: string): void => {
    deleteNotes(noteId, notes)
      .then(({ status }) => {
        if (status !== 200) {
          throw new Error('Error! note not deleted');
        }
        fetchNotes();
      })
      .catch((err: string) => console.log(err));
  };

  return (
    <div className="starFeed">
      <StarDesc star={star} updateStar={updateStar} />
      <div className="starDetails">
        <StarNotes
          notes={notes}
          addNote={handleAddNote}
          deleteNote={handleDeleteNote}
        />
        <StarActivity activity={activity} />
      </div>
    </div>
  );
};

export default StarFeed;
