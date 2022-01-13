import { starType } from "../../assets/star";
import StarActivity from "./starActivity";
import StarDesc from "./starDesc";
import StarNotes from "./starNotes";
import './styles/feed.css';

interface starProps {
  star: starType;
}
const StarFeed = ({star}: starProps) => {
  return (
    <div className="starFeed">
      <StarDesc star={star} />
      <div className="starDetails">
        <StarNotes />
        <StarActivity />
      </div>
    </div>
  );
};

export default StarFeed;
