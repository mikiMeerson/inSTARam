import { noteType, starType } from "../../../assets/star";
import StarActivity from "./starActivity";
import StarDesc from "./starDesc";
import StarNotes from "./starNotes";
import "../styles/feed.css";

interface starProps {
  star: starType;
  setNotes: (star: starType, note: noteType) => void;
}

const StarFeed = ({ star, setNotes }: starProps) => {

  const addNote = (newNote: noteType) => {
    setNotes(star, newNote);
  };

  return (
    <div className="starFeed">
      <StarDesc star={star} />
      <div className="starDetails">
        <StarNotes notes={star.notes} addNote={addNote} />
        <StarActivity activity={star.activity} />
      </div>
    </div>
  );
};

export default StarFeed;
