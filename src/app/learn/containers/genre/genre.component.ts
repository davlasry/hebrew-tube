import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  answer: string;
  choice: string;
  result: string;

  constructor() {
    this.answer = 'masc';
  }

  ngOnInit() {}

  onClickConfirm() {
    this.checkChoice();
  }

  checkChoice() {
    const result: Boolean = this.answer === this.choice;
    if (result) {
      this.result = 'Bravo, vous avez choisi la bonne réponse.';
    } else {
      this.result = 'Dommage, réessayez une prochaine fois.';
    }
    console.log(result);
  }
}
