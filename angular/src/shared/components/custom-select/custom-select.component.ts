import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, AfterContentChecked, ViewChild, ElementRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, tap, switchMap, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgSelectComponent } from '@ng-select/ng-select';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html'
})
export class CustomSelectComponent implements OnInit {
  @ViewChild(NgSelectComponent, { static: false }) ngSelect: NgSelectComponent;
  @ViewChild('select', { static: false }) select: NgModel;

  private paginaActual = 1;
  public cargando = false;
  private valorSeleccionado: number | string;
  public typeAhead = new Subject<string>();
  public items: any[] = [];
  public modalForm:any;
  public body = "body";
  public filtroSeleccionado = '';
  private terminoBusqueda = '';

  @Output() cambioValor = new EventEmitter();
  @Input() placeholder: string;
  @Input() bindId: string | number = "id";
  @Input() identificador: string;
  @Input() descripcion: string;
  @Input() debounceTime = 500;
  @Input() appendTo = "body";
  @Input() requerido = false;
  @Input() elementosPagina = 10;
  @Input() servicio: any = null;
  @Input() appendToModal = false;
  @Input() cargarAlAbrir = false;
  @Input() permiteLimpiar = true;
  @Input() activo = true;
  @Input() oculto = false;
  @Input() label: string;
  @Input() mostrarIdentificadorSeleccion=true;
  @Input() mostrarLabel = true;
  @Input() lista: any[] = [];
  @Input() multipleSeleccion = false;
  @Input()
  get model(): number | string {
    return this.valorSeleccionado;
  }
  set model(valor: number | string) {
    this.valorSeleccionado = valor

    if (+valor > 0 && this.lista.length === 0) {
      this.cargarElementos();
      this.agregarMas();
    }

  }

  @Input()
  get filtro(): string {
    return this.filtroSeleccionado;
  }
  set filtro(valor: string) {
      this.filtroSeleccionado = valor;
  }

  constructor(private changeDetector: ChangeDetectorRef) { }

  public ngOnInit(): void {

    if (this.appendTo === 'modal') {
      this.appendTo = undefined;
    }

    if (this.placeholder === undefined || this.placeholder === '') {
      this.placeholder = 'Seleccione uno...';
    }

    if (this.lista.length === 0 && this.servicio) {
      this.cargarElementos();
    }
  }

  public cambioElementoSeleccionado(event: any) {
    this.cambioValor.emit({ id: this.model, event: event });
  }

  public cargarElementos(): void {
    this.items.length = 0;
    if (this.lista.length == 0) {

      this.servicio.getAll('', '', this.filtroSeleccionado, 0, this.elementosPagina)
        .pipe(finalize(() => { }))
        .subscribe(
          (resultado: { items: any; }) => {
            this.items = [...resultado.items];
            this.changeDetector.markForCheck();
            this.paginaActual = 1;
          });
    }


      this.typeAhead.pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        tap(() => this.cargando = true),
        switchMap(term => 
          this.servicio.getAll('', term, this.filtroSeleccionado, 0, this.elementosPagina).pipe(finalize(() => { }))
        ))
        .subscribe(
          (resultado: any) => {
            this.items = [...resultado.items];
            this.changeDetector.markForCheck();
            this.paginaActual = 1;
        });
    
    this.cargando = false;
  }

  public agregarMas(): void {


    if (+this.valorSeleccionado > 0) {
      this.cargando = true;
      if (!this.items.some(x => x.id === this.valorSeleccionado) && this.items.length > 0) {
        this.servicio.get(this.valorSeleccionado)
          .pipe(finalize(() => { }))
          .subscribe(
            (resultado: any) => {
              if (resultado) {
                this.items.push(resultado);
                this.items = [...this.items];
                this.changeDetector.markForCheck();
                this.paginaActual = 1;
              }
            });
      }

    } else {
      this.servicio.getAll('', '', this.filtroSeleccionado, this.paginaActual * this.elementosPagina, this.elementosPagina)
        .pipe(finalize(() => { }))
        .subscribe(
          (resultado: any) => {
            if (resultado.items.length > 0) {
              this.items = [...this.items, ...resultado.items.filter((u: any) => !this.items.includes(u))];
              this.changeDetector.markForCheck();
              this.paginaActual += 1;
            }
          });
    }
    this.cargando = false;
  }

  public abrirSelect(): void {

    if (this.lista.length === 0) {

      if (this.items.length <= 0) {
        this.paginaActual = 1;
        this.cargarElementos();
      }
    }
  }

  public onScrollToEnd(): void {
    if (this.lista.length === 0) {
      this.agregarMas();
    }
  }

  public markAsDirty() {
    this.select.control.markAsDirty();
  }

  public onFocus() {

    if (this.filtroSeleccionado !== '') {
      this.items.length = 0;
    }

  }
}


