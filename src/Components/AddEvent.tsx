import { AxiosResponse } from 'axios';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../api/useAxiosPrivate';

import { useAuth } from '../context/AuthContext';
import { errorInfo } from '../models/form-validate/errorMessage';
import { isValid } from '../models/form-validate/validation';

import { CategoryType } from '../models/interface/Category';
import { ChildrenType } from '../models/interface/Children';
import { EventType } from '../models/interface/Event';
import './AddEvent.css';

let listCategory: CategoryType[] = [];

interface EventFormProps {
  setMalisteDeventblabla: (listEvent: EventType[]) => void;
  recevoirMaListdEvent: EventType[];
}

const AddEvent = ({
  setMalisteDeventblabla,
  recevoirMaListdEvent,
}: EventFormProps) => {
  // Je fais mes constantes de bases
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [errorApiMessage, setErrorApiMessage] = useState<string[]>([]);

  const [listCategoryDisplay, setListCategoryDisplay] = useState<
    CategoryType[]
  >([]);

  useEffect(() => {
    axiosPrivate
      .get('/category')
      .then((response) => {
        listCategory = response.data;
        console.log('-----------add event - fetcch category', listCategory);
        setListCategoryDisplay(listCategory);
      })
      .catch((error) => console.log('add event erreur fetch category', error));

    if (currentUser) {
      axiosPrivate
        .get(`/children`)
        .then((response: AxiosResponse<ChildrenType[]>) => {
          currentUser &&
            setCurrentUser({
              ...currentUser,
              children: response.data,
            });
        })
        .catch((error) =>
          console.log('add event list enfant-------------error ', error)
        );
    }
  }, []);

  const nameElement = useRef<HTMLInputElement>(null);
  const addressElement = useRef<HTMLInputElement>(null);
  const postalCodeElement = useRef<HTMLInputElement>(null);
  const cityElement = useRef<HTMLInputElement>(null);
  const dateElement = useRef<HTMLInputElement>(null);
  const timeElement = useRef<HTMLInputElement>(null);
  const descriptionElement = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const childRef = useRef<HTMLSelectElement>(null);

  const handleSubmitForm = (e: FormEvent) => {
    //quand on click sur le button pour envoyer les données
    e.preventDefault();
    setErrorApiMessage([]);

    const nameInput = nameElement.current?.value;
    const addressInput = addressElement.current?.value;
    const postalCodeInput = postalCodeElement.current?.value;
    const cityInput = cityElement.current?.value;
    const dateInput = dateElement.current?.value;
    const timeInput = timeElement.current?.value;
    let descriptInput = descriptionElement.current?.value;
    const categoryInput = categoryRef.current?.value;
    const childInput = childRef.current?.value;

    if (
      nameInput &&
      // addressInput &&
      // postalCodeInput &&
      // cityInput &&
      dateInput &&
      timeInput &&
      // descriptInput &&
      categoryInput
    ) {
      if (nameInput && !isValid('name', nameInput)) {
        setErrorMsg(errorInfo('name'));
        setTimeout(() => {
          setErrorMsg('');
        }, 5000);
        return;
      }

      let dateHourInput = Date.parse(`${dateInput} ${timeInput}`);
      let dateDuJour = Date.now();

      if (dateHourInput < dateDuJour) {
        setErrorMsg('Cette date est déjà passée.');
        setTimeout(() => {
          setErrorMsg('');
        }, 5000);
        return;
      }

      if (descriptInput && !isValid('description', descriptInput)) {
        setErrorMsg(errorInfo('description'));
        setTimeout(() => {
          setErrorMsg('');
        }, 5000);
        return;
      }

      // Permet de retirer les endroits où il y a plus d'un espace entre 2 mots.
      if (descriptInput) {
        console.log('description avant replace : ', descriptInput);
        descriptInput = descriptInput.replace(/\s+/g, ' ');
        console.log('description avec 1 seul espace max : ', descriptInput);
      }

      let eventInsert = {
        name: nameInput,
        address: addressInput === '' ? undefined : addressInput,
        postalCode: postalCodeInput === '' ? undefined : postalCodeInput,
        city: cityInput === '' ? undefined : cityInput,
        date: dateInput,
        time: timeInput,

        description: descriptInput === '' ? undefined : descriptInput,
        category: {
          id: categoryInput,
        },
        participants: childInput
          ? [
              {
                id: childInput,
              },
            ]
          : [],
      };
      console.log('---------ADD EVENT  eventInsert', eventInsert);

      axiosPrivate
        .post('/event', eventInsert)
        .then((response: AxiosResponse<EventType>) => {
          let eventData = response.data;
          console.log('add event, eventdata evenement crée : ', eventData);

          console.log(
            'addEvent, recevoir ma list devent : ',
            recevoirMaListdEvent
          );

          if (response.status === 201) {
            setErrorMsg('');
            setMalisteDeventblabla([eventData, ...recevoirMaListdEvent]);
            navigate('/user/interface');
          }
        })
        .catch((error) => {
          console.log('addEvent - HandleSubmit Error : ', error);
          if (error.response.status === 401) {
            localStorage.removeItem('accessToken');
            navigate('/connexion');
            return;
          }
          setErrorApiMessage(error.response.data.message);
        });
    } else {
      console.log('add event error');
      setErrorMsg('Tous les champs sont obligatoires');
      setTimeout(() => {
        setErrorMsg('');
      }, 5000);
    }
  };

  return (
    <div className='containairAjoutEvent'>
      <form onSubmit={handleSubmitForm}>
        <div className='lesInputs'>
          <img
            className='ajoutevent'
            src='/assets/addevent.svg'
            alt='allez sur ajout event'
          />
          <input
            type='text'
            className='nameInput'
            placeholder='Nom Event'
            ref={nameElement}
          />

          <input
            type='text'
            className='autreInput'
            placeholder='Adresse'
            ref={addressElement}
          />
          <input
            type='text'
            className='adressInput'
            placeholder='Code Postale'
            ref={postalCodeElement}
          />
          <input
            type='text'
            className='adressInput'
            placeholder='Ville'
            ref={cityElement}
          />
          <input
            type='date'
            className='dateInput'
            placeholder='date'
            ref={dateElement}
          />
          <input
            type='time'
            className='dateInput'
            placeholder='la l heure'
            ref={timeElement}
          />
          <input
            type='text'
            className='autreInput'
            placeholder='une description?'
            ref={descriptionElement}
          />
          <div className='checkboxSelect'>
            <select ref={categoryRef}>
              {listCategoryDisplay.map((category) => (
                <option
                  value={category.id}
                  className='checkboxCategChild'
                  key={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>

            <select ref={childRef}>
              {currentUser?.children.map((child) => (
                <option
                  value={child.id}
                  className='les categggg'
                  key={child.id}
                >
                  {child.name}
                </option>
              ))}
            </select>

            <button type='submit' className='boutonAddEvent'>
              créer
            </button>
          </div>
        </div>

        {errorMsg && <Alert variant='danger'>{errorMsg}</Alert>}
        {errorApiMessage &&
          errorApiMessage.map((error, i) => (
            <Alert key={i} variant='danger'>
              {error}
            </Alert>
          ))}
      </form>
    </div>
  );
};

export default AddEvent;
