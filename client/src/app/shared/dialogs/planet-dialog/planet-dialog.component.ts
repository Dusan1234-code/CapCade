import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PlanetsService } from '../../service/planets.service';
import { Planet } from '../../models/planet';
import { Subject, takeUntil, tap } from 'rxjs';
import { ViewService } from '../../service/view.service';

@Component({
  selector: 'app-planet-dialog',
  templateUrl: './planet-dialog.component.html',
  styleUrl: './planet-dialog.component.scss',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule]
})
export class PlanetDialogComponent {
  private readonly planetsService = inject(PlanetsService);
  private readonly viewService = inject(ViewService);

  private readonly destroy$ = new Subject<void>();
  private readonly dialogRef = inject(MatDialogRef<PlanetDialogComponent>);

  protected form = new FormGroup({
    imageUrl: new FormControl<File | null>(null, [Validators.required]),
    planetName: new FormControl<string | null>(null, [Validators.email, Validators.required]),
    description: new FormControl<string | null>(null, [Validators.required]),
    planetRadiusKM: new FormControl<number | null>(null, [Validators.required]),
    planetColor: new FormControl<string | null>(null, [Validators.required]),
    fromSun: new FormControl<string | null>(null),
    fromEarth: new FormControl<string | null>(null, [Validators.required])
  });

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0] || null;
    this.form.patchValue({ imageUrl: file });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submitForm() {
    const formData = new FormData();
    const { planetName, planetColor, planetRadiusKM, description, imageUrl, fromSun, fromEarth } = this.form.value;
    const distInMillionsKM = {
      fromSun: Number(fromSun) ?? 0,
      fromEarth: Number(fromEarth) ?? 0
    };

    formData.append('file', imageUrl ?? '');
    formData.append('planetName', planetName ?? '');
    formData.append('planetColor', planetColor ?? '');
    formData.append('planetRadiusKM', planetRadiusKM?.toString() ?? '0');
    formData.append('description', description ?? '');

    formData.append('distInMillionsKM', JSON.stringify(distInMillionsKM));
    console.log(formData);

    this.planetsService
      .createPlanet(formData)
      .pipe(
        tap(data => {
          if (data.id) {
            this.closeDialog();
            this.viewService.setReloadPlanets(true);
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
