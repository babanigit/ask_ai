export interface IRequest {
  language: string;
  intent: string;
  input: string;
}

export interface IResponse {
  success: boolean;
  message: string;
}
