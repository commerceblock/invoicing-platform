/* @flow */

const envVariable = process.env.MOCKED_DATABASE || 'false';
const useMockedDatabase = `${envVariable}`.toLowerCase() === 'true';

// eslint-disable-next-line global-require
const db = useMockedDatabase ? require('./mockedDatabase').default : require('./database').default;

export default {
  ...db
};
