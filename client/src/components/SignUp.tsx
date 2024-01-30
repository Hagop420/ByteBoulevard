import { type FormEvent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../css/background_sign_up.css';
// import { render } from 'react-dom';

/**
 * Form that registers a user.
 */

export function SignUpForm() {
  const regexUser = /_/;
  const regexPass = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

  // theme

  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'retro');

  // theme state end

  const [isLoading, setIsLoading] = useState(false);

  // username state
  const [username, setUsername] = useState<string>('');

  const [isU, setIsU] = useState(true);

  const [userReq, isUserReq] = useState('Username is required');

  // password states

  // password state
  const [password, setPassword] = useState<string>('');

  const [currValidate, isValidated] = useState('Password is required');

  const [isX, isIncorrect] = useState(true);

  const navigate = useNavigate();

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (ifUsernameError()) return;
    if (ifError()) return;
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

  // password val.

  const toggleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const renderCurrPassword = e.target.value;

    setPassword(renderCurrPassword);

    if (renderCurrPassword.length < 8) {
      isValidated('Your Password is to short.');
      isIncorrect(true);
    } else if (!regexPass.test(renderCurrPassword)) {
      isValidated(`Password must contain at least one special character
            these include !@#$%^&*()_+-=[]{};':"\\|,.<>/?`);
      isIncorrect(true);
    } else {
      if (regexPass.test(renderCurrPassword)) {
        isValidated('Strong Password.');
        isIncorrect(false);
      }
    }

    // reset password to 0 if the length of the pass is 0
    if (renderCurrPassword.length === 0) {
      isValidated('Password is required.');
    }
  };

  // err on the username

  function toggleUserType(e: React.ChangeEvent<HTMLInputElement>) {
    const renderUsername = e.target.value;
    setUsername(renderUsername);
    // if (regexUser.test(renderUsername)) {
    //   isUserReq('Strong username.');
    // } else {
    //   isUserReq('Username must contain an underscore');
    // }

    if (renderUsername.length === 0) {
      isUserReq('Username is required.');
    }

    if (renderUsername.length < 8) {
      isUserReq('Your username is to short.');
      setIsU(true);
    } else if (renderUsername.length > 15) {
      isUserReq('Your username is to long.');
      setIsU(true);
    } else if (regexUser.test(renderUsername)) {
      isUserReq('Strong username.');
      setIsU(false);
    } else if (!regexUser.test(renderUsername)) {
      isUserReq('Username must contain an underscore');
      setIsU(true);
    } else {
      isUserReq('Strong username.');
      setIsU(false);
    }
  }

  // error on the username

  function ifUsernameError() {
    if (username.length === 0) {
      alert('USERNAME IS REQUIRED');
      return true;
      // navigate('/signUp');
    } else if (username.length < 8) {
      alert('username is to short');
      return true;
      // navigate('/signUp');
    }

    return false;
  }

  // error on the password

  function ifError() {
    if (password.length === 0) {
      alert('PASSWORD IS REQUIRED');
      return true;
      // navigate('/signUp');
    } else if (password.length < 8) {
      alert('Password is to short');
      return true;
      // navigate('/signUp');
    } else if (!regexPass.test(password)) {
      alert(`Password must contain at least one special character
            these include !@#$%^&*()_+-=[]{};':"\\|,.<>/?
      `);
      return true;
    }

    return false;
  }

  // continue as a guest btn

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

      <div className="background_sign_up_form p-48">
        {/* <div className="text-4xl m-4 font-bold clr">{currValidate}</div> */}
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
              onChange={toggleUserType}
              value={username}
              id="username"
              className="m-2 rounded p-2"
              placeholder="Username.."
            />
            <div
              className={
                isU
                  ? 'bg-black font-bold text-yellow-custom text-light mb-3 p-2 m-auto rounded fs-6'
                  : 'bg-success text-light mb-3 p-2 m-auto rounded fs-6'
              }>
              {userReq}
            </div>
            <input
              type="password"
              name="password"
              id="password"
              onChange={toggleTyping}
              value={password}
              className="m-2 rounded p-2"
              placeholder="Password.."
            />
            <div
              className={
                isX
                  ? 'bg-black font-bold text-yellow-custom text-light mb-3 p-2 m-auto rounded fs-6'
                  : 'bg-success text-light mb-3 p-2 m-auto rounded fs-6'
              }>
              {currValidate}
            </div>
            <Link to="/">
              <div className="flex justify-start relative top-9 underline font-bold w-36 text-black wh hover:cursor-pointer">
                Continue as guest
              </div>
            </Link>
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
    </>
  );
}
