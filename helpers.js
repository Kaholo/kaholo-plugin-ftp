const ftp = require("basic-ftp");
const path = require("path");

function mapConnectOptions(params) {
  const connectOptions = {
    host: params.host,
    port: params.port,
    password: params.password,
    secure: params.useTls,
    verbose: params.verboseMode,
  };

  const user = params.username;
  if (user) {
    connectOptions.user = user;
  }

  return connectOptions;
}

async function runCallbackWithFtpClient(connectOptions, callback) {
  const client = new ftp.Client();
  if (connectOptions.verbose) {
    client.ftp.verbose = true;
  }

  await client.access(connectOptions);

  try {
    return await callback(client);
  } finally {
    await client.close();
  }
}

async function getRemotePathStat(ftpClient, remotePath) {
  const listResult = await ftpClient.list(path.dirname(remotePath));
  return listResult.find(
    (fileResult) => fileResult.name === path.basename(remotePath),
  );
}

module.exports = {
  mapConnectOptions,
  runCallbackWithFtpClient,
  getRemotePathStat,
};
