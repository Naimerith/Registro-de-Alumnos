import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServiciosService } from "src/app/service/servicios.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistroA } from 'src/app/interface/registro.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit {
  registros: RegistroA[] = [];
  titulo = 'Crear nuevo Registro'
  id: string | undefined;
  // @Output() newEvent = new EventEmitter<string>();

  registroAlumno = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    fechaNac: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required])
  })
  constructor(private registroService: ServiciosService, private router: Router) { }


  ngOnInit(): void {
    this.registroService.obtenerRegistroEditado().subscribe(data => {
      console.log(data);
      this.id = data.id;
      this.titulo = 'Editar registro'
      this.registroAlumno.patchValue({
        nombre: data.nombre,
        apellido: data.apellido,
        fechaNac: data.fechaNac,
        dni: data.dni,
        telefono: data.telefono
      })
    })
  }

  resetForm() {
    this.registroAlumno.reset();
  }

  guardarRegistro() {
    if (this.id === undefined) {
      this.agregarRegistro() //creo registro nuevo
    } else {
      this.editarRegistro(this.id) //edito el registro
    }
  }

  editarRegistro(id: string) {
    const registro: RegistroA = {
      nombre: this.registroAlumno.value.nombre,
      apellido: this.registroAlumno.value.apellido,
      fechaNac: this.registroAlumno.value.fechaNac,
      dni: this.registroAlumno.value.dni,
      telefono: this.registroAlumno.value.telefono
    }
    this.registroService.editarRegistro(id, registro).then(() => {
      this.titulo = 'Crear nuevo Registro';
      this.id = undefined;
      this.resetForm();
      Swal.fire({
        icon: 'success',
        title: 'Yeah...',
        text: 'Se ha editado el registro!'
      })
      this.router.navigate(['/'])
      this.resetForm()
      console.log('Se edito correctamente');
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo editar el registro!',
      })
      console.log(error, 'Hubo un error editando');
    });
  }

  agregarRegistro() {
    const registro: RegistroA = {
      nombre: this.registroAlumno.value.nombre,
      apellido: this.registroAlumno.value.apellido,
      fechaNac: this.registroAlumno.value.fechaNac,
      dni: this.registroAlumno.value.dni,
      telefono: this.registroAlumno.value.telefono
    }
    console.log(registro)
    this.registroService.guardarRegistro(registro).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Yeah...',
        text: 'Registrado satisfactoriamente!'
      })
      this.router.navigate(['/'])
      this.resetForm()
      console.log('Se registro correctamente');
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error en el registro!',
      })
      console.log(error, 'Hubo un error');
    });
  }



}
