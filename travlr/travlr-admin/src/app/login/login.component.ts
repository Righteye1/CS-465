import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  token: string | null = null;

  // Notify parent when login succeeds
  @Output() loginSuccess = new EventEmitter<void>();

  constructor(private http: HttpClient) { }

  login() {
    this.http.post<any>('http://localhost:3000/api/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response) => {
        this.token = response.token;
        if (this.token) {
          localStorage.setItem('jwt', this.token);
          alert('Login successful!');
          this.loginSuccess.emit(); // notify parent AppComponent
        }
      },
      error: () => alert('Login failed.')
    });
  }
}
