import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CauseService {
  private apiUrl = 'http://localhost:3000';  // URL de tu backend
  evento:any

  constructor(private http:HttpClient) { }

  setEvento(evento:any){
    this.evento = evento;
  }

  getEvento(){
    return this.evento;
  }
  
  clearEvento(){
    this.evento = null;
  }

  getAllCauses(){
    return this.http.get<any>(`${this.apiUrl}/causes/all`);

  }
}
