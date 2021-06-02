export class Dog {
  id?: string;
  type!: string;
  name!: string;
  uuid!: string;
  ship?: string;
  tattoo?: string;
  cotation?: string;
  dob?: string;
  color?: string;
  other?: string;
  sir?: Dog;
  dam?: Dog;
  link!: string;
  children!: (Dog | undefined)[];

  constructor(dog?: Dog) {
    if (dog) {
      if (dog.id) {
        this.id = dog.id;
      }
      if (dog.type) {
        this.type = dog.type;
      }
      if (dog.name) {
        this.name = dog.name;
      }
      if (dog.uuid) {
        this.uuid = dog.uuid;
      }
      if (dog.ship) {
        this.ship = dog.ship;
      }
      if (dog.tattoo) {
        this.tattoo = dog.tattoo;
      }
      if (dog.cotation) {
        this.cotation = dog.cotation;
      }
      if (dog.dob) {
        this.dob = dog.dob;
      }
      if (dog.color) {
        this.color = dog.color;
      }
      if (dog.other) {
        this.other = dog.other;
      }
      if (dog.sir) {
        this.sir = new Dog(dog.sir);
      }
      if (dog.dam) {
        this.dam = new Dog(dog.dam);
      }
      if (this.uuid) {
        this.link = `/dog/${this.uuid}`;
      }
      if (this.sir || this.dam) {
        this.children = [];
        if (this.sir) {
          this.children.push(this.sir);
        }
        if (this.dam) {
          this.children.push(this.dam);
        }
      }
    }
  }
}
