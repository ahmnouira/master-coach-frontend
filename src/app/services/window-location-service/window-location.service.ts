import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowLocationService {
  constructor() {}

  reload(): void {
    window.location.reload();
  }

  replace(url: string) {
    window.location.replace(url);
  }

  set url(url: string) {
    window.location.href = url;
  }

  get url() {
    return window.location.href;
  }

  info(): void {
    const { hash, hostname, port, search, protocol } = window.location;
    console.log(
      'hash',
      hash,
      'hostname',
      hostname,
      'port',
      port,
      'search',
      search,
      'protocol',
      protocol
    );
  }
}
