// Populate previously saved credentials
function fillSavedCredentials() {
    chrome.storage.sync.get(['endpointUrl', 'accessKeyId', 'secretAccessKey', 'bucketName'], (data) => {
        console.log('Saved credentials:', data);
        document.getElementById('endpoint-url').value = data.endpointUrl || '';
        document.getElementById('access-key-id').value = data.accessKeyId || '';
        document.getElementById('secret-access-key').value = data.secretAccessKey || '';
        document.getElementById('bucket-name').value = data.bucketName || '';
    });
}

// Populate previously saved credentials and bucket names when the popup window opens
document.addEventListener('DOMContentLoaded', fillSavedCredentials);

document.getElementById('save-btn').addEventListener('click', () => {
    const endpointUrl = document.getElementById('endpoint-url').value;
    const accessKeyId = document.getElementById('access-key-id').value;
    const secretAccessKey = document.getElementById('secret-access-key').value;
    const bucketName = document.getElementById('bucket-name').value;

    // Saving credentials and bucket names to browser storage
    chrome.storage.sync.set({
        endpointUrl,
        accessKeyId,
        secretAccessKey,
        bucketName // Save bucket name
    }, () => {
        console.log('Credentials and bucket name saved');
        // Show success message
        document.getElementById('success-msg').style.display = 'block';

        // Hide alert message after 2 seconds
        setTimeout(() => {
            document.getElementById('success-msg').style.display = 'none';
        }, 2000);
    });
});

// Reload background page when popup window closes
window.addEventListener('unload', () => {
    chrome.runtime.reload();
});
