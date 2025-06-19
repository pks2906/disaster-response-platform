import axios from 'axios';

const API = axios.create({
  baseURL: 'https://disaster-backend-jbk9.onrender.com/api',
});

export const getDisasters = () => API.get('/disasters');
export const getSocialMedia = (id) => API.get(`/disasters/${id}/social-media`);
export const getOfficialUpdates = (id) => API.get(`/disasters/${id}/official-updates`);
export const verifyImage = (image_url) => API.post('/image-verify', { image_url });
export const geocode = (description) => API.post('/geocode', { description });
