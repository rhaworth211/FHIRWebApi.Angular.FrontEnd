import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from 'fhir/r4';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'https://localhost:7091/api/patients';

  constructor(private http: HttpClient) {}

  createPatient(patient: any): Observable<any> {
    return this.http.post(this.apiUrl, patient);
  }

  getLast50Patients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }
}