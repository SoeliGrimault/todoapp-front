import './NavBar.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='headerLP'>
      <div className='logoContainer'>
        <img
          className='logo'
          src='/assets/LogoMobile.png'
          alt='logo toux doux app'
        />
      </div>
      <div className='logoContainerDesktop'>
        <img
          className='logoDesk'
          src='/assets/LogoFull.png'
          alt='logo toux doux app'
        />
      </div>
      <div className='buttonContainer'>
        <Link to={'/connexion'}>
          <Button className='button-Sign-Log' type='submit'>
            Connexion
          </Button>
        </Link>

        {/* <Link to={'/inscription'}>
          <Button className='button-Sign-Log' type='submit'>
            Inscription
          </Button>
        </Link> */}
      </div>
    </div>
  );
};

export default NavBar;
