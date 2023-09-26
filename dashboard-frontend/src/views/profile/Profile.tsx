import { Box, Typography } from '@mui/material';

import { useProfileContext } from 'context/profileContext/useProfileContext';

export const Profile = () => {
  const { profile } = useProfileContext();

  return (
    <>
      <Typography variant="h5" component="h2" marginBottom={3}>
        Profile
      </Typography>
      <Box>
        <Typography component="span" fontWeight={600}>
          Your name:{' '}
        </Typography>
        <Typography component="span">{profile.firstname}</Typography>
      </Box>
      <Box>
        <Typography component="span" fontWeight={600}>
          Your last name:{' '}
        </Typography>
        <Typography component="span">{profile.lastname}</Typography>
      </Box>
      <Box>
        <Typography component="span" fontWeight={600}>
          Your email:{' '}
        </Typography>
        <Typography component="span">{profile.username}</Typography>
      </Box>
    </>
  );
};
