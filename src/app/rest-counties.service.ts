import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RestCountiesService {

  constructor(private http:HttpClient) { }


  getCountry(lat,long){
    return this.http.get('https://nominatim.openstreetmap.org/reverse?format=json&lat='+lat+'&lon='+long)
                    .pipe(map(res =>{
                      // console.log("API res ::",res);
                      let data = JSON.parse(JSON.stringify(res));
                      return data.address.country;
                    }))
  }
  getAll(){
    return this.http.get('https://restcountries.eu/rest/v2/all').pipe(map(res =>{
      return JSON.stringify(res);
    }))
  }
}
