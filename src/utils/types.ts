import { Messages } from './messages';

export type ServiceResponse = {
  data?: unknown;
  message?: Messages;
  error: boolean;
};

export const serviceResponse = (res: ServiceResponse) => res;
