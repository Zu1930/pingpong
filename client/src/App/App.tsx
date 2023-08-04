import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminList from '../Features/Admin/AdminList';
import MainList from '../Features/Main/MainList';
import { useAppDispatch } from '../store';
import { authCheckAdmin } from '../Features/Admin/AuthSlice';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authCheckAdmin());
  }, []);

  return (
    <div className="app">
      <Routes>
        {/* <Route path="/" element={<NavBar />}> */}
        <Route index element={<MainList />} />
        <Route path="/admin-ping" element={<AdminList />} />
        {/* </Route> */}
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
