import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '../../models/transaction';
import { TransactionsService } from '../../services/transactions.service';
import {Location} from '@angular/common'

@Component({
  selector: 'app-create-consign',
  templateUrl: './create-consign.component.html',
  styleUrls: ['./create-consign.component.css']
})
export class CreateConsignComponent implements OnInit {
  //DEFINIMOS UNA ENTIDAD
  public transaction: Transaction= new Transaction()
  public cuentaOrigenId: number
  public clienteId: number

  constructor(private transactionService:TransactionsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location:Location

    ) { }

  ngOnInit(): void {

    this.clienteId = this.activatedRoute.snapshot.params['clienteId']
    this.cuentaOrigenId = this.activatedRoute.snapshot.params['cuentaOrigenId'];

  }

  consignar(): void {
      this.transaction.tipoOperacion = 'consignacion'
      this.transaction.tipoMovimiento = 'CREDITO'
      this.transaction.cuentaDestino = this.cuentaOrigenId
      this.transactionService.crearTransaccion(this.transaction).subscribe(
        resp => {
         // this.transaction = resp;
         this.router.navigate([ '/listCuentas/' + this.clienteId + '/listTransactions/' + this.cuentaOrigenId + '' , ]);
        },
          error => {
            alert(error.error()
            )
          }
      )
  }
    volver(): void {
      this.location.back()
    }
}
