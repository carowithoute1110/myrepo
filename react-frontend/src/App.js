import { useEffect, useState } from 'react';
import './App.css';
import { getPlayers } from './api/api';
import ListOfPlayers from './components/ListOfPlayers';
import AddPlayer from './components/AddAPlayer';

const App = () => {
  const[players, setPlayers] = useState([]);
  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    const data = await getPlayers();
    console.log("Neuer Spieler!", data);
    setPlayers(actPlayers => [...data]);
  };

  return (<div><h1>Brandneue Kickerverwaltung der Mayerflower</h1>
    <AddPlayer refreshPlayers={loadPlayers} />
    <ListOfPlayers refreshPlayers={loadPlayers} players={players} />
    </div>
  );
};
export default App;
