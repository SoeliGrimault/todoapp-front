import './UserInterface.css';
import NavBar from '../Components/NavBar';
import { Link } from 'react-router-dom';

const UserInterface = () => {
  return (
    <div className='UIpage'>
      <NavBar />
      <div className='FonctionUI'>
        <p className='textUI'> Ajouter un document :</p>
        <Link to={'/user/add/doc'}>
          <img
            className='PrendreUnePhoto'
            src='/assets/appphoto1.svg'
            alt='allez sur ajout doc, prrendre une pictur'
          />
        </Link>
        <div className='textUI'>Créer un event :</div>
        <Link to={'/user/add/event'}>
          <img
            className='ajoutevent'
            src='/assets/addevent.svg'
            alt='allez sur ajout event'
          />
        </Link>
      </div>
      <div className='NextEvent'>carroussel event a venir</div>
      <div className='PastEvent'>carroussel event past</div>
    </div>
  );
};

export default UserInterface;
