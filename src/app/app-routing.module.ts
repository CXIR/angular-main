import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';

import {ArenaComponent} from './arena/arena.component';
import {PokemonSelecterComponent} from './pokemon-selecter/pokemon-selecter.component';

const routes: Routes = [
  {
    path       : '',
    redirectTo : 'catalog',
    pathMatch  : 'full'
  },
  {
    path: 'new',
    component: RegistrationComponent
  },
  {
    path: 'arena/:pokemon1name/:pokemon2name',
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
