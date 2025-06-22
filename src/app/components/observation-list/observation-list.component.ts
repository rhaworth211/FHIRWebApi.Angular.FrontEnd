import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient } from '@angular/common/http';
import { Observation } from 'fhir/r4';
import { UnwrapPipe } from '../../pipes/unwrap.pipe';
import { ObservationsService } from '../../services/observations.service';

@Component({
  selector: 'app-observation-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule, UnwrapPipe, MatIconModule],
  templateUrl: './observation-list.component.html',
  styleUrl: './observation-list.component.scss'
})
export class ObservationListComponent implements OnChanges {
  @Input() patientId!: string;

  observations: Observation[] = [];
  displayedColumns = ['code', 'value', 'date'];
  loading = true;
  constructor(private http: HttpClient, private observationsService: ObservationsService) {}  

  ngOnChanges(changes: SimpleChanges) {
    if (changes['patientId'] && this.patientId) {
      this.fetchObservations();
    }
  }
  private fetchObservations() {
    this.loading = true;

    this.observationsService.getObservationsForPatient(this.patientId)
      .subscribe({
        next: (data) => {
          this.observations = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to load observations', err);
          this.observations = [];
          this.loading = false;
        }
      });
  }

  createNewObservation() {
    const dto = {
    subjectId: `Patient/${this.patientId}`,
    codeSystem: 'http://loinc.org',
    code: '1234-5',
    codeDisplay: 'New Observation',
    value: '1',
    unit: 'units',
    unitSystem: 'http://unitsofmeasure.org',
    unitCode: '1',
    effectiveDate: new Date().toISOString().split('T')[0] // e.g. '2025-06-22'
  };

    this.observationsService.createObservation(dto).subscribe({
      next: (obs) => {
        this.observations.push(obs);
        console.log('Observation created successfully:', obs);
      },
      error: (err) => {
        console.error('Error creating observation:', err);
      }
    });

  }

  getDisplayValue(obs: Observation): string {
    return obs.valueQuantity?.value + ' ' + obs.valueQuantity?.unit || obs.valueString || '—';
  }
}
