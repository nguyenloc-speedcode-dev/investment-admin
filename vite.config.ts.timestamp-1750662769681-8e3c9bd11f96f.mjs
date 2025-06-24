// vite.config.ts
import { defineConfig } from "file:///Users/nguyenthanhloc/Documents/Freelance/investment-admin/node_modules/vite/dist/node/index.js";
import react from "file:///Users/nguyenthanhloc/Documents/Freelance/investment-admin/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tailwind from "file:///Users/nguyenthanhloc/Documents/Freelance/investment-admin/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///Users/nguyenthanhloc/Documents/Freelance/investment-admin/node_modules/autoprefixer/lib/autoprefixer.js";
import { createHtmlPlugin } from "file:///Users/nguyenthanhloc/Documents/Freelance/investment-admin/node_modules/vite-plugin-html/dist/index.mjs";

// config.ts
var CONFIG = {
  appName: "BitPool Invest",
  helpLink: "https://github.com/arifszn/reforge",
  enablePWA: true,
  theme: {
    accentColor: "#1bb757",
    sidebarLayout: "side" /* SIDE */,
    showBreadcrumb: true
  },
  metaTags: {
    title: "BitPool",
    description: "Qu\u1EA3n l\xFD th\xF4ng tin d\u1EF1 \xE1n game",
    imageURL: "https://bitpoolinvest.com/static/media/logo.2fbb89a416183a821216.png"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiY29uZmlnLnRzIiwgInRhaWx3aW5kLmNvbmZpZy5tanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbmd1eWVudGhhbmhsb2MvRG9jdW1lbnRzL0ZyZWVsYW5jZS9pbnZlc3RtZW50LWFkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbmd1eWVudGhhbmhsb2MvRG9jdW1lbnRzL0ZyZWVsYW5jZS9pbnZlc3RtZW50LWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9uZ3V5ZW50aGFuaGxvYy9Eb2N1bWVudHMvRnJlZWxhbmNlL2ludmVzdG1lbnQtYWRtaW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgdGFpbHdpbmQgZnJvbSAndGFpbHdpbmRjc3MnO1xuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tICdhdXRvcHJlZml4ZXInO1xuaW1wb3J0IHsgY3JlYXRlSHRtbFBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWh0bWwnO1xuaW1wb3J0IHRhaWx3aW5kQ29uZmlnIGZyb20gJy4vdGFpbHdpbmQuY29uZmlnLm1qcyc7XG5pbXBvcnQgQ09ORklHIGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgY3JlYXRlSHRtbFBsdWdpbih7XG4gICAgICBpbmplY3Q6IHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHRpdGxlOiBDT05GSUcuYXBwTmFtZSxcbiAgICAgICAgICBtZXRhVGl0bGU6IENPTkZJRy5tZXRhVGFncy50aXRsZSxcbiAgICAgICAgICBtZXRhRGVzY3JpcHRpb246IENPTkZJRy5tZXRhVGFncy5kZXNjcmlwdGlvbixcbiAgICAgICAgICBtZXRhSW1hZ2VVUkw6IENPTkZJRy5tZXRhVGFncy5pbWFnZVVSTCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgLi4uKENPTkZJRy5lbmFibGVQV0FcbiAgICAgID8gW1xuICAgICAgICAgIFZpdGVQV0Eoe1xuICAgICAgICAgICAgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXG4gICAgICAgICAgICBpbmNsdWRlQXNzZXRzOiBbJ2ljb24ucG5nJ10sXG4gICAgICAgICAgICBtYW5pZmVzdDoge1xuICAgICAgICAgICAgICBuYW1lOiBDT05GSUcuYXBwTmFtZSxcbiAgICAgICAgICAgICAgc2hvcnRfbmFtZTogQ09ORklHLmFwcE5hbWUsXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBDT05GSUcubWV0YVRhZ3MuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgIHRoZW1lX2NvbG9yOiBDT05GSUcudGhlbWUuYWNjZW50Q29sb3IsXG4gICAgICAgICAgICAgIGljb25zOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3JjOiAnaWNvbi5wbmcnLFxuICAgICAgICAgICAgICAgICAgc2l6ZXM6ICc2NHg2NCAzMngzMiAyNHgyNCAxNngxNiAxOTJ4MTkyIDUxMng1MTInLFxuICAgICAgICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSksXG4gICAgICAgIF1cbiAgICAgIDogW10pLFxuICBdLFxuICBjc3M6IHtcbiAgICBwb3N0Y3NzOiB7XG4gICAgICBwbHVnaW5zOiBbdGFpbHdpbmQodGFpbHdpbmRDb25maWcpLCBhdXRvcHJlZml4ZXJdLFxuICAgIH0sXG4gIH0sXG4gIGRlZmluZToge1xuICAgIENPTkZJRzogQ09ORklHLFxuICB9LFxufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9uZ3V5ZW50aGFuaGxvYy9Eb2N1bWVudHMvRnJlZWxhbmNlL2ludmVzdG1lbnQtYWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9uZ3V5ZW50aGFuaGxvYy9Eb2N1bWVudHMvRnJlZWxhbmNlL2ludmVzdG1lbnQtYWRtaW4vY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9uZ3V5ZW50aGFuaGxvYy9Eb2N1bWVudHMvRnJlZWxhbmNlL2ludmVzdG1lbnQtYWRtaW4vY29uZmlnLnRzXCI7Ly9jb25maWcudHNcblxuZW51bSBMYXlvdXRUeXBlIHtcbiAgTUlYID0gJ21peCcsXG4gIFRPUCA9ICd0b3AnLFxuICBTSURFID0gJ3NpZGUnLFxufVxuXG5jb25zdCBDT05GSUcgPSB7XG4gIGFwcE5hbWU6ICdCaXRQb29sIEludmVzdCcsXG4gIGhlbHBMaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL2FyaWZzem4vcmVmb3JnZScsXG4gIGVuYWJsZVBXQTogdHJ1ZSxcbiAgdGhlbWU6IHtcbiAgICBhY2NlbnRDb2xvcjogJyMxYmI3NTcnLFxuICAgIHNpZGViYXJMYXlvdXQ6IExheW91dFR5cGUuU0lERSxcbiAgICBzaG93QnJlYWRjcnVtYjogdHJ1ZSxcbiAgfSxcbiAgbWV0YVRhZ3M6IHtcbiAgICB0aXRsZTogJ0JpdFBvb2wnLFxuICAgIGRlc2NyaXB0aW9uOiAnUXVcdTFFQTNuIGxcdTAwRkQgdGhcdTAwRjRuZyB0aW4gZFx1MUVGMSBcdTAwRTFuIGdhbWUnLFxuICAgIGltYWdlVVJMOiAnaHR0cHM6Ly9iaXRwb29saW52ZXN0LmNvbS9zdGF0aWMvbWVkaWEvbG9nby4yZmJiODlhNDE2MTgzYTgyMTIxNi5wbmcnLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ09ORklHO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbmd1eWVudGhhbmhsb2MvRG9jdW1lbnRzL0ZyZWVsYW5jZS9pbnZlc3RtZW50LWFkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbmd1eWVudGhhbmhsb2MvRG9jdW1lbnRzL0ZyZWVsYW5jZS9pbnZlc3RtZW50LWFkbWluL3RhaWx3aW5kLmNvbmZpZy5tanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL25ndXllbnRoYW5obG9jL0RvY3VtZW50cy9GcmVlbGFuY2UvaW52ZXN0bWVudC1hZG1pbi90YWlsd2luZC5jb25maWcubWpzXCI7aW1wb3J0IENPTkZJRyBmcm9tICcuL2NvbmZpZyc7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCd0YWlsd2luZGNzcycpLkNvbmZpZ30gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29udGVudDogWycuL2luZGV4Lmh0bWwnLCAnLi9zcmMvKiovKi57anMsdHMsanN4LHRzeH0nXSxcbiAgdGhlbWU6IHtcbiAgICBleHRlbmQ6IHtcbiAgICAgIGNvbG9yczoge1xuICAgICAgICBwcmltYXJ5OiBDT05GSUcudGhlbWUuYWNjZW50Q29sb3IsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtdLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1csU0FBUyxvQkFBb0I7QUFDN1gsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sY0FBYztBQUNyQixPQUFPLGtCQUFrQjtBQUN6QixTQUFTLHdCQUF3Qjs7O0FDSWpDLElBQU0sU0FBUztBQUFBLEVBQ2IsU0FBUztBQUFBLEVBQ1QsVUFBVTtBQUFBLEVBQ1YsV0FBVztBQUFBLEVBQ1gsT0FBTztBQUFBLElBQ0wsYUFBYTtBQUFBLElBQ2IsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsRUFDbEI7QUFBQSxFQUNBLFVBQVU7QUFBQSxJQUNSLE9BQU87QUFBQSxJQUNQLGFBQWE7QUFBQSxJQUNiLFVBQVU7QUFBQSxFQUNaO0FBQ0Y7QUFFQSxJQUFPLGlCQUFROzs7QUNyQmYsSUFBTywwQkFBUTtBQUFBLEVBQ2IsU0FBUyxDQUFDLGdCQUFnQiw0QkFBNEI7QUFBQSxFQUN0RCxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsTUFDTixRQUFRO0FBQUEsUUFDTixTQUFTLGVBQU8sTUFBTTtBQUFBLE1BQ3hCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsQ0FBQztBQUNaOzs7QUZOQSxTQUFTLGVBQWU7QUFHeEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04saUJBQWlCO0FBQUEsTUFDZixRQUFRO0FBQUEsUUFDTixNQUFNO0FBQUEsVUFDSixPQUFPLGVBQU87QUFBQSxVQUNkLFdBQVcsZUFBTyxTQUFTO0FBQUEsVUFDM0IsaUJBQWlCLGVBQU8sU0FBUztBQUFBLFVBQ2pDLGNBQWMsZUFBTyxTQUFTO0FBQUEsUUFDaEM7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxHQUFJLGVBQU8sWUFDUDtBQUFBLE1BQ0UsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFFBQ2QsZUFBZSxDQUFDLFVBQVU7QUFBQSxRQUMxQixVQUFVO0FBQUEsVUFDUixNQUFNLGVBQU87QUFBQSxVQUNiLFlBQVksZUFBTztBQUFBLFVBQ25CLGFBQWEsZUFBTyxTQUFTO0FBQUEsVUFDN0IsYUFBYSxlQUFPLE1BQU07QUFBQSxVQUMxQixPQUFPO0FBQUEsWUFDTDtBQUFBLGNBQ0UsS0FBSztBQUFBLGNBQ0wsT0FBTztBQUFBLGNBQ1AsTUFBTTtBQUFBLFlBQ1I7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0gsSUFDQSxDQUFDO0FBQUEsRUFDUDtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gsU0FBUztBQUFBLE1BQ1AsU0FBUyxDQUFDLFNBQVMsdUJBQWMsR0FBRyxZQUFZO0FBQUEsSUFDbEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixRQUFRO0FBQUEsRUFDVjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
