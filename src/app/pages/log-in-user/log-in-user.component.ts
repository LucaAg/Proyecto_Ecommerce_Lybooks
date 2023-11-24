import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in-user',
  templateUrl: './log-in-user.component.html',
  styleUrls: ['./log-in-user.component.css']
})
export class LogInUserComponent {
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  patternContraseña:string=".{6,}";
  formLogin: FormGroup;
  email:string = "";
  password:string = "";

  constructor(private formBuilder:FormBuilder,
    private auth:AuthService,
    private router: Router)
    {
      this.formLogin = this.formBuilder.group({
        email: ['', [Validators.required,Validators.pattern(this.emailPattern)]],
        password: ['', [Validators.required,Validators.pattern(this.patternContraseña)]],
      });
    }

    async logIn() {
      if (this.formLogin.valid) {
        this.email = this.formLogin.getRawValue().email;
        this.password = this.formLogin.getRawValue().password;
        //this.activarSpinner();
        //let verificacion:string = "";
        try {
          await this.auth.logInWithEmailAndPassw(this.email, this.password).then(async(data:any)=>{
              // await this.obtenerDatosUsuario().then((user)=>{
              //   verificacion = this.verificarUsuario(datos,usuario);
              //     if (verificacion != "verificado") {
              //       this.auth.cerrarSesion();
              //       this.sweetServ.mensajeError(verificacion, "Iniciar sesión");
              //     } else {
              //       this.auth.setLogueado();
              //       this.crearLog(usuario);
              //       this.sweetServ.mensajeExitoso("Inicio de sesión exitoso.", "Iniciar sesión");
              //       this.router.navigate(['bienvenida']);
              //     }          
              // });
              console.log(data);
            });       
          } catch (error) {
          console.log(error);
        }
      }
    }
  
}
