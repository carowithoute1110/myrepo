# Verwende Node.js als Basis
FROM node:16-slim

# Setze das Arbeitsverzeichnis im Container
WORKDIR /app

# Kopiere die package.json und package-lock.json
COPY frontend/package.json frontend/package-lock.json /app/

# Installiere die Frontend-Abhängigkeiten
RUN npm install

# Kopiere den Rest des Frontend-Codes
COPY frontend/ /app/

# Baue das React-Frontend für die Produktion
RUN npm run build

# Exponiere den Port, auf dem das Frontend läuft
EXPOSE 3000

# Starte den Frontend-Server
CMD ["npm", "start"]
