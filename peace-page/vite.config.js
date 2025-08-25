import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/

export default defineConfig({
  
  server: {
    // This is the port your backend server is running on
    
    proxy:{
      // This will proxy requests from /api in the backend server
      // target is changed to match the backend server's URL
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      }
    }
  },
  plugins: [react(), tailwindcss(), flowbiteReact()],
  base: process.env.VITE_BASE_PATH || '/peace', 
})