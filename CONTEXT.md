# CONTEXT.md · Brújula

Documento de continuidad para retomar el desarrollo sin releer todo el código.
Última actualización: **2026-11-10**.

---

## 1. Qué es este proyecto

**Brújula** es una experiencia web educativa e interactiva en español para adolescentes. Busca que la persona reconozca dinámicas de control y manipulación que se disfrazan de afecto, practique límites y cuide su proyecto de vida y su red de apoyo.

- **Tagline:** “Relaciones, límites y proyecto de vida”.
- **Audiencia:** adolescentes (aprox. 14–18 años), con lenguaje cercano y sin revictimización.
- **Duración:** 15–20 minutos.
- **Contenido:** personajes y conversaciones ficticias. No sustituye atención psicológica, legal ni médica.
- **Privacidad:** sin backend, cuentas, analítica ni tracking. Todo vive en `localStorage`.

### Principios de contenido (no negociables)

1. **No culpabilizar** a la víctima. La responsabilidad del control es de quien lo ejerce.
2. **No normalizar** control, celos, secretos, aislamiento ni presión sexual.
3. **No enseñar a desconfiar de todo**: los mensajes neutros/de cuidado también se explican.
4. **Reforzar red de apoyo** y pedir ayuda como acto de autonomía, no de debilidad.
5. Tono **esperanzador y respetuoso**, incluso en el final más cautelar.
6. Español neutro; evitar modismos de un solo país.

---

## 2. Estado actual

**Completado y verificado en build de producción.**

- Onboarding con nombre/pseudónimo y hub con progreso dinámico.
- Tres juegos completos y navegables.
- Persistencia local incremental (pausar/retomar).
- Reset global desde el hub y reset por juego.
- Responsive verificado a 390 / 768 / 1440 px sin overflow horizontal.
- Accesibilidad básica verificada: controles con nombre accesible, targets ≥ 24 px, modales con Escape, flechas ←/→ en Juego 1.
- `npx tsc --noEmit` ✅
- `npm run build` ✅ (9 rutas estáticas)
- E2E completo en producción ✅ (0 page errors / 0 console errors)

### Rutas

| Ruta | Contenido |
|---|---|
| `/` | Onboarding: hero + captura de nombre |
| `/hub` | Panel de progreso, tarjetas de juegos, reset |
| `/juego-1` | Swipe de publicaciones |
| `/juego-2` | Inspector de chat |
| `/juego-3` | Historia ramificada |

Todas las páginas de juego y el hub muestran `<UserGate />` si no hay `userName`.

---

## 3. Stack y configuración

- **Next.js 15.5.29** · App Router · `reactStrictMode: true`
- **React 19.3.1**
- **TypeScript 5.9.3** · `strict: true` · alias `@/* → ./src/*`
- **Tailwind CSS 3.4.19** + PostCSS + Autoprefixer
- **Framer Motion 12.43.0**
- **Lucide React 0.468.0**
- **clsx + tailwind-merge** (`cn()` en `src/lib/utils.ts`)
- **Fuentes self-hosted:** `@fontsource-variable/outfit` (display/UI) y `@fontsource-variable/fraunces` (titulares). No hay requests a Google Fonts.

### Comandos

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build
npm start          # servir build de producción
```

---

## 4. Arquitectura

Aplicación monolítica de Next.js. No hay API routes ni server actions: todo el estado de juego es cliente.

```text
src/
├── app/
│   ├── layout.tsx              # fuentes, metadata, header/footer, ProgressProvider
│   ├── globals.css             # tokens, utilidades, animaciones, reduced motion
│   ├── icon.svg                # favicon (evita 404)
│   ├── page.tsx                # onboarding
│   ├── hub/page.tsx            # progreso + acceso a juegos + reset global
│   ├── juego-1/page.tsx
│   ├── juego-2/page.tsx
│   └── juego-3/page.tsx
├── components/
│   ├── ui/                     # badge, button, card, modal, progress
│   ├── shared/                 # header, footer, shells, rings, stats, gates
│   ├── game1/                  # swipe-card, feedback-overlay
│   ├── game2/                  # chat-container, message-bubble, red-flag-panel
│   └── game3/                  # story-scene, choice-button, consequence-banner
├── data/
│   ├── game1-cards.ts          # 10 tarjetas (5 saludables / 5 de alerta)
│   ├── game2-chats.ts          # 14 mensajes (7 banderas rojas)
│   └── game3-story.ts          # 17 nodos, 4 finales, stats
└── lib/
    ├── types.ts                # todos los contratos TypeScript
    ├── storage.ts              # lectura/escritura/normalización defensiva
    ├── use-user-progress.tsx   # contexto + hook central
    ├── sound.ts                # Web Audio API
    └── utils.ts                # cn, clamp, scrollToTop
```

### Decisiones de arquitectura

- **UI propia estilo shadcn**, sin instalar shadcn/Radix. Menos dependencias y control total del diseño.
- **Contexto único** `ProgressProvider`; las páginas llaman `updateGame1/2/3`.
- **Persistencia defensiva:** `normalizeProgress()` acepta objetos incompletos o de versiones previas y rellena defaults. La app nunca debe romperse por un localStorage corrupto.
- **Estado local + persistencia:** cada juego hidrata su estado desde el contexto una sola vez (`hydrated`) para evitar parpadeos.
- **Contenido separado del UI** en `src/data/*`; editar textos no requiere tocar componentes.
- **Sin imágenes externas:** avatares y visuales son gradientes/emoji/HTML.

---

## 5. Persistencia

- Clave: **`brujula:progress:v1`**
- Archivo: `src/lib/storage.ts`
- Hook/contexto: `src/lib/use-user-progress.tsx`

```ts
{
  userName: string,
  game1: {
    completed: boolean,
    score: number,
    cardsAnswered: number,
    answeredIds: string[]          // extra: reanudar sin repetir
  },
  game2: {
    completed: boolean,
    score: number,
    flagsIdentified: number,
    flaggedIds: string[]           // extra: banderas ya marcadas
  },
  game3: {
    completed: boolean,
    currentChapter: number,
    decisionsHistory: string[],
    currentNodeId?: string,        // extra: reanudar nodo exacto
    stats?: { autonomy, wellbeing, goals, support }, // extra
    endingId?: string              // extra: final alcanzado
  },
  updatedAt?: string               // se añade al escribir
}
```

Reglas:

- `score` de Juego 1 = aciertos (0–10). `score` de Juego 2 = banderas identificadas (0–7).
- Juego 3: stats inician en **5**, se limitan a **0–10** con `clamp`.
- `resetGame("game1" | "game2" | "game3")` solo limpia ese juego.
- `resetAll()` borra la clave y vuelve al onboarding.
- El hub considera “completado” si `completed` es true **o** si se alcanzó el total de tarjetas/banderas.

---

## 6. Los juegos

### Juego 1 · ¿Lo compartes o lo cuestionas?

- 10 tarjetas en `src/data/game1-cards.ts`: 5 saludables y 5 de alerta, alternadas (saludable primero).
- Acciones: **Compartir** (derecha) = mensaje saludable; **Cuestionar** (izquierda) = señal de alerta.
- Interacción: drag con Framer Motion, botones explícitos y teclas `←` / `→`.
- Feedback inmediato en modal con categoría, explicación, reflexión y “para llevarte”.
- Resultado según score: ≥8, ≥5, <5, con copy no punitivo.
- Persistencia incremental por tarjeta.

### Juego 2 · Entre líneas

- Chat ficticio Sofi (16) ↔ Álex (24): **14 mensajes**, **7 banderas rojas**.
- Tocar un mensaje abre el panel lateral de análisis.
- Mensajes con bandera: se marcan, se guardan y muestran categoría/severidad/explicación/consejo.
- Mensajes neutros: muestran `neutralNote` para evitar “desconfiar de todo”.
- Botón **“Terminar revisión”** disponible tanto en el panel de análisis como en el panel de misión.
- Resultado: identificadas, pasadas por alto y lista de señales no encontradas.

Horas de las 7 banderas: `21:11`, `21:13`, `21:20`, `21:23`, `21:26`, `21:32`, `21:35`.
El mensaje de `21:08` es neutro (cuidado) y se usa en tests.

### Juego 3 · Tú decides el camino

- **17 nodos**, 4 capítulos y **4 finales** en `src/data/game3-story.ts`.
- Recursos: autonomía, bienestar, metas/proyecto de vida, red de apoyo.
- Algunas decisiones riesgosas activan el banner **“Esta acción tendrá consecuencias…”** durante ~2.3 s, con sonido Web Audio (respeta `prefers-reduced-motion`).
- El nodo y las stats se guardan **antes** de mostrar el banner, así que recargar no pierde avance.
- Finales:

| `endingId` | Título | Tipo |
|---|---|---|
| `mi-voz` | Mi voz tiene brújula | empoderador |
| `distancia` | Un paso a la vez | esperanzador |
| `red` | La red que sostiene | esperanzador |
| `pausa` | En pausa, no en culpa | cautelar / no culpabilizante |

Rutas de prueba verificadas (5 decisiones cada una):

- **mi-voz:** secreto → “no quiero secretos” → “le cuento a la tallerista” → “me quedo en la muestra” → “lo bloqueo, guardo pruebas”.
- **distancia:** contarle a Lu → darle la razón → “no y me quedo cerca” → “vernos otro día” → “acepto su disculpa”.
- **red:** secreto → guardar secreto → quedarse callada → “sigo igual” → “bajo y le cuento”.
- **pausa:** secreto → guardar secreto → quedarse callada → “sigo igual” → “no respondo, me quedo sola”.

---

## 7. Diseño y accesibilidad

- Paleta cálida: `plum`, `coral`, `gold`, `teal`, `sand`, `cream`, `ink`.
- Radios amplios, sombras suaves, gradientes; estética editorial y cercana.
- Componentes UI propios en `src/components/ui/`.
- `prefers-reduced-motion` desactiva animaciones/sonidos.
- Modales: cierre con Escape, bloqueo de scroll, `ariaLabel`.
- Chat y decisiones son `<button>` reales con `aria-pressed` / `aria-label`.
- Targets interactivos ≥ 24 px.
- **Pendiente deseable:** revisión con lector de pantalla real y contraste AA formal.

---

## 8. Pruebas realizadas

Los scripts E2E viven **fuera del repo**, en:

```text
C:\Users\CP-06\AppData\Local\Temp\opencode\brujula-e2e\
```

Usan `playwright-core` + Chrome del sistema:

```text
C:\Program Files\Google\Chrome\Application\chrome.exe
```

| Script | Cubre |
|---|---|
| `test.js` | Flujo completo: onboarding → 3 juegos → hub completo → reset |
| `paths.js` | Juego 1 todo mal, Juego 2 sin banderas, 4 finales de Juego 3 |
| `game2-full.js` | 7 banderas, persistencia a mitad de partida, hub 7/7 |
| `resume.js` | Reanudar Juego 1 y Juego 3 tras recargar |
| `audit.js` | Overflow horizontal y targets a 390/768/1440 |
| `a11y.js` | Nombres accesibles de controles e inputs |

**Truco importante:** si un script usa `addInitScript` para sembrar localStorage, debe hacerlo **solo si la clave no existe**; de lo contrario cada recarga borra el avance y los tests de persistencia dan falsos negativos.

```js
await context.addInitScript((p) => {
  if (!localStorage.getItem("brujula:progress:v1")) {
    localStorage.setItem("brujula:progress:v1", JSON.stringify(p));
  }
}, progress);
```

Screenshots generados: `01-onboarding.png` … `13-mobile-game3.png` en la misma carpeta.

### Si quieres mover los tests al repo

1. Crear `e2e/` en la raíz.
2. Añadir `playwright-core` (o `@playwright/test`) como devDependency.
3. Copiar los scripts y parametrizar `BASE_URL` / ejecutable de Chrome.
4. Añadir script `npm run test:e2e`.

---

## 9. Estado de Git

- Rama actual con **solo el commit inicial** (`4fd4e05 Initial commit`).
- `README.md` está modificado.
- El resto del proyecto (`src/`, `package.json`, configs) está **sin trackear**.
- No se ha hecho commit de la implementación. Antes de commitear, revisar `git status` y decidir si se quiere un commit único o varios.

`.gitignore` ya excluye `node_modules`, `.next`, `*.tsbuildinfo` y `next-env.d.ts`.

---

## 10. Problemas conocidos / gotchas

1. **Warning de hidratación en dev** (`caret-color: transparent` en el input de nombre): apareció una vez y no se reprodujo en producción. Probablemente autofill/extension de Chrome. No afecta funcionalidad.
2. **`npm start` y `npm run dev` no deben correr a la vez** sobre el mismo `.next`; detener uno antes de build/serve.
3. **No hay persistencia entre navegadores/dispositivos** por diseño.
4. **El reset es inmediato e irreversible** desde el hub; el modal lo advierte.
5. **Juego 2:** si se identifican las 7 banderas pero no se pulsa “Terminar revisión”, el hub ya lo muestra como completado (`flagsIdentified >= total`), aunque `completed` siga en false.
6. Los textos y horas de los chats son ficticios; no usar datos reales de personas.

---

## 11. Próximos pasos sugeridos

- Revisión de contenido por una persona educadora/psicóloga antes de publicar.
- Añadir recursos institucionales **por país** (líneas de ayuda, protección de menores).
- Incorporar los E2E al repo y a CI.
- Añadir `metadata` social (Open Graph) e imagen de preview.
- Revisar contraste AA y probar con lector de pantalla.
- Probar en dispositivos móviles reales (drag táctil del Juego 1).
- Opcional: modo “docente” con guía de conversación posterior.
- Opcional: exportar/borrar datos de forma explícita desde el hub (ya existe borrado).

---

## 12. Cómo retomar en 5 minutos

```bash
cd C:\Users\CP-06\Documents\Personal
npm install
npm run dev
```

Luego:

1. Leer este `CONTEXT.md` y el `README.md`.
2. Abrir `http://localhost:3000` y recorrer onboarding → hub → juegos.
3. Antes de tocar contenido, revisar `src/data/*`.
4. Antes de tocar progreso, revisar `src/lib/storage.ts` y `src/lib/use-user-progress.tsx`.
5. Al terminar: `npm run typecheck && npm run build`.
