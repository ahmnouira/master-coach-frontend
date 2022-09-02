export interface ServerResponse<T = any> {
    success: boolean;
    error: any;
    data: T;
  }