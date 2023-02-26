import { FormEvent, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert, Container } from 'react-bootstrap';
import { isValid } from '../models/form-validate/validation';
import { errorInfo } from '../models/form-validate/errorMessage';
import HeaderLO from '../Components/HeaderLO';
import './Inscription.css';

const Inscription = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [apiErrorMessage, setApiErrorMessage] = useState<string[]>([]);

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    if (email.current?.value && !isValid('email', email.current.value)) {
      setErrorMessage(errorInfo('email'));
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return;
    }

    if (
      password.current?.value &&
      !isValid('password', password.current.value)
    ) {
      setErrorMessage(errorInfo('password'));
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return;
    }

    if (password.current?.value !== confirmPassword.current?.value) {
      setErrorMessage('Combinaison de mot de passe incorrecte');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return;
    }

    let userSign = {
      email: `${email.current?.value}`,
      password: `${password.current?.value}`,
      name: `${name.current?.value}`,
    };

    axios
      .post('http://localhost:8080/api/auth/register', userSign)
      .then((response) => {
        let userData = response.data;

        console.log('Inscription - HandleSubmit - Reponse : ', userData);
        if (response.status === 201) {
          navigate('/connexion');
        }
      })
      .catch((error) => {
        console.log('Inscription - HandleSubmit - Error : ', error);
        setApiErrorMessage(error.response.data.message);
      });
  };

  return (
    <>
      <HeaderLO />
      <h1 className='titleInscription'>Inscription</h1>
      <Container className='containerInscription'>
        <form>
          <div className='form-group'>
            <label htmlFor='emailInsciption'>Email :</label>
            <input
              type='email'
              className='form-control'
              id='inputEmail'
              placeholder='email'
              ref={email}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='passwordInput'>Mot de passe :</label>
            <input
              type='password'
              className='form-control'
              id='inputPassword'
              placeholder='mot2passe'
              ref={password}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='passwordInput2'>
              Confirmez votre mot de passe :
            </label>
            <input
              type='password'
              className='form-control'
              id='inputPassword'
              placeholder='confirmer votre mot de passe'
              ref={confirmPassword}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='nomInput'>Nom ou Pseudo :</label>
            <input
              type='text'
              className='form-control'
              id='inputNom'
              placeholder='Nom'
              ref={name}
            />
          </div>

          <button
            type='button'
            className='boutonInscription'
            onClick={handleSubmitForm}
          >
            s'inscrire
          </button>
        </form>
        {/* S'il y a un message d'erreur, on l'affiche dans un Alert */}
        {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
        {apiErrorMessage &&
          apiErrorMessage.map((error, i) => (
            <Alert key={i} variant='danger'>
              {error}
            </Alert>
          ))}
      </Container>
    </>
  );
};

export default Inscription;
