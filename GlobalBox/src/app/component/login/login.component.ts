import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class LoginComponent  implements OnInit {
  email: string = '';
  contrasena: string = ''; // escribir contraseña causa un error
  recuerdame: boolean = false; // no se usa todavía, agregar más tarde
  usuario: string = '';
  mensajeError: string = '';

  constructor(private router: Router) { }

  ngOnInit() {}

 onLogin() {
 this.mensajeError = '';

 // q ningún campo esté vacío
 if (!this.usuario || !this.contrasena || !this.email) {
 this.mensajeError = 'Por favor, complete todos los campos (Usuario, Contraseña, y Correo).';
 
 }

 // q email tenga @
 if (!this.email.includes('@')) {
 this.mensajeError = 'El correo electrónico debe tener "@".';
 }

  // simulación de validación de usuario y contraseña (user y pass como respuestas correctas)
 if (this.usuario === 'user' && this.contrasena === 'pass') {
 this.router.navigate(['/home']);
 } else {
 this.mensajeError = 'Usuario o contraseña incorrectos.';
 }
}
}
