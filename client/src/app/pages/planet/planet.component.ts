import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, filter, of, startWith, switchMap, tap } from 'rxjs';
import { PlanetsService } from '../../shared/service/planets.service';
import { CommonModule } from '@angular/common';
import { PlanetHeaderComponent } from '../../shared/components/planet-header/planet-header.component';
import { ContainerComponent } from '../../shared/components/container/container.component';
import { toObservable } from '@angular/core/rxjs-interop';
import { ViewService } from '../../shared/service/view.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrl: './planet.component.scss',
  standalone: true,
  imports: [CommonModule, PlanetHeaderComponent, ContainerComponent]
})
export class PlanetComponent {
  private readonly planetsService = inject(PlanetsService);
  private readonly viewService = inject(ViewService);

  private readonly route = inject(ActivatedRoute);

  protected readonly pageData$ = toObservable(this.viewService.shouldReloadPlanet).pipe(
    startWith(true),
    filter(reload => reload),
    switchMap(() => {
      const id = this.route.snapshot.paramMap.get('id');
      return this.planetsService.getPlanetById(Number(id)).pipe(
        tap(() => this.viewService.setReloadPlanet(false)),
        catchError(err => {
          console.error(err);
          return of(null);
        })
      );
    })
  );
}
