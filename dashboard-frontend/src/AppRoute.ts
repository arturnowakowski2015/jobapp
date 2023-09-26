export enum AppRoute {
  home = '/',
  signIn = '/signin',
  signUp = '/signup',
  dashboard = '/dashboard',
  profile = '/profile',
  jobs = '/jobs',
  addJob = '/jobs/add',
  candidates = '/candidates',
  addCandidate = '/candidates/add',
}

export const getSingleJobUrl = (jobId: string) => `${AppRoute.jobs}/${jobId}`;
export const getEditJobUrl = (jobId: string) => `${AppRoute.addJob}/${jobId}`;

export const getSingleCandidateUrl = (candidateId: string) =>
  `${AppRoute.candidates}/${candidateId}`;
export const getEditCandidateUrl = (candidateId: string) =>
  `${AppRoute.addCandidate}/${candidateId}`;
