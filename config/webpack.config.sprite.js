const sprite = require("sprite-webpack-plugin")

module.exports = {
  plugins: [
    new sprite({
      source : "src/imgs/wrestlers/",
      imgPath: "src/imgs/",
      cssPath: "src/components/bucket-drops/stylesheets/",
      processor: "scss",
      spriteName: "wrestlers",
      orientation: "horizontal",
    })
  ]
}