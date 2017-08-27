
// local imports
import { saveFile } from '../../store/files-store';
import { createId } from '../../utils/uuid';
import { storage_bucket } from '../../../model/consts';
import {
  parseExtension,
  resolveMimeType,
} from '../../utils/http-util';
import { generateSignedPutUrl } from '../../clients/s3-client';

export default async (traderId, fileInput) => {
  const payload = {
    file_id: createId(),
    file_name: fileInput.fileName,
    file_type: fileInput.fileType,
    file_hash: fileInput.fileHash,
    file_s3_bucket: storage_bucket,
    file_s3_key: `${createId()}_${fileInput.fileName}`,
    trader_id: traderId
  };
  return saveFile(payload)
    .then(payload => ({
      fileId: payload.file_id,
      fileName: payload.file_name,
      fileHash: payload.file_hash,
      fileS3Url: generateSignedPutUrl(
        payload.file_s3_bucket,
        payload.file_s3_key,
        payload.file_type
      ),
    }));
};
