import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/create-a-simple-full-stack-notes-application-where-users-can-add-view-and-delete-notes-use-react-for/",
  build: { outDir: "dist", assetsDir: "assets" },
  server: { port: 3000 },
});
