import { noteType, starType } from '../../../assets/star';
import StarActivity from './starActivity';
import StarDesc from './starDesc';
import StarNotes from './starNotes';
import '../styles/feed.css';

interface starProps {
  star: starType;
  setNotes: (star: starType, notes: noteType[]) => void;
}

const StarFeed = ({ star, setNotes }: starProps) => {
  const addNote = (newNote: noteType) => {
    star.notes.push(newNote);
    setNotes(star, star.notes);
  };

  const deleteNote = (note: noteType) => {
    star.notes = star.notes.filter((n: noteType) => n !== note);
    setNotes(star, star.notes);
  };

  return (
    <div className="starFeed">
      <StarDesc star={star} />
      <div className="starDetails">
        <StarNotes
          notes={star.notes}
          addNote={addNote}
          deleteNote={deleteNote}
        />
        <StarActivity activity={star.activity} />
      </div>
    </div>
  );
};

export default StarFeed;
