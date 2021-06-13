import { Breeder } from './../person/breeder/Owner';
import { Owner } from './../person/owner/Owner';
export class Dog {
  id?: string;
  type!: string;
  verified!: string;
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
  owner?: Owner;
  breeder?: Breeder;
  children?: Dog[];
  link = `/dog/${this.uuid}`;
}
