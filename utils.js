export const getDescendantProp = function getDescendantProp(obj, desc) {
  var arr = desc.split(".");
  while (arr.length && (obj = obj[arr.shift()]));
  return obj;
}
