import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className="border rounded-lg bg-indigo-500 px-3 py-1 text-white"
            onClick={() => loginWithRedirect()}>
    Log In
  </button>
  )
};

export default LoginButton;
