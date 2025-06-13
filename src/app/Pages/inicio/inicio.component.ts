import { Component, inject } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmpleadoService } from '../../Services/empleado.service';
import { Empleado } from '../../Models/Empleado';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  private empleadoService = inject(EmpleadoService);

  public listaEmpleados: Empleado[] = [];
  public displayedColumns: string[] = [
    'nombreCompleto',
    'correo',
    'sueldo',
    'fechaContrato',
    'accion',
  ];

  obtenerEmpleados() {
    this.empleadoService.lista().subscribe({
      next: (data) => {
        if (data.length > 0) this.listaEmpleados = data;
      },
      error: (error) => console.log(error),
    });
  }

  constructor(private route: Router) {
    this.obtenerEmpleados();
  }

  nuevo() {
    this.route.navigate(['/empleado', 0]);
  }

  editar(objeto: Empleado) {
    this.route.navigate(['/empleado', objeto.idEmpleado]);
  }

  eliminar(objeto: Empleado) {
    if (confirm('Desea eliminar el empleado' + objeto.nombreCompleto)) {
      this.empleadoService.eliminar(objeto.idEmpleado).subscribe({
        next: (data) => {
            this.obtenerEmpleados();
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    }
  }
}
