// Fonction qui gère le message d'erreur selon la clé

export const errorInfo = (key: string): string => {
  let message = '';

  switch (key) {
    case 'email':
      message = "Format d'email invalide. ex: jean.dupont@mail.com";
      break;
    case 'password':
      message = 'Format du mot de passe invalide';
      break;
    case 'name':
      message = 'Le nom doit forcément commencer et terminer par une lettre';
      break;
  }
  console.log('error message : ', message);
  return message;
};
