import { DecodedJWTType } from '../middleware/validate-token-middleware';

declare global {
  interface Request {
    tokenData: DecodedJWTType;
  }
}
