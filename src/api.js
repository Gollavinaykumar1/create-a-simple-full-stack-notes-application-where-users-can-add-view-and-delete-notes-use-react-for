// This file is not needed as we are making API calls directly in the App component
// However, you can create a separate API file if you want to keep your API calls organized
export const api = axios.create({
  baseURL: BASE_URL,
});

// Auto-generated missing exports by VIA
export const createItem = async (d) => { const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/items`, {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)}); if (!r.ok) throw new Error("createItem failed"); return r.json(); };
export const deleteItem = async (id) => { const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/items/${id}`, {method:"DELETE"}); if (!r.ok) throw new Error("deleteItem failed"); return r.json(); };
export const getItems = async (p) => { const q = p ? "?" + new URLSearchParams(p) : ""; const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/items${q}`); if (!r.ok) throw new Error("getItems failed"); return r.json(); };
export const getStats = async () => { const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/stats`); if (!r.ok) throw new Error("getStats failed"); return r.json(); };
