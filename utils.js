/**
 * Extracting file names from URLs
 * @param {string} url 
 * @returns {string|null} Filename or null (in case of error)
 */
function getFilenameFromUrl(url) {
  try {
    const parsedUrl = new URL(url);
    const filename = parsedUrl.pathname.split('/').pop();
    return filename;
  } catch (err) {
    console.error(`Error getting filename from URL: ${err}`);
    return null;
  }
}


function generateRandomFileName(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
