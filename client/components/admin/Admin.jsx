import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Statistics from '../statistics/Statistics';

const Admin = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [statistics, setStatistics] = useState(null);

  const getStatistics = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/Listing/statistics`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const responseData = await response.json();

      setStatistics(responseData);

    }
    catch (error) {
    }
  }

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      getStatistics();
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">Admin</h2>

      {isAuthenticated && <LogoutButton/>}
      {!isAuthenticated && <LoginButton/>}

      {isAuthenticated && (
        <div>
          {statistics && (
            <Statistics statistics={statistics}/>
          )}
        </div>
      )}

    </div>
  )

}

export default Admin;
