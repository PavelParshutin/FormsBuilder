
export interface Styles {
   generalStyle?: { [key: string]: string }
   btnStyle?: { [key: string]: string }
   inputTextStyle?: { [key: string]: string }
   checkboxStyles?: { [key: string]: string }
   labelStyles?: { [key: string]: string }
   selectStyles?: { [key: string]: string }
   textareaStyles?: { [key: string]: string }
   newComponents?: NewComponent[]
}

export interface NewComponent {
    id?: string | number;
    title?: string;
    style?: { [key: string]: string };
    anotherProperties?: any;
 }

export interface User {
  id?: string;
  email: string;
  password: string;
 }

export interface AuthResponse {
  accessToken: string;
 }

export interface Error {
  code: string;
  message: string;
}

export interface Response {
  token: AuthResponse;
  error: Error;
  isAuth: boolean;
}
