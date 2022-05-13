var ftp = require('basic-ftp');

function getOptions(action, settings) {
  const user = action.params.username || settings.username;
  const opts = {
    host: action.params.host || settings.host,
    port: action.params.port || settings.port || "21",
    password: action.params.password || settings.password,
    secure: 'true'
  }
  if (user){
    opts.user = user;
  }
  return opts;
}

async function runFtpFunction(options, ftpFunc){
  const client = new ftp.Client();
  client.ftp.verbose = true;
  await client.access(options);
  try { 
    await ftpFunc(client); 
  } catch (err) {
    await client.close();
    throw err;
  }
  return client.close();
}

module.exports = {
  getOptions,
  runFtpFunction
}