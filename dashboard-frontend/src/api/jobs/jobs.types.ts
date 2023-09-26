export type Job = {
  companyName: string;
  date: string;
  id: number;
  logo: string;
  longDescription: string;
  shortDescription: string;
  title: string;
};

export type JobsResponse = Record<number, Job>;
