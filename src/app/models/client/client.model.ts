import { IClient } from 'src/app/interfaces/client.interface';
import { Entity } from '../entity/entity.model';

export class Client extends Entity implements IClient {
  prenom: string;
  nom: string;
  email: string;
  tel: string;
  notes: string;
  equip: string;
  photo: string | File;

  readonly password: string;
}
