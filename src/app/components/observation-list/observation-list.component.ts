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
  displayedColumns = ['code', 'value', 'date','actions'];
  loading = true;
  constructor(private http: HttpClient, private observationsService: ObservationsService) {}  

  ngOnChanges(changes: SimpleChanges) {
    if (changes['patientId'] && this.patientId) {
      this.fetchObservations();
    }
  }
  private fetchObservations() {
    this.loading = true;

    this.observationsService.getObservations(this.patientId)
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
    const randomValue = (min: number, max: number) =>
      parseFloat((Math.random() * (max - min) + min).toFixed(2));

    const codes = [
      { code: '85354-9', display: 'Blood pressure panel' }, // composite
      { code: '8310-5', display: 'Body temperature', unit: '°C', unitCode: 'Cel' },
      { code: '8462-4', display: 'Diastolic blood pressure', unit: 'mmHg', unitCode: 'mm[Hg]' },
      { code: '8867-4', display: 'Heart rate', unit: 'beats/minute', unitCode: '/min' },
      { code: '8302-2', display: 'Body height', unit: 'cm', unitCode: 'cm' }
    ];

    const selected = codes[Math.floor(Math.random() * codes.length)];

    let dto: any = {
      subjectId: `Patient/${this.patientId}`,
      codeSystem: 'http://loinc.org',
      code: selected.code,
      codeDisplay: selected.display,
      effectiveDate: new Date().toISOString().split('T')[0]
    };

    if (selected.code === '85354-9') {
      dto.components = [
        {
          code: '8480-6',
          display: 'Systolic blood pressure',
          value: randomValue(90, 140),
          unit: 'mmHg',
          unitSystem: 'http://unitsofmeasure.org',
          unitCode: 'mm[Hg]'
        },
        {
          code: '8462-4',
          display: 'Diastolic blood pressure',
          value: randomValue(60, 90),
          unit: 'mmHg',
          unitSystem: 'http://unitsofmeasure.org',
          unitCode: 'mm[Hg]'
        }
      ];
    } else {
      dto = {
        ...dto,
        value: randomValue(50, 150),
        unit: selected.unit,
        unitSystem: 'http://unitsofmeasure.org',
        unitCode: selected.unitCode
      };
    }

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
  deleteObservation(obs: Observation) {
    const id = obs.id;
    if (!id) {
      console.error('Cannot delete observation: no ID found.');
      return;
    }

    this.observationsService.deleteObservation(id).subscribe({
      next: () => {
        this.observations = this.observations.filter(o => o.id !== id);
        console.log(`Deleted observation with ID: ${id}`);
      },
      error: err => console.error('Failed to delete observation:', err)
    });
  }

  getEffectiveDate(obs: Observation): string {
    const raw =
      obs.effectiveDateTime ||
      obs.effectivePeriod?.start ||
      obs.meta?.lastUpdated;

    const unwrapped = typeof raw === 'string' ? raw : this.unwrap(raw);

    if (!unwrapped) return '—';

    const date = new Date(unwrapped);
    return isNaN(date.getTime()) ? unwrapped : date.toISOString().split('T')[0];
  }

  getCodeDisplay(obs: Observation): string {
    if (obs.code?.coding?.[0]?.display === undefined) {
      return this.unwrap(obs.code?.text) || '—';
    }
    else
    {
      return `${this.unwrap(obs.code?.coding?.[0]?.display)} [${this.unwrap(obs.code?.coding?.[0]?.code)}]`.trim() || '—';
    }    
  }
  
  getDisplayValue(obs: any): string {

    if (obs.value.value !== undefined && obs.value.value !== null) {
      return `${this.unwrap(obs.value.value)} ${this.unwrap(obs.value.unit)}`.trim();
    }
    if (obs.value.coding?.[0]?.display) {
      return `${this.unwrap(obs.value.coding[0].display)}`.trim();

    }   
    return '—';  
  }

  unwrap(value: any): any {
    while (value && typeof value === 'object' && 'value' in value) {
      value = value.value;
    }
    return value;
  }
}
