import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import  fireAuth  from 'firebase/compat/app';
import { TwitterAuthProvider,getAuth, signInWithPopup } from "firebase/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({  providedIn: 'root'
})
export class AuthService {
  usuario:any;
  constructor(private afAuth:AngularFireAuth,private angularFirestore: AngularFirestore) { }
   //@ts-ignore
  async loginGoogle()
  {
    try {
      return this.afAuth.signInWithPopup(new fireAuth.auth.GoogleAuthProvider())
    } catch (error) {
      console.log(error);
    }
  }

  //@ts-ignore
  async loginTwitter()
  {
    const provider = new TwitterAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      const credential = TwitterAuthProvider.credentialFromResult(result);
      if(credential)
      {
        const token = credential.accessToken;
        const secret = credential.secret;
      }

      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      console.log(user);
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = TwitterAuthProvider.credentialFromError(error);
      // ...
      console.log(error);
    });
  }

  async logInWithEmailAndPassw(email:string,contraseña:string) {
    return new Promise((resolve, rejected) => {
      this.afAuth.signInWithEmailAndPassword(email, contraseña).then(async usuario => {
        resolve(usuario);
        console.log(usuario);
      })
      .catch(error => rejected(error));
    });
  } 

  logOut() {
    this.afAuth.signOut();
  }

  private createMessage(errorCode: string): string {
    let message: string = '';
    switch (errorCode) {
      case 'auth/internal-error':
        message = 'Los campos estan vacios';
        break;
      case 'auth/operation-not-allowed':
        message = 'La operación no está permitida.';
        break;
      case 'auth/email-already-in-use':
        message = 'El email ya está registrado.';
        break;
      case 'auth/invalid-email':
        message = 'El email no es valido.';
        break;
      case 'auth/weak-password':
        message = 'La contraseña debe tener al menos 6 caracteres';
        break;
      default:
        message = 'Error al crear el usuario.';
        break;
    }
    return message;
  } 

  userRegister(user:any)
  {
    this.afAuth.createUserWithEmailAndPassword(user.email,user.password)
    .then((datos)=>{
      //datos.user?.sendEmailVerification();
      this.angularFirestore.collection('Users').doc(datos.user?.uid)
      .set({
        id: datos.user?.uid,
        name: user.name,
        lastName: user.lastName,
        age: user.age,
        email: user.email,
        password: user.password,
        userImage: user.image,
        approved: false,
      }).then(()=>{
        //this.sweetServi.mensajeExitoso("Registro existoso!","registro");
        console.log("Un exito!");
      }).catch((error)=>{
        console.log(this.createMessage(error.code));
      })
    })
    .catch((error)=>{
      console.log(this.createMessage(error.code));
    });
  }
}
