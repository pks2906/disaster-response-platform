const axios = require('axios');

exports.extractLocationFromText = async (description) => {
  const prompt = `Extract location from: [description].:\n"${description}"`;

  try {
    const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        params: {
          key: process.env.GEMINI_API_KEY,
        },
      }
    );

    // Print response to debug
    console.log('Gemini response:', JSON.stringify(response.data, null, 2));

    const result = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    return result?.trim() || null;
  } catch (error) {
    console.error('Gemini API error:', error.response?.data || error.message);
    return null;
  }
};
