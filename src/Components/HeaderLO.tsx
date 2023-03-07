import './HeaderLO.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HeaderLO = () => {
  return (
    <div className='headerLP'>
      <div className='logoContainer'>
        <img
          className='logoLP'
          src='/assets/LogoFull.png'
          alt='logo toux doux app'
        />
      </div>
      <div className='buttonContainer'>
        <Link to={'/connexion'}>
          <button className='button-Connect' type='submit'>
            Connexion
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeaderLO;
