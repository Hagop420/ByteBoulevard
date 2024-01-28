import { type FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../css/background_sign_up.css';

/**
 * Form that registers a user.
 */

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData.entries());
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const res = await fetch('/api/auth/sign-up', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      // console.log('Registered', user);
      navigate('/signIn');
    } catch (err) {
      alert(`Error registering user: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="background_sign_up_form p-48">
      <form action="" className="container" onSubmit={handleSubmit}>
        <div className="flex">
          <h1 className="capitalize pad text-white text-6xl opacity-80 bg-red-900">
            sign up
          </h1>
          <Link to="/signIn">
            <h1 className="capitalize pad text-black text-6xl bg-green-500 hover:bg-green-600 hover:text-white">
              sign in
            </h1>
          </Link>
        </div>

        <div className="flex flex-col">
          <input
            type="text"
            name="username"
            id="username"
            className="m-2 rounded p-2"
            placeholder="Username.."
          />
          <input
            type="password"
            name="password"
            id="password"
            className="m-2 rounded p-2"
            placeholder="Password.."
          />
          <div className="flex justify-end">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-fuchsia-400 text-black font-bold w-1/4">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
