// User-entered credentials live only in this browser and are sent with each API call.
const KEY = 'qp_settings';
export const loadSettings = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
export const saveSettings = (s) => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} };

const encode = (obj) => btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(obj))));

export async function api(url, opts = {}, asBlob = false, settings = loadSettings()) {
  const headers = { 'X-QA-Config': encode(settings) };
  if (opts.body && !(opts.body instanceof FormData)) headers['Content-Type'] = 'application/json';
  let res;
  try { res = await fetch(url, { ...opts, headers }); } catch { throw new Error('Cannot reach the server.'); }
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return asBlob ? res.blob() : res.json();
}
