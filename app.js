const fs = require("fs-extra");
const path = require("path");
const kaholoPluginLibrary = require("@kaholo/plugin-library");
const { mapParamsToConnectionOptions, runCallbackWithFtpClient, getRemotePathStat } = require("./ftp-functions");

async function upload(params) {
  const connectOptions = mapParamsToConnectionOptions(params);
  const { localPath, remotePath } = params;

  let pathStat;
  try {
    pathStat = await fs.stat(localPath);
  } catch {
    throw new Error(`Path ${localPath} does not exist on the agent.`);
  }

  const remoteDirectory = pathStat.isDirectory() ? remotePath : path.dirname(remotePath);

  const uploadWithFtpClient = async (client) => {
    await client.ensureDir(remoteDirectory);

    return pathStat.isDirectory()
      ? client.uploadFromDir(localPath)
      : client.uploadFrom(localPath, path.basename(remotePath));
  };

  return runCallbackWithFtpClient(connectOptions, uploadWithFtpClient);
}

async function remove(params) {
  const connectOptions = mapParamsToConnectionOptions(params);
  const { remotePath } = params;

  const removeWithFtpClient = async (client) => {
    const remotePathStat = await getRemotePathStat(client, remotePath);
    if (!remotePathStat) {
      throw new Error(`Path ${remotePath} does not exist on the server.`);
    }

    return remotePathStat.isDirectory
      ? client.removeDir(remotePath)
      : client.remove(remotePath);
  };

  return runCallbackWithFtpClient(connectOptions, removeWithFtpClient);
}

async function download(params) {
  const connectOptions = mapParamsToConnectionOptions(params);
  const { localPath, remotePath } = params;

  await fs.ensureDir(path.dirname(localPath));

  const downloadWithFtpClient = async (client) => {
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
    downloadWithFtpClient,
  );
}

async function list(params) {
  const connectOptions = mapParamsToConnectionOptions(params);
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
