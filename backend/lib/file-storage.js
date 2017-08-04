'use strict';

// imports

// local imports
const File = require('../model/file'),
  consts = require('../model/consts'),
  storage_columns = consts.storage_columns;

// logging
const bunyan = require('bunyan'),
  log = bunyan.createLogger({
    name: 'file-storage'
  });

exports.generateSingedUrl = () => {

};

exports.saveFile = (payload) => {
  return new Promise((resolve, reject) => {
    try {
      const file = new File(payload);
      file.save((error) => {
        if (error) {
          log.error({
            error,
            payload
          }, 'failed to save file');
          reject({
            error,
            payload
          });
        } else {
          log.info(`file saved, id: ${payload.file_id} -> ${payload.file_s3_key}`);
          resolve(payload);
        }
      });
    } catch (error) {
      log.error({
        error,
        payload
      }, 'an error occurred while saving file');
      reject({
        error,
        payload
      });
    }
  });
};

exports.loadFile = (file_id) => {
  return new Promise((resolve, reject) => {
    File.get({
      [storage_columns.file_id]: file_id
    }, (error, file) => {
      if (error) {
        log.error({
          file_id,
          error
        }, 'failed to load file');
        reject({
          file_id,
          error
        });
      } else {
        resolve(file);
      }
    });
  });
};
