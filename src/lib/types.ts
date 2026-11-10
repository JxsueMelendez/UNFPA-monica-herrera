/* -------------------------------------------------------------------------- */
/*  Tipos compartidos de la aplicación                                        */
/* -------------------------------------------------------------------------- */

export type GameKey = "game1" | "game2" | "game3";

export interface Game1Progress {
  completed: boolean;
  score: number;
  cardsAnswered: number;
  /** Permite retomar una partida sin repetir tarjetas. */
  answeredIds?: string[];
}

export interface Game2Progress {
  completed: boolean;
  score: number;
  flagsIdentified: number;
  /** Permite conservar las banderas ya encontradas al recargar. */
  flaggedIds?: string[];
}

export interface StoryStats {
  autonomy: number;
  wellbeing: number;
  goals: number;
  support: number;
}

export interface Game3Progress {
  completed: boolean;
  currentChapter: number;
  decisionsHistory: string[];
  /** Nodo actual para retomar la historia donde se quedó. */
  currentNodeId?: string;
  stats?: StoryStats;
  endingId?: string;
}

export interface UserProgress {
  userName: string;
  game1: Game1Progress;
  game2: Game2Progress;
  game3: Game3Progress;
  updatedAt?: string;
}

/* -------------------------------------------------------------------------- */
/*  Juego 1 · ¿Lo compartes o lo cuestionas?                                  */
/* -------------------------------------------------------------------------- */

export interface Game1Author {
  name: string;
  handle: string;
  avatar: string;
  avatarColor: string;
}

export interface Game1Visual {
  gradient: string;
  emoji: string;
  label?: string;
}

export interface Game1Feedback {
  title: string;
  category: string;
  explanation: string;
  reflection: string;
  takeaway: string;
}

export interface Game1Card {
  id: string;
  author: Game1Author;
  time: string;
  visual: Game1Visual;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  /** true = mensaje saludable (compartir) · false = señal de alerta (cuestionar) */
  healthy: boolean;
  feedback: Game1Feedback;
}

export type SwipeChoice = "share" | "question";

/* -------------------------------------------------------------------------- */
/*  Juego 2 · Entre líneas                                                    */
/* -------------------------------------------------------------------------- */

export type FlagSeverity = "alta" | "media";

export interface RedFlag {
  category: string;
  severity: FlagSeverity;
  explanation: string;
  advice: string;
}

export interface ChatMessage {
  id: string;
  from: "teen" | "adult";
  text: string;
  time: string;
  /** Presente solo si el mensaje esconde una bandera roja. */
  redFlag?: RedFlag;
  /** Explicación amable para los mensajes que no son señal de alerta. */
  neutralNote?: string;
}

export interface Game2Chat {
  id: string;
  title: string;
  teenName: string;
  teenAge: number;
  adultName: string;
  adultAge: number;
  context: string;
  messages: ChatMessage[];
}

/* -------------------------------------------------------------------------- */
/*  Juego 3 · Tú decides el camino                                            */
/* -------------------------------------------------------------------------- */

export type ChoiceTone = "healthy" | "risky" | "neutral";

export type EndingKind = "empowering" | "hopeful" | "cautionary";

export interface StoryChoice {
  id: string;
  label: string;
  next: string;
  tone: ChoiceTone;
  /** Activa la notificación «Esta acción tendrá consecuencias…». */
  consequence?: boolean;
  /** Texto breve que resume el impacto de la decisión. */
  impact?: string;
  effects: Partial<StoryStats>;
}

export interface StoryDialogue {
  speaker: string;
  text: string;
  role: "protagonist" | "other" | "support";
}

export interface StoryEnding {
  id: string;
  title: string;
  subtitle: string;
  kind: EndingKind;
  paragraphs: string[];
  learnings: string[];
  support: string[];
}

export interface StoryNode {
  id: string;
  chapter: number;
  chapterTitle: string;
  location: string;
  time?: string;
  narration: string[];
  dialogues?: StoryDialogue[];
  prompt?: string;
  choices: StoryChoice[];
  isEnding?: boolean;
  ending?: StoryEnding;
}
