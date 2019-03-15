import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestCountiesService } from '../rest-counties.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent implements OnInit {

  county: any = {name:"India",callingCodes:"91",flag:"https://restcountries.eu/data/ind.svg"};
  geolocationPosition;
  countries=[];
  list:any=[];
  reg ='^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';

  //Create Visa Form Group
  deskForm = new  FormGroup({
    name:new FormControl('',Validators.required),
    country:new FormControl('',Validators.required),
    address:new FormControl('',Validators.required),
    email:new FormControl('',Validators.compose([Validators.required, Validators.pattern(this.reg)])),
    phone:new FormControl('',Validators.compose([ Validators.required, Validators.pattern("[0-9]{10}")]))
  });

  constructor(private router:Router,private geoService:RestCountiesService ,private sanitizer: DomSanitizer) { 
    this.geoService.getAll().subscribe(res =>{
      let data = JSON.parse(res);
      data.forEach(element => {
        this.countries.push({country:element.name,phone:element.callingCodes[0],flag:element.flag})
      });
      // console.log(this.countries);
    })
    if (navigator.geolocation) {        
      navigator.geolocation.getCurrentPosition(position =>{
        this.geoService.getCountry(position.coords.latitude,position.coords.longitude).subscribe(
          res =>{
            this.countries.forEach(el =>{
              if(el.country == res){
                this.county = el;
              }
            })
          } 
        )
      })      
    } 
  }

  ngOnInit() {
    var resultTable = JSON.parse(sessionStorage.getItem('list'))
     this.list = resultTable ? resultTable : [];

  }

  countryflag(){
    return this.sanitizer.bypassSecurityTrustStyle(`url(${this.county.flag})`);
  }

  //onSubmit Actions
  onSubmit(){    
    console.log("check the form ",this.deskForm.value);
    let data = this.deskForm.value || [];  
    console.log(data,"data after before push");
      
    this.list.push(data); 
    this.move();
  }
  move(){
    sessionStorage.setItem('list',JSON.stringify(this.list));
    this.router.navigate(['list']);
  }
}
