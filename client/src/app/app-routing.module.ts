import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { PlanetComponent } from './pages/planet/planet.component';

const routes: Routes = [
  { path: '', redirectTo: '/planets', pathMatch: 'full' },
  {
    path: 'planets',
    component: MainLayoutComponent,
    children: [{ path: '', component: HomeComponent }]
  },
  {
    path: 'planets/:id',
    component: PlanetComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
