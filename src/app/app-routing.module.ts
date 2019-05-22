import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { ArenaComponent } from './arena/arena.component';
import { PokemonSelecterComponent } from './pokemon-selecter/pokemon-selecter.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path       : '',
    redirectTo :'home',
    pathMatch  :'full'
  },
  {
    path: 'new',
    component: RegistrationComponent
  },
  {
    path: 'arena',
    component: ArenaComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'catalog',
    component: PokemonSelecterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
