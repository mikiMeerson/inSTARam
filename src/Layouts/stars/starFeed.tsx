import StarActivity from "./starActivity";
import StarDesc from "./starDesc";
import StarNotes from "./starNotes";
import './feed.css';

const StarFeed = () => {
  return (
    <div className="starFeed">
      <StarDesc />
      <div className="starDetails">
        <StarNotes />
        <StarActivity />
      </div>
    </div>
  );
};

export default StarFeed;
