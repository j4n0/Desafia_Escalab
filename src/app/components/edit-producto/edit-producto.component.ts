import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Producto} from '../../core/services/model/producto.interface';
import { ProductosService } from '../../core/services/productos.service';


@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.scss']
})
export class EditProductoComponent implements OnInit {
  private image: any;
  private imageOriginal: any;

  @Input() producto: Producto;

  constructor(
    public productosService: ProductosService
    
    ) { }

    public editProductoForm = new FormGroup({
      id: new FormControl('', Validators.required),
      titulo: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
    });
  ngOnInit() {
    this.image = this.producto.url;
    this.imageOriginal = this.producto.url;
    this.initValuesForm();
  }

 

  editProducto(producto: Producto) {
    if (this.image === this.imageOriginal) {
      producto.url = this.imageOriginal;
      this.productosService.editPostById(producto);
    } else {
      this.productosService.editPostById(producto, this.image);
    }
  }

  handleImage(event: any): void {
    this.image = event.target.files[0];
  }

  private initValuesForm(): void {
    this.editProductoForm.patchValue({
      id: this.producto.id,
      titulo: this.producto.titulo,
      categoria: this.producto.categoria,
      precio: this.producto.precio,
    });
  }
}
