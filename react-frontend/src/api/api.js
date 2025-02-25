const API_URL = "http://127.0.0.1:8000";

export async function getPlayers() {
    const response = await fetch(`${API_URL}/players`);
    return response.json();
}

export async function getPlayer(id) {
    const response = await fetch(`${API_URL}/players/${id}`);
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

export async function addMatch(matchData) {
    console.log("addMatch: ", matchData);
    const response = await fetch(`${API_URL}/matches/`, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(matchData)});
    return response.json();
} 

export async function deleteMatch(id) {
    await fetch(`${API_URL}/matches/${id}`, {method: "DELETE"});
}

export async function getGames() {
    const response = await fetch(`${API_URL}/games`);
    return response.json();
}

export async function addGame(gameData) {
    const response = await fetch(`${API_URL}/games/`, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(gameData)});
    return response.json();
} 



