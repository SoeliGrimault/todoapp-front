import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './Pages/Admin';
import Connexion from './Pages/Connexion';
import GoDocument from './Pages/GoDocument';
import Inscription from './Pages/Inscription';
import LandingPage from './Pages/LandingPage';
import AddEvent from './Pages/AddEvent';

import UserInterface from './Pages/UserInterface';
import UserProfile from './Pages/UserProfile';
import AddDoc from './Pages/AddDoc';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path='/inscription' element={<Inscription />} />
          <Route path='/connexion' element={<Connexion />} />

          {/* <Route element={<RequireAuth allowedRole={['admin', 'user']} />}> */}
          <Route path='/user/interface' element={<UserInterface />} />
          <Route path='/user/profile' element={<UserProfile />} />
          <Route path='/user/document' element={<GoDocument />} />
          <Route path='/user/add/event' element={<AddEvent />} />
          <Route path='/user/add/doc' element={<AddDoc />} />
          {/* </Route> */}

          {/* <Route element={<RequireAuth allowedRole={['admin']} />}> */}
          <Route path='/admin' element={<Admin />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
