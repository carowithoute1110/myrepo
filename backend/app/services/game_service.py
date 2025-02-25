from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models import Game
from database import get_db
from schemas import GameScheme

router = APIRouter(prefix="/games", tags=["Games"])

@router.post("/")
def create_game(game: GameScheme, db: Session = Depends(get_db)):
    new_game = Game(**game.dict())
    db.add(new_game)
    db.commit()
    db.refresh(new_game)
    return new_game

@router.get("/")
def get_games(db: Session = Depends(get_db)):
    print(db.query(Game).all())
    return db.query(Game).all()

@router.get("/{game_id}")
def get_game(game_id: int, db: Session = Depends(get_db)):
    return db.query(Game).filter(Game.id == game_id).first()

@router.put("/{game_id}")
def update_game(game_id: int, game: GameScheme, db: Session = Depends(get_db)):
    update_game = db.query(Game).filter(Game.id == game_id).first()
    if update_game:
        for key, value in game.dict().items():
            setattr(update_game,key,value)
        db.commit()
        db.refresh(update_game)
        return db_game
    return {"message": "Game with {game_id} could not be found"}

@router.delete("/{game_id}")
def delete_game(game_id: int, db: Session = Depends(get_db)):
    game = db.query(Game).filter(Game.id == game_id).first()
    if game:
        db.delete(game)
        db.commit()
        return {"message": "Game with {game_id} was successfully deleted"}
    return {"message": "Game with {game_id} could not be found"}