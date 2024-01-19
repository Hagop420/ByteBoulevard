// FILE IMPORT'S
import { ChangeEvent, useState } from 'react';
import '../css/searchGlass.css';



// PARENT COMPONENT
export function SearchableList() {
  // current states
  const [currSearch, setCurrSearch] = useState('');

  return (
    <>
      <SearchableListInputCreation
        inputSearch={(e) => setCurrSearch(e.target.value)}
        currSearch={currSearch}
      />
      <SearchableQuotesArr
        quotes={quotes.filter((quote) => {
          if (quote.toLowerCase().includes(currSearch.toLowerCase())) {
            return true;
          } else {
            return false;
          }
        })}
      />
    </>
  );
}

type InputSrch = {
  inputSearch: (index: ChangeEvent<HTMLInputElement>) => void;
  currSearch: string;
};

export function SearchableListInputCreation({
  inputSearch,
  currSearch,
}: InputSrch) {
  return (
    <>
      <input
        className='search'
      />
    </>
  );
}

type PropsArr = {
  quotes: string[];
};

export function SearchableQuotesArr({ quotes }: PropsArr) {
  return (
    <ul className="">
      {quotes.map((q, index) => (
        <li className="text-left" key={index}>
          {q}
        </li>
      ))}
      {quotes.length === 0 && <p>No Matches!!</p>}
    </ul>
  );
}
