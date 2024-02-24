// App.js
import { useState, useEffect, createRef } from "react";
import Switch from "react-switch";
import walkieTalkieSound from "./walkie_talkie_beep.mp3";
import onLogo from "./of.png"; // Import the on.png image
import offLogo from "./on.png"; // Import the off.png image
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

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

function App() {
  const [isTalking, setIsTalking] = useState(false);
  const [friendSwitch, setFriendSwitch] = useState(false);
  const audioRef = createRef();

  const handlePushToTalk = () => {
    setIsTalking(true);
    audioRef.current.play();
    // Additional logic for audio recording and transmission
  };

  const handleReleaseTalk = () => {
    setIsTalking(false);
    // Additional logic to stop audio recording and transmission
  };

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
      <h1>496</h1>
      <h1>Walkie Talkie App</h1>
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

      <GoogleOAuthProvider clientId="55412693328-17la8e9csd5v40kpq8e83s26kg9k3dif.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
