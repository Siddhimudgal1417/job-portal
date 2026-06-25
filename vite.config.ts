import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },

  vite: {
    preview: {
      allowedHosts: ["job-portal-2-t9kr.onrender.com"],
    },
  },
});


