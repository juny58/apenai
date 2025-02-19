const openai = require("./config");

const chatWithModel = async (model, messages) => {
  const response = await openai.chat.completions.create({
    model,
    messages
  });

  return response;
}

module.exports = chatWithModel;