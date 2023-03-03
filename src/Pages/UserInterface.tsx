import NavBar from '../Components/NavBar';
import { EventType } from '../models/interface/Event';
import { useAuth } from '../context/AuthContext';
import AddEvent from '../Components/AddEvent';
import { useEffect, useState } from 'react';

import useAxiosPrivate from '../api/useAxiosPrivate';
import { AxiosResponse } from 'axios';
import './UserInterface.css';
import { Card } from 'react-bootstrap';

// interface EventFormProps {
//   maListDeventDuParentApp: EventType[];
// setMalisteDeventblabla: (listEvent: EventType[]) => void;
//   //tout ce que j'ai besoin de lui passer c'est ma list d'event
// }

// const UserInterface = ({ maListDeventDuParentApp }: EventFormProps) =>

const UserInterface = () => {
  const { currentUser } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [eventsList, setEventsList] = useState<EventType[]>([]);

  useEffect(() => {
    axiosPrivate
      // axios.get event
      .get('/event')
      .then((response: AxiosResponse<EventType[]>) => {
        // .then : Response :

        console.log('-----------app . tsx eseeffectlistevent', response.data);
        // set dans mon state response.data
        setEventsList(response.data);
      })

      .catch((error) => console.log('UI erreur fetch event', error));
  }, []);

  return (
    <div className='UIpage'>
      <NavBar />

      {/* <div className='FonctionUI'> */}
      {/* <p className='textUI'> Ajouter un document :</p>
        <Link to={'/user/add/doc'}>
          <img
            className='PrendreUnePhoto'
            src='/assets/appphoto1.svg'
            alt='allez sur ajout doc, prrendre une pictur'
          />
        </Link> */}
      {/* <div className='textUI'>Créer un event :</div>

        <img
          className='ajoutevent'
          src='/assets/addevent.svg'
          alt='allez sur ajout event'
        />
      </div> */}
      <AddEvent
        setMalisteDeventblabla={setEventsList}
        recevoirMaListdEvent={eventsList}
      />

      <Card style={{ width: '18rem' }}>
        {eventsList.length > 0 &&
          eventsList.map((event) => (
            <Card.Body className='mesvents' key={event.id}>
              <Card.Text>
                <strong>{event.name}</strong>{' '}
              </Card.Text>
              <Card.Text>
                Date: {event.date} Heure:{event.time}{' '}
              </Card.Text>
              <Card.Text>
                Adresse : {event.address} Ville: {event.city}{' '}
              </Card.Text>

              <Card.Text>
                Description : {event.desciption}{' '}
                <strong>{event.participants[0].name}</strong>
              </Card.Text>
            </Card.Body>
          ))}
      </Card>

      {/* <ul className='MesEventsNonPast'>
        <strong>Mes Events:</strong>

        {eventsList.length > 0 &&
          eventsList.map((events) => (
            <li className='mesecvents' key={events.id}>
              {events.name}
              {events.date}
              {events.time}
              {events.address}
              {events.city}
              {events.desciption}
            </li>
          ))}
      </ul> */}
      <div className='PastEvent'>carroussel event past</div>
    </div>
  );
};

export default UserInterface;
