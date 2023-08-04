import React from 'react';
import { Gamer } from './redux/type';
import { useAppDispatch, useAppSelector } from '../../store';
import { changeStatus } from './redux/GamerSlice';

function GamerItem({ gamer }: { gamer: Gamer }): JSX.Element {
  const { admin } = useAppSelector((store) => store.auth);

  const dispatch = useAppDispatch();

  const onChangeStatus: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    console.log('ee');
    
    dispatch(changeStatus({ id: gamer.id, status: e.target.checked }));
  };
  return (
    <li>
      {gamer.name} - {gamer.select}
      {admin && (
        <input
          onChange={onChangeStatus}
          type="checkbox"
          checked={gamer.status}
        />
      )}
      {gamer.status ? <span>играет</span> : <span>не играет</span>}
    </li>
  );
}

export default GamerItem;
