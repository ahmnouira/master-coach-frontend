import { User } from '../models/user-model';
import { FileHelper } from './FileHelper';

export class UserHelper {
  photo: string;
  path: string;
  displayName: string
  private userData: User;


  public init(user: User, path?: string) {
    this.userData = user;
    this.path = path;
    this.getDisplayName()
    this.getPhoto();
  }

  private getDisplayName() {
    if(!this.userData) {
      this.displayName = ''
      return
    }
    if(this.userData.prenom && this.userData.nom) {
      this.displayName =  `${this.userData.nom} ${this.userData.prenom}`
    } else if (this.userData.username) {
      this.displayName  = this.userData.username  
    } else  {
      this.displayName  = this.userData.email
    }
  }


  private getPhoto() {
    if (this.userData && this.userData.photo) {
      this.photo = FileHelper.getUrl(this.userData.photo);
    }  else {
      // fallback avatar 
      this.photo = '/assets/img/common/utilisateur.png';
    }
  }

  public getCompetences(): string {
    const array = this.getExpertise('category');
    if (!array.length) {
      return '';
    }
    return array.join(' - ');
  }

  public getExpertise(
    key: 'category' | 'accreditation' | 'competance'
  ): string[] {
    if (!Array.isArray(this.userData[key])) {
      return [];
    }
    try {
      const parsedArray = JSON.parse(this.userData[key].toString()) as any[];
      return parsedArray.map((el) => el.name);
    } catch (error) {
      return [];
    }
  }
}
