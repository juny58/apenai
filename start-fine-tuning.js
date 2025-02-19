const openai = require("./config");

const fineTuneModel = async (fileId) => {
  const fineTune = await openai.fineTuning.jobs.create({
    model: "gpt-4o-2024-08-06",
    training_file: fileId,
  });

  console.log("🚀 Fine-tuning started:", fineTune.id);
  return fineTune;
}

module.exports = fineTuneModel;
