import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";
import Image from 'next/image';
import { useState } from 'react';

const Admin = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [statistics, setStatistics] = useState([]);

  const getStatistics = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(
        `https://localhost:7114/Listing/statistics`,
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
      console.log("Error fetching statistics: ", error); // TODO hide on production
    }
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <h2 className="text-lg font-bold">Admin</h2>

      <button
        type="button"
        className="border rounded-lg bg-indigo-500 px-3 py-1 text-white"
        onClick={getStatistics}
      >
        Get statistics
      </button>


      {isAuthenticated && <LogoutButton/>}
      {!isAuthenticated && <LoginButton/>}

      {isAuthenticated && (
        <div>
          <p>
            Hallo {user.name}
          </p>
          <Image src={user.picture} width={100} height={100} alt="Profile"/>
        </div>
      )}

    </div>
  )

}

export default Admin;
