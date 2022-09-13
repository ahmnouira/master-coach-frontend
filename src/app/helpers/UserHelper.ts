import { User } from '../models/user-model';
import { getDisplayName } from './methods/getDisplayName';
import { getPhoto } from './methods/getPhoto';

export interface IUserHelper  {
  photo: string 
  displayName: string
  path?: string 
  init(user: User, path?: string): void
}

export class UserHelper implements IUserHelper {
  photo: string;
  path: string;
  displayName: string
  private userData: User;

   public init(user: User, path?: string) {
    this.userData = user;
    this.path = path;
    this.displayName = getDisplayName(user)
    this.photo = getPhoto(user)
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
