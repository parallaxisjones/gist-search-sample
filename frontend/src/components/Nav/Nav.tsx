import React, { useState } from 'react';
import './Nav.css';
import { UserInfo } from '..';

import { useQuery } from '@apollo/client';
import { GET_LOGGED_IN_USER } from '../../operations/queries/getLoggedInUser';
import mutations from '../../operations/mutations';

interface UserQueryResult { username: string }

function Nav() {
  const userQuery = useQuery<UserQueryResult>(GET_LOGGED_IN_USER);
  const name: string = userQuery?.data?.username || "";
  const [searchBoxVal, setSearchState] = useState("");
  const onKeyUpFn = ({ currentTarget: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState(value);
  }

  const onSearchClick = () => {
    mutations.search(searchBoxVal);
  }

  return (
    <nav className="Nav">
        <div className="Nav-search">
          <input type="text" value={searchBoxVal} onChange={onKeyUpFn} />
          <button type="submit" onClick={onSearchClick}>search</button>
        </div>
        <div className="Nav-user">
          <UserInfo user={{
            name
          }} />
        </div>
    </nav>
  );
}

export default Nav;
