import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  movieForm: FormGroup;
  movieList;
  mvId;
  buttonSave = 'Save';

  constructor(
    private fb: FormBuilder,
    private MovieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movieForm = this.fb.group({
      title: [''],
      year: [''],
      genre: [''],
      movieStatus: [''],
    });
    this.GetMovieData();
  }

  OnSubmit() {
    this.movieForm.controls.movieStatus.setValue(0);
    if (this.mvId && this.mvId > 0) {
      const movieForUpdate = {
        movieId: this.mvId,
        title: this.movieForm.controls.title.value,
        year: this.movieForm.controls.year.value,
        genre: this.movieForm.controls.genre.value,
        movieStatus: this.movieForm.controls.movieStatus.value
      };
      this.MovieService.updateMovie(movieForUpdate).subscribe((data) => {
        this.GetMovieData();
        this.movieForm.reset();
        this.mvId = 0;
        this.buttonSave = 'Save';
      });
    } else {
      this.MovieService.createMovie(this.movieForm.value).subscribe((data) => {
        this.GetMovieData();
        this.movieForm.reset();
      });
    }
  }

  GetMovieData() {
    this.MovieService.getAllMovie().subscribe((data) => {
      this.movieList = data;
    });
  }

  Delete(id) {
    this.MovieService.deleteMovieById(id).subscribe((data) => {
      this.GetMovieData();
    });
  }

  Edit(id) {
    this.MovieService.getMovieById(id).subscribe((data) => {
      console.log(data);
      this.mvId = id;
      this.buttonSave = 'Update';
      this.movieForm.patchValue(data);
    });
  }
}
