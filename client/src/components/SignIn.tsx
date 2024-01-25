import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/background_sign_in.css';
/**
 * Form that signs in a user.
 */

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);

  // const [html , setHtml] = useState('html')

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
      const res = await fetch('/api/auth/sign-in', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const { token } = await res.json();
      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      alert(`Error signing in: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    // <>
    <div className="background_sign_in_form p-48">
      <form action="" className="container" onSubmit={handleSubmit}>
        <div className="flex">
          <Link to="/signUp">
            <h1 className="capitalize pad text-black text-6xl bg-red-800 hover:text-white hover:opacity-80">
              sign up
            </h1>
          </Link>
          <h1 className="capitalize pad text-white text-6xl opacity-80 bg-green-800">
            sign in
          </h1>
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
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
    // </>
  );
}
