from database import engine
from sqlalchemy import text

def calculate_winners():
    with engine.connect() as connection:
        connection.execute(text("""
            CREATE OR REPLACE VIEW match_results AS
            SELECT 
                m.id AS match_id,
                m.date_time,
                m.location,
                m.mode,
                COUNT(CASE WHEN g.team1_score > g.team2_score THEN 1 END) AS team1_wins,
                COUNT(CASE WHEN g.team2_score > g.team1_score THEN 1 END) AS team2_wins,
                CASE 
                    WHEN COUNT(CASE WHEN g.team1_score > g.team2_score THEN 1 END) >
                         COUNT(CASE WHEN g.team2_score > g.team1_score THEN 1 END) THEN 'team1'
                    WHEN COUNT(CASE WHEN g.team1_score > g.team2_score THEN 1 END) <
                         COUNT(CASE WHEN g.team2_score > g.team1_score THEN 1 END) THEN 'team2'
                END AS winning_team
            FROM matches m
            LEFT JOIN games g ON g.match_id = m.id
            GROUP BY m.id, m.date_time, m.location, m.mode;
        """))