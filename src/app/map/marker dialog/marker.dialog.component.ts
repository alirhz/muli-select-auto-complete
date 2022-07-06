import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'marker.dialog.html',
})
export class MarkerDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MarkerDialogComponent>
  ) {}

  onButtonClick(result: boolean): void {
    this.dialogRef.close(result);
  }
}
