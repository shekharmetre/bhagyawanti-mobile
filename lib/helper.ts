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
  console.log(valuesds, "sdfsdf")
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


export function saveToLocalOnce<T>(key: string, value: T): "completed" | "exists" {
  localStorage.setItem(key, JSON.stringify(value));
  return "completed";
}


// Build a JS Date that represents the chosen IST local clock time
// Returns a Date representing the chosen IST local time (Asia/Kolkata)
export const makeISTDate = (day: Date, time: string) => {
  const [t, mod] = time.split(" ");
  let [h, m] = t.split(":").map(Number);
  if (mod === "PM" && h !== 12) h += 12;
  if (mod === "AM" && h === 12) h = 0;

  // Derive the calendar day (y, m, d) in the user's local timezone from `day`
  const y = day.getFullYear();
  const mm = day.getMonth(); // 0-based
  const dd = day.getDate();

  // Compute the UTC time that corresponds to IST y-m-d h:m (IST = UTC+05:30)
  // IST local 00:00 is UTC - 330 minutes.
  const istOffsetMin = 330;
  const utcMillis =
    Date.UTC(y, mm, dd, 0, 0, 0) + ((h * 60 + m) - istOffsetMin) * 60 * 1000;

  return new Date(utcMillis);
};
export const buildOrderDate = (day: Date, time: string): string => {
  const [t, mod] = time.split(" ");
  let [h, m] = t.split(":").map(Number);
  if (mod === "PM" && h !== 12) h += 12;
  if (mod === "AM" && h === 12) h = 0;

  // Calendar parts
  const y = day.getFullYear();
  const mm = day.getMonth(); // 0-based
  const dd = day.getDate();

  // Build date in IST
  const date = new Date(y, mm, dd, h, m);

  // Format to Indian locale
  return date.toLocaleString("en-IN", {
    weekday: "short",   // Sat
    year: "numeric",    // 2025
    month: "short",     // Aug
    day: "numeric",     // 16
    hour: "numeric",    // 11
    minute: "2-digit",  // 00
    hour12: true,       // AM/PM
    timeZone: "Asia/Kolkata"
  });
};






