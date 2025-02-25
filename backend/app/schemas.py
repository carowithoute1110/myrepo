from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PlayerScheme(BaseModel):
    name: str
    location: str


class MatchScheme(BaseModel):
    date_time: Optional[datetime] = None
    location: str
    mode: str
    team1_player1: int
    team2_player2: int
    team1_player2: int
    team2_player2: int


class GameScheme(BaseModel):
    match_id: int
    team1_front: int
    team1_back: int
    team2_front: int
    team2_back: int
    team1_score: int
    team2_score: int
