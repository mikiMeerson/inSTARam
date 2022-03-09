import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Box, CircularProgress } from '@mui/material';
import { StatusCodes } from 'http-status-codes';
import StarActivity from './starActivity';
import StarDesc from './starDesc';
import StarNotes from './starNotes';
import '../styles/feed.css';
import { addNote, editStar, getStarById } from '../../../services/star-service';

interface starProps {
  userRole: userRole;
  starId: string | undefined;
  updateStar: (starId: string, formData: IStar) => void;
}

const StarFeed = ({
  userRole,
  starId,
  updateStar,
}: starProps) => {
  const [star, setStar] = useState<IStar>();
  const [loading, setLoading] = useState<boolean>(false);

  if (!starId) {
    const navigate = useNavigate();
    navigate('/stars');
    return null;
  }

  const fetchStar = useCallback(async (): Promise<void> => {
    const { status, data } = await getStarById(starId);
    if (status !== StatusCodes.OK) {
      throw new Error('Error! Star not found');
    }
    setStar(data.star);
  }, [starId]);

  useEffect(() => {
    setLoading(true);
    fetchStar();
    setLoading(false);
  }, [fetchStar, star]);

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
