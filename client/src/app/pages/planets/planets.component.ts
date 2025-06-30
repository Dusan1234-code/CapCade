import { TableView } from '../../shared/models/general';
import { AfterViewInit, Component, inject, signal, ViewChild } from '@angular/core';
import { PlanetsService } from '../../shared/service/planets.service';
import { catchError, combineLatest, filter, finalize, map, of, startWith, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ViewService } from '../../shared/service/view.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Planet } from '../../shared/models/planet';
import { toObservable } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss'],
  imports: [CommonModule, MatTableModule, MatSortModule, RouterModule],
  standalone: true
})
export class PlanetsComponent implements AfterViewInit {
  private readonly planetService = inject(PlanetsService);
  protected readonly viewService = inject(ViewService);

  protected TableView = TableView;
  protected loading = signal(false);

  protected displayedColumns = ['Name', 'Color', 'Radius in km', 'Dist. from Sun', 'Dist. from Earth'];
  protected dataSource = new MatTableDataSource<Planet>([]);

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.pageData$.subscribe(planets => {
      this.dataSource.data = planets;
    });
  }

  protected readonly pageData$ = combineLatest({
    shouldReload: toObservable(this.viewService.shouldReloadPlanets).pipe(
      startWith(true),
      filter(reload => reload),
      tap(() => this.loading.set(true))
    ),
    search: toObservable(this.viewService.searchInputValue)
  }).pipe(
    switchMap(({ shouldReload, search }) =>
      this.planetService.getPlanets().pipe(
        map(planets => this.filterPlanets(planets, search)),
        tap(() => this.viewService.setReloadPlanets(false)),
        catchError(err => {
          console.error(err);
          return of([]);
        }),
        finalize(() => this.loading.set(false))
      )
    )
  );

  private filterPlanets(planets: Planet[], search: string): Planet[] {
    if (!search.trim()) {
      return planets;
    }
    const lowerSearch = search.toLowerCase();
    return planets.filter(planet => planet.planetName.toLowerCase().includes(lowerSearch));
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
