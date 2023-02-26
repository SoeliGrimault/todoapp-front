import axios from 'axios';
import { FormEvent, useRef, useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import HeaderLO from '../Components/HeaderLO';
import { useAuth } from '../context/AuthContext';
import './Connexion.css';

const Connexion = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  // const [errorMessage, setErrorMessage] = useState<string>('');

  const [errMsg, setErrorMsg] = useState<string>('');
  // const [redirectMessage, setRedirectMessage] = useState('');

  // On récupère depuis le context, la fonction pour enregistrer le user qui se connecte.
  // Ce user et (donc toutes ses propriétés) sera ainsi accessible partout dans l'application sans avoir à faire d'appel api
  const { checkLogin } = useAuth();

  const navigate = useNavigate();

  // Ce hook de react-router-dom permet de sur quel route (pathname) on se trouve
  // const location = useLocation();

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    let userInCo = {
      email: email.current?.value,
      password: password.current?.value,
    };

    axios
      .post('http://localhost:8080/api/auth/login', userInCo)
      .then((response) => {
        console.log('login reponse ', response);

        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);

        if (response.status === 201) {
          // On lance cette fonction du AuthContext pour récupérer le user caché dans le payload de l'accessToken et mettre à jour notre currentUser avec
          checkLogin();

          navigate('/user/interface');
        }
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message);
        setTimeout(() => {
          setErrorMsg('');
        }, 5000);
        console.log('login error:', error);
      });
  };

  return (
    <>
      <HeaderLO />
      <h1 className='titleConnexion'> Connexion</h1>
      <Container className='containerConnexion'>
        {/* {redirectMessage && (
          <Alert variant='warning' className='my-3'>
            {redirectMessage}
          </Alert>
        )} */}
        <form>
          <div className='form-group'>
            <label htmlFor='emailConnexion'>Email :</label>
            <input
              type='email'
              className='form-control'
              id='inputEmail'
              placeholder='email'
              ref={email}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='passwordConnexion'>Mot de passe :</label>
            <input
              type='password'
              className='form-control'
              id='inputpassword'
              placeholder='mot de passe'
              ref={password}
            />
          </div>
          <button
            type='button'
            className='boutonConnexion'
            onClick={handleSubmitForm}
          >
            se connecter
          </button>
        </form>
        {errMsg && <Alert variant='danger'>{errMsg}</Alert>}
      </Container>
    </>
  );
};

export default Connexion;
