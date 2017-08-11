import { createId } from '../../../uuid';
import wrapLogger from '../../utils/wrapLogger';
import wrapPromise from '../../utils/wrapPromise';

const database = {
  getViewer: (_params) => ({
    id: createId(),
    name: 'Diab Rashed'
  }),
};

export default wrapLogger(wrapPromise(database));
