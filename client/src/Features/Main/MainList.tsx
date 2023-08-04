import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../store';
import { addGamer, clearError } from './redux/GamerSlice';
import GamersList from './GamersList';

function MainList(): JSX.Element {
  const [name, setName] = useState('');
  const [select, setSelect] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((store) => store.gamers);
  console.log(error);

  const addHandleGamer: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(addGamer({ name, select }));
    // setTimeout(() => {
    if (!error) {
      setShowAddModal(false);
    
      setName('')
      setSelect('')
    }
    // }, 3000)
  };

  const clearInputName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
    dispatch(clearError());
  };
  const clearInputSelect: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelect(e.target.value);
    dispatch(clearError());
  };

  return (
    <div>
      <button type="button" onClick={() => setShowAddModal(true)}>
        Зарегистрироваться на турнир!
      </button>
      <Modal active={showAddModal} setActive={setShowAddModal}>
        <form className="add-form" onSubmit={addHandleGamer}>
          <input
            value={name}
            onChange={clearInputName}
            type="text"
            placeholder="name"
          />
          <select value={select} onChange={clearInputSelect}>
            <option value="1">выбери</option>
            <option value="фаза 1">фаза 1</option>
            <option value="фаза 2">фаза 2</option>
            <option value="фаза 3">фаза 3</option>
            <option value="помогатор">помогатор</option>
            <option value="преподаватель">преподаватель</option>
            <option value="выпускник">выпускник</option>
          </select>
          {error && (
            <span style={{ color: 'red', fontSize: '25' }}>{error}</span>
          )}
          <button type="submit">go</button>
          <button type="button" onClick={() => setShowAddModal(false)}>
            no
          </button>
        </form>
      </Modal>
      <GamersList />
    </div>
  );
}

export default MainList;
