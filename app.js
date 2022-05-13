const fs = require("fs-extra");
const path = require("path");
const { getOptions, runFtpFunction } = require("./helpers");

async function upload(action, settings) {
  const options = getOptions(action, settings);
  const { localPath, remotePath } = action.params;

  const stats = fs.statSync(localPath);
  const remoteDir = stats.isDirectory() ? remotePath : path.dirname(remotePath);

  const ftpFunc = async (client) => {
    await client.ensureDir(remoteDir);
    return stats.isDirectory()
      ? client.uploadFromDir(localPath)
      : client.uploadFrom(localPath, path.basename(remotePath));
  };

  return runFtpFunction(options, ftpFunc);
}

async function remove(action, settings) {
  const options = getOptions(action, settings);
  const { remotePath, objType } = action.params;

  const ftpFunc = (
    (objType === "Folder")
      ? (client) => client.removeDir(remotePath)
      : (client) => client.remove(remotePath)
  );
  return runFtpFunction(options, ftpFunc);
}

async function downloadFile(action, settings) {
  const options = getOptions(action, settings);
  const { localPath, remotePath } = action.params;

  fs.ensureDirSync(path.dirname(localPath));
  return runFtpFunction(options, (client) => client.downloadTo(localPath, remotePath));
}

async function downloadDir(action, settings) {
  const options = getOptions(action, settings);
  const { localPath, remotePath } = action.params;

  fs.ensureDirSync(localPath);
  return runFtpFunction(options, (client) => client.downloadToDir(localPath, remotePath));
}

async function list(action, settings) {
  const options = getOptions(action, settings);
  const { remotePath } = action.params;

  return runFtpFunction(options, (client) => client.list(remotePath));
}

module.exports = {
  upload,
  remove,
  downloadFile,
  downloadDir,
  list,
};
