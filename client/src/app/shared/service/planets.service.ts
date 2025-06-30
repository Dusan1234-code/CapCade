import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Planet } from '../models/planet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3001/api/planets';

  getPlanets(): Observable<Planet[]> {
    return this.http.get<Planet[]>(this.apiUrl);
  }

  getPlanetById(id: number): Observable<Planet> {
    return this.http.get<Planet>(`${this.apiUrl}/${id}`);
  }

  createPlanet(planet: FormData): Observable<Planet> {
    return this.http.post<Planet>(`${this.apiUrl}`, planet);
  }

  updatePlanet(planet: FormData, id: number): Observable<Planet> {
    return this.http.put<Planet>(`${this.apiUrl}/${id}`, planet);
  }

  deletePlanet(id: number): Observable<Planet[]> {
    return this.http.delete<Planet[]>(`${this.apiUrl}/${id}`);
  }
}
