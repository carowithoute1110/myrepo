

from fastapi import FastAPI 
from services import player_service, match_service, game_service, statistics_service
from fastapi.middleware.cors import CORSMiddleware
from calculate_winner import calculate_winners

app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["*"],allow_credentials=True,allow_methods=["*"],allow_headers=["*"])
calculate_winners()

app.include_router(player_service.router)
app.include_router(match_service.router)
app.include_router(game_service.router)
app.include_router(statistics_service.router)