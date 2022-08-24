import { environment } from 'src/environments/environment';

export class Picture {
  static getUrl(image: any): string {
    if (typeof image === 'string')
      return environment.apiUrl + '/uploads' + image;
    return ''; // by default
  }

  static formatName(name: string) {
    if (name) {
      return name.toLowerCase().trim().replace(/\s/g, '-');
    }
    return name;
  }
}
