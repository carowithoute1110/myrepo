import React, { useState, useEffect } from "react";
import { getPlayers, addMatch } from "../api/api";

const AddMatch = ({ refreshMatches }) => {
    const [players, setPlayers] = useState([]);
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [mode, setMode] = useState("2 vs 2");

    const [team1Player1, setTeam1Player1] = useState("");
    const [team1Player2, setTeam1Player2] = useState("");
    const [team2Player1, setTeam2Player1] = useState("");
    const [team2Player2, setTeam2Player2] = useState("");

    useEffect(() => {
        async function loadPlayers() {
            const data = await getPlayers();
            setPlayers(data);
        }
        loadPlayers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!team1Player1 || !team1Player2 || !team2Player1 || !team2Player2) {
            alert("Für jeden Platz einen Spieler auswählen");
            return;
        }

        console.log("Date: ", date);

        const matchData = {
            date_time: date || new Date().toISOString(), 
            location,
            mode,
            team1_player1: parseInt(team1Player1),
            team1_player2: parseInt(team1Player2),
            team2_player1: parseInt(team2Player1),
            team2_player2: parseInt(team2Player2),
        };
        console.log("Hier ist match data: ", matchData);

        await addMatch(matchData);
        refreshMatches(); 

        setDate("");
        setLocation("");
        setMode("1");
        setTeam1Player1("");
        setTeam1Player2("");
        setTeam2Player1("");
        setTeam2Player2("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Neue Begegnung hinzufügen</h2>

            <label>Datum der Begegnung:</label>
            <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />

            <label>Ort der Begegnung:</label>
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value="Berlin">Berlin</option>
                <option value="München">München</option>
                <option value="Würzburg">Würzburg</option>
            </select>

            <label>Modus der Begnung:</label>
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="1">One Match</option>
                <option value="3">Best of Three</option>
                <option value="5">Best of Five</option>
            </select>

            <h3>Team 1</h3>
            <label>Spieler 1:</label>
            <select value={team1Player1} onChange={(e) => setTeam1Player1(e.target.value)} required>
                <option value="">Wähle Spieler</option>
                {players.map((player) => (
                    <option key={player.id} value={player.id}>
                        {player.name} ({player.location})
                    </option>
                ))}
            </select>

            <label>Spieler 2:</label>
            <select value={team1Player2} onChange={(e) => setTeam1Player2(e.target.value)} required>
                <option value="">Wähle Spieler</option>
                {players.map((player) => (
                    <option key={player.id} value={player.id}>
                        {player.name} ({player.location})
                    </option>
                ))}
            </select>

            <h3>Team 2</h3>
            <label>Spieler 1:</label>
            <select value={team2Player1} onChange={(e) => setTeam2Player1(e.target.value)} required>
                <option value="">Wähle Spieler</option>
                {players.map((player) => (
                    <option key={player.id} value={player.id}>
                        {player.name} ({player.location})
                    </option>
                ))}
            </select>

            <label>Spieler 2:</label>
            <select value={team2Player2} onChange={(e) => setTeam2Player2(e.target.value)} required>
                <option value="">Wähle Spieler</option>
                {players.map((player) => (
                    <option key={player.id} value={player.id}>
                        {player.name} ({player.location})
                    </option>
                ))}
            </select>

            <button type="submit">Begegnung hinzufügen</button>
        </form>
    );
};

export default AddMatch;
	
