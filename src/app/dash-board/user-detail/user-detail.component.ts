import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/api.service';
import { SignupComponent } from 'src/app/users/signup/signup.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Email','Mobile', 'Password','Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort;
  signup: any;

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.getdata()
  }

  getdata(){
    this.api.getAlldata()
    .subscribe({
      next:(res)=>{
       this.dataSource = new MatTableDataSource(res);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        console.log('Didnt get the data')
      }
    })
  }

  deleteproduct(id:number){
    this.api.deleteproduct(id)
    .subscribe({
      next:(res)=>{
        alert("Product deleted successfully")
        this.getdata();
      },
      error:()=>{
        alert("Error in deletion ")
      }
    })

  }

  editProduct(row : any){
    this.signup.open(SignupComponent,{
      data:row
    }).afterClosed().subscribe((val: string)=>{
      if(val === 'update'){
        this.getdata();
      }
    })
  }



    // Filter method 

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

}
