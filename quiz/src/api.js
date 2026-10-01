// Single source of truth for the API base URL.
// Set VITE_API_BASE in .env to override (e.g. for mobile / LAN access).
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export default API_BASE;
