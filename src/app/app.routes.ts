import { Routes } from '@angular/router';
import { PrincipalComponent} from './components/principal/principal.component';
import {CompraComponent} from './components/compra/compra.component';
import { LoginComponent } from './components/login/login.component';
import { MisComprasComponent } from './components/mis-compras/mis-compras.component';
import { RegistroComponent } from './components/registro/registro.component';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
    {path:'', redirectTo:'eventos', pathMatch:'full'},
    {path:'eventos', component:PrincipalComponent},
    { path: 'mis-compras', component: MisComprasComponent, canActivate:[authGuard] },
    {path:'compra', component:CompraComponent},
    {path:'login', component:LoginComponent, canActivate:[noAuthGuard]},
    {path:'registro', component:RegistroComponent, canActivate:[noAuthGuard]},
    {path:'**', redirectTo:'eventos'},
];
