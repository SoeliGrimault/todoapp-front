import { AxiosResponse } from 'axios';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPrivate from '../api/useAxiosPrivate';
import { useAuth } from '../context/AuthContext';
import './NameInput.css';

export const NameInput = () => {
  // const navigate = useNavigate();
  //-------------------------------------Contexte User Connecté--------------------------------------------------------//

  const { currentUser, setCurrentUser } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  //---------------------------------------useRef permets de recupérer les valeurs des données entrantes---------------------//

  const nameElement = useRef<HTMLInputElement>(null);

  //--------------------------- Usestate pour set nouvelle valeur du User ---------------------------------------------------//
  const [userUpdate, setUserUpdate] = useState<string | null>(null);

  //--------------------------- Requête Axios Update pour mise à jour du Nickname  User ---------------------------------------//
  const handleClickName = async (
    e: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    // let testing = [...document.getElementsByClassName('.modifNameInput')];
    // testing.map((testAgain) => testAgain.in
    // input.placeholder = "");

    const newName = nameElement.current?.value;

    if (newName) {
      axiosPrivate
        .patch(`/user/${currentUser?.email}`, {
          name: newName,
        })
        .then((response: AxiosResponse) => {
          console.log("Réponse de la récupération valeur d'un user", response);
          currentUser &&
            setCurrentUser({
              ...currentUser,
              name: newName,
            });
          setUserUpdate(`Mise à jour réussi `);
          setTimeout(() => {
            setUserUpdate('');
          }, 5000);
          // window.location.reload();
          if (nameElement.current) {
            console.log('est ce que je rentre dedans');
            nameElement.current.value = '';
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      {userUpdate && (
        <div className='alert alert-success' role='alert'>
          {userUpdate}
        </div>
      )}

      <input
        type='text'
        className='modifNameInput'
        placeholder='Tapez votre nouveau pseudo'
        ref={nameElement}
      />
      <Link to={'user/profile'}>
        <button className='boutonModifierName' onClick={handleClickName}>
          modifier
        </button>
      </Link>
    </div>
  );
};
export default NameInput;

// import { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import useAxiosPrivate from '../api/useAxiosPrivate';
// import { AxiosResponse } from 'axios';
// import './NameInput.css';

// const NameInput = () => {
//   const { currentUser } = useAuth();
//   const axiosPrivate = useAxiosPrivate();
//   const [newName, setNewName] = useState<string>('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newName.trim()) {
//       axiosPrivate
//         .patch(`/user/${currentUser?.email}`, { name: newName.trim() })
//         .then((response: AxiosResponse) => {
//           console.log("Réponse de la modification d'un user", response);
//           window.location.reload();
//         })
//         .catch((error) => console.log(error));
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className='nameInputForm'>
//       <input
//         type='text'
//         value={newName}
//         onChange={(e) => setNewName(e.target.value)}
//         placeholder='Nouveau nom'
//         className='nameInput'
//       />
//       <button type='submit' className='submitButton'>
//         Modifier
//       </button>
//     </form>
//   );
// };

// export default NameInput;
