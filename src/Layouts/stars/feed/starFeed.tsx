import { useState, useEffect } from 'react';
import { noteType } from '../../../assets/star';
import StarActivity from './starActivity';
import StarDesc from './starDesc';
import StarNotes from './starNotes';
import '../styles/feed.css';
import { addNote, getNotes } from '../../../API';

interface starProps {
  star: IStar;
  updateStar: (starId: string, formData: IStar) => void;
  // setNotes: (star: IStar, notes: noteType[]) => void;
}

const StarFeed = ({ star, updateStar }: starProps) => {
  const [notes, setNotes] = useState<INote[]>([]);

  const fetchNotes = (): void => {
    getNotes(star._id)
      .then((res) => {
        setNotes(res.data.notes);
      })
      .catch((err: Error) => console.log(err));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = (noteData: INote): void => {
    noteData.starId = star._id;
    addNote(noteData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error('Error! Todo not saved');
        }
        setNotes(data.notes);
      })
      .catch((err: string) => console.log(err));
  };

  // const deleteNote = (note: noteType) => {
  //   star.notes = star.notes.filter((n: noteType) => n !== note);
  //   setNotes(star, star.notes);
  // };
  return (
    <div className="starFeed">
      <StarDesc star={star} updateStar={updateStar} />
      <div className="starDetails">
        <StarNotes
          notes={notes}
          addNote={handleAddNote}
          // deleteNote={deleteNote}
        />
        {/* <StarActivity activity={star.activity} /> */}
      </div>
    </div>
  );
};

export default StarFeed;
