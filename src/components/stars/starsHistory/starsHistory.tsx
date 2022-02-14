import { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { getStars } from '../../../services/star-service';

const StarsHistory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [stars, setStars] = useState<IStar[]>([]);

  const fetchStars = (): void => {
    setLoading(true);
    getStars()
      .then((res) => {
        setStars(res.data.stars.filter((s) => s.status !== 'סגור'));
        setLoading(false);
      })
      .catch((err: Error) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStars();
  }, []);
  return (
    <div>
      {loading && (
        <Box sx={{
          position: 'absolute', top: '50%', right: '50%', zIndex: 1,
        }}
        >
          <CircularProgress size="100px" />
        </Box>
      )}
      history
    </div>
  );
};

export default StarsHistory;
