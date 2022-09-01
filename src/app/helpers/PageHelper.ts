import { Observable } from 'rxjs';

interface Response<T = any> {
  success: boolean;
  error: any;
  data: T;
}

interface GetDataOptions {
  onSuccess?: Function;
  debug?: boolean;
  format?: Format;
}
type Format = 'json' | 'txt';

export class PageHelper<T = any> {
  /**
   * @description success from the server
   */
  success = false;
  /**
   * @description page is loading
   */
  isLoading = true;

  /**
   * @description error from the server
   */
  error = '';

  /**
   * @description found data
   */
  found: boolean;

  /**
   * @description represent the data returned
   */
  data: T;

  /**
   *
   * @param method the service method to call
   * @param options
   * @returns
   */
  getData(
    method: Observable<any>,
    options: GetDataOptions = {
      debug: false,
      format: 'json',
    }
  ) {
    return method.pipe().subscribe(
      (res) => {
        this.handleSeverResponse(res);
        this.onSuccess(options.onSuccess);
        if (options.debug) {
          this.info(options.format);
        }
      },
      (error) => {
        this.onError(error);
      }
    );
  }

  private info(format: Format) {
    if (format === 'txt') {
      console.log(
        'success:',
        this.success,
        'isLoading:',
        this.isLoading,

        'isFound:',
        this.found,

        'error: ',
        this.error,
        'data:',
        this.data
      );
    } else {
      console.log('info:', {
        success: this.success,
        Loading: this.isLoading,
        found: this.found,
        error: this.error,
        data: this.data,
      });
    }
  }

  private handleSeverResponse(res: Response<T>) {
    if (!res.success) {
      this.onError(res.error);
      return;
    }
    this.data = res.data;
    this.found = Array.isArray(res.data) ? Boolean(res.data.length) : true;
  }

  private onError(error: any) {
    if (error) {
      console.error('onError:', error);
      this.error = error;
    }
    this.found = false;
    this.success = false;
    this.isLoading = false;
  }

  private onSuccess(cb?: Function) {
    this.success = true;
    this.error = '';
    this.isLoading = false;
    setTimeout(() => {
      this.success = false;
      if (cb) cb();
    }, 3000);
  }
}
