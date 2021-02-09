import { Component, OnInit, Input  } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { ProductosService } from '../../core/services/productos.service'
import { Producto } from '../../core/services/model/producto.interface';
import { Filter } from '../../core/services/model/filter';
import { Observable} from 'rxjs';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  character: Producto;

  loading: boolean;
  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];
  pageSize: number;
  page: number;
  totalRecords: number;


  

  constructor( 
    
    public productosService: ProductosService,
    private router: Router
     ) {
      this.page = 1;
      this.pageSize = 8;
      this.productos = [];
      this.loading = true;

      }

  ngOnInit() {
    this.loading = false;
    this.findAllCharacters();

    this.productosService.getAllProducto().subscribe(resp => console.log('producto', resp));

  }

  pageChanged(page: number): void {
    this.page = page;
  }

  onMoreInformation(Id: number): void {
    this.router.navigate(['item', Id] )
  }

  private findAllCharacters(): void {

    this.productosService.findAllCharacters().pipe(take(1)).subscribe( (resp: Producto[]) => {
      this.productos = resp;
      this.totalRecords = this.productos.length;
      this.loading = false;
    },
    error => {
      swal.fire('Ha Ocurrido un error', 'Intente nuevamente, sí el problema persiste puede que el servicio no este funcionando.', 'error');
    });
  }
  
  private resetValues(): void {
    this.loading = true;
    this.productos = [];
    this.totalRecords = 0;
    this.page = 1;
  }

  buscarProducto( termino: string ) {

    if ( termino.length < 1 ) {
      return;
    }
    this.router.navigate(['/search', termino]);

  }




}
