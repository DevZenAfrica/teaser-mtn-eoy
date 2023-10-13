
export class Headline {

  date: string;
  likes: string[];
  disLikes: string[];
  vues: string[];
  image = '';
  status: number;

  constructor(public id: string, public reaction: boolean, public content: string, phone: string) {
    this.date = new Date().toString();
    this.likes = [];
    this.disLikes = [];
    this.vues = [];
    this.image = '';
  }
}
