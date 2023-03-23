export class ConsultasHelper {
    public listaConsulta: any[] = [];
    public filtroBusqueda = '';
    public ordenBusqueda = '';
    public cantidadElementoBusqueda = 0;
    public elementosPagina = [{ valor: 5 }, { valor: 10 }, { valor: 25 }, { valor: 50 }, { valor: 100 }]
    public elementoPaginaSeleccionado = 10;
}
