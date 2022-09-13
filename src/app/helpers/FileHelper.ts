import { environment } from 'src/environments/environment';

export class FileHelper {
  static getUrl(url: string | File): string {

    console.log('url', url)
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
      this.formatName(label) +
      '-' +
      this.formatName(url.substring(url.indexOf('-') + 1)).replace(/%20/g, '-')
    );
  }

  static createFile(blob: any, name: string) {
    const fileName = `master-coach-${name}`;

    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should
    var newBlob = new Blob([blob], { type: 'application/pdf' });

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    /*
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob, fileName);
            return;
        }
        */

    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    const data: string = window.URL.createObjectURL(newBlob);

    var link = document.createElement('a');
    link.href = data;
    link.download = fileName;

    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
  }
}
