import { Box, CircularProgress, Typography } from '@mui/material';
import { PersonOutline } from '@mui/icons-material';

//  import { useJobs } from 'api/jobs/useJobs';
//  import { useCandidates } from 'api/candidates/useCandidates';
import { useQuery } from 'api/useQuery/useQuery';
import { CandidatesResponse } from 'types/candidates.types';
import { JobsResponse } from 'types/jobs.types';
import { DashboardItem } from './dashboardItem/DashboardItem';

import * as styles from './Dashboard.styles';
import { SummaryItem } from './summaryItem/SummaryItem';

export const Dashboard = () => {
  // const {
  //   data: jobs,
  //   errorMessage: jobsErrorMessage,
  //   isLoading: isLoadingJobs,
  // } = useJobs();

  // const {
  //   data: candidates,
  //   errorMessage: candidatesErrorMessage,
  //   isLoading: isLoadingCandidates,
  // } = useCandidates();
  const { state: jobState } = useQuery<JobsResponse>({
    url: '/jobs',
    initFetch: true,
  });
  const { state: candidatesState } = useQuery<CandidatesResponse>({
    url: '/candidates',
    initFetch: true,
  });

  return (
    <Box sx={styles.container}>
      <DashboardItem>
        <Typography variant="h5" component="p">
          Open positions
        </Typography>

        {jobState.isLoading && <CircularProgress />}

        {jobState.errorMessage && (
          <Typography color="error">
            Something went wrong while loading open positions data, please try
            again
          </Typography>
        )}

        {jobState && (
          <Typography variant="h5" component="p">
            {Object.keys(jobState).length}9
          </Typography>
        )}
      </DashboardItem>

      <DashboardItem>
        <Typography variant="h5" component="p">
          Candidates
        </Typography>

        {candidatesState.isLoading && <CircularProgress />}

        {candidatesState.errorMessage && (
          <Typography color="error">
            Something went wrong while loading candidates data, please try again
          </Typography>
        )}

        <Typography variant="h5" component="p">
          {Object.keys(candidatesState).length}
        </Typography>
      </DashboardItem>

      <DashboardItem sx={styles.spanFull}>
        <Box sx={styles.generalTextWrapper}>
          <Typography variant="h5" component="p">
            General
          </Typography>
          <Typography>
            <Typography component="span" fontWeight={600}>
              Total 48.5% growth &#128526;
            </Typography>
            <Typography component="span" sx={styles.grayedText}>
              {' '}
              this month
            </Typography>
          </Typography>
        </Box>
        <Box sx={styles.summaryItemsContainer}>
          <SummaryItem
            iconVariant="blue"
            icon={<PersonOutline color="inherit" />}
            name="Employees"
            value="245k"
          />
          <SummaryItem
            iconVariant="green"
            icon={<PersonOutline color="inherit" />}
            name="Candidates"
            value={
              candidatesState ? (
                Object.keys(candidatesState).length.toString(10)
              ) : (
                <CircularProgress />
              )
            }
          />
          <SummaryItem
            iconVariant="yellow"
            icon={<PersonOutline color="inherit" />}
            name="Employees"
            value="245k"
          />
        </Box>
      </DashboardItem>
    </Box>
  );
};
