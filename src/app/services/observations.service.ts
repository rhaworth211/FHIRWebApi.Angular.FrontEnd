import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observation } from 'fhir/r4';
import { environment } from '../../environments/environment';
import { CreateObservationRequest } from '../dtos/createobservationrequest'

@Injectable({
  providedIn: 'root'
})

/**
 * ObservationsService
 *
 * Provides methods to interact with the backend API for FHIR `Observation` resources.
 * Supports retrieval, creation, update, and deletion of observations.
 */
export class ObservationsService {
  private apiUrl = `${environment.apiUrl}/observations`;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all `Observation` resources or filters by a given patient ID.
   *
   * @param patientId Optional patient ID to filter observations by patient.
   * @returns An observable emitting an array of `Observation` resources.
   */
  getObservations(patientId?: string): Observable<Observation[]> {
    const url = patientId ? `${this.apiUrl}?patientId=${patientId}` : this.apiUrl;
    return this.http.get<Observation[]>(url);
  }

  /**
   * Retrieves a specific `Observation` by its FHIR ID.
   *
   * @param id The ID of the observation to retrieve.
   * @returns An observable emitting the requested `Observation`.
   */
  getObservation(id: string): Observable<Observation> {
    return this.http.get<Observation>(`${this.apiUrl}/${id}`);
  }

  /**
   * Creates a new FHIR `Observation` resource.
   *
   * @param observation The observation data to create (must follow `CreateObservationRequest` format).
   * @returns An observable emitting the created `Observation` resource.
   */
  createObservation(observation: CreateObservationRequest): Observable<Observation> {
    return this.http.post<Observation>(this.apiUrl, observation);
  }

  /**
   * Updates an existing FHIR `Observation` by ID.
   *
   * @param id The FHIR ID of the observation to update.
   * @param observation The updated `Observation` resource.
   * @returns An observable emitting the updated `Observation`.
   */
  updateObservation(id: string, observation: Observation): Observable<Observation> {
    return this.http.put<Observation>(`${this.apiUrl}/${id}`, observation);
  }

  /**
   * Deletes an `Observation` resource by its FHIR ID.
   *
   * @param id The ID of the observation to delete.
   * @returns An observable emitting void upon successful deletion.
   */
  deleteObservation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
