const fs = require("fs");
const openai = require("./config");

const uploadFile = async (filePath) => {
  const file = await openai.files.create({
    file: fs.createReadStream(filePath),
    purpose: "fine-tune",
  });

  console.log("✅ File uploaded:", file.id);
  return file.id;
}

module.exports = uploadFile;