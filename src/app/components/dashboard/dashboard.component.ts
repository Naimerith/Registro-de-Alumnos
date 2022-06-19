import { Component, OnInit, Input } from '@angular/core';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import { RegistroA } from 'src/app/interface/registro.interface';
import { ServiciosService } from "src/app/service/servicios.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  registros: RegistroA[] = []
  faPlus = faPlus;
  edit = faPen;


  constructor(private registroService: ServiciosService) { }

  ngOnInit(): void {
    this.obtenerRegistroAlumnos()
  }

  obtenerRegistroAlumnos() {
    this.registroService.obtenerRegistros().subscribe(doc => {
      // console.log(doc)
      this.registros = [];
      doc.forEach((el: any) => {
        this.registros.push({
          id: el.payload.doc.id,
          ...el.payload.doc.data()
        })
      });
    })
  }

  editarRegistroA(registro: RegistroA) {
    this.registroService.agregarRegistroEditado(registro)
  }

}


