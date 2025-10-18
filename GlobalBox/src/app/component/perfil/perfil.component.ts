import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AuthService, UserData } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './perfil.component.html'
})
export class PerfilComponent {
  // UI state
  isRegistering = false;
  isEditingProfile = false;
  isEditingAddress = false;

  // Auth state
  user: UserData | null = null;
  username = '';
  password = '';
  email = '';

  // Profile fields
  nombre = '';
  apellido = '';

  // Address fields
  calle = '';
  altura = '';
  provincia = '';
  pais = '';

  constructor(public auth: AuthService) {
    this.auth.currentUser$.subscribe(u => {
      this.user = u;
      if (u) {
        this.nombre = u.nombre ?? '';
        this.apellido = u.apellido ?? '';
        this.calle = u.calle ?? '';
        this.altura = u.altura ?? '';
        this.provincia = u.provincia ?? '';
        this.pais = u.pais ?? '';
      }
    });
  }

  get isLoggedIn() { return !!this.user; }

  showRegister() { this.isRegistering = true; }
  showLogin() { this.isRegistering = false; }

  handleLogin() {
    if (!this.username || !this.password || !this.email) return;
    if (!this.email.includes('@')) return;
    this.auth.login(this.username, this.password, this.email).subscribe();
  }

  handleRegister() {
    if (!this.username || !this.password || !this.email) return;
    if (!this.email.includes('@')) return;
    this.auth.register(this.username, this.password, this.email).subscribe(_ => {
      this.auth.login(this.username, this.password, this.email).subscribe();
      this.isRegistering = false;
    });
  }

  saveProfile() {
    if (!this.user) return;
    this.auth.updateProfile(this.user.id_usuario, this.nombre, this.apellido).subscribe(() => {
      this.isEditingProfile = false;
    });
  }
  saveAddress() {
    if (!this.user) return;
    if (!this.calle || !this.pais || !this.provincia || !this.altura) return;
    this.auth.updateAddress(this.user.id_usuario, { calle: this.calle, altura: this.altura, provincia: this.provincia, pais: this.pais }).subscribe(() => {
      this.isEditingAddress = false;
    });
  }

  logout() { this.auth.logout(); }
}
