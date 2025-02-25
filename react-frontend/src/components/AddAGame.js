import React, { useState, useEffect } from "react";
import { getPlayers, addGame } from "../api/api";

const AddAGame = ({ match }) => {
    const [team1_score, setTeam1Score] = useState(0);
    const [team2_score, setTeam2Score] = useState(0);
    const [team1_front, setTeam1FrontId] = useState("");
    const [team1_back, setTeam1BackId] = useState("");
    const [team2_front, setTeam2FrontId] = useState("");
    const [team2_back, setTeam2BackId] = useState("");
    const [players, setPlayers] = useState({}); 


    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const data = await getPlayers(); 
                console.log(data);
                const playerMap = {};
                data.forEach(player => {
                    playerMap[player.id] = player.name;
                });
                console.log("PlayerMap", playerMap);
                setPlayers(playerMap); 
            } catch (error) {
                console.error("Fehler beim Laden der Spieler:", error);
            }
        };

        fetchPlayers();
    }, []);

    const handleAddGame = async () => {
        const gameData = {
            match_id: match.id,
            team1_score,
            team2_score,
            team1_front,
            team1_back,
            team2_front,
            team2_back
        };

        try {
            await addGame(gameData); // Aufruf der addGames-Funktion
            alert("Spiel erfolgreich hinzugefügt!");
        } catch (error) {
            console.error("Fehler beim Hinzufügen des Spiels:", error);
            alert("Fehler beim Hinzufügen des Spiels.");
        }
    };

    const getPlayerName = (playerId) => {
        return players[playerId] || `Spieler ${playerId}`;
    };

    const handleTeam1FrontChange = (e) => setTeam1FrontId(parseInt(e.target.value, 10));
    const handleTeam1BackChange = (e) => setTeam1BackId(parseInt(e.target.value, 10));
    const handleTeam2FrontChange = (e) => setTeam2FrontId(parseInt(e.target.value, 10));
    const handleTeam2BackChange = (e) => setTeam2BackId(parseInt(e.target.value, 10));

    return (
        <div>
            <h3>Neues Spiel für Match {match.id} hinzufügen</h3>
            
            <label>Team 1 Score:</label>
            <input type="number" value={team1_score} onChange={(e) => setTeam1Score(Number(e.target.value))} />

            <label>Team 2 Score:</label>
            <input type="number" value={team2_score} onChange={(e) => setTeam2Score(Number(e.target.value))} />

            <label>Team 1 - Front</label>
            <select value={team1_front || ""} onChange={handleTeam1FrontChange}>
                <option value="">Wähle Spieler</option>
                <option value={match.team1_player1}>{getPlayerName(match.team1_player1)}</option>
                <option value={match.team1_player2}>{getPlayerName(match.team1_player2)}</option>
            </select>

            <select value={team1_back || ""} onChange={handleTeam1BackChange}>
                <option value="">Wähle Spieler</option>
                <option value={match.team1_player1}>{getPlayerName(match.team1_player1)}</option>
                <option value={match.team1_player2}>{getPlayerName(match.team1_player2)}</option>
            </select>

            <label>Team 2 - Front</label>
            <select value={team2_front || ""} onChange={handleTeam2FrontChange}>
                <option value="">Wähle Spieler</option>
                <option value={match.team2_player1}>{getPlayerName(match.team2_player1)}</option>
                <option value={match.team2_player2}>{getPlayerName(match.team2_player2)}</option>
            </select>

            <label>Team 2 - Back</label>
            <select value={team2_back || ""} onChange={handleTeam2BackChange}>
                <option value="">Wähle Spieler</option>
                <option value={match.team2_player1}>{getPlayerName(match.team2_player1)}</option>
                <option value={match.team2_player2}>{getPlayerName(match.team2_player2)}</option>
            </select>

            <button onClick={handleAddGame}>Spiel hinzufügen</button>
        </div>
    );
};

export default AddAGame;