import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {

  passwordPattern:string=".{6,}";
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  formUser: FormGroup;
  newUser:User = new User();

  constructor(private formBuilder:FormBuilder,private angularFireStorage: AngularFireStorage,
    private authServ:AuthService)
  {
    this.formUser = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(99)]],
      email: ['', [Validators.required,Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required,Validators.pattern(this.passwordPattern)]],
      image: ['', [Validators.required]],
    });
  }

  signUpUser()
  {
    if(this.formUser.valid)
    {
      if(this.newUser.image != '')
      {
        this.newUser.name = this.formUser.getRawValue().name;
        this.newUser.lastName = this.formUser.getRawValue().lastName;
        this.newUser.age = this.formUser.getRawValue().age;
        this.newUser.email = this.formUser.getRawValue().email;
        this.newUser.password = this.formUser.getRawValue().password;
        this.authServ.userRegister(this.newUser);
        console.log(this.newUser);
        setTimeout(()=>{
          this.formUser.reset();
          this.newUser = new User();
        },2000);       
      }
    }
  }

  async loadImage($event: any) {
    const file = $event.target.files[0];
    const path = 'img ' + Date.now() + Math.random() * 10;
    const reference = this.angularFireStorage.ref(path);
    await reference.put(file).then(async () => {
      reference.getDownloadURL().subscribe((urlImg) => {
        this.newUser.image = urlImg;
      });
    });
  }
}
