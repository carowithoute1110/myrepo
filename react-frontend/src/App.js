import { useEffect, useState } from 'react';
import './App.css';
import { getMatches, getPlayers } from './api/api';
import ListOfPlayers from './components/ListOfPlayers';
import AddPlayer from './components/AddAPlayer';
import AddMatch from './components/AddAMatch';
import ListOfMatches from './components/ListOfMatches';

const App = () => {
  const[players, setPlayers] = useState([]);
  useEffect(() => {
    loadPlayers();
  }, []);

  const[matches, setMatches] = useState([]);
  useEffect(() => {
    loadMatches();
  },[]);

  const loadPlayers = async () => {
    const data = await getPlayers();
    console.log("Neuer Spieler!", data);
    setPlayers(actPlayers => [...data]);
  };

  const loadMatches = async () => {
    const data = await getMatches();
    console.log("Match:", data);
    setMatches(data);
  }

  return (<div><h1>Brandneue Kickerverwaltung der Mayerflower</h1>
    <AddPlayer refreshPlayers={loadPlayers} />
    <ListOfPlayers refreshPlayers={loadPlayers} players={players} />
    <AddMatch refreshMatches={loadMatches} />
    <ListOfMatches refreshMatches={loadMatches} />
    </div>
  );
};
export default App;
