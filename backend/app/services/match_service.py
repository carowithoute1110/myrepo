from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session 
from models import Match
from database import get_db

router = APIRouter(prefix="/matches", tags=["Matches"])

@router.post("/")
def create_match(date_time: str, location: str, mode: str, team1_player1: int, team1_player2: int, team2_player1: int, team2_player2: int, db: Session = Depends(get_db)):
    match = Match(date_time = date_time, location = location, mode = mode, team1_player1 = team1_player1, team1_player2 = team1_player2, team2_player1 = team2_player1, team2_player2 = team2_player2)
    db.add(match)
    db.commit()
    db.refresh(match)
    return match

@router.get("/{match_id}")
def get_match(match_id: int, Session = Depends(get_db)):
    return db.query(Match).filter(Match.id == match_id).first()

@router.put("/{match.id}")
def update_match(match_id: int, date_time: str, location: str, mode: str, db: Session = Depends(get_db)):
    match = db.query(Match).filter(Match.id == match_id).first()
    if match:
        match.date_time = date_time
        match.location = location
        match.mode = mode
        db.commit()
        return{"message": "Match with {match_id} was successfully updated"}
    return {"error": "Match with {match_id} could not be found"}

@router.delete("/{match.id}")
def delete_match(match_id: int, db: Session = Depends(get_db)):
    match = db.query(Match).filter(Match.id == match_id).first()
    if match: 
        db.delete(match)
        db.commit()
        return{"message": "Match with {match_id} was successfully deleted"}
    return {"error": "Match with {match_id} could not be found"}