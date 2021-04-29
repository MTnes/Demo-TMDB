export class Movie {

  public name: string;
  public imagePath: string;
  public language: string;

  constructor(name: string, imagePath: string, lang: string) {
      this.name = name;
      this.imagePath = imagePath;
      this.language = lang;
  }

}
