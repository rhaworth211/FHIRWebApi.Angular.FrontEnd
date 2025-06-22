import { Component, ViewChild } from '@angular/core';
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
  
  openCreateDialog() {
    const dialogRef = this.dialog.open(CreatePatientComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadPatients(); // refresh the list if a new patient was added
      }
    });
  }
  getPatientId(patientid: any): string {
    return new UnwrapPipe().transform(patientid);
  }

  openDrawer(patientId: string, drawer: MatSidenav) {
    this.selectedPatientId = null;
    setTimeout(() => {
      this.selectedPatientId = patientId;
      drawer.open();
    });
  }

  trackById(index: number, patient: any): string {
    return patient.id;
  }

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
