import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Connexion from './Pages/Connexion';
import Inscription from './Pages/Inscription';
import LandingPage from './Pages/LandingPage';
import UserInterface from './Pages/UserInterface';
import UserProfile from './Pages/UserProfile';
import CurrentUserProvider from './context/AuthContext';
import AddChild from './Pages/AddChild';
import SuppChild from './Pages/SuppChild';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <CurrentUserProvider>
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path='/inscription' element={<Inscription />} />

            <Route path='/connexion' element={<Connexion />} />

            {/* <Route element={<RequireAuth allowedRole={['admin', 'user']} />}> */}
            <Route path='/user/interface' element={<UserInterface />} />
            <Route path='/user/profile' element={<UserProfile />} />

            <Route path='/user/add/child' element={<AddChild />} />
            <Route path='/user/supp/child' element={<SuppChild />} />

            {/* </Route> */}

            {/* <Route element={<RequireAuth allowedRole={['admin']} />}> */}
            {/* <Route path='/admin' element={<Admin />} /> */}
            {/* </Route> */}
          </Routes>
        </CurrentUserProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
