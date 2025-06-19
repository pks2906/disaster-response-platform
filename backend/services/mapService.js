const axios = require('axios');

exports.geocodeLocation = async (locationName) => {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationName)}.json`,
      {
        params: {
          access_token: process.env.MAPBOX_API_KEY,
          limit: 1,
        },
      }
    );

    const coords = response.data.features[0]?.center;
    if (!coords) return null;

    return { lat: coords[1], lng: coords[0] };
  } catch (error) {
    console.error('Mapbox Geocoding Error:', error.message);
    return null;
  }
};
