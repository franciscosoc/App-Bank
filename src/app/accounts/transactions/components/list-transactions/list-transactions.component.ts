import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { TransactionsService } from '../../services/transactions.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common'


@Component({
  selector: 'app-list-transactions',
  templateUrl: './list-transactions.component.html',
  styleUrls: ['./list-transactions.component.css']
})
export class ListTransactionsComponent implements OnInit {

  transactions:Transaction[]=[];
  cuentaOrigenId: number;

  constructor(private transactionsService: TransactionsService,
     private activatedRoute: ActivatedRoute,
    private router: Router,
    private location:Location
    ) { }


  ngOnInit(): void {


    this.cuentaOrigenId = this.activatedRoute.snapshot.params['cuentaOrigenId'];
    this.listarTransactions(this.cuentaOrigenId);


  }

  listarTransactions(cuentaOrigenId: number ): void {
    console.log("pruebaTransacctions" + this.cuentaOrigenId)
   this.transactionsService.listar(this.cuentaOrigenId).subscribe(

    resp => {

      this.transactions = resp;

    },

    er => {

      alert(er.error)


    }

   )

  }


  volver(): void {

      this.location.back()


  }

}
