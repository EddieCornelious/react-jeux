export default class Cat {
  constructor() {
    this._name = 'Cat';
  }
  name() {
    const name = this._name;
    const trippy = 0;

    if (!name) {
      return 1 + trippy;
    }

    return name;
  }
}
