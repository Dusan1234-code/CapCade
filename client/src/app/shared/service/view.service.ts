import { Injectable, signal } from '@angular/core';
import { TableView } from '../models/general';

@Injectable({ providedIn: 'root' })
export class ViewService {
  tableView = signal(TableView.TABLE);
  shouldReloadPlanets = signal(true);
  shouldReloadPlanet = signal(true);
  searchInputValue = signal('');

  setTableView(val: TableView) {
    this.tableView.set(val);
  }

  setReloadPlanets(shouldReload: boolean) {
    this.shouldReloadPlanets.set(shouldReload);
  }

  setReloadPlanet(shouldReload: boolean) {
    this.shouldReloadPlanet.set(shouldReload);
  }

  setSearchInputValue(value: string) {
    this.searchInputValue.set(value);
  }
}
