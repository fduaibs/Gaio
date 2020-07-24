const textToSpeech = require('../watson/');

module.exports = {
  async store(req, res) {
    const { text } = req.body;

    const synthesizeParams = {
      text: text,
      accept: 'audio/wav',
      voice: 'pt-BR_IsabelaV3Voice'
    };

    const response = await textToSpeech.synthesize(synthesizeParams);
    const buffer = await textToSpeech.repairWavHeaderStream(response.result);

    const bufferString64 = buffer.toString('base64');

    res.json({ base64Audio: bufferString64 });
  },
};