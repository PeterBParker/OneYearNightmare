export default class Pages {
  static READ = new Pages("read");
  static ABOUT = new Pages("about");
  static SUPPORT = new Pages("support");
  static ARCHIVE = new Pages("archive");
  static SIGNIN = new Pages("login");

  constructor(name) {
    this.name = name;
  }
  toString() {
    return `Pages.${this.name}`;
  }
}
