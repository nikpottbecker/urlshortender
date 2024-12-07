import axios from 'axios';
import { ShortenedURL } from '../types/url';

const API_BASE_URL = 'http://localhost:3000/api';

export const shortenUrl = async (url: string): Promise<ShortenedURL> => {
  const response = await axios.post(`${API_BASE_URL}/shorten`, { url });
  return response.data;
};

export const getUrlStats = async (shortCode: string): Promise<ShortenedURL> => {
  const response = await axios.get(`${API_BASE_URL}/stats/${shortCode}`);
  return response.data;
};