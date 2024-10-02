import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      manifest: {
        name: "Photoravel",
        short_name: "Photoravel",
        description: "사진과 여행을 결합한 여행장소 추천 앱",
        start_url: ".",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        icons: [
          {
            src: "icons/android-launchericon-48-48.png",
            sizes: "48x48",
            type: "image/png"
          },
          {
            src: "icons/android-launchericon-72-72.png",
            sizes: "72x72",
            type: "image/png"
          },
          {
            src: "icons/android-launchericon-96-96.png",
            sizes: "96x96",
            type: "image/png"
          },
          {
            src: "icons/android-launchericon-144-144.png",
            sizes: "144x144",
            type: "image/png"
          },
          {
            src: "icons/android-launchericon-192-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icons/android-launchericon-512-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
      registerType: 'autoUpdate', // 서비스 워커 자동 업데이트 설정
    })
  ],
  server: {
    host: true,
    port: 80
  },
  build: {
    minify: false,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'UNUSED_EXTERNAL') {
          return;
        }
        warn(warning);
      },
    }
  }
});
