/**
 * 从URL中提取文件名
 * @param {string} url 
 * @returns {string|null} 文件名或null(如果出错)
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