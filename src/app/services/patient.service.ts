import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from 'fhir/r4';
import { environment } from '../../environments/environment';
import { CreatePatientRequest } from '../dtos/createpatientrequest';

@Injectable({
  providedIn: 'root'
})
/**
 * PatientService
 *
 * Provides methods to interact with the backend API for FHIR `Patient` resources.
 * Supports patient creation, retrieval, update, and deletion.
 */
export class PatientService {
  private apiUrl = `${environment.apiUrl}/patients`;

  constructor(private http: HttpClient) {}

  /**
   * Creates a new FHIR `Patient` resource by posting the provided data to the backend.
   *
   * @param patient - The patient data conforming to `CreatePatientRequest`.
   * @returns An observable emitting the created `Patient` resource.
   */
  createPatient(patient: CreatePatientRequest): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, patient);
  }

  /**
   * Retrieves a list of FHIR `Patient` resources, limited by the optional `limit` parameter.
   *
   * @param limit - The maximum number of patients to retrieve (default is 20).
   * @returns An observable emitting an array of `Patient` resources.
   */
  getPatients(limit: number = 20): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}?limit=${limit}`);
  }

  /**
   * Retrieves a specific FHIR `Patient` resource by their FHIR ID.
   *
   * @param id - The unique FHIR ID of the patient.
   * @returns An observable emitting the `Patient` resource if found.
   */
  getPatient(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }

  /**
   * Updates an existing FHIR `Patient` resource.
   *
   * @param id - The FHIR ID of the patient to update.
   * @param patient - The updated `Patient` resource to submit.
   * @returns An observable emitting the updated `Patient` resource.
   */
  updatePatient(id: string, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/${id}`, patient);
  }

  /**
   * Deletes a FHIR `Patient` resource by their FHIR ID.
   *
   * @param id - The FHIR ID of the patient to delete.
   * @returns An observable emitting void if the deletion is successful.
   */
  deletePatient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}