import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { PlanetsService } from '../../shared/service/planets.service';
import { CommonModule } from '@angular/common';
import { PlanetHeaderComponent } from '../../shared/components/planet-header/planet-header.component';
import { ContainerComponent } from '../../shared/components/container/container.component';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrl: './planet.component.scss',
  standalone: true,
  imports: [CommonModule, PlanetHeaderComponent, ContainerComponent]
})
export class PlanetComponent {
  private readonly planetsService = inject(PlanetsService);
  private readonly route = inject(ActivatedRoute);

  protected pageData$ = this.route.paramMap.pipe(
    map(paramMap => paramMap.get('id')),
    switchMap(id => {
      if (!id) throw new Error('No planet ID provided');
      return this.planetsService.getPlanetById(Number(id));
    })
  );
}
