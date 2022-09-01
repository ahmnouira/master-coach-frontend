import { IClient } from 'src/app/interfaces/client.interface';
import { Entity } from '../entity/entity.model';

export class Client extends Entity implements IClient {
  photo?: string | File;
  prenom: string;
  nom: string;
  email: string;
  tel: string;
  notes: string;
  equip: string;
}
