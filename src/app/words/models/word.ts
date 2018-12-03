export interface Session {
  name: string;
  url: string;
  _id: string;
  loaction: number;
}

export interface Definition {
  english: string;
  french: string;
  phonetic: string;
  notes: string;
  sessions: Session[];
}

export interface Word {
  _id: string;
  hebrew: string;
  definitions: Definition[];
}
