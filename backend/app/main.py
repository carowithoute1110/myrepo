

from fastapi import FastAPI 
from services import player_service, match_service, game_service
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["*"],allow_credentials=True,allow_methods=["*"],allow_headers=["*"])

app.include_router(player_service.router)
app.include_router(match_service.router)
app.include_router(game_service.router)