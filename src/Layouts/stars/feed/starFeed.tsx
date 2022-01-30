import { noteType } from '../../../assets/star';
import StarActivity from './starActivity';
import StarDesc from './starDesc';
import StarNotes from './starNotes';
import '../styles/feed.css';

interface starProps {
  star: IStar;
  updateStar: (starId: string, formData: IStar) => void;
  // setNotes: (star: IStar, notes: noteType[]) => void;
}

const StarFeed = ({ star, updateStar }: starProps) => (
  // const addNote = (newNote: noteType) => {
  //   star.notes.push(newNote);
  //   setNotes(star, star.notes);
  // };

  // const deleteNote = (note: noteType) => {
  //   star.notes = star.notes.filter((n: noteType) => n !== note);
  //   setNotes(star, star.notes);
  // };

  <div className="starFeed">
    <StarDesc star={star} updateStar={updateStar} />
    {/* <div className="starDetails">
      <StarNotes
        notes={star.notes}
        addNote={addNote}
        deleteNote={deleteNote}
      />
      <StarActivity activity={star.activity} /> */}
    {/* </div> */}
  </div>
);

export default StarFeed;
