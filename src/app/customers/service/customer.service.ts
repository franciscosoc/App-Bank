import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { HttpClient, HttpHeaders,HttpRequest,HttpEvent } from '@angular/common/http';
import { of,Observable, catchError, throwError } from 'rxjs'
import { ThisReceiver } from '@angular/compiler';
import { map } from 'rxjs';
import swal from 'sweetalert2';
import { Region } from '../models/region';


//injectable representa logica de negocio, es para clases de servicio
  //se puede inyectar a otros componentes.

@Injectable({

  providedIn: 'root'
})
export class CustomerService {

  customer: Customer[]=[]

  public urlEndpoint: string = 'http://localhost:8079/customers'

  constructor( private http:HttpClient) { }


  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndpoint + '/regiones');
  }

  //atributo  con las cabeceras
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  getCustomers(): Observable<Customer[]>{

    return this.http.get<Customer[]>
    (this.urlEndpoint);
  }


  //crear cliente

    create(customer:Customer) : Observable<Customer> {

    return this.http.post<Customer>(this.urlEndpoint, customer, {headers: this.httpHeaders})



  }


    getCustomer(id:any): Observable<Customer> {

    return this.http.get<Customer>(`${this.urlEndpoint}/${id}`)


  }

  update(customer: Customer): Observable<Customer> {

  return this.http.put<Customer>(`${this.urlEndpoint}/${customer.id}`, customer, {headers: this.httpHeaders})



}



  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {

  let formData = new FormData();
  formData.append("archivo", archivo);
  formData.append("id", id);


  const req = new HttpRequest('POST', `${this.urlEndpoint}/upload`, formData, {

    reportProgress: true

  });



  return this.http.request(req);



}


  delete(id: number): Observable<Customer> {

  return this.http.delete<Customer>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders})




}


}
