// api/shopApi.ts (or any file you prefer)
import axios from 'axios';

export async function fetchShops(lat: number, lng: number) {
  const response = await axios.get(`https://4ed042a7b13f.ngrok-free.app/geo/api/shops?lat=12.959744&lng=77.6208384`);
  
  return response.data;
}
