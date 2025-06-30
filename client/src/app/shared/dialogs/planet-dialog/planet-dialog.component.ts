import { Component, Inject, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PlanetsService } from '../../service/planets.service';
import { Planet } from '../../models/planet';
import { catchError, of, tap } from 'rxjs';
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

  private readonly dialogRef = inject(MatDialogRef<PlanetDialogComponent>);
  protected imageName = signal('');

  protected form = new FormGroup({
    imageFile: new FormControl<File | null>(null, [Validators.required]),
    imageUrl: new FormControl<string | null>(null, [Validators.required]),
    planetName: new FormControl<string | null>(null, [Validators.required]),
    description: new FormControl<string | null>(null, [Validators.required]),
    planetRadiusKM: new FormControl<number | null>(null, [Validators.required]),
    planetColor: new FormControl<string | null>(null, [Validators.required]),
    fromSun: new FormControl<number | null>(null),
    fromEarth: new FormControl<number | null>(null, [Validators.required]),
    imageName: new FormControl<string | null>(null, [Validators.required])
  });

  constructor(@Inject(MAT_DIALOG_DATA) public planetData: Planet | undefined) {
    if (planetData) {
      this.imageName.set(planetData?.planetName);
      this.form = new FormGroup({
        imageFile: new FormControl<File | null>(null, [Validators.required]),
        imageUrl: new FormControl<string | null>(planetData?.imageUrl ?? null, [Validators.required]),
        planetName: new FormControl<string | null>(planetData?.planetName ?? null, [Validators.required]),
        description: new FormControl<string | null>(planetData?.description ?? null, [Validators.required]),
        planetRadiusKM: new FormControl<number | null>(planetData?.planetRadiusKM ?? null, [Validators.required]),
        planetColor: new FormControl<string | null>(planetData?.planetColor ?? null, [Validators.required]),
        fromSun: new FormControl<number | null>(planetData?.distInMillionsKM?.fromSun ?? null),
        fromEarth: new FormControl<number | null>(planetData?.distInMillionsKM?.fromEarth ?? null, [Validators.required]),
        imageName: new FormControl<string | null>(planetData?.imageName ?? null, [Validators.required])
      });
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0] || null;
    if (file) {
      this.form.patchValue({ imageFile: file });
      this.imageName.set(file?.name);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createNewPlanet(formData: FormData) {
    this.planetsService
      .createPlanet(formData)
      .pipe(
        tap(data => {
          if (data.id) {
            this.closeDialog();
            this.viewService.setReloadPlanets(true);
          }
        }),
        catchError(err => {
          console.log(err);
          return of([]);
        })
      )
      .subscribe();
  }

  updatePlanet(formData: FormData) {
    this.planetsService
      .updatePlanet(formData, Number(this.planetData?.id))
      .pipe(
        tap(data => {
          if (data.id) {
            this.closeDialog();
            this.viewService.setReloadPlanet(true);
          }
        })
      )
      .subscribe();
  }

  submitForm() {
    const formData = new FormData();
    const { planetName, planetColor, planetRadiusKM, description, imageUrl, imageFile, fromSun, fromEarth } = this.form.value;
    const distInMillionsKM = {
      fromSun: fromSun ?? 0,
      fromEarth: fromEarth ?? 0
    };

    if (imageFile) {
      formData.append('file', imageFile ?? '');
    } else {
      formData.append('imageUrl', imageUrl ?? '');
    }

    formData.append('planetName', planetName ?? '');
    formData.append('planetColor', planetColor ?? '');
    formData.append('planetRadiusKM', planetRadiusKM?.toString() ?? '0');
    formData.append('description', description ?? '');
    formData.append('distInMillionsKM', JSON.stringify(distInMillionsKM));

    if (this.planetData) {
      this.updatePlanet(formData);
    } else {
      this.createNewPlanet(formData);
    }
  }
}
