import { TableView } from './../../shared/models/general';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { PlanetsService } from '../../shared/service/planets.service';
import { catchError, filter, finalize, of, startWith, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ViewService } from '../../shared/service/view.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Planet } from '../../shared/models/planet';
import { toObservable } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, MatTableModule, MatSortModule, RouterModule],
  standalone: true
})
export class HomeComponent {
  private readonly planetService = inject(PlanetsService);
  protected readonly viewService = inject(ViewService);

  protected TableView = TableView;
  protected loading = signal(false);
  protected displayedColumns = ['Name', 'Color', 'Radius in km', 'Dist. from Sun', 'Dis. from Earth'];

  protected dataSource = new MatTableDataSource<Planet>([]);

  @ViewChild(MatSort) sort!: MatSort;

  protected readonly pageData$ = toObservable(this.viewService.shouldReloadPlanets).pipe(
    startWith(true),
    filter(reload => reload),
    tap(() => this.loading.set(true)),
    switchMap(() => {
      return this.planetService.getPlanets().pipe(
        tap(() => this.viewService.setReloadPlanets(false)),
        catchError(err => {
          console.error(err);
          return of([]);
        }),
        finalize(() => this.loading.set(false))
      );
    })
  );
}
