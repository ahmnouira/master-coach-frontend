import { environment } from 'src/environments/environment';

export class FileHelper {
  static getUrl(url: string): string {
    if (!url) {
      return '';
    } else {
      if (url.startsWith(environment.apiUrl + '/uploads'))
        return new URL(url).href;
      else return new URL(environment.apiUrl + '/uploads' + url).href;
    }
  }

  static formatName(name: string) {
    if (name) {
      return name.toLowerCase().trim().replace(/\s/g, '-');
    }
    return name;
  }

  static getFileName(label: string, url: string): string {
    console.log('LABEL', label, url);

    if (!label && !url) {
      return '';
    }
    return (
      label.toLowerCase().trim().replace(/\s/g, '-') +
      url.substring(url.lastIndexOf('-'))
    );
  }
}
