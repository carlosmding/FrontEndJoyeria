import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  handleSignupAction(){
    const dialogCongig = new MatDialogConfig();
    dialogCongig.width= "550px";
    this.dialog.open(SignupComponent, dialogCongig)
  }

  handleLoginAction(){
    const dialogCongig = new MatDialogConfig();
    dialogCongig.width= "550px";
    this.dialog.open(LoginComponent, dialogCongig)
  }

}
