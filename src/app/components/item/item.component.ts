import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../core/services/productos.service';
import { ProductoDescripcion } from '../../core/services/model/producto-descripcion.interface';
import { Producto } from '../../core/services/model/producto.interface';
import { take } from 'rxjs/operators';

import swal from 'sweetalert2';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  productodescripcion: ProductoDescripcion;
  productos: Producto;
  id: string;
  loading: boolean;


  constructor( 
    private route: ActivatedRoute,
    public productoService: ProductosService,
    private router: Router
     ) {
      this.loading = true;
      this.productodescripcion = null;
      this.productos = null;
      

      }

  ngOnInit() {

    const id = this.route.snapshot.params.id;
    console.log(id)
    this.findCharacterById(id);

}
  onBack() {
    this.router.navigate(['/'] )
  }

  private findCharacterById(id: string): void {
    
    if (id === null ) {
      swal.fire('La ID ingresa no es válida', 'Asegurate ingresando desde la botón ver más en las tarjetas de los personajes', 'error');
      this.router.navigate(['app-page-not-found'] )
      return;
    }
    //this.productoService.findCharacterById(id).pipe(take(1)).subscribe( (productodescripcion: ProductoDescripcion) => {
    this.productoService.getProducto(id).pipe(take(1)).subscribe( (productos: Producto) => {
     //this.id = parametros['id'];
     // console.log(id);
      this.id = id;
      console.log(productos);
      //this.productodescripcion = productodescripcion;
      this.productos = productos;
      this.loading = false;
    },
error => {
swal.fire('Ha Ocurrido un error', 'Intente nuevamente, sí el problema persiste puede que el servicio no este funcionando.', 'error');
});

  }


}
