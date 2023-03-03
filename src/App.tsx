import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './Pages/Admin';
import Connexion from './Pages/Connexion';
import GoDocument from './Pages/GoDocument';
import Inscription from './Pages/Inscription';
import LandingPage from './Pages/LandingPage';
import AddEvent from './Components/AddEvent';

import UserInterface from './Pages/UserInterface';
import UserProfile from './Pages/UserProfile';
import AddDoc from './Pages/AddDoc';
import CurrentUserProvider from './context/AuthContext';
import AddChild from './Pages/AddChild';
import SuppChild from './Pages/SuppChild';
import { EventType } from './models/interface/Event';
import { useEffect, useState } from 'react';

import useAxiosPrivate from './api/useAxiosPrivate';
import axios, { AxiosResponse } from 'axios';

const App = () => {
  // // e
  // // ****** Use State *******
  // // state list event
  // // type du state : <eventType[]>([])

  // const [eventsList, setEventsList] = useState<EventType[]>([]);

  // // **** useEffect *****

  // useEffect(() => {
  //   axios
  //     // axios.get event
  //     .get('/event')
  //     .then((response: AxiosResponse<EventType[]>) => {
  //       // .then : Response :

  //       // conoslle
  //       console.log('-----------app . tsx eseeffectlistevent', response.data);
  //       // set dans mon state response.data
  //       setEventsList(response.data);
  //     })
  //     // .catch :
  //     //console
  //     .catch((error) => console.log('app.tsx erreur fetch category', error));
  // });

  // je fais quoi avec mon state list event

  // 1) afficher mes events dans user interface
  // je dois dabord passer listevents en props à user interface
  // faire une interface props dans userInterface
  // il va avoir besoin d'un tableau event
  // constante avec le composant props
  //faire un liste pour les affincher dans mon jsx

  // 2) je veux pouvoir mettre à jour ma liste d'events quand je fais un add event dans composant AddEVent.tsx
  //

  return (
    <>
      <BrowserRouter>
        <CurrentUserProvider>
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path='/inscription' element={<Inscription />} />

            <Route path='/connexion' element={<Connexion />} />

            {/* <Route element={<RequireAuth allowedRole={['admin', 'user']} />}> */}
            <Route
              path='/user/interface'
              element={<UserInterface />}
              // element={<UserInterface maListDeventDuParentApp={eventsList} />}
            />
            <Route path='/user/profile' element={<UserProfile />} />
            {/* <Route path='/user/document' element={<GoDocument />} /> */}
            {/* <Route path='/user/add/doc' element={<AddDoc />} /> */}
            <Route path='/user/add/child' element={<AddChild />} />
            <Route path='/user/supp/child' element={<SuppChild />} />
            {/* <Route path='/user/admin' element={<Admin />} /> */}

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
