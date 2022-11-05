const fsP = require("fs/promises")
const resetData = async () => {
    await fsP.copyFile(
      __dirname + "/backup/cards.json",
      __dirname + "/cards.json"
    );
    await fsP.copyFile(
      __dirname + "/backup/sizes.json",
      __dirname + "/sizes.json"
    );
    await fsP.copyFile(
      __dirname + "/backup/templates.json",
      __dirname + "/templates.json"
    );
  };
  resetData()