import { Breeder } from './../person/breeder/Owner';
import { Owner } from './../person/owner/Owner';
export class Dog {
  id?: string;
  type!: string;
  verified!: boolean;
  name!: string;
  uuid!: string;
  ship?: string;
  tattoo?: string;
  reg?: string;
  book?: string;
  bookLink?: string;
  cotation?: string;
  dob?: string;
  color?: string;
  other?: string;
  others?: string[];
  sir?: Dog;
  dam?: Dog;
  owner?: Owner;
  breeder?: Breeder;
  children?: Dog[];
  link?: string;
}
