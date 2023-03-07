import NavBar from '../Components/NavBar';
import { EventType } from '../models/interface/Event';
import { useAuth } from '../context/AuthContext';
import AddEvent from '../Components/AddEvent';
import { useEffect, useState } from 'react';

import useAxiosPrivate from '../api/useAxiosPrivate';
import { AxiosResponse } from 'axios';
import './UserInterface.css';
import Card from 'react-bootstrap/Card';
import { CategoryType } from '../models/interface/Category';
import { Link } from 'react-router-dom';

// interface EventFormProps {
//   maListDeventDuParentApp: EventType[];
// setMalisteDeventblabla: (listEvent: EventType[]) => void;
//   //tout ce que j'ai besoin de lui passer c'est ma list d'event
// }

// const UserInterface = ({ maListDeventDuParentApp }: EventFormProps) =>
let listEventPure: EventType[] = [];
let valCategSelect = '';
let valChildSelect = '';

const UserInterface = () => {
  const { currentUser } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [eventsList, setEventsList] = useState<EventType[]>([]);
  const [listCateg, setListCateg] = useState<CategoryType[]>([]);

  useEffect(() => {
    axiosPrivate
      // axios.get event
      .get('/event')
      .then((response: AxiosResponse<EventType[]>) => {
        // .then : Response :

        console.log('-----------app . tsx eseeffectlistevent', response.data);
        // set dans mon state response.data
        setEventsList(response.data);
        listEventPure = response.data;
      })

      .catch((error) => console.log('UI erreur fetch event', error));

    axiosPrivate
      .get('/category')
      .then((response: AxiosResponse<CategoryType[]>) => {
        console.log('-----------UI - fetcch category', response.data);
        setListCateg(response.data);
      })
      .catch((error) => console.log('add evenh erreur fetch category', error));
  }, []);

  // useEffect(() => {
  //   console.log('----dans UseEffect---: ', valeurChildSelect);
  // }, [valeurChildSelect]);

  const handleSelectCateg = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('------------UI event e', e.target.value);
    // je souhaite recuperer la valeur selectionnéé
    // je la stock dans le set
    // setValeurCategSelect(e.target.value);
    valCategSelect = e.target.value;
    // je souhaite filtrer les events
    filterEvent();
  };

  const handleSelectChild = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('------------UI child e', e.target.value);
    // setValeurChildSelect(e.target.value);
    // console.log('-----VCS', valeurChildSelect);
    valChildSelect = e.target.value;
    filterEvent();
  };

  const filterEvent = () => {
    let listEventPasPure: EventType[] = [...listEventPure];
    //spread op list event pure
    // si une categ est selectionnee filtrer les event en fonction de la categ
    //chqaque fois que if variable tampon egale au resultat de notre filter
    // idem pour les child

    //retourner le tableau avec le setEvL

    if (valCategSelect) {
      listEventPasPure = listEventPasPure.filter(
        (event) => valCategSelect === event.category.name
      );
    }

    if (valChildSelect) {
      listEventPasPure = listEventPasPure.filter(
        (event) => valChildSelect === event.participants[0].name
      );
    }
    setEventsList(listEventPasPure);
  };

  return (
    <div className='UIpage'>
      <NavBar />

      {/* <div className='FonctionUI'>
        <p className='textUI'> Ajouter un document :</p>
        <Link to={'/user/add/doc'}>
          <img
            className='PrendreUnePhoto'
            src='/assets/appphoto1.svg'
            alt='allez sur ajout doc, prrendre une pictur'
          />
        </Link>
        <div className='textUI'>Créer un event :</div>

        <img
          className='ajoutevent1'
          src='/assets/addevent1.svg'
          alt='allez sur ajout event'
        />
      </div> */}
      <AddEvent
        setMalisteDeventblabla={setEventsList}
        recevoirMaListdEvent={eventsList}
      />
      <div className='contairePageUI'>
        <strong>Choisissez vos filtres :</strong>
        <div className='containerFiltres'>
          <div className='filtres'>categorie</div>
          <select className='checkboxCategory' onChange={handleSelectCateg}>
            <option value={''}>Aucune</option>
            {listCateg.map((category) => (
              <option
                value={category.name}
                className='filtres'
                key={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
          <div className='filtres'>personne</div>
          <select className='checkboxCategory' onChange={handleSelectChild}>
            <option value={''}>Aucun</option>
            {currentUser?.children.map((child) => (
              <option value={child.name} className='filtres' key={child.id}>
                {child.name}
              </option>
            ))}
          </select>
        </div>

        {eventsList.length > 0 ? (
          eventsList.map((event) => (
            <Card className='m-3' style={{ width: '18rem' }} key={event.id}>
              <Card.Body>
                <Card.Title>
                  <strong>{event.name}</strong>{' '}
                </Card.Title>

                <Card.Text>
                  <strong> Date :</strong> {event.date} <strong>Heure :</strong>{' '}
                  {event.time}{' '}
                </Card.Text>
                <Card.Text>
                  <strong>Adresse :</strong> {event.address}
                </Card.Text>
                <Card.Text>
                  <strong>Ville :</strong> {event.city}
                </Card.Text>
                <Card.Text>
                  <strong> Description : </strong> {event.description}{' '}
                </Card.Text>
                <Card.Text>
                  {' '}
                  <strong> Categorie :</strong> {event.category.name}{' '}
                  {event.participants &&
                    (event.participants.length > 0 ? (
                      <Card.Text>
                        <strong>{event.participants[0].name}</strong>
                      </Card.Text>
                    ) : (
                      <Card.Text>
                        <strong>Pour : {currentUser?.name}</strong>
                      </Card.Text>
                    ))}
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p> pas d'event avec ces filtres</p>
        )}
      </div>

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
      {/* <div className='PastEvent'>carroussel event past</div> */}
    </div>
  );
};

export default UserInterface;
