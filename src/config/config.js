/**
 * Global Configuration for Frontend
 * Single source of truth for Backend URL and API Endpoints.
 * Automatically switches between Localhost and Live Server without manual changes.
 */

export const isLocalhost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.startsWith('192.168.') ||
    window.location.hostname === '[::1]');

// Live production URL:
const LIVE_URL = 'https://divinecreations.co.in';

// Local development URL:
const LOCAL_URL = 'http://localhost:9003';

export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ||
  (isLocalhost ? LOCAL_URL : LIVE_URL);

export const BASE_URL = `${BACKEND_URL}/api/v1`;
