import React, { useState, useEffect } from 'react';

function FacebookLoginComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Load the Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '512732178413571', // Replace with your Facebook App ID (no spaces)
        cookie: true,
        xfbml: true,
        version: 'v17.0',
      });

      // Check initial login status
      window.FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          fetchUserData();
        }
      });
    };

    // Load the Facebook SDK script
    const loadFacebookSDK = () => {
      (function (d, s, id) {
        const element = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        const js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        element.parentNode.insertBefore(js, element);
      })(document, 'script', 'facebook-jssdk');
    };

    loadFacebookSDK();

    // Cleanup function to remove the SDK script if needed
    return () => {
      const fbScript = document.getElementById('facebook-jssdk');
      if (fbScript) {
        fbScript.remove();
      }
    };
  }, []);

  const handleLogin = () => {
    window.FB.login((response) => {
      if (response.status === 'connected') {
        fetchUserData();
      } else {
        console.error('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'public_profile,email' });
  };

  const fetchUserData = () => {
    window.FB.api('/me', { fields: 'name,email' }, (userProfile) => {
      if (userProfile && !userProfile.error) {
        setUserName(userProfile.name);
        setIsLoggedIn(true);
      } else {
        console.error('Error fetching user data:', userProfile.error);
      }
    });
  };

  const handleLogout = () => {
    window.FB.logout(() => {
      setIsLoggedIn(false);
      setUserName('');
    });
  };

  return (
    <>
      {!isLoggedIn ? (
        <button onClick={handleLogin}>Login with Facebook</button>
      ) : (
        <>
          <h2>Welcome {userName}</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </>
  );
}

export default FacebookLoginComponent;
