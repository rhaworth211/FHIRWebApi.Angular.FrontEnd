/**
 * Represents the payload required to create a new FHIR Patient resource.
 * Matches the structure expected by the backend API.
 */
export interface CreatePatientRequest {
  /**
   * The given (first) name of the patient.
   * Required.
   */
  givenName: string;

  /**
   * The family (last) name of the patient.
   * Required.
   */
  familyName: string;

  /**
   * The administrative gender of the patient.
   * Must be one of: "male", "female", "other", "unknown".
   * Required.
   */
  gender: 'male' | 'female' | 'other' | 'unknown';

  /**
   * The birth date of the patient in ISO format (YYYY-MM-DD).
   * Required.
   */
  birthDate: string;
}