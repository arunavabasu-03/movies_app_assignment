import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  searchQuery: string = '';
  currentPage: number = 1;
  totalPages: number = 0;
  movies: any[] = [];
  isLoading: boolean = false; // Added isLoading property

  constructor(private http: HttpClient) {}

  searchMovies() {
    const apiKey = 'bc41f730';
    const url = `http://www.omdbapi.com/?s=${this.searchQuery}&apikey=${apiKey}&page=${this.currentPage}`;

    this.isLoading = true; // Show loader while loading

    this.http.get(url).subscribe(
      (response: any) => {
        this.movies = response.Search || [];
        console.log(this.movies);
        this.totalPages = Math.ceil(response.totalResults / 10);
        this.isLoading = false; // Hide loader after loading
      },
      (error) => {
        console.error('Error fetching movies:', error);
        this.isLoading = false; // Hide loader in case of error
      }
    );
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.searchMovies();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.searchMovies();
    }
  }
}
