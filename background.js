AWS.config.region = 'auto';

let uploadProgressWindow = null;

function getExtensionFromMimeType(mimeType) {
  switch (mimeType) {
    case 'image/jpeg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/gif':
      return 'gif';
    case 'image/webp':
      return 'webp';
    default:
      return '';
  }
}

function promptForFilename() {
  return new Promise((resolve, reject) => {
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14); // 格式化时间戳为yyyyMMddHHmmss
    const filename = prompt(`Please enter the file name for the upload:`);
    if (filename) {
      resolve(`${timestamp}-${filename}`);
    } else {
      reject('No filename provided');
    }
  });
}

chrome.contextMenus.create({
  id: 'upload-image',
  title: 'Upload Image to CloudFlare R2',
  contexts: ['image']
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'upload-image') {
    chrome.storage.sync.get(['endpointUrl', 'accessKeyId', 'secretAccessKey', 'bucketName'], async ({ endpointUrl, accessKeyId, secretAccessKey, bucketName }) => {
      if (!endpointUrl || !accessKeyId || !secretAccessKey || !bucketName) {
        alert('Please configure credentials and bucket name in the extension popup');
        return;
      }

      const s3 = new AWS.S3({
        endpoint: new AWS.Endpoint(endpointUrl),
        accessKeyId,
        secretAccessKey,
        region: 'auto'
      });

      const myfilename = await promptForFilename();

      if (uploadProgressWindow) {
        uploadProgressWindow.close();
      }

      const screenWidth = screen.availWidth;
      const screenHeight = screen.availHeight;
      const windowWidth = 400;
      const windowHeight = 130;
      const windowX = (screenWidth - windowWidth) / 2;
      const windowY = (screenHeight - windowHeight) / 2;

      uploadProgressWindow = window.open('', '', `width=${windowWidth},height=${windowHeight},top=${windowY},left=${windowX},alwaysRaised=yes,type=notification`);
      uploadProgressWindow.document.write('<html><head><title>Upload Progress</title></head><body>'
        + '<progress value="0" max="100" id="progress-bar" style="width: 100%;"></progress>'
        + '<p id="message">Preparing to upload...</p>'
        + '</body></html>');
      const progressBar = uploadProgressWindow.document.getElementById('progress-bar');
      const message = uploadProgressWindow.document.getElementById('message'); 
      uploadProgressWindow.focus();

      const blob = await (await fetch(info.srcUrl)).blob();
      const extension = getExtensionFromMimeType(blob.type);
      const filename = `${myfilename}.${extension}`;
      const s3Params = {
        Bucket: bucketName,
        Key: filename,
        Body: blob,
        ContentType: blob.type,
      };

      const upload = s3.putObject(s3Params).on('httpUploadProgress', (progress) => {
        const uploadProgress = Math.round((progress.loaded / progress.total) * 100);
        progressBar.value = uploadProgress;
      }).promise();

      upload.then(() => {
        message.innerHTML = `Upload successful!<br> <a href="${'https://collect.vehicleinsights.dev'}/${filename}" target="_blank">${'https://collect.vehicleinsights.dev'}/${filename}</a>`;
      }).catch((err) => {
        console.error('Error uploading image:', err);
        message.innerText = `Error uploading image: ${err.message}`;
      });
    });
  }
});
