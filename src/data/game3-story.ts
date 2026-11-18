import type { StoryNode, StoryStats } from "@/lib/types";

export const START_NODE_ID = "s1";

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
  autonomy: { label: "Autonomía", short: "Tus decisiones", color: "bg-plum" },
  wellbeing: { label: "Bienestar", short: "Cómo te sentís", color: "bg-coral" },
  goals: { label: "Tus metas", short: "Tus planes", color: "bg-coral" },
  support: { label: "Tu gente", short: "Quién te apoya", color: "bg-teal" },
};

export const storyNodes: Record<string, StoryNode> = {
  s1: {
    id: "s1",
    chapter: 1,
    chapterTitle: "El celular no para",
    location: "Tu cuarto",
    time: "Noche",
    narration: [
      "Estás tranquila en tu cuarto viendo TikToks cuando tu cel empieza a vibrar sin parar. Es tu pareja: ya van como 20 mensajes y 5 llamadas perdidas en media hora. Solo porque tardaste en contestar mientras cenabas.",
      "Los mensajes dicen cosas como “¿con quién estás?”, “¿por qué no me contestás?” y “si me quisieras ya hubieras respondido”. Sentís el corazón acelerado y no sabés si es preocupación o algo que se siente medio raro.",
    ],
    prompt: "¿Qué harías vos?",
    choices: [
      { id: "s1a", label: "Le contesto de una que estaba cenando y le mando captura para que se calme.", tone: "risky", next: "s2", consequence: true, impact: "Sentís que tenés que rendir cuentas para que no se enoje.", effects: { autonomy: -1, wellbeing: -1, support: -1 } },
      { id: "s1b", label: "Le digo tranquila: “Estaba ocupada, ahorita hablamos”, y pongo límites.", tone: "healthy", next: "s2", impact: "Ponés tu tiempo primero, sin culpa.", effects: { autonomy: 2, wellbeing: 1 } },
      { id: "s1c", label: "No contesto y le cuento a una chera o a alguien de confianza cómo me siento.", tone: "healthy", next: "s2", impact: "No te lo quedás solo para vos.", effects: { support: 2, autonomy: 1, wellbeing: 1 } },
    ],
  },
  s2: {
    id: "s2",
    chapter: 2,
    chapterTitle: "Tus cheros",
    location: "Salida con la mara",
    time: "Fin de semana",
    narration: [
      "El sábado quedaste de ir al parque con tus cheros. Cuando tu pareja se entera, se pone de malas y te dice que no le gusta que salgás con “esa gente”, que seguro te van a meter en problemas o que alguien te va a tirar la onda.",
      "Te propone mejor verse solo con él/ella y hasta te hace sentir culpa: “pensé que querías pasar tiempo conmigo”. Notás que cada vez que querés ver a tus cheros se arma el drama.",
    ],
    prompt: "¿Qué decidís?",
    choices: [
      { id: "s2a", label: "Cancelo con mis cheros para que no se enoje y no haya pleito.", tone: "risky", next: "s3", consequence: true, impact: "Vas dejando de lado a tu mara para evitar problemas.", effects: { autonomy: -2, support: -2, wellbeing: -1 } },
      { id: "s2b", label: "Voy con mis cheros y le digo que podemos vernos al rato, sin pelear.", tone: "healthy", next: "s3", impact: "Tus amistades y tu tiempo también importan.", effects: { autonomy: 2, support: 2, goals: 1 } },
      { id: "s2c", label: "Le digo que me incomoda que hable mal de mis cheros y pongo un límite claro.", tone: "healthy", next: "s3", impact: "Nombrar lo que no te gusta es cuidarte.", effects: { autonomy: 2, wellbeing: 1, support: 1 } },
    ],
  },
  s3: {
    id: "s3",
    chapter: 3,
    chapterTitle: "Ubicación y redes",
    location: "Chat",
    time: "Entre semana",
    narration: [
      "Un día te pide tu ubicación en tiempo real “para estar tranquilo” y también te sugiere que borrés o bloqueés a ciertas personas de tus redes porque “no le dan buena espina”.",
      "Dice que si no tenés nada que esconder no debería molestarte. Te quedás pensando si eso es confianza o si en realidad te están controlando más de la cuenta.",
    ],
    prompt: "¿Cómo respondés?",
    choices: [
      { id: "s3a", label: "Le paso mi ubicación y borro a quien me pide, total no quiero problemas.", tone: "risky", next: "s4", consequence: true, impact: "Cedés tu privacidad para que el otro esté ‘tranquilo’.", effects: { autonomy: -2, wellbeing: -1, support: -1 } },
      { id: "s3b", label: "Le digo que no voy a compartir mi ubicación ni mis contraseñas, mi privacidad es mía.", tone: "healthy", next: "s4", impact: "Tu espacio digital también es tuyo.", effects: { autonomy: 2, wellbeing: 1 } },
      { id: "s3c", label: "Hablo con alguien de confianza para ver si lo que pasa es normal o ya es mucho.", tone: "healthy", next: "s4", impact: "Otra mirada te ayuda a ver más claro.", effects: { support: 2, autonomy: 1 } },
    ],
  },
  s4: {
    id: "s4",
    chapter: 4,
    chapterTitle: "Presión que incomoda",
    location: "Mensajes",
    time: "Tarde",
    narration: [
      "Después de un rato, la conversación se pone incómoda. Te dice cosas como “si de verdad confiaras en mí me mandarías una foto” o insiste en verte a solas en un lugar donde no hay nadie, aunque vos ya dijiste que no te sentís cómoda.",
      "Cuando le decís que no, responde con “vaya, no seas así” o te hace sentir que lo estás decepcionando. Sentís presión y un nudo en la panza.",
    ],
    prompt: "¿Qué hacés?",
    choices: [
      { id: "s4a", label: "Cedo aunque no quiera, para que ya no me insista ni se enoje.", tone: "risky", next: "s5", consequence: true, impact: "Tu ‘no’ se pierde cuando hay presión.", effects: { autonomy: -3, wellbeing: -2 } },
      { id: "s4b", label: "Le digo que no, que mi decisión se respeta y no tiene que insistir.", tone: "healthy", next: "s5", impact: "Tu límite vale, aunque al otro no le guste.", effects: { autonomy: 3, wellbeing: 2 } },
      { id: "s4c", label: "Corto la conversación, guardo lo que pasó y le cuento a un adulto o a alguien de confianza.", tone: "healthy", next: "s5", impact: "Buscar apoyo te protege.", effects: { support: 3, autonomy: 2, wellbeing: 1 } },
    ],
  },
  s5: {
    id: "s5",
    chapter: 5,
    chapterTitle: "Elegirte",
    location: "Un momento para vos",
    time: "Después",
    narration: [
      "Pasan los días y te ponés a pensar en todo: los mensajes sin parar, los celos, la presión y las veces que te sentiste mal. Te das cuenta de que una relación chiva no debería hacerte sentir con miedo, culpa o enredada.",
      "También pensás en tus metas, en tus cheros y en la gente que sí te hace sentir en paz. Sabés que pedir ayuda o poner distancia no es exagerar, es cuidarte.",
    ],
    prompt: "¿Qué hacés ahora?",
    choices: [
      { id: "s5a", label: "Hablo con alguien de confianza y pongo distancia de lo que me hace daño.", tone: "healthy", next: "end-libre", effects: { autonomy: 2, support: 2, wellbeing: 2, goals: 1 } },
      { id: "s5b", label: "Intento poner límites claros y ver si los respetan, sin dejar de hablar con mi mara.", tone: "healthy", next: "end-camino", effects: { autonomy: 1, support: 2, wellbeing: 1 } },
      { id: "s5c", label: "Me quedo callada y dejo que todo siga igual, aunque me siga doliendo.", tone: "risky", next: "end-nudos", consequence: true, impact: "Callar lo que sentís puede apretar más los nudos.", effects: { autonomy: -2, wellbeing: -2, support: -1 } },
    ],
  },
  "end-libre": {
    id: "end-libre",
    chapter: 5,
    chapterTitle: "Elegirte",
    location: "Tu espacio",
    narration: [],
    choices: [],
    isEnding: true,
    ending: {
      id: "libre",
      title: "Más libre, más vos",
      subtitle: "Elegiste cuidarte y apoyarte en tu mara",
      kind: "empowering",
      paragraphs: [
        "Pusiste límites y hablaste con alguien de confianza. No fue fácil, pero te diste cuenta de que no tenés que aguantar cosas que te hacen sentir mal.",
        "Poco a poco los nudos se fueron aflojando: recuperaste tiempo para vos, para tus metas y para las personas que te suman.",
      ],
      learnings: [
        "Poner límites es una forma de quererte.",
        "Pedir ayuda no te hace débil, te hace más fuerte.",
        "Tus metas y tu gente también son parte de tu vida.",
      ],
      support: [
        "Seguí hablando con personas adultas o cheros de confianza.",
        "Si algo te hace sentir en riesgo, buscá ayuda en tu escuela o en instituciones de tu comunidad.",
      ],
    },
  },
  "end-camino": {
    id: "end-camino",
    chapter: 5,
    chapterTitle: "Elegirte",
    location: "Tu espacio",
    narration: [],
    choices: [],
    isEnding: true,
    ending: {
      id: "camino",
      title: "Un paso a la vez",
      subtitle: "Estás aprendiendo a poner límites",
      kind: "hopeful",
      paragraphs: [
        "Decidiste poner límites y no alejarte de tu gente. Aún hay cosas que se sienten confusas, pero ya diste pasos para cuidarte.",
        "Los nudos no desaparecen de un día para otro, pero cada decisión que tomás por vos los afloja un poco más.",
      ],
      learnings: [
        "Está bien ir paso a paso, lo importante es no quedarte sola o solo.",
        "Si los límites no se respetan, eso también es una señal.",
        "Tu bienestar vale.",
      ],
      support: [
        "Mantené cerca a personas que te escuchen sin juzgar.",
        "Si la situación se pone más pesada, pedí ayuda a un adulto o a una institución de confianza.",
      ],
    },
  },
  "end-nudos": {
    id: "end-nudos",
    chapter: 5,
    chapterTitle: "Elegirte",
    location: "Tu espacio",
    narration: [],
    choices: [],
    isEnding: true,
    ending: {
      id: "nudos",
      title: "Los nudos aprietan, pero podés aflojarlos",
      subtitle: "Aún estás a tiempo de pedir ayuda",
      kind: "cautionary",
      paragraphs: [
        "Decidiste quedarte callada y aguantar, aunque por dentro se siente pesado. Eso no te hace culpable: a veces es difícil ver la salida cuando estás en medio de todo.",
        "Los nudos se sienten más apretados, pero siempre podés hablar con alguien de confianza y empezar a aflojarlos. No tenés que hacerlo sola o solo.",
      ],
      learnings: [
        "Lo que te pasa importa y lo que sentís es válido.",
        "Nadie tiene derecho a controlarte, presionarte o hacerte sentir mal.",
        "Pedir ayuda es un paso valiente, cuando vos decidás.",
      ],
      support: [
        "Buscá a una persona adulta de confianza y contale cómo te sentís.",
        "Si hay presión, amenazas o te piden cosas que no querés, pedí apoyo en tu escuela o en líneas de ayuda de tu país.",
      ],
    },
  },
};

export function getStoryNode(id: string | undefined): StoryNode {
  if (id && storyNodes[id]) return storyNodes[id];
  return storyNodes[START_NODE_ID]!;
}
