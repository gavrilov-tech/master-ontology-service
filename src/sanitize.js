export const sanitizeEscape = (string) => {
  const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#x27',
    '/': '&#x2F;'
  };

  return string.replace(/[&<>"'/]/g, match => htmlEscapes[match]);
};

export const decodeEscape = (string) => {

  const htmlEscapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': '\'',
    '&#x2F;': '/'
  };

  // decodeURIComponent()
  // encodeURIComponent()

  return string.replace(/&amp;/g, '&').replace(/&amp;|&lt;|&gt;|&quot;|&#x27;|&#x2F;/g, match => htmlEscapes[match]);
};