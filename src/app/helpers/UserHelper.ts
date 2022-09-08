import { User } from "../models/user-model";
import { FileHelper } from "./FileHelper";

export class UserHelper {

    photo: string
    user: User

    constructor(user?: User) {
            this.init(user)
    }

    public init(user: User) {
        this.user = user
        this.getPhoto()
    }


    private getPhoto() {
        if (this.user && this.user.photo) {
          this.photo = FileHelper.getUrl(this.user.photo);
        }
      }


   public getCompetences(): string {
        const array = this.getExpertise('category');
        if (!array.length) {
          return '';
        }
        return array.join(' - ');
      }
    
    
    
      public getExpertise(key: 'category' | 'accreditation' | 'competance'): string[] {
        if (!Array.isArray(this.user[key])) {
          return [];
        }
        try {
          const parsedArray = JSON.parse(this.user[key].toString()) as any[];
          return parsedArray.map((el) => el.name);
        } catch (error) {
          return [];
        }
      }
}