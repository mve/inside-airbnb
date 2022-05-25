import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";
import Image from 'next/image';

const Admin = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      console.log(token);

      const response = await fetch(
        `https://localhost:7114/Listing/137026`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const responseData = await response.json();

      // setMessage(responseData.message);
    }
    catch (error) {
      // setMessage(error.message);
    }
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      Admin

      <button
        type="button"
        className="btn btn-primary"
        onClick={callSecureApi}
      >
        Get Protected Message
      </button>


      {isAuthenticated && <LogoutButton/>}
      {!isAuthenticated && <LoginButton/>}

      {isAuthenticated && (
        <div>
          <p>
            Hallo {user.name}
          </p>
          <Image src={user.picture} width={100} height={100} alt="Profile" />
        </div>
      )}

    </div>
  )

}

export default Admin;
