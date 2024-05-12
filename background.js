AWS.config.region = 'auto'; // 设置为auto,让AWS SDK自动判断区域

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

      const filename = generateRandomFileName(24); //随机生成文件名,后续可以通过通用物品识别进行图片分类
      const blob = await (await fetch(info.srcUrl)).blob();
      const s3Params = {
        Bucket: bucketName, // 使用输入的存储桶名称
        Key: filename,
        Body: blob,
        ContentType: blob.type, // 设置 MIME 类型
      };

      const uploadProgressWindow = window.open('', 'Upload Progress', 'width=400,height=100,top=100,left=100,alwaysRaised=yes,type=notification');
      uploadProgressWindow.document.write('<html><head><title>Upload Progress</title></head><body><progress value="0" max="100" id="progress-bar" style="width: 100%;"></progress></body></html>');
      const progressBar = uploadProgressWindow.document.getElementById('progress-bar');

      const upload = s3.putObject(s3Params).on('httpUploadProgress', (progress) => {
        const uploadProgress = Math.round((progress.loaded / progress.total) * 100);
        progressBar.value = uploadProgress;
      }).promise();

      upload.then(() => {
        alert(`Image uploaded successfully: ${'https://collect.vehicleinsights.dev'}/${filename}`);
        uploadProgressWindow.close();
      }).catch((err) => {
        console.error('Error uploading image:', err);
        alert(`Error uploading image: ${err.message}`);
        uploadProgressWindow.close();
      });
    });
  }
});