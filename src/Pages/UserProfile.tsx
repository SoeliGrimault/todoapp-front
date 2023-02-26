import NameInput from '../Components/NameInput';
import NavBar from '../Components/NavBar';
import { UserType } from '../models/interface/User';
import { useAuth } from '../context/AuthContext';

import './UserProfile.css';
import { useState } from 'react';

const UserProfile = () => {
  // const [userConnect, setUserConnect] = useState<UserType>();

  const { currentUser } = useAuth();
  console.log('curennt user', currentUser);

  return (
    <div>
      <NavBar />
      <div className='UPpage'>
        <div className='partiePhotoUP'>
          <img
            className='PhotoProfileUser'
            src='/assets/dragon.jpg'
            alt='dragon'
          />
        </div>
        <div className='partieTextUP'>
          <div className='bandeauBonjour'>Bonjour {currentUser?.name}</div>
        </div>
      </div>
      <div className='partieMesInfosUP'>
        <div className='partieMesInfos'>Mes infos:</div>
        <div className='monMailUP'>
          <strong className='monmail'> Mon mail :</strong> {currentUser?.email}
        </div>
        <div className='monNomUP'>
          <strong>Mon pseudo :</strong> {currentUser?.name}
        </div>
        <div className='updateProfile'>
          Pour modifier votre pseudo, veuillez le saisir dans le champs:
          {/* <Link to={'/user/up/profile'}>📝</Link> */}
        </div>
        <NameInput />
      </div>
    </div>
  );
};

export default UserProfile;
