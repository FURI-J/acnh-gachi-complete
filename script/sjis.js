const iconv = require("iconv-lite");
const { convertForSorting } = require("./sort.js");

function addChars(sjisTable, startChar, endChar) {
  for (let c = startChar.charCodeAt(0); c <= endChar.charCodeAt(0); c++) {
    const k = convertForSorting(String.fromCharCode(c));
    sjisTable[k] = iconv.encode(k, "Shift_JIS").toString("hex");
  }
}

module.exports = {
  genSjisTable: function(items) {
    const sjisTable = {};
    addChars(sjisTable, "0", "9");
    addChars(sjisTable, "ァ", "ヶ");
    addChars(sjisTable, "Ａ", "Ｚ");
    addChars(sjisTable, "ａ", "ｚ");
    items.forEach(item => {
      const name = convertForSorting(item.yomigana || item.displayName);
      const symbols = name.match(/[^0-9ァ-ヶＡ-Ｚａ-ｚ]/g);
      if (symbols) {
        symbols.forEach(c => {
          sjisTable[c] = iconv.encode(c, "Shift_JIS").toString("hex");
        });
      }
    });
    console.log(sjisTable);
    return sjisTable;
  }
};
