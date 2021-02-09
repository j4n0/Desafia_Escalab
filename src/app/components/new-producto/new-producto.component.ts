import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Producto} from '../../core/services/model/producto.interface';
import { ProductosService } from '../../core/services/productos.service';

@Component({
  selector: 'app-new-producto',
  templateUrl: './new-producto.component.html',
  styleUrls: ['./new-producto.component.scss']
})
export class NewProductoComponent implements OnInit {
  private image: any;
  constructor(
    private ProductosService: ProductosService ) { }

    
  public newproductoform = new FormGroup({
    titulo: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
  });

  ngOnInit() {
  }

  addNewPost(data: Producto) {
    console.log('New post', data);
   
      this.ProductosService.preAddAndUpdatePost(data, this.image);
   // this.ProductosService.uploadImage(data, this.image);
  

  }

  handleImage(event: any): void {
    this.image = event.target.files[0];
  }
}
