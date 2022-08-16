import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationBehaviorOptions,
  NavigationExtras,
  Router,
  UrlTree,
} from '@angular/router';
import { SessionStorageService } from '../session-storage-service/session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RouteService extends SessionStorageService {
  private token = '';

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private titleService: Title
  ) {
    super()
    // this.getTokenFormRoute();
  }

  public setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }

  public navigateByUrl(
    url: string | UrlTree,
    extras?: NavigationBehaviorOptions
  ) {
    return this.router.navigateByUrl(url, extras);
  }

  public navigate(
    paths: string[],
    extras?: NavigationExtras
  ): Promise<boolean> {
    return this.router.navigate(paths, extras);
  }

  public saveRoute(name: string) {
    this.setItem("navigation", name)
  }

  public get getToken(): string {
    this.getTokenFormRoute();
    return this.token;
  }

  private getTokenFormRoute() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      console.log('params', params.get('token'));
      //this.paramsObject = { ...params.keys, ...params };
      this.token = params.get('token');
    });
  }
}
