
// imports
import { Schema } from 'dynamoose';

// local imports
import dynamoose from '../lib/clients/dynamoose';
import { columns } from './consts';

// schema defintion
const AccessTokenSchema = new Schema({
  [columns.access_token_id]: {
    type: String,
    hashKey: true,
  },
  [columns.trader_id]: {
    type: String,
  },
  [columns.timestamp]: {
    type: String,
  },
});

const AccessToken = dynamoose.model('access-tokens', AccessTokenSchema);
export default AccessToken;
