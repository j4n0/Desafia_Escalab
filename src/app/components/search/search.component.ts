import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ProductosService } from '../../core/services/productos.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor( private route: ActivatedRoute,
               public productoService: ProductosService,
               private router: Router ) { }

  ngOnInit() {

    this.route.params
      .subscribe( params => {  
        console.log(params['termino']);
        this.productoService.buscarProducto( params['termino'] );

      });

  }
  
  onMoreInformation(Id: number): void {
    this.router.navigate(['item', Id] )
  }

}
