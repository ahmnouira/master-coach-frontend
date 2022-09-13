import { IUser } from "src/app/interfaces/user-interface";
import { FileHelper } from "../FileHelper";

export function getPhoto(user: IUser)  {
    let url = ''
    if (user && user.photo) {
      url = FileHelper.getUrl(user.photo);
    } else {
      // fallback avatar 
      url = '/assets/img/common/utilisateur.png';
    }
    return url
}