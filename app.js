const fs = require("fs-extra");
const path = require("path");
const kaholoPluginLibrary = require("kaholo-plugin-library");
const { mapConnectOptions, runCallbackWithFtpClient, getRemotePathStat } = require("./helpers");

async function upload(params) {
  const connectOptions = mapConnectOptions(params);
  const { localPath, remotePath } = params;

  let pathStat;
  try {
    pathStat = await fs.stat(localPath);
  } catch {
    throw new Error(`Path ${localPath} does not exist on the agent.`);
  }

  const remoteDirectory = pathStat.isDirectory() ? remotePath : path.dirname(remotePath);

  const ftpCallback = async (client) => {
    await client.ensureDir(remoteDirectory);

    return pathStat.isDirectory()
      ? client.uploadFromDir(localPath)
      : client.uploadFrom(localPath, remotePath);
  };

  return runCallbackWithFtpClient(connectOptions, ftpCallback);
}

async function remove(params) {
  const connectOptions = mapConnectOptions(params);
  const { remotePath } = params;

  const ftpCallback = async (client) => {
    const remotePathStat = await getRemotePathStat(client, remotePath);
    if (!remotePathStat) {
      throw new Error(`Path ${remotePath} does not exist on the server.`);
    }

    return remotePathStat.isDirectory
      ? client.removeDir(remotePath)
      : client.remove(remotePath);
  };

  return runCallbackWithFtpClient(connectOptions, ftpCallback);
}

async function download(params) {
  const connectOptions = mapConnectOptions(params);
  const { localPath, remotePath } = params;

  await fs.ensureDir(path.dirname(localPath));

  const ftpCallback = async (client) => {
    const remotePathStat = await getRemotePathStat(client, remotePath);
    if (!remotePathStat) {
      throw new Error(`Path ${remotePath} does not exist on the server.`);
    }

    return remotePathStat.isDirectory
      ? client.downloadToDir(localPath, remotePath)
      : client.downloadTo(localPath, remotePath);
  };

  return runCallbackWithFtpClient(
    connectOptions,
    ftpCallback,
  );
}

async function list(params) {
  const connectOptions = mapConnectOptions(params);
  const { remotePath } = params;

  return runCallbackWithFtpClient(
    connectOptions,
    (client) => client.list(remotePath),
  );
}

module.exports = kaholoPluginLibrary.bootstrap({
  upload,
  remove,
  download,
  list,
});
