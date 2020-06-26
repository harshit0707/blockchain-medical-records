import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-view-individual-data',
  templateUrl: './view-individual-data.component.html',
  styleUrls: ['./view-individual-data.component.scss']
})
export class ViewIndividualDataComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ViewIndividualDataComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
