import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observation } from 'fhir/r4';  
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

/**
 * ObservationsService
 * 
 * Provides methods to interact with the backend API for FHIR `Observation` resources.
 * Supports retrieving observations by patient and creating new observations.
 */
export class ObservationsService {
  private apiUrl = `${environment.apiUrl}/observations`;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all `Observation` resources associated with a given patient.
   *
   * @param patientId The FHIR ID of the patient (e.g., "123" or "Patient/123").
   * @returns An observable emitting an array of `Observation` resources.
   */
  getObservationsForPatient(patientId: string): Observable<Observation[]> {
    return this.http.get<Observation[]>(`${this.apiUrl}?patientId=${patientId}`);
  }

  /**
   * Creates a new `Observation` resource by posting it to the backend.
   *
   * @param observation The observation payload to submit. Should match the FHIR Observation schema.
   * @returns An observable emitting the created `Observation` resource.
   */
  createObservation(observation: any): Observable<Observation> {
    return this.http.post<Observation>(this.apiUrl, observation);
  }
}