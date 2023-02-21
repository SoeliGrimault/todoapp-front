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
          <Button className='button-Log' type='submit'>
            Connexion
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeaderLO;
