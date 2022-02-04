import { useState, useEffect, useCallback } from 'react';
import StarActivity from './starActivity';
import StarDesc from './starDesc';
import StarNotes from './starNotes';
import '../styles/feed.css';
import { getStarById } from '../../../services/star-service';
import { addNote, deleteNotes, getNotes } from '../../../services/note-service';
import { addActivity, getActivities } from '../../../services/activity-service';

interface starProps {
  starId: string;
  updateStar: (starId: string, formData: IStar) => void;
}

const StarFeed = ({ starId, updateStar }: starProps) => {
  const [star, setStar] = useState<IStar>();
  const [notes, setNotes] = useState<INote[]>([]);
  const [activity, setActivity] = useState<IActivity[]>([]);

  const fetchNotes = useCallback((): void => {
    getNotes(starId)
      .then((res) => {
        setNotes(res.data.notes);
      })
      .catch((err: Error) => console.log(err));
  }, [starId]);

  const fetchActivity = useCallback((): void => {
    getActivities(starId)
      .then((res) => {
        setActivity(res.data.activities);
      })
      .catch((err: Error) => console.log(err));
  }, [starId]);

  useEffect(() => {
    const fetchStar = (): void => {
      getStarById(starId)
        .then(({ status, data }) => {
          if (status !== 200) {
            throw new Error('Error! Todo not deleted');
          }
          setStar(data.star);
        })
        .catch((err) => console.log(err));
    };
    fetchStar();
    if (star) {
      fetchNotes();
      fetchActivity();
    }
  }, [fetchActivity, fetchNotes, star, starId]);

  if (!star) {
    return <div>Star not found!</div>;
  }

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
          action: 'הוסיפ/ה הערה חדשה',
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
      <StarDesc
        star={star}
        updateStar={updateStar}
        saveActivity={handleAddActivity}
      />
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
