// Fonction qui gère les regex en fonction de la clé récupérée

export const inputRegex = (key: string): RegExp => {
  let regex: RegExp = /.*/;
  switch (key) {
    case 'email':
      // Vérification de format standard de mail + yopmail
      regex = /^((?!yopmail\.com).)*$/;
      break;
    case 'password':
      // Dans l'ordre, vérifie si le password fait au moins 8 caractères et a au moins 1 caractère spécial, pas de retour à la ligne, 1 chiffre, 1maj et 1min
      regex =
        /(?=^.{8,}$)(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z]).+$/;
      break;
    case 'name':
      // Vérifie que le pseudo commence et termine par une lettre
      regex = /^[a-zA-ZÀ-ÿ]+.*[a-zA-ZÀ-ÿ0-9]$/;
      break;
  }
  return regex;
};
