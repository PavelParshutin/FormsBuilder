export interface Styles {
   btnStyle?: {[key: string]: string}
   inputTextStyle?: {[key: string]: string}
   checboxStyles?: {[key: string]: string}
   labelStyles?: {[key: string]: string}
   selectStyles?: {[key: string]: string}
   textareatStyles?: {[key: string]: string}
   newComponents?: [{
     id?: string,
     tittle?: string;
     styles?: any;
   }]
}
export interface Component{
  components: [{
    id?: string,
    tittle?: string;
    styles?: any;
  }]
 }
