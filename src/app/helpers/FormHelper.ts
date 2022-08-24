import { FileHelper } from './FileHelper';

export class FormHelper {
  isSubmitting = false; // button submit
  success = false;
  isLoading = true; // page is loading
  error = '';

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
      if (key === 'photo' && form.photo) {
        if (typeof form.photo === 'string') {
          continue;
        } else {
          const file = form.photo as File;
          formData.append(key, file);
        }
        // check if its an object
      } else if (typeof form[key] === 'object') {
        formData.append(key, JSON.stringify(form[key]));
      } else {
        formData.append(key, form[key]);
      }
    }

    return formData;
  }

  onError(error: any) {
    console.error('error:', error);
    this.error = error;
    this.isSubmitting = false;
    this.success = false;
    this.isLoading = false;
  }

  onSuccess() {
    this.isSubmitting = false;
    this.success = true;
    this.error = '';
    setTimeout(() => {
      this.success = false;
    }, 3000);
  }
}
