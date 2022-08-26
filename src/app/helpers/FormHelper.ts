import { NgForm } from '@angular/forms';
import { FileHelper } from './FileHelper';

export class FormHelper {
  isSubmitting = false; // button submit
  success = false;
  isLoading = true; // page is loading
  error = '';

  f: NgForm;

  getString(str: string) {
    return str || '';
  }

  getArray(array: any[]): any[] {
    return JSON.parse(array?.toString()) || [];
  }

  getFileUrl(url: any): string {
    return FileHelper.getUrl(url);
  }

  getFormData(form: any): FormData {
    let formData = new FormData();
    for (const key in form) {
      if (Array.isArray(form[key])) {
        // multi files remove
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
