import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlanetsService } from '../../service/planets.service';
import { Planet } from '../../models/planet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-delete-planet-dialog',
  templateUrl: './delete-planet-dialog.component.html',
  styleUrl: './delete-planet-dialog.component.scss',
  standalone: true,
  imports: [CommonModule]
})
export class DeletePlanetDialogComponent {
  private readonly planetService = inject(PlanetsService);

  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  private readonly dialogRef = inject(MatDialogRef<DeletePlanetDialogComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public planet: Planet | undefined) {}

  deletePlanet() {
    this.planetService
      .deletePlanet(Number(this.planet?.id))
      .pipe(
        tap(res => {
          if (res[0].id) {
            this.dialogRef.close();
            this.router.navigate(['/']);
          }
        }),
        catchError(error => {
          this.snackBar.open('Something went wrong please try again', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          console.error('Error deleting planet:', error);
          return of([]);
        })
      )
      .subscribe();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
