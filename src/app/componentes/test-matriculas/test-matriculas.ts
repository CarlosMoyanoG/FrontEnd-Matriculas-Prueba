import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Matricula, ServicioMatriculas } from '../../servicios/servicio-matriculas';

@Component({
  selector: 'app-test-matriculas',
  imports: [CommonModule, FormsModule],
  templateUrl: './test-matriculas.html',
  styleUrl: './test-matriculas.scss',
})
export class TestMatriculas {

  matricula: Matricula[] = [];

  form: Matricula = {
    placa: '',
    propietario: '',
    marca: '',
    fabricacion: '',
    valor_comercial: '',
    codigo_revision: '',
    impuesto: ''
  };

  mensaje = '';
  error = '';
  loading = false;
  
  constructor(private matriculasService: ServicioMatriculas) {}

  ngOnInit(): void {
    this.cargarMatriculas();
  }

  cargarMatriculas(): void {
    this.loading = true;
    this.mensaje = '';
    this.error = '';

    this.matriculasService.getAll().subscribe({
      next: (data) => {
        this.matricula = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las matriculas: ' + err.message;
        this.loading = false;
      },
    });
  }

  private generarCodigoRevision(placa: string, propietario: string, fabricacion: string): string {
    const placaParte = (placa ?? '').trim().replace(/\s+/g, '').slice(0, 3);
    const propietarioLen = (propietario ?? '').trim().length;
    const fabricacionStr = (fabricacion ?? '').toString().trim();
    const ultimoDigito = fabricacionStr.slice(-1);

    return `${placaParte}${propietarioLen}${ultimoDigito}`;
  }

  actualizarCodigoRevision(): void {
    this.form.codigo_revision = this.generarCodigoRevision(
      this.form.placa,
      this.form.propietario,
      this.form.fabricacion
    );
  }

  private calcularImpuesto(valorComercial: string, fabricacion: string, marca: string): string {
    const valor = Number.parseFloat((valorComercial ?? '').toString().replace(',', '.'));
    const base = Number.isFinite(valor) ? valor * 0.025 : 0;

    const anio = Number.parseInt((fabricacion ?? '').toString(), 10);
    const recargo = Number.isFinite(anio) && anio < 2010 ? base * 0.10 : 0;

    const marcaTrim = (marca ?? '').trim();
    const iniciaConVocal = /^[aeiou]/i.test(marcaTrim);
    const beneficio = iniciaConVocal ? 30 : 0;

    const total = Math.max(0, base + recargo - beneficio);
    return total.toFixed(2);
  }

  actualizarImpuesto(): void {
    this.form.impuesto = this.calcularImpuesto(
      this.form.valor_comercial,
      this.form.fabricacion,
      this.form.marca
    );
  }

  guardar(): void {
    this.mensaje = '';
    this.error = '';

    if (!this.form.placa || !this.form.propietario || !this.form.marca || !this.form.fabricacion || !this.form.valor_comercial) {
      this.error = 'Todos los campos son obligatorios';
      return;
    }

    this.actualizarCodigoRevision();
    this.actualizarImpuesto();

    this.matriculasService.create(this.form).subscribe({
      next: (created) => {
        this.mensaje = 'Matricula creada exitosamente';
        this.cargarMatriculas();
        this.form = {
          placa: '',
          propietario: '',
          marca: '',
          fabricacion: '',
          valor_comercial: '',
          codigo_revision: '',
          impuesto: ''
        };
      },
      error: (err) => {
        this.error = 'Error al crear la matricula: ' + err.message;
      }
    });
  }
}
