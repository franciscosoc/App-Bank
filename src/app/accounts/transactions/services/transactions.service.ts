import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {


  Url = 'http://localhost:8079/movimientos'

  constructor(private httpClient: HttpClient) {}

 public listar(cuentaOrigenId: number):Observable<Transaction[]> {

  return this.httpClient.get<Transaction[]>(this.Url + '/' + `${cuentaOrigenId}`);

 }


 public crearTransaccion(transaction: Transaction):Observable<Transaction> {

      return this.httpClient.post<Transaction>(this.Url , transaction)

 }

}
