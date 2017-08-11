import { createId } from '../../../uuid';

// Note: This is where your code should go to fetch a real user.
export default async (_params) => ({
  id: createId(),
  name: 'Diab Rashed'
});
