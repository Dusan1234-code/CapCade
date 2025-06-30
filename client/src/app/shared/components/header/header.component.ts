import { toObservable } from '@angular/core/rxjs-interop';
import { Component, inject } from '@angular/core';
import { TableView } from '../../models/general';
import { ViewService } from '../../service/view.service';
import { MatDialog } from '@angular/material/dialog';
import { PlanetDialogComponent } from '../../dialogs/planet-dialog/planet-dialog.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { ContainerComponent } from '../container/container.component';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatIcon, ContainerComponent, MatInputModule]
})
export class HeaderComponent {
  private readonly viewService = inject(ViewService);

  private readonly dialog = inject(MatDialog);

  protected readonly tableView = this.viewService.tableView;
  TableView = TableView;
  protected searchControl = new FormControl('');

  private readonly destroy$ = new Subject<void>();

  changeView(type: TableView) {
    if (type === TableView.GRID) {
      this.viewService.setTableView(TableView.TABLE);
      return;
    }
    this.viewService.setTableView(TableView.GRID);
  }

  openDialog() {
    this.dialog.open(PlanetDialogComponent);
  }

  getViewType(viewType: TableView) {
    if (viewType === this.viewService.tableView()) {
      return '';
    }
    return 'selected';
  }

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        tap(val => {
          this.viewService.setSearchInputValue(val as string);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
