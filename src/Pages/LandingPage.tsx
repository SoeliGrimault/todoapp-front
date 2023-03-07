import './LandingPage.css';
import HeaderLO from '../Components/HeaderLO';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <HeaderLO />

      <div className='PhotoLPBox'>
        <img className='photoLP' src='/assets/LP.jpg' alt='jardin de sable' />
      </div>
      <div className='textLP'>
        <h1> Quand l'organisation a besoin de sérénité</h1>
        <p>
          Si pour vous, jongler avec les nombreuses applications existantes est
          compliqué. Si vous souhaitez de la
          <strong className='bleucanard'> simplicité</strong>. Pouvoir gérer vos
          documents, vos rendez-vous, les emplois du temps des enfants, votre
          liste de course sur 1 seule appli...
        </p>
        <p> De nombreuses fonctionnalités à venir</p>
      </div>
      <div className='buttonLPsign'>
        <Link to={'/inscription'}>
          <button className='button-Sign' type='submit'>
            Inscrivez-vous gratuitement
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
