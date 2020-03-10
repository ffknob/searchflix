export default interface BackendResponse<T> {
  id?: string;
  success: boolean;
  message?: string;
  errors?: Array<Error>;
  data?: T;
}
