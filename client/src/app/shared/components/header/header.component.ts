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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatIcon, ContainerComponent, MatInputModule]
})
export class HeaderComponent {
  private readonly ViewService = inject(ViewService);
  private readonly dialog = inject(MatDialog);
  TableView = TableView;

  changeView(type: TableView) {
    if (type === TableView.GRID) {
      this.ViewService.setTableView(TableView.TABLE);
      return;
    }
    this.ViewService.setTableView(TableView.GRID);
  }

  openDialog() {
    this.dialog.open(PlanetDialogComponent);
  }
}
