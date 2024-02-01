import { type FormEvent, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/background_sign_in.css';
/**
 * Form that signs in a user.
 */

type UserSavedInfo = {
  username: string;
  password: string;
};

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);

  const [userReq, setUserReq] = useState<string>(
    'Username is a required field'
  );
  const [passReq, setPassReq] = useState<string>(
    'Password is a required field'
  );

  let passwordLocal = '';
  let usernameLocal = '';

  const localGrabber = localStorage.getItem('userInfo');
  if (localGrabber !== null) {
    const info: UserSavedInfo = JSON.parse(localGrabber);
    passwordLocal = info.password;
    usernameLocal = info.username;
  }

  // password and username saved
  const [infoSave, setInfoSaved] = useState(false);

  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'retro');

  // const [html , setHtml] = useState('html')

  // Info to LS.

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
        alert('User not found!');
        return;
        // navigate('/signIn');
      }

      const { token } = await res.json();
      localStorage.setItem('token', token);

      if (infoSave) {
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            username: userData.username,
            password: userData.password,
          })
        );
      }

      navigate('/');

      if (localStorage.getItem('userInfo')) return;
      // if(localStorage.){

      // }
    } catch (err) {
      alert(`Error signing in: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  // function localSaver() {
  // localStorage.setItem('userInfo', JSON.stringify(localUserInfoSaved));
  // }

  function handleToggle(e) {
    if (e.target.checked) {
      setTheme('night');
    } else {
      setTheme('retro'); //light
    }
  }

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const localTheme = localStorage.getItem('theme') ?? 'retro';
    document.querySelector('html')?.setAttribute('data-theme', localTheme);
  }, [theme]);

  // checking for the username and password has a value

  function valueUserChanged(e: React.ChangeEvent<HTMLInputElement>) {
    const usernameVal = e.target.value;
    if (usernameVal === '') {
      setUserReq('Username is a required field');
    } else {
      setUserReq('');
    }
  }

  function userPassReq(e: React.ChangeEvent<HTMLInputElement>) {
    const passwordVal = e.target.value;
    if (passwordVal === '') {
      setPassReq('Username is a required field');
    } else {
      setPassReq('');
    }
  }

  return (
    <>
      {/* Light and dark mode component rendering */}
      <div className="flex relative bottom-8 justify-between items-start">
        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            onChange={handleToggle}
            checked={theme === 'retro' ? false : true}
          />

          {/* sun icon */}
          <svg
            className="swap-on fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-off fill-current w-10 h-10 text-black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
      {/* end Light and dark mode section */}

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
              defaultValue={usernameLocal}
              onChange={valueUserChanged}
              className="m-2 rounded p-2 userInput"
              placeholder="Username.."
            />
            <div className="flex justify-start m-0 relative right-28">
              {userReq && (
                <div className="bg-black font-bold text-yellow-custom text-light mb-3 p-2 m-auto rounded fs-6">
                  {userReq}
                </div>
              )}
            </div>
            <input
              type="password"
              name="password"
              id="password"
              onChange={userPassReq}
              defaultValue={passwordLocal}
              className="m-2 rounded p-2"
              placeholder="Password.."
            />
            <div className="flex justify-start m-0 relative right-28">
              {passReq && (
                <div className="bg-black font-bold text-yellow-custom text-light mb-3 p-2 m-auto rounded fs-6">
                  {passReq}
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <button
                disabled={isLoading}
                type="submit"
                className="bg-fuchsia-400 text-black font-bold w-1/4">
                Sign In
              </button>
            </div>
          </div>
          <div className="flex items-center">
            {' '}
            <label className="input_customized">
              <input
                type="checkbox"
                defaultChecked={localStorage.getItem('userInfo') !== null}
                onClick={() => setInfoSaved(!infoSave)}
              />
              <span className="checkmark"></span>
              <span className="text-black">Remember Me!</span>
            </label>
          </div>
        </form>
      </div>
    </>
  );
}
