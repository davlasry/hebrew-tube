import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.scss']
})
export class LibrariesComponent implements OnInit {
  libraries = ['favoris', 'Mars19', 'Cuisine', 'Sport'];
  currentLibrary = 'Test';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params
      .pipe(map(params => params.id))
      .subscribe(libraryId => (this.currentLibrary = libraryId));
  }

  getLibraryList() {}

  getCurrentLibrary() {}

  onLibraryClick(library) {
    // this.currentLibrary = library;
    this.router.navigateByUrl(`words/library/${library}`);
  }
}
