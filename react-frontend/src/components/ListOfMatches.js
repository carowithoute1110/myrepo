import React, { useEffect, useState } from "react";
import { getMatches, deleteMatch } from "../api/api";
import AddAGame from "./AddAGame";

const ListOfMatches = ({ refreshMatches }) => {
    const [matches, setMatches] = useState([]);
    const [showAddGame, setShowAddGame] = useState({});


    useEffect(() => {
        async function loadMatches() {
            const data = await getMatches();
            setMatches(data);
            console.log(data.date_time)
        }
        loadMatches();
    }, [refreshMatches]);

    const handleToggleAddGame = (matchId) => {
        setShowAddGame({ ...showAddGame, [matchId]: !showAddGame[matchId] });
    };

    const handleDelete = async (matchId) => {
        if (window.confirm("Wirklich unwideruflich löschen?")) {
            await deleteMatch(matchId);
            refreshMatches(); 
        }
    };

    return (
        <div>
            <h2>Begegnungen</h2>
            {matches.length === 0 ? (
                <p>Es wurden noch keine Begegnungen angelegt.</p>
            ) : (
                <ul>
                    {matches?.map((match) => (
                        <li key={match.id}>
                            {new Date(match.date_time).toLocaleString()} - {match.location} ({ "Anzahl der Spiele: " + match.mode})  
                            <button onClick={() => handleDelete(match.id)}>Löschen</button>
                            <button onClick={() => setShowAddGame({...showAddGame, [match.id]: !showAddGame[match.id]})}>
                                {showAddGame[match.id] ? "Abbrechen" : "Spiel hinzufügen"}
                            </button>
                            {showAddGame[match.id] && match && <AddAGame match={match} />}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListOfMatches;