
// local imports
import { saveFile } from '../../../file-storage';
import { createId } from '../../../../lib/uuid';
import { storage_bucket } from '../../../../model/consts';
import {
  parseExtension,
  resolveMimeType,
} from '../../../../lib/http-util';
import { generateSignedPutUrl } from '../../../s3-client';

export default async (fileInput) => {
  const file_id = createId();
  const file_name = fileInput.fileName;
  const file_type = fileInput.fileType;
  const file_s3_bucket = storage_bucket;
  const file_s3_key = `${createId()}_${file_name}`;
  const payload = {
    file_id,
    file_name,
    file_type,
    file_s3_bucket,
    file_s3_key,
  };
  return saveFile(payload)
    .then(payload => ({
      fileId: file_id,
      fileName: file_name,
      fileS3Url: generateSignedPutUrl(file_s3_bucket, file_s3_key, file_type),
    }));
};
