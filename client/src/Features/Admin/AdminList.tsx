import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { useNavigate } from 'react-router-dom';
import { authorization, clearError, logOut } from './AuthSlice';

function AdminList(): JSX.Element {
  const [password, setPassword] = useState('');
  const { admin, error } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onHandleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(1);
    
    dispatch(
      authorization({
        password,
      })
    );
  };

  const handleChangePassword: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setPassword(e.target.value);
    dispatch(clearError());
  };

  const onHandleLogout: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    dispatch(logOut());
    navigate('/');
  };

  return (
    <div>
      {admin ? (
        <button className="yesbut" type="button" onClick={onHandleLogout}>
          Выйти
        </button>
      ) : (
        <form onSubmit={onHandleSubmit}>
          <label>Введите пароль</label>
          <input
            required
            type="password"
            value={password}
            onChange={handleChangePassword}
          />
          <button type="submit">Войти</button>
          {error && (
            <span style={{ color: 'red', fontSize: '25' }}>{error}</span>
          )}
        </form>
      )}
    </div>
  );
}

export default AdminList;
