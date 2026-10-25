import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoService } from '../../services/alumno'; 
import { Alumno } from '../../models/alumno';

@Component({
  selector: 'app-alumno-list',
  standalone: true,
  imports: [CommonModule],
 
  templateUrl: './alumno-list.html',
  styleUrls: ['./alumno-list.css']
})
export class AlumnoListComponent implements OnInit {
  alumnos: Alumno[] = [];

  
  constructor(private alumnoService: AlumnoService) {}

  
  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.alumnoService.listar().subscribe({
      next: (data) => this.alumnos = data,
      error: (err) => console.error('Error al cargar la lista', err)
    });
  }

  eliminarAlumno(id?: number): void {
    if (id && confirm('¿Estás seguro de eliminar este alumno?')) {
      this.alumnoService.eliminar(id).subscribe({
        next: () => {
          
          this.alumnos = this.alumnos.filter(a => a.id !== id);
        },
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }
}