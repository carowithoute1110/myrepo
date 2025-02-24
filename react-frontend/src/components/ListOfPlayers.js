import React, { useEffect, useState } from "react";
import { updatePlayer, deletePlayer } from "../api/api";

const ListOfPlayers = ({ players, refreshPlayers }) => {
    const [editPlayerId, setEditPlayerId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editLocation, setEditLocation] = useState("");
    const startEditing = (player) => {
        console.log(player.id);
        setEditPlayerId(player.id);
        setEditName(player.name);
        setEditLocation(player.location);
    };
    const saveEdit = async () => {
        console.log(editPlayerId);
        await updatePlayer(editPlayerId, editName, editLocation);
        setEditPlayerId(null);
        refreshPlayers();
    };
    const handleDelete = async (player) => {
        console.log("ID", player.id);
        await deletePlayer(player.id);
        refreshPlayers();
    };
    return (
        <div>
            <h2>Liste von Kickerspielern der Mayflower: </h2>
            <ul> 
                {players.map((player) => (
                    <li key={player.id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {editPlayerId === player.id ? (
                            <>
                                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
                                <input type="text" value={editLocation} onChange={(e) => setEditLocation(e.target.value)} />
                                <button onClick={saveEdit}>Speichern</button>
                                <button onClick={() => setEditPlayerId(null)}>Abbrechen</button>
                            </>
                        ) : (
                            <>
                                <span>{player.name} {player.location}</span>
                                <button onClick={() => startEditing(player)}>Bearbeiten</button>
                                <button onClick={() => handleDelete(player)}>Löschen</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListOfPlayers;