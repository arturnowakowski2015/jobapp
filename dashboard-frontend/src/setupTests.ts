import '@testing-library/jest-dom/extend-expect';

import { server } from './tests/msw/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
