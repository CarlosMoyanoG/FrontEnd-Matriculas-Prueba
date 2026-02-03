import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Matricula {
  placa: string;
  propietario: string;
  marca: string;
  fabricacion: string;
  valor_comercial: string;
  codigo_revision: string;
  impuesto: string;
}

export type MatriculaCreate = Matricula;

@Injectable({
  providedIn: 'root',
})

export class ServicioMatriculas {
  private readonly baseUrl = 'http://localhost:8000/api/matriculas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(this.baseUrl);
  }

  create(matricula: MatriculaCreate): Observable<Matricula> {
    return this.http.post<Matricula>(this.baseUrl, matricula);
  }
}
