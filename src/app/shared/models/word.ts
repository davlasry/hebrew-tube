export interface Word {
  _id: string;
  hebrew: string;
  french: string;
  pronunciation: string;
  type: string;
  createdAt?: string;
  updatedAt?: string;
}

export const typeOptions = [
  { value: 'nom', viewValue: 'nom' },
  { value: 'verbe', viewValue: 'verbe' },
  { value: 'pronom', viewValue: 'pronom' },
  { value: 'adjectif', viewValue: 'adjectif' },
  { value: 'adverbe', viewValue: 'adverbe' },
  { value: 'presentatif', viewValue: 'présentatif' },
  { value: 'ponctuation', viewValue: 'ponctuation' }
];

export const formeOptions = [
  { value: 'infinitif', viewValue: 'infinitif' },
  { value: '1', viewValue: '1' },
  { value: '2', viewValue: '2' },
  { value: '3', viewValue: '3' }
];

export const timeOptions = [
  { value: 'present', viewValue: 'présent' },
  { value: 'passe', viewValue: 'passé' },
  { value: 'futur', viewValue: 'futur' },
  { value: 'imperatif', viewValue: 'impératif' }
];

export const genreOptions = [
  { value: 'masc', viewValue: 'masculin' },
  { value: 'fem', viewValue: 'féminin' },
  { value: 'both', viewValue: 'both' },
  { value: 'invariable', viewValue: 'invariable' }
];

export const numberOptions = [
  { value: 'singulier', viewValue: 'singuler' },
  { value: 'pluriel', viewValue: 'pluriel' },
  { value: 'invariable', viewValue: 'invariable' }
];
