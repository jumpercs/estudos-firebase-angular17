import { Component, inject } from '@angular/core';

import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, deleteUser } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  auth = inject(Auth);

  constructor() { }

 
  async login() {
    let response  = await signInWithEmailAndPassword(getAuth(), 'jasminepinheiro14@gmail.com', '123456');
    console.log(response);
  }

  async logout() {
    await getAuth().signOut();
  }


  async deleteUser() {
 await deleteUser(getAuth().currentUser!);
  }

  async register() {
    let response = createUserWithEmailAndPassword(getAuth(), 'jasminepinheiro14@gmail.com', '123456').catch(console.error);

    console.log(response);

}

}
