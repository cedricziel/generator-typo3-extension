class Person {

  constructor() {
    this.mood = 'happy';
  }

  setMood(mood) {
    this.mood = mood;
  }

  complain() {
    console.log('Because I\'ve got nothing to complain about!');
  }

  logMood() {
    console.log('I am ' + this.mood + '!');
  }
}

class Ceddi extends Person {

  constructor() {

    super();
    this.mood = 'grumpy';
  }

  complain() {
    console.log('Because people are bad.');
  }
}
class Guenni extends Person {

  constructor() {

    super();
    this.mood = 'hating';
  }

  complain() {
    console.log('Because we still have no airport.');
  }
}

class Krauti extends Person {

  constructor() {

    super();
    this.mood = 'sarcastic';
  }

  complain() {
    console.log('Because no ISS in sight.');
  }
}

let person = new Person();

let ceddi = new Ceddi();
let guenni = new Guenni();
let krauti = new Krauti();

person.logMood();
person.complain();

ceddi.logMood();
ceddi.complain();

guenni.logMood();
guenni.complain();

krauti.logMood();
krauti.complain();
