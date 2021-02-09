import { AfterViewInit, Component, OnInit,  ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ProductosService } from '../../core/services/productos.service'
import { Producto } from '../../core/services/model/producto.interface';

import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './../modal/modal.component';

import swal from 'sweetalert2';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

/**
 * @title Table with filtering
 */

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'cod', 'titulo','categoria', 'precio', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public productosService: ProductosService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    this.findAllTable();
    //this.productosService.findAllCharacters().subscribe(resp => console.log('POST', resp))
  }
  private findAllTable(): void {
    this.productosService.findAllCharacters().subscribe( (resp: Producto[]) => {
      this.dataSource.data = resp
      },
      error => {
        swal.fire('Ha Ocurrido un error', 'Intente nuevamente, sí el problema persiste puede que el servicio no este funcionando.', 'error');
      });

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEditPost(producto: Producto) {
    console.log('Edit post', producto);
    this.openDialog(producto);
  }
  

  onDeletePost(producto: Producto) {
    swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.productosService.deletePostById(producto).then(() => {
          swal.fire('Deleted!', 'Your  post has been deleted.', 'success');
        }).catch((error) => {
          swal.fire('Error!', 'There was an error deleting this post', 'error');
        });
      }
    });
  }
  

  onNewPost() {
    this.openDialog();
  }

  openDialog(producto?: Producto): void {
    const config = {
      data: {
        message: producto ? 'Edit Post' : 'New Post',
        content: producto
      }
    };

    const dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);
    });
  }
  
}

