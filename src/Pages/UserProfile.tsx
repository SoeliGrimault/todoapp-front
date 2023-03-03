import { Link } from 'react-router-dom';
import NameInput from '../Components/NameInput';
import NavBar from '../Components/NavBar';
import useAxiosPrivate from '../api/useAxiosPrivate';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { AxiosResponse } from 'axios';
import './UserProfile.css';
import { ChildrenType } from '../models/interface/Children';

// const UserProfile = () => {
//   const { currentUser } = useAuth();
//   const axiosPrivate = useAxiosPrivate();
//   const [userConnected, setUserConnected] = useState<UserType | null>(null);

//   useEffect(() => {
//     if (currentUser) {
//       axiosPrivate
//         .get(`/user/${currentUser.email}`)
//         .then((response: AxiosResponse) => {
//           console.log("Réponse de la récupération valeur d'un user", response);
//           setUserConnected(response.data);
//         })
//         .catch((error) => console.log(error));
//     }
//   }, [axiosPrivate, currentUser]);

//   return (
//     <div>
//       <NavBar />
//       <div className='UPpage'>
//         <div className='partiePhotoUP'>
//           <img
//             className='PhotoProfileUser'
//             src='/assets/dragon.jpg'
//             alt='dragon'
//           />
//         </div>
//         <div className='partieTextUP'>
//           <div className='bandeauBonjour'>Bonjour {userConnected?.name}</div>
//         </div>
//       </div>
//       <div className='partieMesInfosUP'>
//         <div className='partieMesInfos'>Mes infos:</div>
//         <div className='monMailUP'>
//           <strong className='monmail'> Mon mail :</strong>{' '}
//           {userConnected?.email}
//         </div>
//         <div className='monNomUP'>
//           <strong>Mon pseudo :</strong> {userConnected?.name}
//         </div>
//         <div className='updateProfile'>
//           Pour modifier votre pseudo, veuillez le saisir dans le champs:
//           {/* <Link to={'/user/up/profile'}>📝</Link> */}
//         </div>
//         <NameInput />
//       </div>
//       <div className='PourquoiAjouterEnfant'>
//         Ajoutez vos enfants ou personnes à charge vous permettra de filtrer vos
//         events et vos documents
//       </div>

//       <div className='ajouPax'>
//         {' '}
//         Ajouter une personne, cliquez ici :
//         <Link to={'/user/add/child'}>
//           <img
//             className='ajoutpax'
//             src='/assets/ajoutenfant.svg'
//             alt='allez sur ajout personne'
//           />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

const UserProfile = () => {
  const { currentUser, setCurrentUser } = useAuth();

  console.log('User Profile curennt user', currentUser);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (currentUser) {
      axiosPrivate
        .get(`/children`)
        .then((response: AxiosResponse<ChildrenType[]>) => {
          console.log('UserPRofile - Get enfants - Response : ', response.data);
          currentUser &&
            setCurrentUser({
              ...currentUser,
              children: response.data,
            });
        })
        .catch((error) => console.log(error));
    }
  }, []);

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

      <ul className='Mesenfantsamoi'>
        <strong>Mes enfants:</strong>
        {/* si il y a un utilisateur 
       && si currentUser.children
       si il y a des enfants >0.
       je fais une boucle sur mon tableau d'enfant
       et sur chaque enfant j'
       afficher leur nom. mettre leur nom
      sinon rien afficher  */}
        {currentUser &&
          currentUser.children.length > 0 &&
          currentUser.children.map((child) => (
            <li className='mesEnfantsaMoi' key={child.id}>
              {child.name}
            </li>
          ))}
      </ul>
      <div className='PourquoiAjouterEnfant'>
        Ajoutez vos enfants ou personnes à charge vous permettra de filtrer vos
        events et vos documents
      </div>

      <div className='ajoutsupPaxtext'>
        Pour ajouter ou supprimer une personne:
      </div>
      <div className='containerAjoutSupplogo'>
        <Link to={'/user/add/child'}>
          <img
            className='ajoutpaxlogo'
            src='/assets/ajoutenfant.svg'
            alt='allez sur ajout personne'
          />
        </Link>

        <Link to={'/user/supp/child'}>
          <img
            className='ajoutpaxlogo'
            src='/assets/supenfant.svg'
            alt='allez sur suppression de personne'
          />
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
