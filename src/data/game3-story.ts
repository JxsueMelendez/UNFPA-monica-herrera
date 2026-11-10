import type { StoryNode, StoryStats } from "@/lib/types";

export const START_NODE_ID = "n-ch1-start";

export const INITIAL_STATS: StoryStats = {
  autonomy: 5,
  wellbeing: 5,
  goals: 5,
  support: 5,
};

export const STAT_META: Record<
  keyof StoryStats,
  { label: string; short: string; color: string }
> = {
  autonomy: {
    label: "Autonomía",
    short: "Tus decisiones y límites",
    color: "bg-plum",
  },
  wellbeing: {
    label: "Bienestar emocional",
    short: "Cómo te sientes contigo",
    color: "bg-coral",
  },
  goals: {
    label: "Proyecto de vida",
    short: "Tus estudios y sueños",
    color: "bg-gold",
  },
  support: {
    label: "Red de apoyo",
    short: "Quienes te acompañan",
    color: "bg-teal",
  },
};

export const storyNodes: Record<string, StoryNode> = {
  "n-ch1-start": {
    id: "n-ch1-start",
    chapter: 1,
    chapterTitle: "El mensaje",
    location: "Tu cuarto",
    time: "Martes · 20:14",
    narration: [
      "Tienes 16 años y estás en el taller de ilustración del centro cultural. Tu proyecto final es una serie de afiches sobre el barrio.",
      "Álex, el asistente del taller, tiene 24. Hoy te pidió tu Instagram y te escribió por privado.",
    ],
    dialogues: [
      {
        speaker: "Álex",
        role: "other",
        text: "Hola, Sofi. Me encantó tu trabajo de hoy. No es común encontrar a alguien tan madura para su edad.",
      },
      {
        speaker: "Sofi",
        role: "protagonist",
        text: "Gracias... creo. Solo estoy intentando aprender.",
      },
    ],
    prompt: "¿Qué haces con el mensaje?",
    choices: [
      {
        id: "c1-tell-friend",
        label: "Le respondo y le cuento a Lu, mi mejor amiga.",
        tone: "healthy",
        next: "n-ch1-friend",
        effects: { support: 2, autonomy: 1 },
        impact: "Compartir lo que pasa te ayuda a mirarlo con otros ojos.",
      },
      {
        id: "c1-secret",
        label: "Le respondo, pero no se lo cuento a nadie.",
        tone: "risky",
        next: "n-ch1-secret",
        consequence: true,
        effects: { autonomy: -1, support: -1 },
        impact:
          "Un secreto pequeño puede convertirse en un aislamiento grande.",
      },
      {
        id: "c1-boundary",
        label: "No le respondo. Algo en el mensaje me hace ruido.",
        tone: "healthy",
        next: "n-ch1-ignore",
        effects: { autonomy: 2, wellbeing: 1 },
        impact: "Escuchar tu intuición también es cuidarte.",
      },
    ],
  },

  "n-ch1-friend": {
    id: "n-ch1-friend",
    chapter: 1,
    chapterTitle: "El mensaje",
    location: "Chat con Lu",
    time: "Martes · 20:26",
    narration: [
      "Le mandas una captura a Lu. Ella tarda poco en responder.",
    ],
    dialogues: [
      {
        speaker: "Lu",
        role: "support",
        text: "Sofi, tiene 24. No digo que sea mala persona, pero esa diferencia de edad y el “eres muy madura” me hacen ruido. ¿Puedes ir con cuidado?",
      },
      {
        speaker: "Sofi",
        role: "protagonist",
        text: "Tal vez solo es amable. Pero... sí, algo me incomoda.",
      },
    ],
    prompt: "¿Cómo respondes a Lu?",
    choices: [
      {
        id: "c1-listen",
        label: "Le doy la razón y decido no responderle por ahora.",
        tone: "healthy",
        next: "n-ch1-ignore",
        effects: { support: 2, autonomy: 1 },
        impact: "Escuchar a tu red no decide por ti: te ayuda a ver más.",
      },
      {
        id: "c1-dismiss",
        label: "Le resto importancia. “Solo es un amigo”, le digo.",
        tone: "risky",
        next: "n-ch2-secret",
        consequence: true,
        effects: { support: -1, autonomy: -1 },
        impact:
          "Minimizar la incomodidad puede hacerte ignorar señales importantes.",
      },
      {
        id: "c1-ask",
        label: "Le pregunto a Lu qué haría ella en mi lugar.",
        tone: "healthy",
        next: "n-ch1-ignore",
        effects: { support: 1, goals: 1 },
        impact: "Pedir una segunda mirada no es debilidad: es estrategia.",
      },
    ],
  },

  "n-ch1-secret": {
    id: "n-ch1-secret",
    chapter: 1,
    chapterTitle: "El mensaje",
    location: "Tu cuarto",
    time: "Martes · 22:40",
    narration: [
      "Respondes con un emoji. Álex escribe durante horas: te dice que eres distinta, que nunca había conectado así con nadie. Cuando mencionas a tus amigas, cambia de tema.",
    ],
    dialogues: [
      {
        speaker: "Álex",
        role: "other",
        text: "No le cuentes a nadie de nosotros. La gente es chismosa y no entiende. Esto es especial.",
      },
      {
        speaker: "Sofi",
        role: "protagonist",
        text: "¿Nosotros? Solo hemos hablado dos días.",
      },
    ],
    prompt: "El mensaje te da vueltas. ¿Qué haces?",
    choices: [
      {
        id: "c1-tell-lu",
        label: "Le cuento a Lu y le muestro la conversación.",
        tone: "healthy",
        next: "n-ch1-friend",
        effects: { support: 2, autonomy: 1 },
        impact: "Sacar el secreto a la luz le quita poder.",
      },
      {
        id: "c1-keep",
        label: "Decido guardar el secreto y seguir hablando.",
        tone: "risky",
        next: "n-ch2-secret",
        consequence: true,
        effects: { autonomy: -1, support: -2 },
        impact:
          "El aislamiento empieza cuando la relación se vuelve un secreto.",
      },
      {
        id: "c1-limit",
        label:
          "Le digo que no quiero secretos y que necesito ir despacio.",
        tone: "healthy",
        next: "n-ch1-ignore",
        effects: { autonomy: 2, wellbeing: 1 },
        impact:
          "Poner un límite temprano te muestra de qué está hecha la otra persona.",
      },
    ],
  },

  "n-ch1-ignore": {
    id: "n-ch1-ignore",
    chapter: 1,
    chapterTitle: "El mensaje",
    location: "Taller de ilustración",
    time: "Miércoles · 17:10",
    narration: [
      "No respondes. Álex insiste: “¿Te hice algo? Pensé que éramos amigos”. Al día siguiente, en el taller, se acerca demasiado y te ofrece llevarte a casa.",
    ],
    dialogues: [
      {
        speaker: "Álex",
        role: "other",
        text: "No seas así. Solo quiero conocerte. ¿Por qué tan desconfiada?",
      },
      {
        speaker: "Sofi",
        role: "protagonist",
        text: "No es desconfianza. Es que no quiero.",
      },
    ],
    prompt: "Estás en el taller, con gente cerca. ¿Qué haces?",
    choices: [
      {
        id: "c1-report",
        label: "Le cuento a la tallerista y le pido que me acompañe a casa.",
        tone: "healthy",
        next: "n-ch2-project",
        effects: { support: 3, autonomy: 2 },
        impact: "Las instituciones también pueden ser red de apoyo.",
      },
      {
        id: "c1-givechance",
        label: "Acepto que me lleve, para no ser grosera.",
        tone: "risky",
        next: "n-ch2-secret",
        consequence: true,
        effects: { autonomy: -2, wellbeing: -1 },
        impact:
          "La amabilidad no es una deuda. No tienes que aceptar para no incomodar.",
      },
      {
        id: "c1-public",
        label: "Le digo que no y me quedo cerca de mis compañeras.",
        tone: "healthy",
        next: "n-ch2-project",
        effects: { autonomy: 2, support: 1 },
        impact: "Tu “no” se sostiene mejor acompañada.",
      },
    ],
  },

  "n-ch2-public": {
    id: "n-ch2-public",
    chapter: 2,
    chapterTitle: "La invitación",
    location: "Café cerca del taller",
    time: "Viernes · 17:30",
    narration: [
      "Quedaron en un café. Al principio todo es dibujos y risas. Luego Álex propone ir a su departamento: “Hay una exposición online que quiero mostrarte. No le digas a tus papás, se preocuparían sin razón”.",
    ],
    dialogues: [
      {
        speaker: "Álex",
        role: "other",
        text: "Eres la única persona con la que puedo ser yo. No arruinemos esto por lo que digan los demás.",
      },
      {
        speaker: "Sofi",
        role: "protagonist",
        text: "Me gusta hablar contigo, pero no quiero mentirle a mi familia.",
      },
    ],
    prompt: "¿Qué decides?",
    choices: [
      {
        id: "c2-public-boundary",
        label:
          "Propongo ver la exposición en el café o en el taller, con más gente.",
        tone: "healthy",
        next: "n-ch2-boundary",
        effects: { autonomy: 2, support: 1 },
        impact: "Negociar sin ceder tus límites es posible.",
      },
      {
        id: "c2-go",
        label: "Acepto ir a su departamento sin avisar.",
        tone: "risky",
        next: "n-ch2-secret",
        consequence: true,
        effects: { autonomy: -2, wellbeing: -1 },
        impact: "Quedarte a solas sin red puede ponerte en riesgo.",
      },
      {
        id: "c2-cancel",
        label: "Cancelo la cita y me voy a mi clase de dibujo.",
        tone: "healthy",
        next: "n-ch2-project",
        effects: { autonomy: 2, goals: 1, wellbeing: 1 },
        impact: "Tu tiempo y tus planes también importan.",
      },
    ],
  },

  "n-ch2-secret": {
    id: "n-ch2-secret",
    chapter: 2,
    chapterTitle: "La invitación",
    location: "Departamento de Álex",
    time: "Viernes · 20:15",
    narration: [
      "Terminas en su departamento. Álex revisa tu celular cuando va al baño. Cuando le dices que te tienes que ir, se molesta: “Recién llegas. ¿En serio vas a elegir a tus amigas?”.",
    ],
    dialogues: [
      {
        speaker: "Álex",
        role: "other",
        text: "No entiendo por qué necesitas verlas tanto. Yo no te pido que dejes de ver a nadie.",
      },
      {
        speaker: "Sofi",
        role: "protagonist",
        text: "Sí me lo estás pidiendo. Y no me gusta que revises mi celular.",
      },
    ],
    prompt: "El ambiente se puso tenso. ¿Qué haces?",
    choices: [
      {
        id: "c2-leave",
        label:
          "Me voy. Le escribo a Lu para que me espere en la esquina.",
        tone: "healthy",
        next: "n-ch2-awake",
        effects: { autonomy: 2, support: 2 },
        impact:
          "Irte cuando algo no se siente bien es un límite, no una exageración.",
      },
      {
        id: "c2-quiet",
        label: "Me quedo callada para evitar una discusión.",
        tone: "risky",
        next: "n-ch2-isolated",
        consequence: true,
        effects: { autonomy: -2, wellbeing: -2 },
        impact:
          "Callar para evitar el conflicto puede hacer que el control crezca.",
      },
      {
        id: "c2-confront",
        label: "Le digo que revise mi celular y que eso no está bien.",
        tone: "healthy",
        next: "n-ch2-awake",
        effects: { autonomy: 2, wellbeing: 1 },
        impact:
          "Nombrar lo que te incomoda es el primer paso para ponerle un alto.",
      },
    ],
  },

  "n-ch2-boundary": {
    id: "n-ch2-boundary",
    chapter: 2,
    chapterTitle: "La invitación",
    location: "Muestra del centro cultural",
    time: "Sábado · 18:40",
    narration: [
      "Álex acepta a regañadientes. Durante la exposición no deja de mirar el celular. Luego te escribe: “Te divertiste más con tus amigos que conmigo. Si me quisieras, me darías prioridad”.",
    ],
    dialogues: [
      {
        speaker: "Lu",
        role: "support",
        text: "Sofi, no tienes que demostrarle nada. Eso es chantaje.",
      },
      {
        speaker: "Álex",
        role: "other",
        text: "Solo quiero saber que soy importante para ti.",
      },
    ],
    prompt: "¿Cómo respondes?",
    choices: [
      {
        id: "c2-hold",
        label:
          "Le digo que no voy a competir con mis amistades y sostengo el límite.",
        tone: "healthy",
        next: "n-ch2-awake",
        effects: { autonomy: 3, wellbeing: 1 },
        impact: "Sostener un límite también es una forma de amor propio.",
      },
      {
        id: "c2-givein",
        label: "Le pido perdón y dejo de ver a mis amigas esa semana.",
        tone: "risky",
        next: "n-ch2-isolated",
        consequence: true,
        effects: { autonomy: -2, support: -2 },
        impact:
          "Ceder para calmar su enojo te enseña que el amor se gana con obediencia.",
      },
      {
        id: "c2-teacher",
        label: "Le cuento a la tallerista lo que está pasando.",
        tone: "healthy",
        next: "n-ch2-awake",
        effects: { support: 3, autonomy: 1 },
        impact: "Un adulto de confianza puede ayudarte a ver lo que cuesta ver sola.",
      },
    ],
  },

  "n-ch2-awake": {
    id: "n-ch2-awake",
    chapter: 3,
    chapterTitle: "La señal",
    location: "Tu cuarto",
    time: "Domingo · 01:12",
    narration: [
      "Esa noche no puedes dormir. Repasas los mensajes: el secreto, los celos, la culpa. Te das cuenta de que hace semanas no ves a tus amigas sin sentir que le debes una explicación.",
    ],
    dialogues: [
      {
        speaker: "Lu",
        role: "support",
        text: "No tienes que contarme todo. Solo quiero saber si estás bien.",
      },
      {
        speaker: "Sofi",
        role: "protagonist",
        text: "Creo que no. Pero me da vergüenza haber dejado que pasara.",
      },
    ],
    prompt: "¿Qué haces con lo que sientes?",
    choices: [
      {
        id: "c3-talk",
        label:
          "Le respondo a Lu y le pido que me acompañe a hablar con mi hermana.",
        tone: "healthy",
        next: "n-ch3-support",
        effects: { support: 3, wellbeing: 2 },
        impact: "Pedir ayuda no es exagerar: es cuidarte.",
      },
      {
        id: "c3-hide",
        label: "Le digo que estoy bien y sigo hablando con Álex.",
        tone: "risky",
        next: "n-ch3-alone",
        consequence: true,
        effects: { support: -2, wellbeing: -2 },
        impact: "Ocultar lo que pasa te deja sola con el miedo.",
      },
      {
        id: "c3-confront",
        label:
          "Decido confrontar a Álex y pedirle que respete mis límites.",
        tone: "neutral",
        next: "n-ch3-confront",
        effects: { autonomy: 2, goals: 1 },
        impact:
          "Confrontar también es un derecho, siempre que estés a salvo.",
      },
    ],
  },

  "n-ch2-isolated": {
    id: "n-ch2-isolated",
    chapter: 3,
    chapterTitle: "La señal",
    location: "Pasillo de tu escuela",
    time: "Tres semanas después",
    narration: [
      "Dejaste de responderle a Lu. Tus notas bajaron y faltaste a dos ensayos del proyecto. Álex dice que es porque “estás cansada” y que solo él te entiende.",
    ],
    dialogues: [
      {
        speaker: "Lu",
        role: "support",
        text: "Sofi, no sé qué te pasa, pero no tienes que contármelo todo. Solo no quiero que te pierdas.",
      },
      {
        speaker: "Álex",
        role: "other",
        text: "¿Otra vez con Lu? Parece que ella no soporta que seas feliz conmigo.",
      },
    ],
    prompt: "Un mensaje de Lu te deja pensando. ¿Qué haces?",
    choices: [
      {
        id: "c3-reach",
        label: "Le respondo a Lu y le digo que necesito ayuda.",
        tone: "healthy",
        next: "n-ch3-support",
        consequence: true,
        effects: { support: 3, wellbeing: 2 },
        impact: "Pedir ayuda después de aislarte también es valentía.",
      },
      {
        id: "c3-stay",
        label: "Sigo igual. Ya se me pasará.",
        tone: "risky",
        next: "n-ch3-alone",
        effects: { wellbeing: -2, goals: -1 },
        impact: "El malestar no desaparece por ignorarlo.",
      },
      {
        id: "c3-break",
        label: "Le escribo a Álex para terminar la relación.",
        tone: "healthy",
        next: "n-ch3-confront",
        effects: { autonomy: 2, wellbeing: 1 },
        impact:
          "Terminar también puede ser un acto de cuidado, aunque duela.",
      },
    ],
  },

  "n-ch2-project": {
    id: "n-ch2-project",
    chapter: 2,
    chapterTitle: "La invitación",
    location: "Centro cultural",
    time: "Jueves · 16:20",
    narration: [
      "Te eligieron para presentar tu serie de afiches en la muestra del centro cultural. El mismo día, Álex te invita a un viaje. “Si te importa lo nuestro, vas a venir”, te dice.",
    ],
    dialogues: [
      {
        speaker: "Sofi",
        role: "protagonist",
        text: "Es mi primera muestra. Llevo meses trabajando en esto.",
      },
      {
        speaker: "Álex",
        role: "other",
        text: "Siempre tu proyecto. Yo también debería ser prioridad.",
      },
    ],
    prompt: "¿Qué decides?",
    choices: [
      {
        id: "c2-project-choose",
        label:
          "Me quedo en la muestra y le digo que no voy a abandonar mi proyecto.",
        tone: "healthy",
        next: "n-ch3-support",
        effects: { autonomy: 3, goals: 3, support: 1 },
        impact:
          "Tu proyecto de vida también es una relación que merece cuidado.",
      },
      {
        id: "c2-negotiate",
        label:
          "Le propongo vernos otro día y hablo con la tallerista sobre el viaje.",
        tone: "healthy",
        next: "n-ch3-confront",
        effects: { autonomy: 2, goals: 1, support: 1 },
        impact: "Negociar sin renunciar a lo tuyo es posible.",
      },
      {
        id: "c2-giveup",
        label: "Dejo la muestra para irme con él.",
        tone: "risky",
        next: "n-ch3-alone",
        consequence: true,
        effects: { goals: -3, autonomy: -2 },
        impact:
          "Cuando una relación te pide elegir entre ella y tu futuro, la respuesta importa.",
      },
    ],
  },

  "n-ch3-support": {
    id: "n-ch3-support",
    chapter: 4,
    chapterTitle: "El camino",
    location: "Cocina de tu casa",
    time: "Lunes · 19:05",
    narration: [
      "Lu te escucha sin interrumpir. Tu hermana mayor te ayuda a guardar capturas y a bloquear a Álex. La tallerista te dice algo que no olvidarás: “No estás exagerando. Lo que te pasó importa”.",
    ],
    dialogues: [
      {
        speaker: "Tu hermana",
        role: "support",
        text: "No tienes que enfrentar esto sola. Podemos ir juntas a hablar con la escuela si quieres.",
      },
      {
        speaker: "Sofi",
        role: "protagonist",
        text: "Me da miedo que él reaccione mal.",
      },
      {
        speaker: "Lu",
        role: "support",
        text: "Entonces no lo enfrentamos sola. Estamos aquí.",
      },
    ],
    prompt: "Es el momento de decidir cómo cierras este capítulo.",
    choices: [
      {
        id: "c4-block",
        label:
          "Lo bloqueo, guardo las pruebas y hablo con la tallerista y mi familia.",
        tone: "healthy",
        next: "n-end-voice",
        effects: { autonomy: 2, support: 2, wellbeing: 2 },
        impact:
          "Cerrar la puerta a quien te daña también abre espacio para ti.",
      },
      {
        id: "c4-distance",
        label:
          "Le digo que necesito distancia y me quedo cerca de mi red.",
        tone: "healthy",
        next: "n-end-distance",
        effects: { autonomy: 2, support: 2, wellbeing: 1 },
        impact:
          "La distancia también puede ser un límite, aunque no sea el final definitivo.",
      },
      {
        id: "c4-return",
        label:
          "Decido darle otra oportunidad, pero le cuento todo a Lu.",
        tone: "neutral",
        next: "n-end-pause",
        effects: { support: 1, autonomy: -1 },
        impact:
          "Volver no borra lo que pasó. Tener red y un plan de cuidado sigue siendo clave.",
      },
    ],
  },

  "n-ch3-alone": {
    id: "n-ch3-alone",
    chapter: 4,
    chapterTitle: "El camino",
    location: "Tu cuarto",
    time: "Martes · 23:48",
    narration: [
      "Te encierras en tu cuarto. Sientes que si cuentas lo que pasa, todos van a pensar que fuiste ingenua. El celular vibra: es Lu. “No tienes que contarme todo. Solo quiero saber si estás bien”.",
    ],
    dialogues: [
      {
        speaker: "Sofi",
        role: "protagonist",
        text: "Quizá si espero, todo se arregla solo.",
      },
      {
        speaker: "Lu",
        role: "support",
        text: "Estoy afuera de tu casa si quieres bajar. No te voy a preguntar nada.",
      },
    ],
    prompt: "Lu está esperando. ¿Qué haces?",
    choices: [
      {
        id: "c4-answer",
        label:
          "Bajo y le cuento lo que puedo. No tengo que tener todas las palabras.",
        tone: "healthy",
        next: "n-end-support",
        effects: { support: 3, wellbeing: 2, autonomy: 1 },
        impact:
          "No necesitas tener todo claro para pedir compañía.",
      },
      {
        id: "c4-silent",
        label: "No respondo. Me quedo sola con el celular.",
        tone: "risky",
        next: "n-end-pause",
        effects: { wellbeing: -2, support: -2 },
        impact:
          "El aislamiento puede hacer que el miedo se sienta más grande.",
      },
      {
        id: "c4-school",
        label:
          "Le escribo a la orientadora de mi escuela y le pido una cita.",
        tone: "healthy",
        next: "n-end-voice",
        effects: { support: 2, autonomy: 2, wellbeing: 1 },
        impact: "La escuela también puede ser un espacio de protección.",
      },
    ],
  },

  "n-ch3-confront": {
    id: "n-ch3-confront",
    chapter: 4,
    chapterTitle: "El camino",
    location: "Chat con Álex",
    time: "Miércoles · 18:22",
    narration: [
      "Le escribes a Álex: “Necesito hablar”. Le dices que no aceptas que revise tu celular, que te aísle ni que te haga sentir culpable. Él responde con un largo mensaje: “Estás exagerando. Yo solo te amo”.",
    ],
    dialogues: [
      {
        speaker: "Álex",
        role: "other",
        text: "Todos mis amigos dicen que estoy loco por ti. ¿Así me pagas?",
      },
      {
        speaker: "Lu",
        role: "support",
        text: "No estás exagerando. Estás poniendo un límite.",
      },
    ],
    prompt: "La conversación está abierta. ¿Cómo la cierras?",
    choices: [
      {
        id: "c4-support-end",
        label:
          "Le pido a Lu que se quede conmigo mientras termino de escribirle.",
        tone: "healthy",
        next: "n-end-voice",
        effects: { support: 2, autonomy: 2, wellbeing: 1 },
        impact:
          "No tienes que sostener una conversación difícil en soledad.",
      },
      {
        id: "c4-apology",
        label: "Acepto su disculpa y le digo que iremos despacio.",
        tone: "neutral",
        next: "n-end-distance",
        effects: { autonomy: 1, support: 1 },
        impact:
          "Aceptar una disculpa no obliga a olvidar lo que pasó.",
      },
      {
        id: "c4-alone-end",
        label: "Corto la conversación y me voy sola a caminar.",
        tone: "risky",
        next: "n-end-pause",
        effects: { wellbeing: -1, support: -1, autonomy: 1 },
        impact:
          "Necesitas espacio, pero también compañía. Ambas cosas pueden convivir.",
      },
    ],
  },

  "n-end-voice": {
    id: "n-end-voice",
    chapter: 4,
    chapterTitle: "El camino",
    location: "Muestra del centro cultural",
    time: "Dos meses después",
    narration: [],
    choices: [],
    isEnding: true,
    ending: {
      id: "mi-voz",
      title: "Mi voz tiene brújula",
      subtitle: "Final · Reconociste el patrón y elegiste tu red",
      kind: "empowering",
      paragraphs: [
        "No fue de un día para otro. Guardaste las capturas, bloqueaste a Álex y le contaste a tu hermana lo que pasó. La tallerista te ayudó a hablar con la escuela y Lu se quedó contigo esa tarde.",
        "Semanas después presentaste tu serie de afiches. En uno escribiste: “Mi proyecto de vida no se negocia”. No porque todo haya sido fácil, sino porque aprendiste que pedir ayuda no te quita autonomía: te la devuelve.",
        "Álex intentó escribirte desde otro número. No respondiste. Esta vez sabías que no tenías que enfrentarlo sola.",
      ],
      learnings: [
        "Reconocer el control no es culpa tuya: es el primer paso para salir.",
        "Guardar pruebas y contarle a un adulto de confianza puede protegerte.",
        "Tu red de apoyo no decide por ti: te acompaña a decidir.",
      ],
      support: [
        "Habla con una persona adulta de confianza: familia, docente u orientadora.",
        "Si hay amenazas o difusión de imágenes, acude a una institución de protección o a la policía de tu país.",
        "No tienes que bloquear o denunciar sola: pide compañía.",
      ],
    },
  },

  "n-end-distance": {
    id: "n-end-distance",
    chapter: 4,
    chapterTitle: "El camino",
    location: "Taller de ilustración",
    time: "Un mes después",
    narration: [],
    choices: [],
    isEnding: true,
    ending: {
      id: "distancia",
      title: "Un paso a la vez",
      subtitle: "Final · Elegiste distancia y seguir cuidándote",
      kind: "hopeful",
      paragraphs: [
        "No cortaste del todo, pero dejaste de responder cada mensaje. Le dijiste a Álex que necesitabas distancia y que no ibas a dejar a tus amigas. Él insistió; tú no cediste.",
        "Al principio sentiste culpa. Lu te recordó que poner un límite no es castigar a nadie: es protegerte. Volviste al taller y retomaste tu proyecto, aunque algunos días costaba concentrarte.",
        "La distancia no fue una línea recta. Hubo días en los que quisiste escribirle. Pero cada vez que lo pensabas, mirabas la lista de personas que te querían bien.",
      ],
      learnings: [
        "Poner distancia es un límite válido, incluso si no es un final definitivo.",
        "La culpa puede aparecer cuando empiezas a cuidarte; no significa que estés equivocada.",
        "Puedes pedir ayuda aunque no tengas todo resuelto.",
      ],
      support: [
        "Define con una persona de confianza un plan para los momentos en que quieras volver a escribirle.",
        "Bloquear temporalmente también es una opción; puedes cambiar la decisión después.",
        "Si él insiste o te amenaza, cuéntalo y guarda pruebas.",
      ],
    },
  },

  "n-end-support": {
    id: "n-end-support",
    chapter: 4,
    chapterTitle: "El camino",
    location: "Puerta de tu casa",
    time: "Esa misma noche",
    narration: [],
    choices: [],
    isEnding: true,
    ending: {
      id: "red",
      title: "La red que sostiene",
      subtitle: "Final · No estabas sola",
      kind: "hopeful",
      paragraphs: [
        "Bajaste a abrirle a Lu. No le contaste todo de una vez; solo dijiste: “Creo que necesito ayuda”. Ella no te juzgó. Se sentó contigo y te preguntó qué necesitabas.",
        "Al día siguiente fueron juntas a la orientadora. No fue fácil contar lo del secreto y los mensajes, pero cada palabra te quitó un poco de peso. Tu hermana te ayudó a bloquear a Álex y a guardar las pruebas.",
        "Seguiste yendo al taller. A veces el miedo volvía, pero ya no estaba solo dentro de ti. Tu red lo sostenía contigo.",
      ],
      learnings: [
        "Pedir ayuda después de aislarte también es valentía.",
        "No necesitas tener todas las palabras ni todas las respuestas para empezar.",
        "El aislamiento es parte del control; reconectar es parte de salir.",
      ],
      support: [
        "Identifica al menos una persona y una institución a las que puedas acudir.",
        "Puedes contar tu historia por partes; no tienes que decirlo todo de una vez.",
        "Si hay riesgo inmediato, contacta a los servicios de emergencia de tu país.",
      ],
    },
  },

  "n-end-pause": {
    id: "n-end-pause",
    chapter: 4,
    chapterTitle: "El camino",
    location: "Tu cuarto",
    time: "Tres semanas después",
    narration: [],
    choices: [],
    isEnding: true,
    ending: {
      id: "pausa",
      title: "En pausa, no en culpa",
      subtitle: "Final · La puerta de la ayuda sigue abierta",
      kind: "cautionary",
      paragraphs: [
        "Decidiste quedarte un tiempo más. No porque no vieras las señales, sino porque irte también daba miedo. Álex prometió cambiar; durante unos días pareció hacerlo.",
        "Los celos volvieron. Esta vez, en lugar de guardarlo todo, se lo contaste a Lu. No fue una salida perfecta, pero dejó de ser un secreto. Tu hermana te dijo algo que te quedó: “No tienes que esperar a que sea insoportable para pedir ayuda”.",
        "El final de esta historia no está escrito. Lo que sí sabes es que tu proyecto, tus amigas y tu voz no tienen que desaparecer para que alguien te quiera.",
      ],
      learnings: [
        "Quedarte no te convierte en culpable. La responsabilidad del control es de quien lo ejerce.",
        "Contarle a alguien lo que pasa reduce el aislamiento, incluso si aún no decides irte.",
        "La ayuda sigue disponible en cualquier momento; no hay un plazo para pedirla.",
      ],
      support: [
        "Habla con una persona de confianza sobre lo que pasa, aunque no quieras terminar la relación.",
        "Define señales de riesgo y un plan de contacto seguro.",
        "Busca una institución especializada en violencia o protección de menores si necesitas orientación.",
      ],
    },
  },
};

export function getStoryNode(id: string | undefined): StoryNode {
  if (id && storyNodes[id]) return storyNodes[id];
  return storyNodes[START_NODE_ID]!;
}
