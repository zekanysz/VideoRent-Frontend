import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerComponent } from './customer.component';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {}

    createCustomer(CustomerData){
      return this.http.post('https://localhost:5001/api/Customer', CustomerData);
    }

    updateCustomer(CustomerData){
      return this.http.put('https://localhost:5001/api/Customer', CustomerData);
    }

    getAllCustomer(){
      return this.http.get('https://localhost:5001/api/Customer');
    }

    getCustomerById(customerId){
      return this.http.get('https://localhost:5001/api/Customer/' + customerId );
    }

    deleteCustomerById(customerId){
      return this.http.delete('https://localhost:5001/api/Customer/' + customerId);
    }

}
