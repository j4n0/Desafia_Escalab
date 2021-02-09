import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileI } from '../../core/services/model/file.interface';
import { User } from './../../core/services/model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData$: Observable<firebase.User>;
  private filePath: string;
  constructor(private afAuth: AngularFireAuth, 
    private router: Router, 
    private storage: AngularFireStorage
    ) { 
    this.userData$ = afAuth.authState;
  }

  login(user: User) {
    const { email, password } = user;
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

    // Servicio N°13 Cierre de Seccion
    logout() {
      this.afAuth.auth.signOut()
        .then(() => {
          this.router.navigate(['/']);
        })
        .catch(() => {
          this.router.navigate(['/login']);
        });
    }


    preSaveUserProfile(user: User, image?: FileI): void {
      if (image) {
        this.uploadImage(user, image);
      } else {
        this.saveUserProfile(user);
      }
    }
  
    private uploadImage(user: User, image: FileI): void {
      this.filePath = `images/${image.name}`;
      const fileRef = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath, image);
      task.snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(urlImage => {
              user.photoURL = urlImage;
              this.saveUserProfile(user);
            });
          })
        ).subscribe();
    }
  
    private saveUserProfile(user: User) {
      console.log('USER', user)
      this.afAuth.auth.currentUser.updateProfile({
        displayName: user.displayName,
        photoURL: user.photoURL
      })
        .then(() => console.log('User updated!'))
        .catch(err => console.log('Error', err));
    }
}
