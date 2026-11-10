# Brújula · Relaciones, límites y proyecto de vida

Experiencia web educativa e interactiva para adolescentes. A través de tres juegos, invita a reconocer dinámicas de control y manipulación que suelen disfrazarse de afecto, practicar límites y cuidar el proyecto de vida y las redes de apoyo.

> Contenido educativo con personajes y conversaciones ficticias. No sustituye atención psicológica, legal o médica.

## Stack

- **Next.js 15** con App Router (React Server Components + Client Components).
- **TypeScript** en modo estricto.
- **Tailwind CSS** con un sistema de diseño propio (paleta cálida, tipografías Outfit + Fraunces).
- **Framer Motion** para arrastre, transiciones y la notificación de consecuencias.
- **Lucide Icons** para la iconografía.
- **localStorage** como única persistencia: sin cuentas, backend ni seguimiento.

## Cómo ejecutar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### Scripts

```bash
npm run dev        # entorno de desarrollo
npm run build      # build de producción
npm start          # servir el build
npm run typecheck  # verificación de TypeScript
```

## Los tres juegos

### 1. ¿Lo compartes o lo cuestionas?

Juego tipo swipe con publicaciones ficticias de redes sociales. La jugadora arrastra la tarjeta (o usa los botones / flechas del teclado):

- **Derecha · Compartir**: el mensaje transmite una idea saludable.
- **Izquierda · Cuestionar**: el mensaje normaliza control, celos, aislamiento, secretos o desigualdad.

Cada respuesta abre una explicación contextual con la categoría de la señal, una idea para llevarse y una pregunta de reflexión.

### 2. Entre líneas

Simulador de chat entre Sofi (16) y Álex (24). La jugadora toca los mensajes que esconden manipulación, control, chantaje emocional, secretos o presión. El panel lateral analiza cada frase y distingue las banderas rojas de los mensajes neutros o de cuidado. Al terminar, muestra las señales que quedaron sin identificar.

### 3. Tú decides el camino

Narrativa ramificada con cuatro capítulos y cuatro finales. Las decisiones afectan cuatro recursos: autonomía, bienestar emocional, proyecto de vida y red de apoyo. Algunas elecciones activan la notificación **«Esta acción tendrá consecuencias…»** con un tono sutil generado por Web Audio API.

El enfoque evita responsabilizar o revictimizar a la adolescente: incluso el final de mayor riesgo recuerda que la responsabilidad del control es de quien lo ejerce y que la ayuda sigue disponible.

## Persistencia local

La clave de almacenamiento es `brujula:progress:v1`. El objeto guardado sigue este modelo (con algunos campos extra para reanudar partidas):

```ts
{
  userName: string,
  game1: {
    completed: boolean,
    score: number,
    cardsAnswered: number,
    answeredIds: string[]
  },
  game2: {
    completed: boolean,
    score: number,
    flagsIdentified: number,
    flaggedIds: string[]
  },
  game3: {
    completed: boolean,
    currentChapter: number,
    decisionsHistory: string[],
    currentNodeId?: string,
    stats?: { autonomy, wellbeing, goals, support },
    endingId?: string
  }
}
```

`src/lib/storage.ts` normaliza cualquier dato incompleto o de una versión anterior para que la app nunca se rompa. `src/lib/use-user-progress.tsx` expone el hook y el contexto centralizado.

## Estructura

```text
src/
├── app/
│   ├── layout.tsx              # fuentes, metadata, header, footer y provider
│   ├── page.tsx                # onboarding y captura del nombre
│   ├── globals.css
│   ├── hub/page.tsx            # panel de progreso y acceso a juegos
│   ├── juego-1/page.tsx
│   ├── juego-2/page.tsx
│   └── juego-3/page.tsx
├── components/
│   ├── ui/                     # button, card, badge, progress, modal
│   ├── shared/                 # header, footer, page shell, rings, stats
│   ├── game1/                  # swipe-card, feedback-overlay
│   ├── game2/                  # chat, message bubble, red flag panel
│   └── game3/                  # story scene, choice button, consequence banner
├── data/
│   ├── game1-cards.ts
│   ├── game2-chats.ts
│   └── game3-story.ts
└── lib/
    ├── storage.ts
    ├── types.ts
    ├── use-user-progress.tsx
    ├── sound.ts
    └── utils.ts
```

## Accesibilidad y UX

- Arrastre táctil y de puntero, además de botones explícitos y atajos `←` / `→` en el juego 1.
- Mensajes del chat y opciones narrativas implementados como botones con estados `aria-pressed` / `aria-label`.
- Modales con cierre por `Escape`, bloqueo de scroll y foco visible.
- Respeto por `prefers-reduced-motion` en los sonidos generados.
- Diseño responsive, con panel lateral que pasa a flujo vertical en móvil.
- Progreso guardado de forma incremental para poder pausar y retomar.

## Privacidad

No hay servidor, autenticación ni analítica. Todo el avance se guarda en el navegador de la persona usuaria. El botón **Borrar mi progreso** del hub elimina el registro local.

## Despliegue

El proyecto es estático por página y puede desplegarse directamente en Vercel, Netlify o cualquier entorno compatible con Next.js:

```bash
npm run build
npm start
```
