import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { EmpresaService } from './empresa.service';

@Component({
  selector: 'app-register-company',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FooterComponent, NavbarComponent],
  templateUrl: './create-company-account.component.html',
  styleUrls: ['./create-company-account.component.scss']
})
export class CreateCompanyAccountComponent {
  registerForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmarPassword: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required])
  });

  constructor(private empresaService: EmpresaService) {}

  onSubmit() {
    if (this.registerForm.valid) {
      const empresa = {
        nombre: this.registerForm.value.nombre,
        correo: this.registerForm.value.correo,
        passwordHash: this.registerForm.value.password,
        confirmarContraseña: this.registerForm.value.confirmarPassword,
        telefono: this.registerForm.value.telefono,
        descripcion: this.registerForm.value.descripcion
      };

      this.empresaService.registrarEmpresa(empresa)
        .then(response => {
          console.log('Empresa registrada con éxito:', response);
          alert('Empresa registrada con éxito');
        })
        .catch(error => {
          console.error('Error al registrar empresa:', error);
          alert('Error al registrar empresa');
        });
    } else {
      alert('Por favor, completa el formulario correctamente');
    }
  }
}