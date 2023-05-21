import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ProductComponent } from '../dialog/product/product.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {

  displayedColumns : string[] = ['name', 'categoryName', 'description', 'price', 'edit'];
  dataSource:any;
  length1:any;
  responseMessage:any;

  constructor(private productService: ProductService,
    private dialog:MatDialog, 
    private snackbarService: SnackbarService,
    private router:Router) { }

  ngOnInit(): void {
    this.tableDate();
  }

  tableDate(){
    this.productService.getProducts().subscribe((response:any)=>{
      this.dataSource = new MatTableDataSource(response);
    }, (error:any)=>{
      console.log(error.error?.message);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter =filterValue.trim().toLowerCase();
  }

  handleAddAction(){
    const dialoConfig = new MatDialogConfig();
    dialoConfig.data={
      action:'Agregar'
    };
    dialoConfig.width="850px";
    const dialogRef = this.dialog.open(ProductComponent,dialoConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onAddProduct.subscribe((response)=>{
      this.tableDate();
    })
  }

  handleEditAction(values:any){
    const dialoConfig = new MatDialogConfig();
    dialoConfig.data={
      action:'Editar',
      data:values
    };
    dialoConfig.width="850px";
    const dialogRef = this.dialog.open(ProductComponent,dialoConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onEditProduct.subscribe((response)=>{
      this.tableDate();
    })
  }

  handleDeleteAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      message:'Borrar '+values.name,
      confirmation:true
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
      this.deleteProduct(values.id);
      dialogRef.close();
    })
  }

  deleteProduct(id:any){
    this.productService.delete(id).subscribe((response:any)=>{
      this.tableDate();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage, "Success")
    }, (error:any)=>{
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })

  }

  onChange(status:any, id:any){
  var data ={
    status: status.toString(),
    id:id
  }

  this.productService.updateStatus(data).subscribe((response:any)=>{
    this.responseMessage = response?.message;
    this.snackbarService.openSnackBar(this.responseMessage, "Success");
  }, (error:any)=>{
    console.log(error);
    if(error.error?.message){
      this.responseMessage = error.error?.message;
    }else{
      this.responseMessage = GlobalConstants.genericError;
    }
    this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);

  })

  }
}
