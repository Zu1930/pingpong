import React from 'react';
import { useAppSelector } from '../../store';
import GamerItem from './GamerItem';

function GamersList() {
  const { gamers } = useAppSelector((store) => store.gamers);
  return (
    <div className="gamer-list">
      <h1>Список игроков</h1>
      {gamers.map((el) => (
        <GamerItem key={el.id} gamer={el} />
      ))}
    </div>
  );
}

export default GamersList;
