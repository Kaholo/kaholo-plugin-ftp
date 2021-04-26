const { getOptions, runFtpFunction } = require('./helpers');
const fs = require('fs');
const path = require('path');

async function upload(action, settings) {
    const options = getOptions(action, settings);
    const localPath = action.params.localPath;
    const remotePath = action.params.remotePath;
    const stats = fs.statSync(localPath);
    const remoteDir = stats.isDirectory() ? remotePath : path.dirname(remotePath);
    
    const ftpFunc = client => client.ensureDir(remoteDir).then(
        stats.isDirectory() ? 
        () => client.uploadDir(localPath, remotePath) :
        () => client.uploadFrom(localPath, remotePath));

    return runFtpFunction(options, ftpFunc);
}


async function removeDir(action, settings) {
    const options = getOptions(action, settings);
    const remotePath = action.params.remotePath;
    return runFtpFunction(options, client => client.removeDir(remotePath));
}

async function removeFile(action, settings) {
    const options = getOptions(action, settings);
    const remotePath = action.params.remotePath;
    return runFtpFunction(options, client => client.remove(remotePath));
}

async function download(action, settings) {
    const options = getOptions(action, settings);
    const localPath = action.params.localPath;
    const remotePath = action.params.remotePath;

    return runFtpFunction(options, client => client.downloadTo(localPath, remotePath));
}

module.exports = {
    upload,
    remove: removeFile,
    removeDir,
    download
}