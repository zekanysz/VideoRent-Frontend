import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RentService } from './rent.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css'],
})
export class RentComponent implements OnInit {
  rentForm: FormGroup;
  rentList;
  rntId;
  buttonSave = 'Save';
  title;
  dis;
  actualMovie;

  movieList;
  allMovieList;

  customerList;
  rentedMovieWithCustomerList: Array<object> = [];
  movie: any = {};
  public mvTitle: string = '';
  cstmrName: string = '';

  constructor(private fb: FormBuilder, private RentService: RentService) { }

  ngOnInit(): void {
    this.rentForm = this.fb.group({
      rentStatus: '',
      customerId: '',
      customerName: '',
      movieId: '',
      movieTitle: '',
      startDate: '',
      returnDate: '',
    });
    this.GetMovieData();
    this.GetAvailableMovieData();
    this.GetCustomerData();
    this.InitRentData();
  }

  OnSubmit() {
    this.rentForm.controls.rentStatus.setValue(0);

    this.RentService.getMovieTitleById(
      this.rentForm.controls.movieId.value
    ).subscribe((data) => {
      this.rentForm.controls.movieTitle.setValue(data);
      this.RentService.getCustomerNameById(
        this.rentForm.controls.customerId.value
      ).subscribe((data) => {
        this.rentForm.controls.customerName.setValue(data);

        const rentForCreate = {
          rentStatus: this.rentForm.controls.rentStatus.value,
          customerId: this.rentForm.controls.customerId.value,
          customerName: this.rentForm.controls.customerName.value,
          movieId: this.rentForm.controls.movieId.value,
          movieTitle: this.rentForm.controls.movieTitle.value,
          startDate: this.rentForm.controls.startDate.value,
          returnDate: this.rentForm.controls.returnDate.value,
        };

        console.log(rentForCreate);
        this.RentService.createRent(rentForCreate).subscribe((data) => {
          this.GetRentData();
          this.rentForm.reset();
        });
      });
    });

    for (var i in this.movieList) {
      if (this.movieList[i].movieId == this.rentForm.value.movieId) {
        this.movieList[i].movieStatus = 1;
        this.RentService.updateMovie(this.movieList[i]).subscribe((data) => {
          console.log(data);
          this.GetAvailableMovieData();
        });
      }
    }
  }


  GetRentData() {
    this.RentService.getAllRent().subscribe((data) => {
      this.rentList = data;

      for (var i in this.rentList) {
        let startDate = formatDate(new Date(this.rentList[i].startDate), 'yyyy-MM-dd', 'en-US');
        let returnDate = formatDate(new Date(this.rentList[i].returnDate), 'yyyy-MM-dd', 'en-US');
        this.rentList[i].startDate = startDate;
        this.rentList[i].returnDate = returnDate;
      }
    });
  }
  InitRentData() {
    this.RentService.getAllRent().subscribe((data) => {
      this.rentList = data;

      for (var i in this.rentList) {
        let startDate = formatDate(new Date(this.rentList[i].startDate), 'yyyy-MM-dd', 'en-US');
        let returnDate = formatDate(new Date(this.rentList[i].returnDate), 'yyyy-MM-dd', 'en-US');
        this.rentList[i].startDate = startDate;
        this.rentList[i].returnDate = returnDate;

        let now = new Date();
        let date = new Date(returnDate);
        this.dis = date.valueOf() - now.valueOf();
        if (this.rentList[i].rentStatus == 0) {

          if (this.dis < 0) {
            this.rentList[i].rentStatus = 2;
            this.rentList[i].timeDifference = this.dis;
            this.RentService.updateRent(this.rentList[i]).subscribe((data) => {
            });
          }
        }

      }

    });
  }



  Delete(id) {
    this.RentService.deleteRentById(id).subscribe((data) => {
      this.GetRentData();

    });
    for (var i in this.rentList) {
      for (var j in this.allMovieList) {
        if (this.allMovieList[j].movieId == this.rentList[i].movieId) {
          if (this.rentList[i].rentStatus == 0) {
            this.allMovieList[j].movieStatus = 1;
          } else {
            this.allMovieList[j].movieStatus = 0;
          }
          this.RentService.updateMovie(this.allMovieList[j]).subscribe(
            (data) => {
              console.log(data);
              this.GetRentData();
              this.GetAvailableMovieData();
            }
          );
        }
      }
    }
  }

  Returned(id) {
    for (var i in this.rentList) {
      if (this.rentList[i].rentId == id) {
        this.rentList[i].rentStatus = 1;
        this.rentList[i].timeDifference = 0;
        this.RentService.updateRent(this.rentList[i]).subscribe((data) => {
          this.GetRentData();
          console.log(data);
        });

        for (var j in this.allMovieList) {
          if (this.allMovieList[j].movieId == this.rentList[i].movieId) {
            this.allMovieList[j].movieStatus = 0;
            this.RentService.updateMovie(this.allMovieList[j]).subscribe(
              (data) => {
                console.log(data);
                this.GetRentData();
                this.GetAvailableMovieData();
              }
            );
          }
        }
      }
    }
  }

  GetCustomerData() {
    this.RentService.getAllCustomer().subscribe((data) => {
      this.customerList = data;
    });
  }

  GetMovieData() {
    this.RentService.getAllMovie().subscribe((data) => {
      this.allMovieList = data;
    });
  }

  GetAvailableMovieData() {
    this.RentService.getAllAvailableMovie().subscribe((data) => {
      this.movieList = data;
    });
  }
}
