import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../core/services/model/User';
import { AuthService } from '../../core/services/auth.service';
import swal from'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor( 
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private router :Router
    ) { }

    loginForm = new FormGroup({
      email:new FormControl('', Validators.required),
      password : new FormControl('', Validators.required)
    })

    private buildForm(): void {
      this.form = this.formBuilder.group({
        email: ['', Validators.compose([
          Validators.required, Validators.email])
        ],
        password: ['', [Validators.required]],
      });
    }

  ngOnInit() {
   
   //revisar si entra firestore
   // const user: User={
  //  email:'nelson.sanhueza@saludelbosque.cl',
  //  password:'123456'

    //};
    //this.authService.loginByEmail(user);

  }

  onLogin(form: User){
  this.authService.login(form)
  .then(res => {
    swal.fire('Enhorabuena', 'Ahora puedes Agregar Medicamentos!', 'success');
    this.router.navigate(['/admin/profile']);

  //console.log('form', form);
})
.catch(error => {
  if (error.code === 'auth/wrong-password') {
    swal.fire('Ha Ocurrido un error', 'La contraseña ingresada no es válida', 'error');
  } else {
    swal.fire('Ha Ocurrido un error', 'Intente nuevamente, sí el problema persiste puede que el servicio no este funcionando.', 'error');
  }
});

}


}
