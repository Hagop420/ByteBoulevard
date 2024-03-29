import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
// tooltip imports
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/translucent.css';
import '../css/NotFoundPage.css';

export function NotFoundPage() {
  // return (
  //   <div className="pageContent">
  //     <div className="row">
  //       <div className="col text-center mb-5">
  //         <h3>Uh oh, we could not find the page you were looking for!</h3>
  //         <p className="text-muted">
  //           <Link to="/" className="flex justify-center text-4xl m-4">
  //             <FaHome />
  //           </Link>
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // );

  const homeIconRef = useRef(null);

  useEffect(() => {
    if (homeIconRef.current) {
      tippy(homeIconRef.current, {
        content: 'Home', // Tooltip content
        placement: 'bottom',
      });
    }
  }, []);

  return (
    <div className="" id="error">
      <div className="">
        <div className="flex flex-col items-center">
          <img
            className="h-96"
            src="https://portfolio.jackalmadjian.com/htdocs_error/something-lost.png"
            alt="Something Lost"
          />
          <div className="text-center">
            <h1 className="text-yellow-custom">
              Oops, looks like the page is lost.
            </h1>
            <p className="text-yellow-custom" style={{ fontSize: '17px' }}>
              This is not a fault, just an accident that was not intentional.
            </p>
          </div>

          <p className="text-muted">
            {' '}
            <Link
              to="/"
              className="flex justify-center text-4xl m-4"
              ref={homeIconRef}>
              <FaHome />
            </Link>{' '}
          </p>
        </div>
      </div>
    </div>
  );
}
