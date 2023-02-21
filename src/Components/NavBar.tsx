import './NavBar.css';

import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='navbar'>
      <div className='NBContainerLogo'>
        <Link to={'/user/interface'}>
          <img
            className='logoNB'
            src='/assets/LogoMobile.png'
            alt='logo toux doux app'
          />
        </Link>
        <div className='logoContainerDesktop'>
          <Link to={'/user/interface'}>
            <img
              className='logoDesk'
              src='/assets/LogoFull.png'
              alt='logo toux doux app'
            />
          </Link>
        </div>
      </div>
      <div className='iconeNB'>
        <Link to={'/user/profile'}>
          <img
            className='logoProfileNB'
            src='/assets/userProfile.svg'
            alt='aller sur mon profil'
          />
        </Link>
        <Link to={'/user/document'}>
          <img
            className='logoDocNB'
            src='/assets/docbleu.svg'
            alt='aller sur mes documents'
          />
        </Link>
        <Link to={'/connexion'}>
          <img
            className='logoDisconnectNB'
            src='/assets/decobleu.svg'
            alt='deconnectez vous'
          />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
