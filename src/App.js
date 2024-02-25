// App.js
import React, { useState, useEffect, createRef } from "react";
import Switch from "react-switch";
import walkieTalkieSound from "./walkie_talkie_beep.mp3";
import onLogo from "./of.png";
import offLogo from "./on.png";
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'; // Import Auth0Provider and useAuth0

// Functional component for the talk button
const TalkButton = ({ isTalking, onMouseDown, onMouseUp, onTouchStart, onTouchEnd }) => (
  <button
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}
    onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
    style={{
      width: "500px",
      height: "500px",
      backgroundImage: `url(${isTalking ? offLogo : onLogo})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      color: "transparent",
      borderRadius: "50%",
      border: "none",
      cursor: "pointer",
      position: "relative",
    }}
  >
    {isTalking && (
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "white",
            fontWeight: "bold",
            borderRadius: "10px",
            padding: "5px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          talking
        </span>
      </div>
    )}
  </button>
);

// Main App component
function App() {
  const { user, loginWithRedirect } = useAuth0(); // Destructure user and loginWithRedirect from useAuth0 hook
  console.log("Current User", user);

  const [isTalking, setIsTalking] = useState(false);
  const [friendSwitch, setFriendSwitch] = useState(false);
  const audioRef = createRef();

  // Handler for starting the push-to-talk functionality
  const handlePushToTalk = () => {
    setIsTalking(true);
    audioRef.current.play();
    // Additional logic for audio recording and transmission
  };

  // Handler for releasing the push-to-talk functionality
  const handleReleaseTalk = () => {
    setIsTalking(false);
    // Additional logic to stop audio recording and transmission
  };

  // Handler for changing the friend switch
  const handleFriendSwitchChange = (checked) => {
    setFriendSwitch(checked);
    // Additional logic for switching between friends
  };

  useEffect(() => {
    // Cleanup logic when the component unmounts
    return () => {
      // Cleanup code
    };
  }, []);

  return (
    <div className="App" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Talkie Gen Z</h1>
      <div style={{ marginBottom: "20px" }}>
        <Switch
          onChange={handleFriendSwitchChange}
          checked={friendSwitch}
          offColor="#d3d3d3"
          onColor="#86d3ff"
          uncheckedIcon={false}
          checkedIcon={false}
          height={30}
          width={60}
          handleDiameter={30}
        />
      </div>
      <TalkButton
        isTalking={isTalking}
        onMouseDown={handlePushToTalk}
        onMouseUp={handleReleaseTalk}
        onTouchStart={handlePushToTalk}
        onTouchEnd={handleReleaseTalk}
      />
      <audio ref={audioRef} src={walkieTalkieSound} />
      <button onClick={(e) => loginWithRedirect()}>Login</button>
    </div>
  );
}

export default App;
