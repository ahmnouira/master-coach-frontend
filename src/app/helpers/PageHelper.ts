import { Observable } from 'rxjs';
import { ServerResponse } from '../interfaces/server-response';
import { BaseHelper } from './BaseHelper';

interface GetDataOptions {
  onSuccess?: Function;
  debug?: boolean;
  format?: Format;
  keepLoading?: boolean;
}
type Format = 'json' | 'txt';

export class PageHelper<T = any> extends BaseHelper {
  /**
   * @description found data
   */
  found: boolean;

  /**
   * @description represent the data returned
   */
  data: T;

  constructor() {
    super();
  }

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
      keepLoading: false,
      format: 'json',
    }
  ) {
    return method.pipe().subscribe(
      (res) => {
        this.handleSeverResponse(res);
        this.onSuccess(options.onSuccess, options.keepLoading);
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

        'found:',
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

  private handleSeverResponse(res: ServerResponse<T>) {
    if (!res.success) {
      this.onError(res.error);
      return;
    }
    this.data = res.data;
    this.found = Array.isArray(res.data) ? Boolean(res.data.length) : true;
  }

  protected override onError(error: any) {
    super.onError(error);
    this.found = false;
  }
}
