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
  children?: Dog[];
  link = `/dog/${this.uuid}`;

  // constructor(dog?: any) {
  //   if (dog) {
  //     if (dog.id) {
  //       this.id = dog.id;
  //     }
  //     if (dog.type) {
  //       this.type = dog.type;
  //     }
  //     if (dog.name) {
  //       this.name = dog.name;
  //     }
  //     if (dog.uuid) {
  //       this.uuid = dog.uuid;
  //       this.link = `/dog/${this.uuid}`;
  //     }
  //     if (dog.ship) {
  //       this.ship = dog.ship;
  //     }
  //     if (dog.tattoo) {
  //       this.tattoo = dog.tattoo;
  //     }
  //     if (dog.cotation) {
  //       this.cotation = dog.cotation;
  //     }
  //     if (dog.dob) {
  //       this.dob = dog.dob;
  //     }
  //     if (dog.color) {
  //       this.color = dog.color;
  //     }
  //     if (dog.other) {
  //       this.other = dog.other;
  //     }
  //     if (dog.children) {
  //       this.children = dog.children;
  //     }
  //     if (dog.sir) {
  //       this.sir = new Dog(dog.sir);
  //     }
  //     if (dog.dam) {
  //       this.dam = new Dog(dog.dam);
  //     }
  //     if (!this.children && (this.sir || this.dam)) {
  //       this.children = [];
  //       if (this.sir) {
  //         this.children.push(this.sir);
  //       }
  //       if (this.dam) {
  //         this.children.push(this.dam);
  //       }
  //     }
  //   }
  // }
}
