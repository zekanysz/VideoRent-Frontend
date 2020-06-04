import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  constructor(private http: HttpClient) {}

  createRent(RentData){
    return this.http.post('https://localhost:5001/api/Rent', RentData);
  }

  getAllMovie(){
    return this.http.get('https://localhost:5001/api/Movie');
  }

  getAllAvailableMovie(){
    return this.http.get('https://localhost:5001/api/Movie/Available');

  }

  getAllCustomer(){
    return this.http.get('https://localhost:5001/api/Customer');
  }

  getAllRent(){
    return this.http.get('https://localhost:5001/api/Rent');
  }

  getMovieById(movieId){
    return this.http.get('https://localhost:5001/api/Movie/' + movieId );
  }

   getMovieTitleById(movieId){
    return this.http.get('https://localhost:5001/api/Movie/GetTitleById/' + movieId, { responseType: 'text' });
  }

  getCustomerNameById(customerId){
    return this.http.get('https://localhost:5001/api/Customer/GetCustomerNameById/' + customerId, { responseType: 'text' });
  }
  getCustomerById(customerId){
    return this.http.get('https://localhost:5001/api/Customer/' + customerId );
  }

  updateMovie(MovieData){
    return this.http.put('https://localhost:5001/api/Movie', MovieData);
  }

  getRentById(rentId){
    return this.http.get('https://localhost:5001/api/Rent/' + rentId );
  }


  updateRent(RentData){
    return this.http.put('https://localhost:5001/api/Rent', RentData);
  }

  deleteRentById(rentId){
    return this.http.delete('https://localhost:5001/api/Rent/' + rentId);
  }
}
