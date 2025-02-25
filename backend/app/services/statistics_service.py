from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Player, Game, Match
from typing import Dict
from sqlalchemy import func

router = APIRouter(prefix="/statistics", tags=["Statistics"])

@router.get("/player/{player_id}")
def get_player_statistics(player_id: int, db: Session = Depends(get_db)) -> Dict:
    
    stats = {
        "player_id": player_id,
        "wins": {"front": 0, "back": 0},
        "losses": {"front": 0, "back": 0},
        "locations": {}
    }
    games = db.query(Game, Match.location).join(Match).filter(
        (Game.team1_front == player_id) | (Game.team1_back == player_id) |
        (Game.team2_front == player_id) | (Game.team2_back == player_id)
    ).all()

    for game, location in games:
        player_team = 1 if player_id in [game.team1_front, game.team1_back] else 2
        player_position = "front" if player_id in [game.team1_front, game.team2_front] else "back"

        team1_won = game.team1_score > game.team2_score
        player_won = (player_team == 1 and team1_won) or (player_team == 2 and not team1_won)

        if player_won:
            stats["wins"][player_position] += 1
        else:
            stats["losses"][player_position] += 1

        if location not in stats["locations"]:
            stats["locations"][location] = {"wins": 0, "losses": 0}
        if player_won:
            stats["locations"][location]["wins"] += 1
        else:
            stats["locations"][location]["losses"] += 1

    return stats


@router.get("/rankings")
def get_global_rankings(db: Session = Depends(get_db)) -> Dict:

    rankings = {
        "total_wins": [],
        "position_wins": {"front": [], "back": []},
        "location_wins": {}
    }

    player_stats = db.query(
        Player.id, Player.name,
        func.count().filter(Game.team1_score > Game.team2_score, (Game.team1_front == Player.id) | (Game.team1_back == Player.id)).label("wins_as_team1"),
        func.count().filter(Game.team2_score > Game.team1_score, (Game.team2_front == Player.id) | (Game.team2_back == Player.id)).label("wins_as_team2")
    ).join(Game, (Player.id == Game.team1_front) | (Player.id == Game.team1_back) | (Player.id == Game.team2_front) | (Player.id == Game.team2_back))\
    .group_by(Player.id, Player.name).all()

    for player_id, name, wins_as_team1, wins_as_team2 in player_stats:
        total_wins = wins_as_team1 + wins_as_team2
        rankings["total_wins"].append({"player_id": player_id, "name": name, "wins": total_wins})

    for position in ["front", "back"]:
        position_wins = db.query(
            Player.id, Player.name, func.count(Game.id)
        ).join(Game, (Game.team1_front == Player.id) if position == "front" else (Game.team1_back == Player.id))\
        .filter(Game.team1_score > Game.team2_score)\
        .group_by(Player.id, Player.name)\
        .order_by(func.count(Game.id).desc())\
        .limit(10)\
        .all()

        rankings["position_wins"][position] = [{"player_id": pid, "name": pname, "wins": wins} for pid, pname, wins in position_wins]

    location_wins = db.query(
        Match.location, Player.id, Player.name, func.count(Game.id)
    ).join(Game, Game.match_id == Match.id)\
    .join(Player, (Game.team1_front == Player.id) | (Game.team1_back == Player.id) | (Game.team2_front == Player.id) | (Game.team2_back == Player.id))\
    .filter(Game.team1_score > Game.team2_score)\
    .group_by(Match.location, Player.id, Player.name)\
    .order_by(Match.location, func.count(Game.id).desc())\
    .all()

    for location, pid, pname, wins in location_wins:
        if location not in rankings["location_wins"]:
            rankings["location_wins"][location] = []
        rankings["location_wins"][location].append({"player_id": pid, "name": pname, "wins": wins})

    return rankings