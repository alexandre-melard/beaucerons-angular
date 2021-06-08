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
}
