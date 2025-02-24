from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models import Game
from database import get_db

router = APIRouter(prefix="/games", tags=["Games"])

@router.post("/")
def create_game(match_id: int, team1_front: int, team1_back: int, team2_front: int, team2_back: int, team1_score: int, team2_score: int, db: Session = Depends(get_db)):
    game = Game(match_id, team1_front = team1_front, team1_back = team1_back, team2_front = team2_front, team2_back = team2_back)
    db.add(game)
    db.commit()
    db.refresh(game)
    return game

@router.get("/{game_id}")
def get_game(game_id: int, db: Session = Depends(get_db)):
    return db.query(Game).filter(Game.id == game_id).first()

@router.delete("/{game_id}")
def delete_game(game_id: int, db: Session = Depends(get_db)):
    game = db.query(Game).filter(Game.id == game_id).first()
    if game:
        db.delete(game)
        db.commit()
        return {"message": "Game with {game_id} was successfully deleted"}
    return {"message": "Game with {game_id} could not be found"}