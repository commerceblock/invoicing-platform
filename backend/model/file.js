
// imports
import { Schema } from 'dynamoose';

// local imports
import dynamoose from '../lib/clients/dynamoose';
import { storage_columns } from './consts';

// schema defintion
const FileSchema = new Schema({
  [storage_columns.file_id]: {
    type: String,
    hashKey: true,
  },
  [storage_columns.file_name]: {
    type: String,
  },
  [storage_columns.file_s3_key]: {
    type: String,
  },
  [storage_columns.file_s3_bucket]: {
    type: String,
  },
});

const File = dynamoose.model('storage', FileSchema);
export default File;
