import axios, { AxiosResponse } from 'axios';
import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

export const UsernameInput = () => {
  // const navigate = useNavigate();
  //-------------------------------------Contexte User Connecté--------------------------------------------------------//

  const { currentUser } = useAuth();

  //---------------------------------------useRef permets de recupérer les valeurs des données entrantes---------------------//

  const nameElement = useRef<HTMLInputElement>(null);
  // const emailElement = useRef<HTMLInputElement>(null);

  //--------------------------- Usestate pour set nouvelle valeur du User ---------------------------------------------------//
  const [userUpdate, setuserUpdate] = useState<string | null>(null);

  //--------------------------- Requête Axios Update pour mise à jour du Nickname  User ---------------------------------------//
  const handleClickName = async (
    e: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    console.log(nameElement.current?.value);

    axios
      .patch(
        `http://localhost:8080/api/user/${currentUser?.email}`,
        {
          name: nameElement.current?.value,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      )

      .then((response: AxiosResponse) => {
        console.log("Réponse de la récupération valeur d'un user", response);
        setuserUpdate(`Mise à jour réussi `);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div>
        {userUpdate === null ? (
          <></>
        ) : (
          <div>
            {userUpdate && (
              <div className='alert alert-success' role='alert'>
                {userUpdate}
              </div>
            )}
          </div>
        )}
      </div>
      <div className='accordion' id='accordionExample'>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='headingOne'>
            <button
              className='accordion-button'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseOne'
              aria-expanded='true'
              aria-controls='collapseOne'
            >
              pseudo : {currentUser?.name}
            </button>
          </h2>
          <div
            id='collapseOne'
            className='accordion-collapse collapse show'
            aria-labelledby='headingOne'
            data-bs-parent='#accordionExample'
          >
            <div className='accordion-body'>
              <label htmlFor='nicknameUser'> Nouveau Pseudo</label>
              <input
                type='text'
                className='form-control'
                id='nicknameUser'
                autoComplete='new-email'
                placeholder='Tapez votre nouveau pseudo'
                ref={nameElement}
              />
            </div>
            <button onClick={handleClickName} className='btn btn-warning '>
              changer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UsernameInput;
