import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig(() => {

  return {
 
    plugins: [react(), tailwindcss(), flowbiteReact()],
   
  }
})
