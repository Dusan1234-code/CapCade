import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ContainerComponent } from './shared/components/container/container.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { interceptor } from './shared/interceptor/interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule
  ],
  providers: [provideAnimationsAsync(), provideHttpClient(withInterceptors([interceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule {}
