import { Account } from '../../accounts/models/account';
import { Region } from './region';

  export class Customer {


    id?:number;

	  nroIdentificacion?:string;

	  nombres? :string;

	  apellidos?:string;

	  tipodocumento?:string;

	  email?:string;

	  fechaCreacion?:string;

	  fechaNacimiento?:string;

    foto?:string;

    accounts: Array<Account> = [];

    region: Region;


  }
