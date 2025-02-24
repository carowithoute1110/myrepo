import React, {useState} from "react";
import { addPlayer } from "../api/api";

const AddPlayer = ({refreshPlayers}) => { 
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");

    const handleSubmit = async (e) => { e.preventDefault(); 
        await addPlayer(name, location);
        console.log("New player")
        setName("")
        setLocation("")
        refreshPlayers()
    };

    return (<form onSubmit={handleSubmit}> <h2>Spieler hinzufügen</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Ort" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <button type="submit">Speichern</button>
        </form>
    );
};

export default AddPlayer;