import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  username : any = null ;
  userData : any
  constructor(private router :Router,private api : ApiService) { }

  ngOnInit(): void {
    this.userData= JSON.parse(localStorage.getItem('userData') || '')
  }
  logOut(){
    if(this.router.navigate!){
      localStorage.removeItem('userData')
      this.router.navigate(['/login'])
      // this.api.showSuccess('','logout successfully')
    }
  }

}
