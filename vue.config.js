const path = require("path");
const PrerenderSPAPlugin = require("prerender-spa-plugin");

module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/acnh-gachi-complete/" : "/",
  outputDir: "docs",
  pages: {
    index: {
      entry: "src/main.js",
      title: "あつ森ガチコンプ"
    }
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV === "production") {
      return {
        plugins: [
          new PrerenderSPAPlugin({
            staticDir: path.join(__dirname, "docs"),
            routes: [
              "/share2/housewares",
              "/share2/housewares-miscellaneous",
              "/share2/housewares-wallmounted",
              "/share2/walletc-wall",
              "/share2/walletc-floors",
              "/share2/walletc-rugs",
              "/share2/fashion-tops",
              "/share2/fashion-bottoms",
              "/share2/fashion-dress",
              "/share2/fashion-headwear",
              "/share2/fashion-accessories",
              "/share2/fashion-socks",
              "/share2/fashion-shoes",
              "/share2/fashion-bags",
              "/share2/fashion-umbrellas",
              "/share2/fashion-other",
              "/share2/creatures-insects",
              "/share2/creatures-fish",
              "/share2/creatures-sea",
              "/share2/special-fishmodels",
              "/share2/special-bugmodels",
              "/share2/special-saharah",
              "/share2/special-gulliver",
              "/share2/special-gullivarrr",
              "/share2/special-celeste",
              "/share2/special-art",
              "/share2/special-pascal",
              "/share2/special-labelle",
              "/share2/special-kicks",
              "/share2/season-fish",
              "/share2/season-bug",
              "/share2/season-fireworks",
              "/share2/season-spring",
              "/share2/season-sakura",
              "/share2/season-easter",
              "/share2/season-mayday",
              "/share2/season-wedding",
              "/share2/season-summer",
              "/share2/season-fall",
              "/share2/season-halloween",
              "/share2/season-mushroom",
              "/share2/season-maple",
              "/share2/season-winter",
              "/share2/season-festive",
              "/share2/season-snowboy",
              "/share2/versions-150",
              "/share2/versions-140"
            ],
            postProcess(context) {
              const categories = {
                "/share2/housewares": "家具",
                "/share2/housewares-miscellaneous": "小物",
                "/share2/housewares-wallmounted": "壁かけ",
                "/share2/walletc-wall": "壁紙",
                "/share2/walletc-floors": "床板",
                "/share2/walletc-rugs": "ラグ",
                "/share2/fashion-tops": "トップス",
                "/share2/fashion-bottoms": "ボトムス",
                "/share2/fashion-dress": "ワンピース",
                "/share2/fashion-headwear": "かぶりもの",
                "/share2/fashion-accessories": "アクセサリー",
                "/share2/fashion-socks": "くつした",
                "/share2/fashion-shoes": "くつ",
                "/share2/fashion-bags": "バッグ",
                "/share2/fashion-umbrellas": "かさ",
                "/share2/fashion-other": "そのほか",
                "/share2/creatures-insects": "虫",
                "/share2/creatures-fish": "魚",
                "/share2/creatures-sea": "海の幸",
                "/share2/special-fishmodels": "ジャスティン",
                "/share2/special-bugmodels": "レックス",
                "/share2/special-saharah": "ローラン",
                "/share2/special-gulliver": "ジョニー",
                "/share2/special-gullivarrr": "海賊ジョニー",
                "/share2/special-celeste": "フーコ",
                "/share2/special-art": "つねきち",
                "/share2/special-pascal": "ラコスケ",
                "/share2/special-labelle": "ことの",
                "/share2/special-kicks": "シャンク",
                "/share2/season-fish": "魚釣り大会",
                "/share2/season-bug": "虫取り大会",
                "/share2/season-fireworks": "花火大会",
                "/share2/season-spring": "はるのわかたけ",
                "/share2/season-sakura": "さくらのはなびら",
                "/share2/season-easter": "イースター",
                "/share2/season-mayday": "メーデー",
                "/share2/season-wedding": "ジューンブライド",
                "/share2/season-summer": "なつのかいがら",
                "/share2/season-fall": "どんぐり/まつぼっくり",
                "/share2/season-halloween": "ハロウィン",
                "/share2/season-mushroom": "キノコ",
                "/share2/season-maple": "もみじのはっぱ",
                "/share2/season-winter": "ゆきのけっしょう",
                "/share2/season-festive": "オーナメント",
                "/share2/season-snowboy": "ゆきだるま",
                "/share2/versions-150": "1.5.0",
                "/share2/versions-140": "1.4.0"
              };
              context.html = context.html.replace(
                /content="【あつ森ガチコンプ】アイテムの取得状況を管理・共有できるウェブアプリ"/g,
                `content="${categories[context.route]} | あつ森ガチコンプ"`
              );
              context.html = context.html.replace(
                /<script data-spa="true">(.*?)<\/script>/,
                ""
              );
              return context;
            }
          })
        ]
      };
    }
  }
};
