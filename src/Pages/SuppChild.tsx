import { useAuth } from '../context/AuthContext';
import useAxiosPrivate from '../api/useAxiosPrivate';
import { useEffect, useRef, useState } from 'react';
import { AxiosResponse } from 'axios';
import { ChildrenType } from '../models/interface/Children';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';

import './SuppChild.css';

const SuppChild = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (currentUser) {
      axiosPrivate
        .get(`/children`)
        .then((response: AxiosResponse<ChildrenType[]>) => {
          console.log('SuppEnfant - Get enfants - Response : ', response.data);
          currentUser &&
            setCurrentUser({
              ...currentUser,
              children: response.data,
            });
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const handleDeleteChild = async (childToDelete: ChildrenType) => {
    axiosPrivate
      .delete(`/children/${childToDelete.id}`)
      .then((response: AxiosResponse<string>) => {
        // recupere mon tableau d'eznfant et le filtrer
        // je veux trouver l'enfant a supprimer.
        //je veux retirer l'enfant avec l'id que j'ai selectionner
        const tableauChildRestant = currentUser!.children.filter(
          (child) => child.id !== childToDelete.id
        );

        currentUser &&
          currentUser.children &&
          setCurrentUser({
            ...currentUser,
            children: tableauChildRestant,
          });

        console.log('la reponse de ma requete', response.data);
      })
      .catch((error) => console.log(error));
  };
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    try {
      const response: AxiosResponse<string> = await axiosPrivate.delete(
        `/user/${currentUser?.email}`
      );
      console.log('supp child  - Delete User - Response: ', response.data);
      // On met à jour le state des users pour lancer un rerender du dashboard et avoir la liste rafraichie des users
      setCurrentUser(null);
      navigate('/inscription');
    } catch (error) {
      console.log('Admin Interface - Delete User - Error : ', error);
    }
  };

  return (
    <section className='pageSuppChild'>
      <NavBar />
      <h1> Cliquez sur le bouton de la personne a supprimer.</h1>

      <div className='MesEnfantsASup'>
        {currentUser &&
          currentUser.children.length > 0 &&
          currentUser.children.map((child) => (
            <button
              className='butonton'
              onClick={() => handleDeleteChild(child)}
              key={child.id}
            >
              {child.name}
            </button>
          ))}
      </div>
      <div className='divSupCompte'>
        <div className='supprimerCompte'> Supprimer votre compte</div>

        <button className='supprimerMonCompte' onClick={handleDeleteUser}>
          supprimer
        </button>
      </div>

      <div className='retourALaHome'>
        <div> Retour sur ma HOME Page</div>
        <Link to={'/user/interface'}>
          <img
            className='retourHome'
            src='/assets/homeAlone.svg'
            alt='allez a la page home'
          />
        </Link>
      </div>
    </section>
  );
};

export default SuppChild;
