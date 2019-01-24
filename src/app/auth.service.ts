import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase/app';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: any;
  displayName: any;
  phoneNumber: any;

  constructor(public afAuth: AngularFireAuth,
    public router: Router) {
    /* Saving user data as an object in localstorage if logged out than set to null */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user; // Setting up user data in userData var
        localStorage.setItem('userInfo', JSON.stringify(this.user));
      } else {
        this.user = null;
        localStorage.setItem('userInfo', null);
      }
    })
  }

  /* register user and update the display name or user name */
  public registerUser = (data: any) => {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password)
        .then(userData => {
          localStorage.setItem('displayName', data.displayName);
          let user = firebase.auth().currentUser;
          this.displayName = localStorage.getItem("displayName");
          if (this.displayName !== null) {
            user.updateProfile({
              displayName: this.displayName,
              photoURL: null
            }).then(() => {
              localStorage.removeItem('displayName');
              localStorage.removeItem('userInfo');
              localStorage.setItem('userInfo', JSON.stringify(user));
            }).then(() => {
              var user = firebase.auth().currentUser;
              user.sendEmailVerification().then(function () {
                resolve();
              })
            }).catch(function (err) {
              // An error happened.
              reject(err)
            });
          }
          resolve(userData)
        },
          err => reject(err));
    });
  }//end registerUser

  /* forget password */
  public forgotPassword = (passwordResetEmail) => {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
        .then(() =>
          resolve(),
          err => reject(err));
    });
  }//end forgotPassword

  /* login with valid email */
  public loginEmail = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          let userData = firebase.auth().currentUser;
          if (userData !== null) {
            if (userData.emailVerified) {
              resolve(user)
            }
            else {
              reject("Please Verifiy your Email");
            }
          }
          else {
            reject("some error,reload your page");
          }
        },
          err => reject(err));
    });
  }//end loginEmail

  /* login using google */
  public loginWithGoogle = () => {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }//end loginWithGoogle

  /* login using facebook */
  public loginWithFacebook = () => {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  } //end loginWithFacebook

  /* check if user is avaiable for guard */
  public isLoggedIn = () => {
    if (localStorage.getItem("userInfo") === "null") {
      return false;
    } else {
      return true;
    }
  }// end isLoggedIn


  /* SetUserData(user,data) {
     const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.user.uid}`);
     const userData: UserData= {
       uid: user.user.uid,
       email: user.user.email,
       displayName: data.displayName,
       phoneNumber: data.phoneNumber
     }
     return userRef.set(userData, {
       merge: true
     })
   }*/

  /* logout - remove item from local storage ang goto login page */
  public logout = () => {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('userInfo');
      this.router.navigate(['/']);
    })
  }//end logout

}
