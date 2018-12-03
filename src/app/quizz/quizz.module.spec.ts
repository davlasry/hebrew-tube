import { QuizzModule } from './quizz.module';

describe('QuizzModule', () => {
  let quizzModule: QuizzModule;

  beforeEach(() => {
    quizzModule = new QuizzModule();
  });

  it('should create an instance', () => {
    expect(quizzModule).toBeTruthy();
  });
});
