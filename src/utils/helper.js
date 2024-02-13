export function onNumberChangeFormat(text) {
  var cleaned = ("" + text).replace(/\D/g, "");
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    number = ["(", match[2], ") ", match[3], "-", match[4]].join("");
    return number;
  }

  if (text.length > 13) {
    return text;
  } else {
    var result = text.replace(/[- )(]/g, "");
    return result;
  }
}
