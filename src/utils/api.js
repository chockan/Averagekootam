import axios from 'axios';

const webhookUrl = 'https://webhook.site/YOUR_UNIQUE_URL'; // Replace with your unique Webhook.site URL

export const saveSegment = async (data) => {
  try {
    const response = await axios.post(webhookUrl, data);
    return response.data;
  } catch (error) {
    console.error('Error saving segment:', error);
    throw error;
  }
};
