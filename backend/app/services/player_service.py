from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models import Player
from database import get_db
from schemas import PlayerScheme

router = APIRouter(prefix="/players", tags=["Players"])

@router.post("/")
def create_player(player: PlayerScheme, db: Session = Depends(get_db)):
    added_player = Player(name = player.name, location = player.location)
    db.add(added_player)
    db.commit()
    db.refresh(added_player)
    return added_player

@router.get("/")
def get_players(db: Session = Depends(get_db)):
    players = db.query(Player).all()
    return players

@router.get("/{player_id}")
def get_player(player_id: int, db: Session = Depends(get_db)):
    return db.query(Player).filter(Player.id == player_id).first()


@router.put("/{player_id}")
def update_player(player_id: int, player: PlayerScheme, db: Session = Depends(get_db)):
    edited_player = db.query(Player).filter(Player.id == player_id).first()
    if edited_player:
        edited_player.name = player.name
        edited_player.location = player.location
        db.commit()
        return{"message": "Player with {player_id} was successfully updated"}
    return {"error": "Player with {player_id} was not found"}

@router.delete("/{player_id}")
def delete_player(player_id: int, db: Session = Depends(get_db)):
    player = db.query(Player).filter(Player.id == player_id).first()
    if player:
        db.delete(player)
        db.commit()
        return {"message:": "Player with {player_id} was successfully removed"}
    return {"error": "Player with {player_id} was not found"}