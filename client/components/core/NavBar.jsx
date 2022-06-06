import LogoutButton from '../admin/LogoutButton';
import LoginButton from '../admin/LoginButton';
import { useAuth0 } from '@auth0/auth0-react';

const NavBar = () => {

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();


  return (
    <div className="border-b mb-5">
      <h1 className="text-4xl my-2 mx-5 font-bold">Inside AirBnb</h1>
    </div>
  )

}

export default NavBar;
