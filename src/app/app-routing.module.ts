import { NgModule              } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';

import { ArenaComponent           } from './arena/arena.component';
import { PokemonSelecterComponent } from './pokemon-selecter/pokemon-selecter.component';

const routes: Routes = [
  {
    path       : '',
    redirectTo :'catalog',
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
    path: 'catalog',
    component: PokemonSelecterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
