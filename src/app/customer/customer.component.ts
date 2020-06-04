import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from './customer.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customerList;
  customer;
  ctmrId;
  buttonSave = 'Save';


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      gender: [''],
      birthDate: [''],
      address: [''],
      age: [''],
    });
    this.GetCustomerData();
  }

  OnSubmit() {
    if (this.ctmrId && this.ctmrId > 0) {
      const customerForUpdate = {
        customerId: this.ctmrId,
        firstName: this.customerForm.controls.firstName.value,
        lastName: this.customerForm.controls.lastName.value,
        gender: this.customerForm.controls.gender.value,
        birthDate: this.customerForm.controls.birthDate.value,
        address: this.customerForm.controls.address.value,
        age: this.customerForm.controls.age.value
      };
      this.customerService
        .updateCustomer(customerForUpdate)
        .subscribe((data) => {
          this.GetCustomerData();
          this.customerForm.reset();
          this.ctmrId = 0;
          this.buttonSave = 'Save';
        });
    } else {
      this.customerService
        .createCustomer(this.customerForm.value)
        .subscribe((data) => {
          this.GetCustomerData();
          this.customerForm.reset();
        });
    }
  }

  GetCustomerData() {
    this.customerService.getAllCustomer().subscribe((data) => {
      this.customerList = data;

      for (var i in this.customerList) {
        let birthDate = formatDate(new Date(this.customerList[i].birthDate), 'yyyy-MM-dd', 'en-US');
        this.customerList[i].birthDate = birthDate;
      }
    });
  }

  Delete(id) {
    this.customerService.deleteCustomerById(id).subscribe((data) => {
      this.GetCustomerData();
    });
  }

  Edit(id) {
    this.customerService.getCustomerById(id).subscribe((data) => {
      console.log(data);
      this.ctmrId = id;
      this.buttonSave = 'Update';
      this.customer = data;

      let date = formatDate(new Date(this.customer.birthDate), 'yyyy-MM-dd', 'en-US');
      this.customerForm.patchValue(this.customer);
      this.customerForm.patchValue({birthDate : date});

    });
  }
}
