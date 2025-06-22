import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../services/patient.service';
import { Patient } from 'fhir/r4';

@Component({
  selector: 'app-create-patient',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './create-patient.component.html'
})
export class CreatePatientComponent {
  form: FormGroup;  

  constructor(    
    private fb: FormBuilder,
    private patientService: PatientService,
    private dialogRef: MatDialogRef<CreatePatientComponent>
  ) {
    this.form = this.fb.group({
      given: [''],
      family: [''],
      gender: [''],
      birthDate: [''],
    });
  }

  onSubmit() {
    const formValue = this.form.value;

    const patientDto = {
      givenName: formValue.given,
      familyName: formValue.family,
      gender: formValue.gender,
      birthDate: formValue.birthDate
    };

    this.patientService.createPatient(patientDto).subscribe(() => {
      alert('Patient created!');
      this.form.reset();
    });
  }
}
