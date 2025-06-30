import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ContainerComponent } from '../container/container.component';
import { Planet } from '../../models/planet';
import { MatDialog } from '@angular/material/dialog';
import { PlanetDialogComponent } from '../../dialogs/planet-dialog/planet-dialog.component';
import { RouterLink } from '@angular/router';
import { DeletePlanetDialogComponent } from '../../dialogs/delete-planet-dialog/delete-planet-dialog.component';

@Component({
  selector: 'app-planet-header',
  templateUrl: './planet-header.component.html',
  styleUrl: './planet-header.component.scss',
  standalone: true,
  imports: [CommonModule, ContainerComponent, RouterLink]
})
export class PlanetHeaderComponent {
  @Input() planetData: Planet | undefined;
  private readonly dialog = inject(MatDialog);

  openEditDialog() {
    console.log(this.planetData);
    this.dialog.open(PlanetDialogComponent, { data: this.planetData });
  }

  openDeleteDialog() {
    this.dialog.open(DeletePlanetDialogComponent, { data: this.planetData });
  }
}
