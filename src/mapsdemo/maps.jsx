import React, { useState } from "react";
import DeliveryMap from "./components/DeliveryMap";

function App() {
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  return (
    <div>
      <button onClick={getLocation}>تتبع الموقع</button>
      {location && <DeliveryMap location={location} />}
    </div>
  );
}

export default App;
