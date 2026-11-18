import type { Game2Chat } from "@/lib/types";

export const game2Chat: Game2Chat = {
  id: "alex-instagram",
  title: "Chat con Álex",
  teenName: "Sofi",
  teenAge: 16,
  adultName: "Álex",
  adultAge: 24,
  context:
    "Instagram DM · Álex es el asistente del taller de dibujo donde Sofi va desde hace unos meses.",
  messages: [
    {
      id: "m01",
      from: "adult",
      text: "Hey Sofi, ¿ya llegaste a tu casa? Me quedé pensando cuando no me contestaste. 😊",
      time: "21:08",
      neutralNote:
        "Preguntar si llegaste bien puede ser algo tranquilo. Se pone raro cuando se vuelve obligación avisar todo el tiempo.",
    },
    {
      id: "m02",
      from: "teen",
      text: "Sí, perdón, andaba cenando con mi familia.",
      time: "21:10",
      sticker: "/stickers/love-you.jpg",
      stickerAlt: "Sticker Love you",
    },
    {
      id: "m03",
      from: "adult",
      text: "Ah, va. Es que me gusta saber dónde andás. ¿Por qué no me avisaste antes?",
      time: "21:11",
      redFlag: {
        category: "Control sutil",
        severity: "media",
        explanation:
          "Que te pida avisarle cada movimiento suena a cuidado, pero te pone en modo ‘tengo que reportarme’. Avisar debería ser tu decisión, no tu obligación.",
        advice:
          "Pensá: ¿me cuida o me vigila? Podés decir: ‘Te cuento si quiero, no tengo que avisarte de todo’.",
      },
    },
    {
      id: "m04",
      from: "teen",
      text: "De veras no pensé que tuviera que avisarte.",
      time: "21:12",
      sticker: "/stickers/minion-papoi.jpg",
      stickerAlt: "Sticker reacción",
    },
    {
      id: "m05",
      from: "adult",
      text: "Es que sos bien distraída jaja. Menos mal me tenés para cuidarte.",
      time: "21:13",
      redFlag: {
        category: "Infantilización",
        severity: "media",
        explanation:
          "Te trata como si no pudieras sola y se pone por encima de vos. Con el tiempo eso te hace dudar de tus propias decisiones.",
        advice:
          "Vos podés cuidarte y decidir. Nadie tiene que ‘manejarte’ ni decirte qué hacer.",
      },
    },
    {
      id: "m06",
      from: "adult",
      text: "¿Con quién estabas? Vi que subiste una story con un maje.",
      time: "21:20",
      redFlag: {
        category: "Vigilancia de redes",
        severity: "media",
        explanation:
          "Andar revisando tus historias para reclamarte por tus amistades es control digital. Tus redes y tu gente no necesitan su aprobación.",
        advice:
          "Podés poner límites con lo que ve o compartís. Que revise tus redes no es prueba de amor.",
      },
    },
    {
      id: "m07",
      from: "teen",
      text: "Es mi chero de clase, solo estábamos estudiando.",
      time: "21:22",
    },
    {
      id: "m08",
      from: "adult",
      text: "No me gusta. Ese maje te ve raro. Mejor bloquealo, ¿va? Hacelo por mí.",
      time: "21:23",
      sticker: "/stickers/sticker-vibzz.jpg",
      stickerAlt: "Sticker",
      redFlag: {
        category: "Aislamiento",
        severity: "alta",
        explanation:
          "Te pide cortar a alguien usando su incomodidad como excusa. Alejarte de tus cheros es una señal fuerte: te deja con menos gente que te apoye.",
        advice:
          "Puede decir que le incomoda, pero no decidir por vos. Límite claro: ‘Mis amistades las elijo yo’.",
      },
    },
    {
      id: "m09",
      from: "teen",
      text: "No sé… es mi chero.",
      time: "21:25",
      sticker: "/stickers/ignorando.jpg",
      stickerAlt: "Sticker dudando",
    },
    {
      id: "m10",
      from: "adult",
      text: "Si de verdad te importara lo nuestro, lo harías. No quiero que nadie se meta entre nosotros.",
      time: "21:26",
      redFlag: {
        category: "Chantaje emocional",
        severity: "alta",
        explanation:
          "Te condiciona: ‘si me quisieras, harías esto’. Te hace sentir culpable y responsable de sus emociones para que hagás lo que él quiere.",
        advice:
          "Querer a alguien no es obedecer. Podés decir: ‘No voy a decidir por miedo a perderte’.",
      },
    },
    {
      id: "m11",
      from: "teen",
      text: "Ok… lo voy a pensar.",
      time: "21:30",
    },
    {
      id: "m12",
      from: "adult",
      text: "Gracias. Sos especial, nunca había conocido a alguien tan madura para su edad. No le digas a tus papás, no van a entender.",
      time: "21:32",
      redFlag: {
        category: "Secreto y grooming",
        severity: "alta",
        explanation:
          "El ‘sos muy madura’ y pedirte que lo ocultés son señales fuertes. Si algo tiene que esconderse de adultos de confianza, ahí hay riesgo.",
        advice:
          "Contale a una persona adulta de confianza. El secreto lo protege a él, no a vos.",
      },
    },
    {
      id: "m13",
      from: "teen",
      text: "¿Por qué no lo entenderían?",
      time: "21:34",
      sticker: "/stickers/sticker-kdijiste.jpg",
      stickerAlt: "Sticker confundida",
    },
    {
      id: "m14",
      from: "adult",
      text: "Porque no saben lo que tenemos. Confiá en mí. Si me querés, mandame una foto tuya ahorita. Solo para mí. 😉",
      time: "21:35",
      sticker: "/stickers/sticker-pinned.jpg",
      stickerAlt: "Sticker",
      redFlag: {
        category: "Presión sexual",
        severity: "alta",
        explanation:
          "Pedirte fotos y usar ‘si me querés’ es presión. Nadie tiene derecho a exigirte fotos. Si sos menor, compartir imágenes así también es un delito.",
        advice:
          "No mandés nada. Guardá capturas, bloquealo y buscá ayuda de un adulto o una institución de confianza. No es tu culpa.",
      },
    },
  ],
};

export const GAME2_TOTAL_FLAGS = game2Chat.messages.filter(
  (message) => message.redFlag,
).length;

export const RED_FLAG_HINT_CATEGORIES = [
  "Control sutil",
  "Infantilización",
  "Vigilancia de redes",
  "Aislamiento",
  "Chantaje emocional",
  "Secreto y grooming",
  "Presión sexual",
];
