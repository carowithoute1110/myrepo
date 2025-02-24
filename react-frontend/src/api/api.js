const API_URL = "http://127.0.0.1:8000";

export async function getPlayers() {
    const response = await fetch(`${API_URL}/players`);
    return response.json();
}

export async function addPlayer(name, location) {
    await fetch(`${API_URL}/players/`, { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify( {name, location})});
}

export async function updatePlayer(id, name, location) {
    await fetch(`${API_URL}/players/${id}`, {method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify( {name, location})});
}

export async function deletePlayer(id) {
    await fetch(`${API_URL}/players/${id}`, {method: "DELETE"});
}

export async function getMatches() {
    const response = await fetch(`${API_URL}/matches`);
    return response.json();
}

export async function addMatch(date_time, location, mode, team1_player1, team1_player2, team2_player1, team2_player2) {
    const response = await fetch(`${API_URL}/matches/`, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify( {date_time, location, mode, team1_player1, team1_player2, team2_player1, team2_player2})});
    return response.json();
} 