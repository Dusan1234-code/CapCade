import { Injectable, signal } from '@angular/core';
import { TableView } from '../models/general';

@Injectable({ providedIn: 'root' })
export class ViewService {
  tableView = signal(TableView.TABLE);
  shouldReloadPlanets = signal(true);

  setTableView(val: TableView) {
    this.tableView.set(val);
  }

  setReloadPlanets(shouldReload: boolean) {
    this.shouldReloadPlanets.set(shouldReload);
  }
}
