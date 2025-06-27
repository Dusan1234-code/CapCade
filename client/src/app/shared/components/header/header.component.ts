import { Component, inject } from '@angular/core';
import { TableView } from '../../models/general';
import { ViewService } from '../../service/view.service';
import { MatDialog } from '@angular/material/dialog';
import { PlanetDialogComponent } from '../../dialogs/planet-dialog/planet-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
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
