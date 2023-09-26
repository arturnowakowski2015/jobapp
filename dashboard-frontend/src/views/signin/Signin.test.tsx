import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { render, screen } from 'tests';
import { server } from 'tests/msw/server';

import { SignIn } from './SignIn';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Signin', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders emailField', () => {
    render(<SignIn />);
    const emailField = screen.getByLabelText(/E-mail/);
    expect(emailField).toBeInTheDocument();
  });

  it('renders passwordField', () => {
    render(<SignIn />);
    const passwordField = screen.getByLabelText(/E-mail/);
    expect(passwordField).toBeInTheDocument();
  });

  it('redirects to home on login', async () => {
    render(<SignIn />);
    const emailField = screen.getByLabelText(/E-mail/);
    const passwordField = screen.getByLabelText(/Password/);
    const submitButton = screen.getByRole('button');

    await userEvent.type(emailField, 'user@example.com');
    await userEvent.type(passwordField, 'password123');
    await userEvent.click(submitButton);
    expect(mockNavigate).toHaveBeenCalled();
  });

  it('doesnt redirect on error', async () => {
    server.use(
      rest.post(
        `${process.env.REACT_APP_API_URL}/app/auth/login`,
        async (_req, res, ctx) => {
          return res(ctx.status(500));
        },
      ),
    );
    render(<SignIn />);
    const emailField = screen.getByLabelText(/E-mail/);
    const passwordField = screen.getByLabelText(/Password/);
    const submitButton = screen.getByRole('button');

    await userEvent.type(emailField, 'user@example.com');
    await userEvent.type(passwordField, 'password123');
    await userEvent.click(submitButton);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('shows error message', async () => {
    server.use(
      rest.post(
        `${process.env.REACT_APP_API_URL}/app/auth/login`,
        async (_req, res, ctx) => {
          return res(ctx.status(500));
        },
      ),
    );
    render(<SignIn />);
    const emailField = screen.getByLabelText(/E-mail/);
    const passwordField = screen.getByLabelText(/Password/);
    const submitButton = screen.getByRole('button');

    await userEvent.type(emailField, 'user@example.com');
    await userEvent.type(passwordField, 'password123');
    await userEvent.click(submitButton);

    const errorMessage = screen.getByText(/Something went wrong. Try again./);
    expect(errorMessage).toBeInTheDocument();
  });
});
