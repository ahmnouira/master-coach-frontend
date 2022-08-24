import { environment } from 'src/environments/environment';

export class FileHelper {
  static getUrl(url: any): string {
    if (url) return environment.apiUrl + '/uploads' + url;
    return ''; // by default
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
