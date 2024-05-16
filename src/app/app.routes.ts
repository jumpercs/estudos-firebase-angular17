import { Routes } from '@angular/router';
import { CrudUsuarioComponent } from './crud-usuario/crud-usuario.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [

    {
        path: '',
        component: CrudUsuarioComponent,
    },
 
    {
        path: 'login',
        component: LoginComponent,
    },


];
