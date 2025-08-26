const API =
  import.meta.env.MODE === 'development'
    ? '/api' // use proxy
    : import.meta.env.VITE_BACKEND_URL; // use real backend

export default API;
