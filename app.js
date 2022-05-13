const fs = require("fs-extra");
const path = require("path");
const { mapConnectOptions, runCallbackWithFtpClient } = require("./helpers");

async function upload(action, settings) {
  const connectOptions = mapConnectOptions(action, settings);
  const { localPath, remotePath } = action.params;

  const pathStat = await fs.promises.stat(localPath);
  const remoteDirectory = pathStat.isDirectory() ? remotePath : path.dirname(remotePath);

  const ftpCallback = async (client) => {
    await client.ensureDir(remoteDirectory);

    return pathStat.isDirectory()
      ? client.uploadFromDir(localPath)
      : client.uploadFrom(localPath, path.basename(remotePath));
  };

  return runCallbackWithFtpClient(connectOptions, ftpCallback);
}

async function remove(action, settings) {
  const connectOptions = mapConnectOptions(action, settings);
  const { remotePath, objType } = action.params;

  const ftpCallback = (
    (objType === "Folder")
      ? (client) => client.removeDir(remotePath)
      : (client) => client.remove(remotePath)
  );
  return runCallbackWithFtpClient(connectOptions, ftpCallback);
}

async function download(action, settings) {
  const connectOptions = mapConnectOptions(action, settings);
  const {
    localPath,
    remotePath,
    objType,
  } = action.params;

  await fs.ensureDir(path.dirname(localPath));

  const ftpCallback = (
    (objType === "Folder")
      ? (client) => client.downloadToDir(remotePath)
      : (client) => client.downloadTo(remotePath)
  );
  return runCallbackWithFtpClient(
    connectOptions,
    ftpCallback,
  );
}

async function list(action, settings) {
  const connectOptions = mapConnectOptions(action, settings);
  const { remotePath } = action.params;

  return runCallbackWithFtpClient(
    connectOptions,
    (client) => client.list(remotePath),
  );
}

module.exports = {
  upload,
  remove,
  download,
  list,
};
