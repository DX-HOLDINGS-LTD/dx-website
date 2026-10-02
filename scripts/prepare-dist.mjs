import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const outputPublicDir = path.join(rootDir, ".output", "public");
const outputServerDir = path.join(rootDir, ".output", "server");
const distDir = path.join(rootDir, "dist");

console.log("[prepare-dist] Starting artifact preparation for dist...");

// 1. Ensure dist directory exists
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 2. Copy all files from .output/public to dist
if (fs.existsSync(outputPublicDir)) {
  fs.cpSync(outputPublicDir, distDir, { recursive: true });
  console.log("[prepare-dist] Copied .output/public assets to dist/");
} else {
  console.warn("[prepare-dist] Warning: .output/public does not exist!");
}

// 3. Import production SSR handler to prerender all routes to HTML
try {
  const serverEntryPath = path.join(outputServerDir, "index.mjs");
  if (fs.existsSync(serverEntryPath)) {
    const { default: handler } = await import(`file://${serverEntryPath}`);

    const routes = [
      { url: "/", outFile: "index.html" },
      { url: "/admin", outFile: path.join("admin", "index.html") },
      { url: "/admin", outFile: "admin.html" },
      { url: "/privacy", outFile: path.join("privacy", "index.html") },
      { url: "/privacy", outFile: "privacy.html" },
      { url: "/terms", outFile: path.join("terms", "index.html") },
      { url: "/terms", outFile: "terms.html" },
    ];

    for (const route of routes) {
      const targetPath = path.join(distDir, route.outFile);
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });

      const req = new Request("http://localhost" + route.url);
      const res = await handler.fetch(req, {}, { waitUntil: () => {} });
      if (res.status === 200) {
        const html = await res.text();
        fs.writeFileSync(targetPath, html, "utf-8");
        console.log(
          `[prepare-dist] Prerendered ${route.url} -> dist/${route.outFile} (${html.length} bytes)`,
        );
      } else {
        console.warn(`[prepare-dist] Warning: Route ${route.url} returned status ${res.status}`);
      }
    }

    // Also copy index.html to 404.html for SPA router fallback
    const indexHtmlPath = path.join(distDir, "index.html");
    const notFoundHtmlPath = path.join(distDir, "404.html");
    if (fs.existsSync(indexHtmlPath) && !fs.existsSync(notFoundHtmlPath)) {
      fs.copyFileSync(indexHtmlPath, notFoundHtmlPath);
      console.log("[prepare-dist] Created dist/404.html SPA fallback");
    }
  } else {
    console.warn("[prepare-dist] .output/server/index.mjs not found!");
  }
} catch (err) {
  console.error("[prepare-dist] Error during prerendering:", err);
}

// 4. Verify dist contents
const distFiles = fs.readdirSync(distDir);
console.log(
  `[prepare-dist] Successfully populated dist/ with ${distFiles.length} top-level entries:`,
  distFiles,
);
