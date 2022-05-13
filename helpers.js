const ftp = require("basic-ftp");

const DEFAULT_FTP_PORT = 21;

function mapConnectOptions(action, settings) {
  const user = action.params.username || settings.username;
  const opts = {
    host: action.params.host || settings.host,
    port: action.params.port || settings.port || DEFAULT_FTP_PORT,
    password: action.params.password || settings.password,
    secure: "true",
  };

  if (user) {
    opts.user = user;
  }

  return opts;
}

async function runCallbackWithFtpClient(connectOptions, callback) {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  await client.access(connectOptions);

  try {
    await callback(client);
  } finally {
    await client.close();
  }
}

module.exports = {
  mapConnectOptions,
  runCallbackWithFtpClient,
};
