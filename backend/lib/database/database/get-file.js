
// local imports
import { loadFile } from '../../store/files-store';
import { generateSignedGetUrl } from '../../clients/s3-client';

export default async (fileId) => loadFile(fileId)
  .then(file => {
    if (file) {
      return {
        fileId,
        fileName: file.file_name,
        fileS3Url: generateSignedGetUrl(file.file_s3_bucket, file.file_s3_key),
      };
    }
    // TODO:: revisit, maybe option instead
    return null;
  });
