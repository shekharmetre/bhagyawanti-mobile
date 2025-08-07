import CryptoJS from "crypto-js";
import Hashids from 'hashids';




export function isEmail(input: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input);
}


export function extractFirstSegment(str: string): string {
  // Find the first punctuation mark (.,!?;:-)
  const punctuationIndex = str.search(/[.,!?;:-]/);

  // If no punctuation found, return the whole string
  if (punctuationIndex === -1) return str;

  // Return the substring up to (but not including) the first punctuation
  return str.substring(0, punctuationIndex).trim();
}

// Example usage:
const input = "Poorvika Mobiles Bidar. Buy Latest Mobiles, Laptops, Premium Gadgets, Mobile Accessories etc.";
const output = extractFirstSegment(input);
console.log(output); // "Poorvika Mobiles Bidar"

const hashids = new Hashids(process.env.NEXT_PUBLIC_KEY_SECRET, 8);

export function encodeIds(value: string) {
  console.log(value, "this from helroer")
  const valuesds = CryptoJS.AES.encrypt(value, process.env.NEXT_PUBLIC_KEY_SECRET!).toString();
  console.log(valuesds,"sdfsdf")
  return encodeURIComponent(valuesds)
}
export function decodeIds(encodedValue: string) {
  // 1. URL decode first
  const decodedUrl = decodeURIComponent(encodedValue);

  // 2. Decode Hashids (returns array of numbers)
  const decodedArray = hashids.decode(decodedUrl);

  // 3. Return the first decoded number, or null if empty
  return decodedArray.length > 0 ? decodedArray[0] : null;
}



