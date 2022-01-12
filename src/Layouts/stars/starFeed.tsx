import StarActivity from "./starActivity";
import StarDesc from "./starDesc";
import StarNotes from "./starNotes";
import './feed.css';
import { starExample } from "../../assets/star";

const StarFeed = () => {
  return (
    <div className="starFeed">
      <StarDesc star={starExample} />
      <div className="starDetails">
        <StarNotes />
        <StarActivity />
      </div>
    </div>
  );
};

export default StarFeed;
