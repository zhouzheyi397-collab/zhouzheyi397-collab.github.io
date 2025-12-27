import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import md5 from "md5";
import UglifyJS from "uglify-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class {
  async data() {
    const rawFilePath = path.join(__dirname, "main.mjs");
    const fileContents = fs.readFileSync(rawFilePath, "utf-8");
    const hash = md5(fileContents).slice(0, 8);

    return {
      permalink: `js/main.${hash}.mjs`,
      file: rawFilePath,
      contents: fileContents,
    };
  }

  async render({ contents }) {
    return UglifyJS.minify(contents).code;
  }
}
