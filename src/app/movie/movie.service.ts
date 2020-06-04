import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {}

    createMovie(MovieData){
      return this.http.post('https://localhost:5001/api/Movie', MovieData);
    }

    updateMovie(MovieData){
      return this.http.put('https://localhost:5001/api/Movie', MovieData);
    }

    getAllMovie(){
      return this.http.get('https://localhost:5001/api/Movie');
    }

    getMovieById(movieId){
      return this.http.get('https://localhost:5001/api/Movie/' + movieId );
    }

    deleteMovieById(movieId){
      return this.http.delete('https://localhost:5001/api/Movie/' + movieId);
    }

}
