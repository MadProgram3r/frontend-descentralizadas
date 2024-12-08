import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor() { }
  private eventoSeleccionado: any = null;

  setEvento(evento: any) {
    this.eventoSeleccionado = evento;
  }

  getEvento() {
    return this.eventoSeleccionado;
  }

  clearEvento() {
    this.eventoSeleccionado = null;
  }
}
