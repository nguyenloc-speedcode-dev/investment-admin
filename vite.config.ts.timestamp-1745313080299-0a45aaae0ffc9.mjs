// vite.config.ts
import { defineConfig } from "file:///Users/nguyenthanhloc/Documents/Freelance/investment-admin/node_modules/vite/dist/node/index.js";
import react from "file:///Users/nguyenthanhloc/Documents/Freelance/investment-admin/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tailwind from "file:///Users/nguyenthanhloc/Documents/Freelance/investment-admin/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///Users/nguyenthanhloc/Documents/Freelance/investment-admin/node_modules/autoprefixer/lib/autoprefixer.js";
import { createHtmlPlugin } from "file:///Users/nguyenthanhloc/Documents/Freelance/investment-admin/node_modules/vite-plugin-html/dist/index.mjs";

// config.ts
var CONFIG = {
  appName: "Investment",
  helpLink: "https://github.com/arifszn/reforge",
  enablePWA: true,
  theme: {
    accentColor: "#818cf8",
    sidebarLayout: "mix" /* MIX */,
    showBreadcrumb: true
  },
  metaTags: {
    title: "Investment",
    description: "An out-of-box UI solution for enterprise applications as a React boilerplate.",
    imageURL: "logo.svg"
  }
};
var config_default = CONFIG;

// tailwind.config.mjs
var tailwind_config_default = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: config_default.theme.accentColor
      }
    }
  },
  plugins: []
};

// vite.config.ts
import { VitePWA } from "file:///Users/nguyenthanhloc/Documents/Freelance/investment-admin/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          title: config_default.appName,
          metaTitle: config_default.metaTags.title,
          metaDescription: config_default.metaTags.description,
          metaImageURL: config_default.metaTags.imageURL
        }
      }
    }),
    ...config_default.enablePWA ? [
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["icon.png"],
        manifest: {
          name: config_default.appName,
          short_name: config_default.appName,
          description: config_default.metaTags.description,
          theme_color: config_default.theme.accentColor,
          icons: [
            {
              src: "icon.png",
              sizes: "64x64 32x32 24x24 16x16 192x192 512x512",
              type: "image/png"
            }
          ]
        }
      })
    ] : []
  ],
  css: {
    postcss: {
      plugins: [tailwind(tailwind_config_default), autoprefixer]
    }
  },
  define: {
    CONFIG: config_default
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiY29uZmlnLnRzIiwgInRhaWx3aW5kLmNvbmZpZy5tanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbmd1eWVudGhhbmhsb2MvRG9jdW1lbnRzL0ZyZWVsYW5jZS9pbnZlc3RtZW50LWFkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbmd1eWVudGhhbmhsb2MvRG9jdW1lbnRzL0ZyZWVsYW5jZS9pbnZlc3RtZW50LWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9uZ3V5ZW50aGFuaGxvYy9Eb2N1bWVudHMvRnJlZWxhbmNlL2ludmVzdG1lbnQtYWRtaW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgdGFpbHdpbmQgZnJvbSAndGFpbHdpbmRjc3MnO1xuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tICdhdXRvcHJlZml4ZXInO1xuaW1wb3J0IHsgY3JlYXRlSHRtbFBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWh0bWwnO1xuaW1wb3J0IHRhaWx3aW5kQ29uZmlnIGZyb20gJy4vdGFpbHdpbmQuY29uZmlnLm1qcyc7XG5pbXBvcnQgQ09ORklHIGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgY3JlYXRlSHRtbFBsdWdpbih7XG4gICAgICBpbmplY3Q6IHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHRpdGxlOiBDT05GSUcuYXBwTmFtZSxcbiAgICAgICAgICBtZXRhVGl0bGU6IENPTkZJRy5tZXRhVGFncy50aXRsZSxcbiAgICAgICAgICBtZXRhRGVzY3JpcHRpb246IENPTkZJRy5tZXRhVGFncy5kZXNjcmlwdGlvbixcbiAgICAgICAgICBtZXRhSW1hZ2VVUkw6IENPTkZJRy5tZXRhVGFncy5pbWFnZVVSTCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgLi4uKENPTkZJRy5lbmFibGVQV0FcbiAgICAgID8gW1xuICAgICAgICAgIFZpdGVQV0Eoe1xuICAgICAgICAgICAgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXG4gICAgICAgICAgICBpbmNsdWRlQXNzZXRzOiBbJ2ljb24ucG5nJ10sXG4gICAgICAgICAgICBtYW5pZmVzdDoge1xuICAgICAgICAgICAgICBuYW1lOiBDT05GSUcuYXBwTmFtZSxcbiAgICAgICAgICAgICAgc2hvcnRfbmFtZTogQ09ORklHLmFwcE5hbWUsXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBDT05GSUcubWV0YVRhZ3MuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgIHRoZW1lX2NvbG9yOiBDT05GSUcudGhlbWUuYWNjZW50Q29sb3IsXG4gICAgICAgICAgICAgIGljb25zOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3JjOiAnaWNvbi5wbmcnLFxuICAgICAgICAgICAgICAgICAgc2l6ZXM6ICc2NHg2NCAzMngzMiAyNHgyNCAxNngxNiAxOTJ4MTkyIDUxMng1MTInLFxuICAgICAgICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSksXG4gICAgICAgIF1cbiAgICAgIDogW10pLFxuICBdLFxuICBjc3M6IHtcbiAgICBwb3N0Y3NzOiB7XG4gICAgICBwbHVnaW5zOiBbdGFpbHdpbmQodGFpbHdpbmRDb25maWcpLCBhdXRvcHJlZml4ZXJdLFxuICAgIH0sXG4gIH0sXG4gIGRlZmluZToge1xuICAgIENPTkZJRzogQ09ORklHLFxuICB9LFxufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9uZ3V5ZW50aGFuaGxvYy9Eb2N1bWVudHMvRnJlZWxhbmNlL2ludmVzdG1lbnQtYWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9uZ3V5ZW50aGFuaGxvYy9Eb2N1bWVudHMvRnJlZWxhbmNlL2ludmVzdG1lbnQtYWRtaW4vY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9uZ3V5ZW50aGFuaGxvYy9Eb2N1bWVudHMvRnJlZWxhbmNlL2ludmVzdG1lbnQtYWRtaW4vY29uZmlnLnRzXCI7Ly9jb25maWcudHNcblxuZW51bSBMYXlvdXRUeXBlIHtcbiAgTUlYID0gJ21peCcsXG4gIFRPUCA9ICd0b3AnLFxuICBTSURFID0gJ3NpZGUnLFxufVxuXG5jb25zdCBDT05GSUcgPSB7XG4gIGFwcE5hbWU6ICdJbnZlc3RtZW50JyxcbiAgaGVscExpbms6ICdodHRwczovL2dpdGh1Yi5jb20vYXJpZnN6bi9yZWZvcmdlJyxcbiAgZW5hYmxlUFdBOiB0cnVlLFxuICB0aGVtZToge1xuICAgIGFjY2VudENvbG9yOiAnIzgxOGNmOCcsXG4gICAgc2lkZWJhckxheW91dDogTGF5b3V0VHlwZS5NSVgsXG4gICAgc2hvd0JyZWFkY3J1bWI6IHRydWUsXG4gIH0sXG4gIG1ldGFUYWdzOiB7XG4gICAgdGl0bGU6ICdJbnZlc3RtZW50JyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdBbiBvdXQtb2YtYm94IFVJIHNvbHV0aW9uIGZvciBlbnRlcnByaXNlIGFwcGxpY2F0aW9ucyBhcyBhIFJlYWN0IGJvaWxlcnBsYXRlLicsXG4gICAgaW1hZ2VVUkw6ICdsb2dvLnN2ZycsXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDT05GSUc7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9uZ3V5ZW50aGFuaGxvYy9Eb2N1bWVudHMvRnJlZWxhbmNlL2ludmVzdG1lbnQtYWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9uZ3V5ZW50aGFuaGxvYy9Eb2N1bWVudHMvRnJlZWxhbmNlL2ludmVzdG1lbnQtYWRtaW4vdGFpbHdpbmQuY29uZmlnLm1qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbmd1eWVudGhhbmhsb2MvRG9jdW1lbnRzL0ZyZWVsYW5jZS9pbnZlc3RtZW50LWFkbWluL3RhaWx3aW5kLmNvbmZpZy5tanNcIjtpbXBvcnQgQ09ORklHIGZyb20gJy4vY29uZmlnJztcblxuLyoqIEB0eXBlIHtpbXBvcnQoJ3RhaWx3aW5kY3NzJykuQ29uZmlnfSAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBjb250ZW50OiBbJy4vaW5kZXguaHRtbCcsICcuL3NyYy8qKi8qLntqcyx0cyxqc3gsdHN4fSddLFxuICB0aGVtZToge1xuICAgIGV4dGVuZDoge1xuICAgICAgY29sb3JzOiB7XG4gICAgICAgIHByaW1hcnk6IENPTkZJRy50aGVtZS5hY2NlbnRDb2xvcixcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW10sXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnVyxTQUFTLG9CQUFvQjtBQUM3WCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxjQUFjO0FBQ3JCLE9BQU8sa0JBQWtCO0FBQ3pCLFNBQVMsd0JBQXdCOzs7QUNJakMsSUFBTSxTQUFTO0FBQUEsRUFDYixTQUFTO0FBQUEsRUFDVCxVQUFVO0FBQUEsRUFDVixXQUFXO0FBQUEsRUFDWCxPQUFPO0FBQUEsSUFDTCxhQUFhO0FBQUEsSUFDYixlQUFlO0FBQUEsSUFDZixnQkFBZ0I7QUFBQSxFQUNsQjtBQUFBLEVBQ0EsVUFBVTtBQUFBLElBQ1IsT0FBTztBQUFBLElBQ1AsYUFDRTtBQUFBLElBQ0YsVUFBVTtBQUFBLEVBQ1o7QUFDRjtBQUVBLElBQU8saUJBQVE7OztBQ3RCZixJQUFPLDBCQUFRO0FBQUEsRUFDYixTQUFTLENBQUMsZ0JBQWdCLDRCQUE0QjtBQUFBLEVBQ3RELE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxNQUNOLFFBQVE7QUFBQSxRQUNOLFNBQVMsZUFBTyxNQUFNO0FBQUEsTUFDeEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUyxDQUFDO0FBQ1o7OztBRk5BLFNBQVMsZUFBZTtBQUd4QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixpQkFBaUI7QUFBQSxNQUNmLFFBQVE7QUFBQSxRQUNOLE1BQU07QUFBQSxVQUNKLE9BQU8sZUFBTztBQUFBLFVBQ2QsV0FBVyxlQUFPLFNBQVM7QUFBQSxVQUMzQixpQkFBaUIsZUFBTyxTQUFTO0FBQUEsVUFDakMsY0FBYyxlQUFPLFNBQVM7QUFBQSxRQUNoQztBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELEdBQUksZUFBTyxZQUNQO0FBQUEsTUFDRSxRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsUUFDZCxlQUFlLENBQUMsVUFBVTtBQUFBLFFBQzFCLFVBQVU7QUFBQSxVQUNSLE1BQU0sZUFBTztBQUFBLFVBQ2IsWUFBWSxlQUFPO0FBQUEsVUFDbkIsYUFBYSxlQUFPLFNBQVM7QUFBQSxVQUM3QixhQUFhLGVBQU8sTUFBTTtBQUFBLFVBQzFCLE9BQU87QUFBQSxZQUNMO0FBQUEsY0FDRSxLQUFLO0FBQUEsY0FDTCxPQUFPO0FBQUEsY0FDUCxNQUFNO0FBQUEsWUFDUjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSCxJQUNBLENBQUM7QUFBQSxFQUNQO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxTQUFTLENBQUMsU0FBUyx1QkFBYyxHQUFHLFlBQVk7QUFBQSxJQUNsRDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLFFBQVE7QUFBQSxFQUNWO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
