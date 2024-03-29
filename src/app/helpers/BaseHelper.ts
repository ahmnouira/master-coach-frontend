export class BaseHelper {
  /**
   * @description success from the server
   */
  success: boolean;
  /**
   * @description page is loading
   */
  isLoading: boolean;

  /**
   * @description error from the server
   */
  error: string;

  constructor() {
    this.success = false;
    this.isLoading = true;
    this.error = '';
  }

  protected onError(error: any) {
    if (error) {
      console.error(error);
      this.error = error;
    }
    this.success = false;
    this.isLoading = false;
  }

  protected onSuccess(cb?: Function, keepLoading?: boolean) {
    this.success = true;
    this.error = '';
    if (!keepLoading) {
      this.isLoading = false;
    }
    setTimeout(() => {
      this.success = false;
      if (cb) cb();
    }, 3000);
  }
}
