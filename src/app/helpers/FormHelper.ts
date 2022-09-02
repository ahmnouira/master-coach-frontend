import { NgForm } from '@angular/forms';
import { BasicHelper } from './BasicHelper';

export class FormHelper extends BasicHelper {
  /**
   * @description button is submitting
   */
  isSubmitting = false;
  /**
   * @description success from the server
   */

  f: NgForm;

  getFormData(form: any): FormData {
    let formData = new FormData();
    for (const key in form) {
      if (Array.isArray(form[key])) {
        // console.log('array', key, form[key]);
        formData.append(key, JSON.stringify(form[key]));
      } else {
        formData.append(key, form[key]);
      }
    }
    return formData;
  }

  /** TODO: check this if it works **/
  handleSubmit(f: NgForm) {
    // console.log('f', f.errors);
    this.f = f;
  }

  handleSeverResponse(res: any) {
    if (!res.success) {
      this.onError(res.error);
      return;
    }
    this.onSuccess();
  }

  override onError(error: any) {
    if (error) {
      console.error('onError:', error);
      this.error = error;
    }
    this.isSubmitting = false;
    this.success = false;
    this.isLoading = false;
  }

  override onSuccess(cb?: Function) {
    this.isSubmitting = false;
    this.success = true;
    this.error = '';
    setTimeout(() => {
      this.success = false;
      if (cb) {
        cb();
      }
    }, 3000);
  }
}
