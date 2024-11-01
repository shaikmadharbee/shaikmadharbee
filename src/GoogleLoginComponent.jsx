import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";

function GoogleLoginComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleSuccess = (credentialResponse) => {
    console.log('Login Success:', credentialResponse);
    const userProfile = decodeJwt(credentialResponse.credential);
    console.log('Decoded JWT:', userProfile); // Log the entire JWT for inspection
    setUserName(userProfile.name || userProfile.email); // Use appropriate property
    setIsLoggedIn(true);
  };

  const decodeJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  };

  return (
    <>
      {!isLoggedIn ? (
        <GoogleLogin onSuccess={handleSuccess}/>
      ) : (
        <h2>Welcome {userName}</h2>
      )}
    </>
  );
}

export default GoogleLoginComponent;
