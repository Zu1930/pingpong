import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminList from '../Features/Admin/AdminList';
import MainList from '../Features/Main/MainList';
import { useAppDispatch } from '../store';
import { authCheckAdmin } from '../Features/Admin/redux/AuthSlice';
import GamersList from '../Features/Main/GamersList';
import { loadGamers } from '../Features/Main/redux/GamerSlice';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authCheckAdmin());
    dispatch(loadGamers())
  }, []);

  return (
    <div className="app">
      <Routes>
        {/* <Route path="/" element={<NavBar />}> */}
        <Route index element={<MainList />} />
        <Route path="/admin-ping" element={<AdminList />} />
        <Route path="/gamers" element={<GamersList />} />
        {/* </Route> */}
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
