import { NgForm } from '@angular/forms';
import { BasicHelper } from './BasicHelper';
import { FileHelper } from './FileHelper';

export class FormHelper extends BasicHelper {
  /**
   * @description button is submitting
   */
  isSubmitting = false;
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

  f: NgForm;

  getFormData(form: any): FormData {
    let formData = new FormData();
    for (const key in form) {
      if (Array.isArray(form[key])) {
        console.log('array', key, form[key]);
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

  handleSeverResponse(res) {
    if (!res.success) {
      this.onError(res.error);
      return;
    }
    this.onSuccess();
  }

  onError(error: any) {
    if (error) {
      console.error('onError:', error);
      this.error = error;
    }
    this.isSubmitting = false;
    this.success = false;
    this.isLoading = false;
  }

  onSuccess(cb?: Function) {
    this.isSubmitting = false;
    this.success = true;
    this.error = '';
    setTimeout(() => {
      this.success = false;
      cb();
    }, 3000);
  }
}
