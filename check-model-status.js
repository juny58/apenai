const openai = require("./config");

const checkStatus = async (fineTuneId) => {
    const fineTune = await openai.fineTuning.jobs.retrieve(fineTuneId);
    console.log("📢 Fine-tune status:", fineTune.status);
    return fineTune;
}

module.exports = checkStatus;