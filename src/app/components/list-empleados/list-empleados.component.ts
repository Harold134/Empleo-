import { EmpleadosService } from '../../services/empleados.service'
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleado: any[] = [];

  constructor(private _empleadoService: EmpleadosService) {
  }

  ngOnInit(): void {
    this.getEmpleados()
  }

  getEmpleados() {
    this._empleadoService.getEmpleados().subscribe(data => {
      this.empleado = [];
      data.forEach((element:any) =>{
      this.empleado.push({
        id: element.payload.doc.id,
        ...element.payload.doc.data()
      })
    });
      console.log(this.empleado);
    });
  }

eliminarEmpleado(id: string){
  this._empleadoService.eliminarEmpleado(id).then(() =>{
    console.log("Empleado eliminado");
  }).catch(error => {
    console.log(error);
  })
}

}
