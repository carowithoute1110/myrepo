# Verwende das offizielle Python-Image als Basis
FROM python:3.10-slim

# Setze das Arbeitsverzeichnis im Container
WORKDIR /app

# Kopiere die requirements.txt ins Arbeitsverzeichnis
COPY requirements.txt /app/

# Installiere die Python-Abhängigkeiten
RUN pip install --no-cache-dir -r requirements.txt

# Kopiere den Rest des Backend-Codes
COPY . /app/

# Setze Umgebungsvariablen für die Datenbank-Verbindung
ENV DATABASE_URL=postgresql://user:password@db:5432/mydatabase

# Exponiere den Port, auf dem FastAPI läuft (standardmäßig 8000)
EXPOSE 8000

# Starte den FastAPI-Server mit Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
