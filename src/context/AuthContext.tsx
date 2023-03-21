import jwtDecode from 'jwt-decode';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../models/interface/User';

interface UserContextType {
  currentUser: UserType | null;
  setCurrentUser: (user: UserType | null) => void;
  checkLogin: () => void;
  authLoading: boolean;
  setAuthLoading: (isLoading: boolean) => void;
  handleLogout: () => void;
}
export interface DecodedTokenType {
  user: UserType;
  exp: number;
  iat: number;
}

// On crée le context en le typant grâce à l'interface EN PREMIER et pour le typer on creer l'interface ligne 12/
const CurrentUserContext = createContext<UserContextType | null>(null);

export const useAuth = () => {
  let context = useContext(CurrentUserContext);
  if (!context) {
    throw Error(
      'children must be inside the provider otherwise it wont function correctly'
    );
  }
  return context;
};

interface ProviderProps {
  children: ReactNode;
}

const CurrentUserProvider = ({ children }: ProviderProps) => {
  // State qui récupère le user connecté pour pouvoir le partager dans toute l'appli grâce au context.
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  // Par défaut, l'authentification est set à true pour dire qu'elle est en cours. Elle n'est passée à false qu'en fin de checklogin.
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  // fonction qui récupère l'accesToken dans le local storage, vérifie s'il est expiré ou non et met à jour le currentUser si tout est ok.
  const checkLogin = () => {
    const accessToken = localStorage.getItem('accessToken');
    // setAuthLoading(true);

    if (accessToken) {
      const decodedToken: DecodedTokenType = jwtDecode(accessToken);
      console.log('Auth Context - jwt decodé : ', decodedToken);

      const { user, exp } = decodedToken;
      const isTokenExpired = exp - Date.now() / 1000 < 0;
      if (isTokenExpired) {
        console.log(
          'Auth Context - Token expiré, redirection vers page de connexion'
        );
        setCurrentUser(null);
        localStorage.removeItem('accessToken');
        navigate('/connexion');
      } else {
        console.log('Auth user à jour : ', user);
        const userWithChildren = { ...user, children: [] };
        setCurrentUser(userWithChildren);
      }
      setAuthLoading(false);
      console.log('AuthContext après requetes: ', authLoading);
    } else {
      console.log('Auth Context - No token');
      setAuthLoading(false);
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  // Si on se déconnecte, on supprime le token du localstorage, on passe le currentUser à null et on redirige vers la page de connexion
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setCurrentUser(null);

    navigate('/connexion');
    console.log('AuthContext - Logout : accessToken removed');
  };

  //fourni au provoder vrai valeur de ce que je passe.
  const stateValues = {
    currentUser,
    setCurrentUser,
    checkLogin,
    authLoading,
    setAuthLoading,
    handleLogout,
  };

  return (
    // On dit ici que le provider (la fonction qui fournit le context grâce à la prop 'value') enveloppe 'children' qui peut être n'importe quel élément. On va utiliser ce provider dans App.tsx pour envelopper toute l'application.
    <CurrentUserContext.Provider value={stateValues}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
