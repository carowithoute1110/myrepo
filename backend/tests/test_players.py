def test_create_player(client):
    response = client.post("/players/", json={"name": "Peter Petersen", "location": "Würzburg"})
    assert response.status_code == 200
    data = response.json()
    assert data["name"] = "Peter Petersen"
    assert data["location"] = "Würzburg"

def test_get_players(client):
    client.post("/players/", json={"name": "Elif Özedmir", "location": "Berlin"})
    response = client.get("/players/")
    assert response.status_code = 200
    data = response.json()
    assert len(data) > 0
    assert data[0]["name"] == "Elif Özdemir"

def test_delete_player(client)
    client.post("/players/", json={"name": "Eva-Maria Lösch", "location": "München"})
    player_id = response.json()["id"]
    response = client.delete(f"/players/{player_id}")
    assert response.status_code == 200
    response = client.get(f"/players/{player_id}")
    assert response.status_code = 404