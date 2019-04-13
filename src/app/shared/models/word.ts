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
  { value: 'ponctuation', viewValue: 'ponctuation' }
];
