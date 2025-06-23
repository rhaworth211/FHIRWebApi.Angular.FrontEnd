import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from 'fhir/r4';

@Injectable({
  providedIn: 'root'
})

/**
 * PatientService
 *
 * Provides methods to interact with the backend API for FHIR `Patient` resources.
 * Supports patient creation and retrieval of recent patients.
 */

export class PatientService {
  private apiUrl = 'https://localhost:7091/api/patients';

  constructor(private http: HttpClient) {}

  /**
   * Creates a new FHIR `Patient` resource by posting the provided data to the backend.
   *
   * @param patient The patient payload to create (must follow FHIR Patient resource format).
   * @returns An observable emitting the server response, typically the created patient object or status.
   */
  createPatient(patient: any): Observable<any> {
    return this.http.post(this.apiUrl, patient);
  }

  /**
   * Retrieves the latest 50 FHIR `Patient` resources from the backend.
   *
   * @returns An observable emitting an array of `Patient` resources.
   */
  getLast50Patients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }
}