import { Component, inject, Input, type OnInit } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmpleadoService } from '../../Services/empleado.service';
import { Router } from '@angular/router';
import { Empleado } from '../../Models/Empleado';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css',
})
export class EmpleadoComponent implements OnInit {
  @Input('id') idEmpleado!: number;
  private empleadoService = inject(EmpleadoService);
  public formBuild = inject(FormBuilder);

  public empleadoForm: FormGroup = this.formBuild.group({
    nombreCompleto: [''],
    correo: [''],
    sueldo: [0],
    fechaContrato: [''],
  });

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.idEmpleado != 0) {
      this.empleadoService.obtener(this.idEmpleado).subscribe({
        next: (data) => {
          this.empleadoForm.patchValue({
            nombreCompleto: data.nombreCompleto,
            correo: data.correo,
            sueldo: data.sueldo,
            fechaContrato: data.fechaContrato,
          });
        },
        error: (error) => console.log(error),
      });
    }
  }

  guardar() {
    const objeto: Empleado = {
      idEmpleado: this.idEmpleado,
      nombreCompleto: this.empleadoForm.value.nombreCompleto,
      correo: this.empleadoForm.value.correo,
      sueldo: this.empleadoForm.value.sueldo,
      fechaContrato: this.empleadoForm.value.fechaContrato,
    };

    if (this.idEmpleado == 0) {
      this.empleadoService.crear(objeto).subscribe({
        next: (data) => {
          this.router.navigate(['/']);
          
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    } else {
      this.empleadoService.editar(objeto).subscribe({
        next: (data) => {
            this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    }
  }

  volver() {
    this.router.navigate(['/']);
  }
}
