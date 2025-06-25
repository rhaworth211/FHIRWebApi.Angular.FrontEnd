/**
 * Represents the payload required to create a new FHIR Observation resource.
 * Must conform to the structure expected by the backend API.
 */
export interface CreateObservationRequest {
  /**
   * The subject reference for the observation (e.g., "Patient/123").
   */
  subjectId: string;

  /**
   * The code system URI that defines the coding namespace (e.g., "http://loinc.org").
   */
  codeSystem: string;

  /**
   * The actual code from the code system (e.g., "85354-9").
   */
  code: string;

  /**
   * A human-readable display name for the code (e.g., "Blood pressure panel").
   */
  codeDisplay: string;

  /**
   * The value/result of the observation (numeric or textual).
   */
  value: string;

  /**
   * The human-readable unit string for the value (e.g., "mmHg").
   */
  unit: string;

  /**
   * The unit system URI (e.g., "http://unitsofmeasure.org").
   */
  unitSystem: string;

  /**
   * The machine-readable unit code (e.g., "mm[Hg]").
   */
  unitCode: string;

  /**
   * The effective date of the observation in ISO format (YYYY-MM-DD).
   */
  effectiveDate: string;
}
