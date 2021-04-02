export interface Styles {
   btnStyle?: { [key: string]: string }
   inputTextStyle?: { [key: string]: string }
   checkboxStyles?: { [key: string]: string }
   labelStyles?: { [key: string]: string }
   selectStyles?: { [key: string]: string }
   textareaStyles?: { [key: string]: string }
   newComponents?: any
   //   [{
   //   id?: string,
   //   tittle?: string;
   //   styles?: {};
   //   anotherProperties?: {};
   // }]
}
export interface Component {
  components: any
  //   [{
  //   id?: string,
  //   tittle?: string;
  //   styles?: any;
  // }]
 }

 export interface User {
  id: string;
  email: string;
  password: string;
 }

 export interface AuthResponce {

 }
