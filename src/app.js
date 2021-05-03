const { getOptions, runFtpFunction } = require('./helpers');
const fs = require('fs-extra')
const path = require('path');

async function upload(action, settings) {
    const options = getOptions(action, settings);
    const localPath = action.params.localPath;
    const remotePath = action.params.remotePath;
    const stats = fs.statSync(localPath);
    const remoteDir = stats.isDirectory() ? remotePath : path.dirname(remotePath);
    const ftpFunc = async function(client){
        await client.ensureDir(remoteDir);
        return stats.isDirectory() ? 
            client.uploadFromDir(localPath) :
            client.uploadFrom(localPath, path.basename(remotePath));
    }

    return runFtpFunction(options, ftpFunc);
}

async function remove(action, settings) {
    const options = getOptions(action, settings);
    const {remotePath, isDir} = action.params;
    
    const ftpFunc = isDir ? client => client.removeDir(remotePath) : 
        client => client.remove(remotePath);
    return runFtpFunction(options, ftpFunc);
}

async function downloadFile(action, settings) {
    const options = getOptions(action, settings);
    const localPath = action.params.localPath;
    const remotePath = action.params.remotePath;
    fs.ensureDirSync(path.dirname(localPath));
    return runFtpFunction(options, client => client.downloadTo(localPath, remotePath));
}

async function downloadDir(action, settings) {
    const options = getOptions(action, settings);
    const localPath = action.params.localPath;
    const remotePath = action.params.remotePath;
    fs.ensureDirSync(localPath);
    return runFtpFunction(options, client => client.downloadToDir(localPath, remotePath));
}

async function list(action, settings) {
    const options = getOptions(action, settings);
    const remotePath = action.params.remotePath;

    return runFtpFunction(options, client => client.list(remotePath));
}

module.exports = {
    upload,
    remove,
    downloadFile,
    downloadDir,
    list
}