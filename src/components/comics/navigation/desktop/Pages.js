export default class Pages {
    static READ = new Pages('read');
    static ABOUT = new Pages('about');
    static SUPPORT = new Pages('support');

    constructor(name) {
        this.name = name;
    }
    toString() {
        return `Pages.${this.name}`;
    }
}