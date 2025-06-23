import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  /**
   * Handles user login by calling AuthService.login.
   * On successful login, navigates to the patient list page.
   */
  onLogin() {
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/patient-list']),
      error: err => alert('Login failed: ' + err.error)
    });
  }
}