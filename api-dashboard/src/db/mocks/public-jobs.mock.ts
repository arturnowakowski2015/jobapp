export const PUBLIC_JOBS_IDS = [
  'e87b55d8-1e18-4ef0-9f0a-da5d4178e21f',
  'ef2563f6-a01a-4a33-839f-22809781a376',
  '2c489417-67ba-431c-9008-67f60cf59c8d',
];

export const PUBLIC_JOBS_MOCK = {
  languages: [
    {
      name: 'Java',
      frameworks: [{ name: 'Spring' }],
      jobId: PUBLIC_JOBS_IDS[0],
    },
    {
      name: 'Python',
      frameworks: [{ name: 'Django' }, { name: 'Flask' }],
      jobId: PUBLIC_JOBS_IDS[1],
    },
    {
      name: 'TypeScript',
      frameworks: [
        {
          name: 'React',
          levels: [{ name: 'junior' }, { name: 'mid' }, { name: 'senior' }],
        },
        {
          name: 'Angular',
          levels: [
            {
              name: 'junior',
              projects: [
                { name: 'pharmacy project' },
                { name: 'banking system' },
                { name: 'mobile games app' },
              ],
            },
            { name: 'mid' },
            { name: 'senior' },
          ],
        },
      ],
      jobId: PUBLIC_JOBS_IDS[2],
    },
  ],
};
