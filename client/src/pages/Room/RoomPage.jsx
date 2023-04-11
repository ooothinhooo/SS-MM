import React, { useState } from "react";
import BoxRoom from "../../components/Room/BoxRoom.jsx";

function RoomPage() {
  const [room, setRoom] = useState([1, 2]);
  return (
    <div className="mt-20 mr-20">
      <BoxRoom data={room} />
    </div>
  );
}

export default RoomPage;
