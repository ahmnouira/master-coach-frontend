import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseHelper } from './BaseHelper';

interface SubmitDataOptions {
  onSuccess?: Function;
  debug?: boolean;
  format?: Format;
}
type Format = 'json' | 'txt';

export abstract class FormSimpleHelper extends BaseHelper {
  /**
   * @description button is submitting
   */
  isSubmitting = false;

  f: NgForm;

  abstract form: any;

  /** TODO: check this if it works **/
  handleSubmit(f: NgForm) {
    // console.log('f', f.errors);
    this.f = f;
  }

  abstract submit(): void;

  submitData(
    method: Observable<any>,
    requiredFields: object,
    options?: SubmitDataOptions
  ) {
    this.isSubmitting = true;
    this.error = '';
    for (const key in requiredFields) {
      if (!requiredFields[key]) {
        // this.onError(`${key} is required`);
        this.onError();
        return;
      }
      method.subscribe(
        (res) => {
          this.handleSeverResponse(res);
          if (options) {
            this.onSuccess(options.onSuccess);
            this.info(options.format);
          } else {
            this.onSuccess();
          }
        },
        (error) => {
          this.onError(error);
        }
      );
    }
  }

  private info(format: Format) {
    if (format === 'txt') {
      console.log(
        'success:',
        this.success,
        'isLoading:',
        this.isLoading,
        'isSubmitting:',
        this.error,
        'f:',
        this.f,
        'form',
        this.form
      );
    } else {
      console.log('info:', {
        success: this.success,
        Loading: this.isLoading,
        isSubmitting: this.isSubmitting,
        error: this.error,
        f: this.f,
        form: this.form,
      });
    }
  }

  private handleSeverResponse(res: any) {
    const error = res.error || res.err;
    if (error) {
      this.onError(error);
      return;
    }
  }

  protected override onError(error?: any) {
    if (error) {
      // console.error(error);
      this.error = error;
    }
    this.isSubmitting = false;
    this.success = false;
    this.isLoading = false;
  }

  protected override onSuccess(cb?: Function) {
    this.isSubmitting = false;
    this.success = true;
    this.error = '';

    this.isLoading = false;

    if (cb) {
      cb();
    }
  }
}
