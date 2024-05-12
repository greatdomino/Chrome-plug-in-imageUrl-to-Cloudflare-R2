// 填充之前保存的凭据和存储桶名称
function fillSavedCredentials() {
    chrome.storage.sync.get(['endpointUrl', 'accessKeyId', 'secretAccessKey', 'bucketName'], (data) => {
        console.log('Saved credentials:', data);
        document.getElementById('endpoint-url').value = data.endpointUrl || '';
        document.getElementById('access-key-id').value = data.accessKeyId || '';
        document.getElementById('secret-access-key').value = data.secretAccessKey || '';
        document.getElementById('bucket-name').value = data.bucketName || ''; // 填充存储桶名称
    });
}

// 在弹出窗口打开时填充之前保存的凭据和存储桶名称
document.addEventListener('DOMContentLoaded', fillSavedCredentials);

document.getElementById('save-btn').addEventListener('click', () => {
    const endpointUrl = document.getElementById('endpoint-url').value;
    const accessKeyId = document.getElementById('access-key-id').value;
    const secretAccessKey = document.getElementById('secret-access-key').value;
    const bucketName = document.getElementById('bucket-name').value; // 获取存储桶名称

    // 保存凭据和存储桶名称到浏览器存储
    chrome.storage.sync.set({
        endpointUrl,
        accessKeyId,
        secretAccessKey,
        bucketName // 保存存储桶名称
    }, () => {
        console.log('Credentials and bucket name saved');
        // 显示成功提示信息
        document.getElementById('success-msg').style.display = 'block';

        // 2秒后隐藏提示信息
        setTimeout(() => {
            document.getElementById('success-msg').style.display = 'none';
        }, 2000);
    });
});

// 在弹出窗口关闭时重新加载背景页面
window.addEventListener('unload', () => {
    chrome.runtime.reload();
});