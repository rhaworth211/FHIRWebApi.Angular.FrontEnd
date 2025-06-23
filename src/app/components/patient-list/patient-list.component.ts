import { Component } from '@angular/core';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ObservationListComponent } from '../observation-list/observation-list.component';
import { PatientService } from '../../services/patient.service';
import { Patient } from 'fhir/r4';
import { CommonModule } from '@angular/common';
import { UnwrapPipe } from '../../pipes/unwrap.pipe';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreatePatientComponent } from '../create-patient/create-patient.component';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, UnwrapPipe, MatCardModule, MatTableModule, MatProgressSpinnerModule, MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    ObservationListComponent,
    MatDialogModule],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss'
})

export class PatientListComponent {
  public patients: Patient[] = [];
  selectedPatientId: string | null = null;
  displayedColumns = ['name', 'gender', 'birthDate', 'actions'];
  isLoading = true;

  ngOnInit() {
    this.loadPatients();
  }

  /**
   * Loads the last 50 patients from the PatientService.
   * Sets isLoading to true while fetching data and false when done.
   */
  loadPatients() {
    this.isLoading = true;
    this.patientService.getLast50Patients().subscribe(data => {
      this.patients = data;
      this.isLoading = false;
    }, error => {
      console.error('Error fetching patients:', error);
      this.isLoading = false;
    });
  }
  
  /**
   * Opens a dialog to create a new patient.
   * After the dialog is closed, it refreshes the patient list if a new patient was added.
   */
  openCreateDialog() {
    const dialogRef = this.dialog.open(CreatePatientComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadPatients(); // refresh the list if a new patient was added
      }
    });
  }

  /**
   * Returns the patient ID as a string.
   * Uses UnwrapPipe to transform the patient ID if necessary.
   * @param patientid - The patient ID to unwrap.
   */
  getPatientId(patientid: any): string {
    return new UnwrapPipe().transform(patientid);
  }

  /**  
   * Opens a side navigation drawer to display patient details.
   */
  openDrawer(patientId: string, drawer: MatSidenav) {
    this.selectedPatientId = null;
    setTimeout(() => {
      this.selectedPatientId = patientId;
      drawer.open();
    });
  }

  /**
   * Angular `trackBy` function for optimizing rendering of patient list in ngFor.
   * @param index The index of the current item
   * @param patient The patient item
   * @returns The unique identifier (patient.id)
   */
  trackById(index: number, patient: any): string {
    return patient.id;
  }

  /**
   * Formats a FHIR `Patient` resource name object into a human-readable full name.
   * Handles optional and wrapped FHIR name structures.
   * @param patient The patient resource containing a `name` field
   * @returns A full name string composed of given names and family name
   */
  formatName(patient: any): string {
    const name = patient.name?.[0];

    const given = name?.given?.map((g: any) =>
      typeof g === 'string' ? g : g?.value || ''
    ).join(' ') || '';

    const family = typeof name?.family === 'string'
      ? name.family
      : name?.family?.value || '';

    return `${given} ${family}`.trim();
  }

  constructor(private patientService: PatientService,
              private dialog: MatDialog
  ) {
    this.patientService.getLast50Patients().subscribe(data => {
      this.patients = data;
    });
  }

}
