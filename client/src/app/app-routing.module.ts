import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [{ path: '', component: HomeComponent }],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
