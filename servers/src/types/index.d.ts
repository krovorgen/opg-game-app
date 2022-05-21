import { DecodedJWTType } from '../middleware/validate-token-middleware';

declare global {
  declare namespace Express {
    interface Request {
      tokenData: DecodedJWTType;
    }
  }
}
