# FHIRWebApi.Angular.FrontEnd

**FHIRWebApi.Angular.FrontEnd** is an Angular-based frontend designed to interact with a FHIR-compatible backend API. It allows users to view and manage FHIR resources such as Patients and Observations in a clean and modern UI.

---

## 🧰 Features

- 🔎 List FHIR Patients from a backend API
- 📋 Display Observations for a selected Patient
- 📤 Create new Observations via form interface
- 🔧 Configurable API endpoint integration
- 🧼 Form validation using Angular reactive forms

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- Angular CLI (`npm install -g @angular/cli`)
- Backend API (e.g., [FHIRWebApi.Api](https://github.com/rhaworth211/FHIRWebApi.Api))

### Setup

```bash
git clone https://github.com/rhaworth211/FHIRWebApi.Angular.FrontEnd.git
cd FHIRWebApi.Angular.FrontEnd
npm install
ng serve
```

Navigate to `http://localhost:4200` to access the application.

---

## 🌐 Environment Configuration

Edit `src/environments/environment.ts` to point to your backend API:

```ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7091/api'
};
```

---

## 📁 Project Structure

```bash
├── src/
│   ├── app/
│   │   ├── services/             # API service for HTTP requests
│   │   ├── components/           # UI components like patient-list, observation-form
│   │   ├── models/               # TypeScript interfaces for FHIR models
│   │   └── app.module.ts         # Angular module setup
│   ├── environments/
│   │   └── environment.ts        # API base URL
├── angular.json
├── package.json
```

---

## 🔌 Example Endpoints

- `GET /api/patients` – fetch list of patients
- `GET /api/observations?patientId=123` – fetch observations for a patient
- `POST /api/observations` – create a new observation

---

## 🧪 Development Notes

- Modular Angular structure for scalability
- Uses `HttpClientModule` for API communication
- Add error handling and loading states for production-readiness

---

## 📄 License

MIT License — see `LICENSE` for full details.

---

> Built by [Ryan Haworth](mailto:r.haworth@outlook.com)
