import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
    getItem<T = string>(key: string): T {
      return JSON.parse(localStorage.getItem(key)) as T;
    }
  
    setItem<T>(key: string, value: string | T) {
      if (typeof value === 'string') return localStorage.setItem(key, value);
      return localStorage.setItem(key, JSON.stringify(value));
    }
  
    clearAll() {
      return localStorage.clear();
    }
  
    clearItem(key: string) {
      return localStorage.removeItem(key);
    }
}
