import { IUser } from 'src/app/interfaces/user-interface';

export function getDisplayName(user: IUser): string {
  let name = '';
  if (!user) {
    return name;
  }
  if (user.prenom && user.nom) {
    name = `${user.nom} ${user.prenom}`;
  } else if (user.username) {
    name = user.username;
  } else {
    name = user.email;
  }
  return name;
}
