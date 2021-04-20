import { ComponentType } from '@angular/cdk/overlay';

export interface Styles {
   availableStyleProperties: { [key: string]: string }
   generalStyle: { [key: string]: string }
   defaultComponentsStyle: ComponentFields[]
   newComponents: ComponentFields[],
}

export interface ComponentFields {
    id?: string | number;
    componentType: string;
    title: string;
    style: { [key: string]: string };
    anotherProperties: {};
 }

export interface DefaultComponent {
  component: ComponentType<any>
  inputs: ComponentFields
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
