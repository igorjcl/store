export class ApiResponse<T> {
  data: T;
  status: number;
  message: string;

  constructor(data: T, status: number, message: string) {
    (this.data = data), (this.status = status), (this.message = message);
  }
}
