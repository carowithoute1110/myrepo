from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session 
from models import Match
from schemas import MatchScheme
from database import get_db
from typing import List

router = APIRouter(prefix="/matches", tags=["Matches"])

@router.post("/")
def create_match(match: MatchScheme, db: Session = Depends(get_db)):
    new_match = Match(**match.dict())
    db.add(new_match)
    db.commit()
    db.refresh(new_match)
    return new_match

@router.get("/")
def get_matches(db: Session = Depends(get_db)):
    matches = db.query(Match).all()
    return [match.__dict__ for match in matches]

@router.get("/{match_id}")
def get_match(match_id: int, Session = Depends(get_db)):
    return db.query(Match).filter(Match.id == match_id).first()

@router.put("/{match_id}")
def update_match(match_id: int, match: MatchScheme, db: Session = Depends(get_db)):
    updated_match = db.query(Match).filter(Match.id == match_id).first()
    if updated_match:
        for key, value in match.dict().items():
            setattr(updated_match, key, value)
        db.commit()
        return{"message": "Match with {match_id} was successfully updated"}
    return {"error": "Match with {match_id} could not be found"}

@router.delete("/{match_id}")
def delete_match(match_id: int, db: Session = Depends(get_db)):
    match = db.query(Match).filter(Match.id == match_id).first()
    if match: 
        db.delete(match)
        db.commit()
        return{"message": "Match with {match_id} was successfully deleted"}
    return {"error": "Match with {match_id} could not be found"}

