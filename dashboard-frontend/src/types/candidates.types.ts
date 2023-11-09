export type Candidate = {
  companyName: string;
  date: string;
  id: number;
  logo: string;
  longDescription: string;
  shortDescription: string;
  name: string;
  position: string;
};

export type CandidatesResponse = Record<number, Candidate>;
