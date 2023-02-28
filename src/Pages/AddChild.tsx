import { AxiosResponse } from 'axios';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../api/useAxiosPrivate';
import NavBar from '../Components/NavBar';
import { useAuth } from '../context/AuthContext';
import { ChildrenType } from '../models/interface/Children';

const AddChild = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  //---------------------------------------useRef permets de recupérer les valeurs des données entrantes---------------------//

  const nameChild = useRef<HTMLInputElement>(null);
  const [childcreate, setChildCreate] = useState<ChildrenType | null>(null);

  const handleClickNameChild = async (
    e: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    console.log(nameChild.current?.value);
    const newNameChild = nameChild.current?.value;

    if (newNameChild) {
      axiosPrivate
        .post(`/children/`, {
          name: newNameChild,
          parent: currentUser?.id,
        })
        .then((response: AxiosResponse) => {
          currentUser &&
            currentUser.children &&
            setCurrentUser({
              ...currentUser,
              children: [...currentUser.children, response.data],
            });

          console.log(
            "Réponse de la récupération valeur d'un enfant",
            response
          );
          let child = response.data;
          setChildCreate(child);
          console.log('mon child usestate', childcreate);
          console.log('mon test', child);
          console.log('la reponse de ma requete', response.data);
          navigate('/user/profile');
          // window.location.reload();
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <NavBar />
      <input
        type='text'
        className='modifNameInput'
        placeholder='Tapez le nom de l enfant'
        ref={nameChild}
      />

      <button className='boutonModifierName' onClick={handleClickNameChild}>
        valider
      </button>
    </>
  );
};
export default AddChild;
