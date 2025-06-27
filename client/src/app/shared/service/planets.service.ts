import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Planet } from '../models/planet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3001/api';

  getPlanets(): Observable<Planet[]> {
    return this.http.get<Planet[]>(`${this.apiUrl}/planets`);
  }

  reloadPlanets(): Observable<Planet[]> {
    return this.http.get<Planet[]>(`${this.apiUrl}/planets/reload`);
  }

  createPlanet(planet: any): Observable<Planet> {
    return this.http.post<Planet>(`${this.apiUrl}/planets`, planet);
  }
}
