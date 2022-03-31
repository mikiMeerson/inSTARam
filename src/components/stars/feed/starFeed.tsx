import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Box, CircularProgress } from '@mui/material';
import { StatusCodes } from 'http-status-codes';
import StarActivity from './starActivity';
import StarDesc from './starDesc';
import StarNotes from './starNotes';
import '../styles/feed.css';
import { addNote, editStar, getStarById } from '../../../services/star-service';
import { UserRole } from '../../../types/string-types';
import { IStar, INote } from '../../../types/interfaces';

interface Props {
  userRole: UserRole;
  updateStar: (starId: string, formData: IStar) => void;
}

const StarFeed = ({
  userRole,
  updateStar,
}: Props) => {
  const [star, setStar] = useState<IStar>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchStar = async (): Promise<void> => {
      if (id) {
        const { status, data } = await getStarById(id);
        if (status !== StatusCodes.OK) {
          throw new Error('Error! Star not found');
        }
        setStar(data.star);
      }
    };

    setLoading(true);
    fetchStar();
    setLoading(false);
  }, []);

  if (!star) {
    return (
      <Box sx={{
        position: 'absolute', top: '50%', right: '50%', zIndex: 1,
      }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const handleAddNote = async (noteData: INote): Promise<void> => {
    setLoading(true);
    const { status } = await addNote(star._id, noteData);
    if (status !== StatusCodes.CREATED) console.log('Failed to add note');
    setLoading(false);
  };

  const handleDeleteNote = async (noteId: string): Promise<void> => {
    setLoading(true);
    const newStar = JSON.parse(JSON.stringify(star));
    newStar.notes = newStar.notes.filter((note: INote) => note._id !== noteId);
    const { status } = await editStar(star._id, newStar);
    if (status !== StatusCodes.OK) console.log('Failed to remove note');
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <Box sx={{
          position: 'absolute', top: '50%', right: '50%', zIndex: 1,
        }}
        >
          <CircularProgress />
        </Box>
      )}
      <div className="starFeed">
        <StarDesc
          userRole={userRole}
          inputStar={star}
          updateStar={updateStar}
        />
        <div className="starDetails">
          <StarNotes
            notes={star.notes}
            addNote={handleAddNote}
            deleteNote={handleDeleteNote}
          />
          <StarActivity activity={star.activity} />
        </div>
      </div>
    </>
  );
};

export default StarFeed;
