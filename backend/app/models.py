from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship
from database import Base

class Player(Base):
    __tablename__ = "players"

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    location = Column(String, nullable=False)

class Match(Base):
    __tablename__ = "matches"

    id = Column(Integer, primary_key=True, index=True)
    date_time = Column(TIMESTAMP, nullable=False)
    location = Column(String, nullable=False)
    mode = Column(String, nullable=False)
    team1_player1 = Column(Integer, ForeignKey("players.id"))
    team1_player2 = Column(Integer, ForeignKey("players.id"))
    team2_player1 = Column(Integer, ForeignKey("players.id"))
    team2_player2 = Column(Integer, ForeignKey("players.id"))

class Game(Base):
    __tablename__ = "games"

    id = Column(Integer, primary_key=True, index=True)
    match_id = Column(Integer, ForeignKey("matches.id"))
    team1_front = Column(Integer, ForeignKey("players.id"))
    team1_back = Column(Integer, ForeignKey("players.id"))
    team2_front = Column(Integer, ForeignKey("players.id"))
    team2_back = Column(Integer, ForeignKey("players.id"))
    team1_score = Column(Integer, nullable=False)
    team2_score = Column(Integer, nullable=False)
    