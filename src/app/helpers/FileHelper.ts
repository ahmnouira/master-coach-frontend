import { environment } from 'src/environments/environment';

export class FileHelper {
  static getUrl(url: string | File): string {
    if (!url || typeof url !== 'string') {
      return '';
    } else {
      if (url.startsWith(environment.apiUrl + '/uploads'))
        return new URL(url).href;
      else return new URL(environment.apiUrl + '/uploads' + url).href;
    }
  }

  static formatName(name: string) {
    if (!name) {
      return name;
    }
    return name.toLowerCase().trim().replace(/\s/g, '-');
  }

  static getFileName(label: string, url: string): string {
    if (!label && !url) {
      return '';
    }
    return (
      this.formatName(label) + '-' +
      this.formatName(url.substring(url.indexOf('-') + 1)).replace(/%20/g, '-')
    );
  }
}
