export class Language {

  public iso_639_1: string;
  public english_name: string;

  constructor(iso: string, ename: string) {
    this.iso_639_1 = iso;
    this.english_name = ename;
  }

}
