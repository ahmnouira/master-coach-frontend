import { SelectItem } from '../types/select-item.type';
import { BaseHelper } from './BaseHelper';
import { FileHelper } from './FileHelper';

export class BasicHelper extends BaseHelper {
  getString(str: string) {
    return str || '';
  }

  getArray(array: any[]): any[] {
    if (!Array.isArray(array) || !array.length) {
      return [];
    }
    try {
      return JSON.parse(array.toString());
    } catch (e) {
      // console.log('JSON Error', e)
      //[ Object Object]: error
      return [];
    }
  }

  getFileUrl(url: any): string {
    return FileHelper.getUrl(url);
  }


  getSelectItems(array: string[], from: SelectItem[]) {
    let items = []
    array.forEach((name: string) => {
      console.log(from)
    
      const obj = from.find((el) => el.name === name)
      if(obj) {
        items.push(obj)
      }
    })
    return items
  }

}
