import { FileHelper } from './FileHelper';

export class BasicHelper {
  getString(str: string) {
    return str || '';
  }

  getArray(array: any[]): any[] {
    if (!Array.isArray(array) || !array.length) {
      return [];
    }
    return JSON.parse(array.toString());
  }

  getFileUrl(url: any): string {
    return FileHelper.getUrl(url);
  }
}
