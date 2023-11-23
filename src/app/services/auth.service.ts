import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import  fireAuth  from 'firebase/compat/app';
import { TwitterAuthProvider,getAuth, signInWithPopup } from "firebase/auth";


@Injectable({  providedIn: 'root'
})
export class AuthService {
  usuario:any;
  constructor(private afAuth:AngularFireAuth) { }
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
}
