import React, { useState } from "react";
import history from '../history';

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');


export const RoomManager = () => {
    const [roomID, setRoomID] = useState(null);


    const handleOpenRoom = () => {
        let open = roomID ? false : true;
        let room = roomID ? roomID : genRanHex(16);
        history.push(`/room/${room}?open=${open}`);
    }

    const handleJoinRoom = (evt) => {
        setRoomID(evt.target.value)
    }

    return (

        <div>
            <h1>Room</h1>
            <input type="text" placeholder="room-id" onChange={handleJoinRoom} />
            <button onClick={handleOpenRoom}>{roomID ? "Join Room" : "Open Room"}</button>
        </div >
    );
}

