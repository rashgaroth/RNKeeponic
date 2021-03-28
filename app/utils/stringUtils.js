export const getInitials = name => {
  let initials = Array.prototype.map
    .call(name.split(' '), function(x) {
      return x.substring(0, 1).toUpperCase();
    })
    .join('');
  return initials.substring(0, 2);
};

export const trimString = text => {
  return text.replace(/\w+/g, function(txt) {
    // uppercase first letter and add rest unchanged
    return txt.charAt(0).toLowerCase() + txt.substr(1);
  }).replace(/\s/g, '');// remove any spaces
}
