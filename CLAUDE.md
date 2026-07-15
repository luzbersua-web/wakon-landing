# CLAUDE.md

## Reglas (Token Efficient Rules)

1. Think before acting. Read existing files before writing code.
2. Be concise in output but thorough in reasoning.
3. Prefer editing over rewriting whole files.
4. Do not re-read files you have already read unless the file may have changed.
5. Test your code before declaring done.
6. No sycophantic openers or closing fluff.
7. Keep solutions simple and direct.
8. User instructions always override this file.

---

## Proyecto: StartNow (wakon-landing)

Embudo de venta de un producto digital contra la procrastinación, bilingüe (ES/EN):
**artículo advertorial (sales page) → quiz → app PWA de 30 días**. Marca ficticia
"StartNow", autora ficticia "Eleanor Grant". Dominio: eleanorgrantofficial.com.

### Stack
Vite + React 18. Sin backend. Estado del usuario en `localStorage`.

### Estructura

- **Sales page (artículo)** — React:
  - Contenido: `src/articleContent.es.js` / `src/articleContent.en.js` (mismas claves).
  - Componente: `src/ArticlePage.jsx`. Entradas: `index.html` (ES), `en/index.html` (EN).
- **Quiz** — JS puro (no React):
  - Motor compartido: `public/shared/app.js` (NO editar para cambiar texto).
  - Contenido: `public/quiz/content.js` (ES) / `public/en/quiz/content.js` (EN).
  - Estilos de quiz Y app: `public/shared/style.css`.
  - Entradas: `public/quiz/index.html`, `public/en/quiz/index.html`.
- **App PWA (plan de 30 días)** — React:
  - Componente: `src/StartNowApp.jsx`. Contenido: `src/appContent.es.js`.
  - Módulos bonus: `src/bonusModulesContent.es.js`.
  - Entrada: `app/index.html`. SW/manifest: `public/app/`.
- **Imágenes**: `public/shared/images/` (quiz/compartidas) y
  `public/shared/images/article/` (artículo). Los nombres deben coincidir con las
  rutas en los `articleContent.*.js`.

`vite.config.js` tiene 3 entradas de build: `main` (ES), `en`, `app`.

### Correr / build / deploy

- Dev: `npm run dev` (puerto 3000). Preview server para verificar: config
  `wakon-landing` (Vite, :3000) o `wakon-public-check` (estático de `public/`, :5174).
- Build: `npm run build` → `dist/`. Siempre correr build antes de commitear cambios
  grandes; limpiar con `rm -rf dist` después.
- Deploy: **Vercel, auto-deploy al hacer push a `main`**.
  Repo: github.com/luzbersua-web/wakon-landing. En vivo: wakon-landing.vercel.app.

### Convenciones

- **Español neutro ("tú"), nunca voseo argentino.**
- Editar texto en los `content.js` / `articleContent.*.js`, NO en `app.js`.
- En `app.js`, tras `appendChild(...)` usar `insertAdjacentHTML("beforeend", ...)`,
  nunca `innerHTML +=` (destruye los listeners `onclick` ya asignados — fue un bug real).
- Imágenes: comprimir SIEMPRE con la skill `compress-images`
  (`.claude/skills/compress-images/`) antes de conectarlas. Los PNG crudos pesan
  1.5–2.5 MB; deben quedar como JPEG < 250 KB.

### Tracking (Meta Pixel)

Pixel ID `2299673380775144` en las 5 entradas (artículo ES/EN, quiz ES/EN, app).
Eventos: `PageView`, `Lead` (llega al checkout), `InitiateCheckout` (ve el pago),
`AddPaymentInfo` (toca botón de pago). El `<noscript>` va en `<body>`, no en `<head>`
(Vite rompe el build si va en el head).

### Pagos (pendiente de activar)

El checkout es una simulación. Cada plan tiene un campo `checkoutUrl` vacío en los
`content.js`. Modelo: **Hotmart para ES (LatAm), Stripe/PayPal para EN**. Al pegar
el link real en `checkoutUrl`, el botón redirige a cobrar; vacío = muestra aviso.
No procesar tarjetas ni credenciales desde el código.

### Pendientes

1. Links de pago de Hotmart (3 productos: Esencial $14.99, Plus $24.99, Completo $39.99).
2. Alojar el video bono "cómo doblar sábanas" (`~/Downloads/como doblar sabanas.MOV`,
   851 MB — comprimir + subir a YouTube oculto o Hotmart).
3. Definir entrega post-compra (acceso a la app + bono).
4. Conectar dominio eleanorgrantofficial.com (GoDaddy → DNS → Vercel).
