import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observation } from 'fhir/r4';  

@Injectable({
  providedIn: 'root'
})
export class ObservationsService {
  private apiUrl = 'https://localhost:7091/api/observations';

  constructor(private http: HttpClient) {}

  getObservationsForPatient(patientId: string): Observable<Observation[]> {
    return this.http.get<Observation[]>(`${this.apiUrl}?patientId=${patientId}`);
  }

  createObservation(observation: any): Observable<Observation> {
    return this.http.post<Observation>(this.apiUrl, observation);
  }
}