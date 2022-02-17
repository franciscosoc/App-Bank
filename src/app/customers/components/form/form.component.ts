import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../service/customer.service';
import { Router,ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Region } from '../../models/region';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',

})

export class FormComponent implements OnInit {


  public customer:Customer = new Customer();
  public regiones:Region[];
  public titulo:string = "Crear cliente"

  datosIdentificacion = ['Cedula Ciudadanía','Tarjeta de Identidad','Pasaporte','Cédula Extranjera']

  //docSeleccionado: string;

  constructor(private customerService:CustomerService, private router: Router, private activateRouter:ActivatedRoute) { }

  ngOnInit(): void {

    this.cargarCustomer()
  }


  cargarCustomer(): void{

    this.activateRouter.params.subscribe(params => {

      let id = params['id']

      if(id){

        this.customerService.getCustomer(id).subscribe(

            (customer) => this.customer = customer)


      }

    });


  //this.customerService.getRegiones().subscribe(regiones => this.regiones = regiones);

  }



  public create():void{

    console.log(this.customer)
    this.customerService.create(this.customer).subscribe(

        customer => {

        this.router.navigate(['/customers'])

        swal.fire('Cliente guardado', `Cliente ${customer.nombres} creado con exito`, 'success')

      }
      );
  }

    update():void{

      console.log(this.customer)

    this.customerService.update(this.customer).subscribe(

        customer => {
          console.log(this.customer)
        //this.router.navigate(['/customers'])

        swal.fire('Cliente actualizado', `Cliente ${customer.nombres} actualizado con exito`, 'success')

      }
    )
}


/* compararRegion(o1: Region, o2: Region): boolean {
  if (o1 === undefined && o2 === undefined) {
    return true;
  }

  return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
} */

comparar(item1:any, item2:any) {
  return item1 && item2 ? item1 === item2 : item1 === item2;
}

}


