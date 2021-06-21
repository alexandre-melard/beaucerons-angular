export class User {
  user_id!: string;
  email!: string;
  email_verified?: boolean;
  username?: string;
  phone_number?: string;
  phone_verified?: false;
  created_at?: string;
  updated_at?: string;
  identities?: {
    connection: string;
    user_id: string;
    provider: string;
    isSocial: boolean;
  }[];
  app_metadata: any;
  user_metadata?: {
    uuid?: string;
  };
  picture?: string;
  name?: string;
  nickname?: string;
  multifactor?: string[];
  last_ip?: string;
  last_login?: string;
  logins_count?: number;
  blocked?: boolean;
  given_name?: string;
  family_name?: string;
}
