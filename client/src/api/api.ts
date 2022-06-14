import axios from 'axios';
import { configuration } from '../config/configuration';

export class Api {
  public readonly instance = axios.create({
    baseURL: configuration().BASE_URL,
  });
  public readonly instanceAuth = axios.create({
    baseURL: configuration().AUTH_URL,
  });
}
