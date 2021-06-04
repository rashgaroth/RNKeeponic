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

export const truncate = (str, n, useWordBoundary) => {
  if (str.length <= n) { return str; }
  const subString = str.substr(0, n - 1); // the original check
  return (useWordBoundary
    ? subString.substr(0, subString.lastIndexOf(" "))
    : subString) + "...";
};

export const convertToIdr = (angka) => {
  var rupiah = '';
  var angkarev = String(angka).split('').reverse().join('');
  for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
  return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
}
