import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { RegistroA } from '../interface/registro.interface'

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private registro$ = new Subject<any>() //comparte exactamente el mismo stream de datos con todas las subscripciones sin preocuparnos que tipo de Observable es

  constructor(private firestore: AngularFirestore) { }

  guardarRegistro(registro: RegistroA): Promise<any> {
    return this.firestore.collection('registroAlumno').add(registro)
  }

  obtenerRegistros(): Observable<any> {
    return this.firestore.collection('registroAlumno', ref => ref.orderBy('nombre')).snapshotChanges()
  }
  editarRegistro(id: string, registro: any): Promise<any> {
    return this.firestore.collection('registroAlumno').doc(id).update(registro)
  }

  agregarRegistroEditado(registro: RegistroA) {
    this.registro$.next(registro) //emitimos el nuevo valor que llega del registro
  }

  obtenerRegistroEditado(): Observable<RegistroA> {
    return this.registro$.asObservable() //con el metodo asObservable()se creará el observer  
  }


}
