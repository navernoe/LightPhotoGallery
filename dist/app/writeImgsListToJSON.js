"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const imgsFolder = "img/galleryImgs";
const imgsListJsonPath = "data/imgsList.json";

var _default = () => {
  _fs.default.readdir(imgsFolder, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      const imgsNames = [];
      files.forEach(file => {
        imgsNames.push(file);
      });
      const imgsListJson = JSON.stringify({
        imgsList: imgsNames
      });

      _fs.default.writeFileSync(imgsListJsonPath, imgsListJson);
    }
  });
};

exports.default = _default;