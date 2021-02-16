const fs = require("fs");

// ガチコンプの並び順でアイテム名一覧を出力
(() => {
  const list = [];

  const items = require("../src/assets/items.json");
  items.forEach(item => {
    if (
      item.sourceSheet === "Reactions" ||
      item.sourceSheet === "Achievements"
    ) {
      // リアクションとたぬきマイレージはItemStrSortに未定義なので対象外とする
      return;
    }

    list.push(item.displayName);
  });

  fs.writeFileSync("./test/result/sort-test-gachi.txt", list.join("\n"));
})();

// ItemStrSort.bcsvに従ったソート結果でアイテム名一覧を出力
(() => {
  const csvParse = require("csv-parse/lib/sync");

  const content = fs.readFileSync(`./test/data/ItemStrSort.csv`);
  const contentArray = csvParse(content, {
    from_line: 2,
    delimiter: ",",
    quote: false
  });

  const sortKeys = {};
  contentArray.forEach(row => {
    sortKeys[row[14]] = row[8];
  });

  const items = [].concat(
    require("../data/item-data/items.json"),
    require("../data/item-data/recipes.json"),
    require("../data/item-data/creatures.json")
  );

  const translation = {
    itemName: require("../data/translation-json/item-name.json"),
    fixData: require("../data/translation-custom/fix.json")
  };

  items.forEach(item => {
    // Add sortKey
    let internalId = 0;
    if (item.variants) {
      internalId = item.variants[0].internalId;
    } else {
      internalId = item.craftedItemInternalId || item.internalId;
    }
    if (sortKeys[internalId]) {
      item.sortKey = sortKeys[internalId];
    } else {
      console.log(`NoSortKey: ${item.name}`);
    }

    // Add displayName
    let itemName;
    if (item.sourceSheet === "Recipes") {
      itemName = items.filter(craftedItem => {
        return craftedItem.name === item.name;
      })[0].displayName;
    } else if (item.clothGroupId) {
      itemName = translation.itemName[`Fassion_${item.clothGroupId}`];
    } else {
      itemName = translation.itemName[internalId];
    }
    if (translation.fixData[item.name]) {
      itemName = translation.fixData[item.name];
    }
    if (itemName) {
      item.displayName = itemName;
    } else {
      item.displayName = item.name;
      console.log(`NoName: ${item.name}`);
    }
  });

  items.sort((a, b) => {
    return a.sortKey - b.sortKey;
  });

  const list = [];
  items.forEach(item => {
    list.push(item.displayName);
  });
  fs.writeFileSync("./test/result/sort-test-bcsv.txt", list.join("\n"));
})();
