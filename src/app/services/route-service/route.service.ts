import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationBehaviorOptions,
  NavigationExtras,
  ParamMap,
  Router,
  UrlTree,
} from '@angular/router';
import { SessionStorageService } from '../session-storage-service/session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RouteService extends SessionStorageService {
  private token = '';
  private params: any;
  constructor(
    public router: Router,
    public location: Location,
    private titleService: Title, 
    public activatedRoute: ActivatedRoute,
  ) {
    super();
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

  public redirectTo(uri: string) {
    // this.back()
    this.navigateByUrl(uri, { replaceUrl: true });
  }

  public back() {
    this.location.back();
  }

  public saveRoute(name: string) {
    this.setItem('navigation', name);
  }

  public get getToken(): string {
    this.getTokenFormRoute();
    return this.token;
  }

  public get getParams(): ParamMap {
    this.getParamsFromRoute();
    return this.params.params as ParamMap;
  }

  private getParamsFromRoute() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.params = params;
    });
  }




  private getTokenFormRoute() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      console.log('params', params.get('token'));
      //this.paramsObject = { ...params.keys, ...params };
      this.token = params.get('token');
    });
  }
}
