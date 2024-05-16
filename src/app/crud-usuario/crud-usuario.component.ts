import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection, setDoc, getDoc, getDocs, deleteDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-crud-usuario',
  standalone: true,
  imports: [NgFor],
  templateUrl: './crud-usuario.component.html',
  styleUrl: './crud-usuario.component.scss'
})
export class CrudUsuarioComponent {

  constructor() { }
  listUsuarios: Usuario[] = [];
  firestore = inject(Firestore);

  async pegarTodos(){
    const querySnapshot = await getDocs(collection(this.firestore, 'usuarios'));
    this.listUsuarios = [];
    querySnapshot.forEach((doc) => {
      const usuario = new Usuario(doc.get('nome'), doc.get('email'), doc.get('produtos'));
      this.listUsuarios.push(usuario);
    });
  }



  async adicionarUsuario(){

    // let docRef = await addDoc(collection(this.firestore, 'usuarios'), {
    // }).then((docRef) => {
    //   console.log('Document written with ID: ', docRef.id);
    // }).catch((error) => {
    //   console.error('Error adding document: ', error);
    // }
    // );




    let usuario = new Usuario('haahahah', 'tste@teste.com', [new Produto('teste', 10)]);
    let resposta = await addDoc(collection(this.firestore, 'usuarios'), usuario.toJson(), );
    console.log(resposta);
    // //create a document using the name as the id
    // let resposta = await addDoc(collection(this.firestore, 'usuarios'), usuario.toJson());



  }


  async filterUsuarioByName(nome: string){
    const querySnapshot = await getDocs(collection(this.firestore, 'usuarios'));
    this.listUsuarios = [];
    querySnapshot.forEach((doc) => {
      if(doc.get('nome') == nome){
        const usuario = new Usuario(doc.get('nome'), doc.get('email'), doc.get('produtos'));
        this.listUsuarios.push(usuario);
      }
    });
  }





  async adicionarUsuarioSet(){
    // pegue o primeiro usuario para editar dps
    const querySnapshot = await getDocs(collection(this.firestore, 'usuarios'));
    let doc = querySnapshot.docs[1];
//change name to hahaha
    let usuario = {
      nome: 'hahaha',
    
      produtos: [
        {
          nome: 'produto',
          valor: 10
        }
      ]
    }

    let resposta = await setDoc(doc.ref, usuario);

    console.log(resposta);
  }

  async deletarUsuario(){
    const querySnapshot = await getDocs(collection(this.firestore, 'usuarios'));
    let doc = querySnapshot.docs[1];

    let resposta = await deleteDoc(doc.ref);

    console.log(resposta);
  
  }



}

class Usuario {
  nome: string;
  email: string;
  produtos: Produto[];

  constructor(nome: string, email: string, produtos: Produto[]) {
    this.nome = nome;
    this.email = email;
    this.produtos = produtos;
  }

  toJson() {
    return {
      nome: this.nome,
      email: this.email,
      produtos: this.produtos.map(produto => produto.toJson())
    }
  }

  fromJson(json: any) {
    this.nome = json.nome;
    this.email = json.email;
    this.produtos = json.produtos.map((produto: Produto) => new Produto(produto.nome, produto.valor));
  }


}

class Produto {
  nome: string;
  valor: number;

  constructor(nome: string, valor: number) {
    this.nome = nome;
    this.valor = valor;
  }

  fromJson(json: any) {
    this.nome = json.nome;
    this.valor = json.valor;
  }
  

  toJson() {
    return {
      nome: this.nome,
      valor: this.valor
    }
  }

}