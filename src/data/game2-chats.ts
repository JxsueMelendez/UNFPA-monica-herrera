import type { Game2Chat } from "@/lib/types";

/**
 * Conversación ficticia. Las banderas rojas están distribuidas en 7 mensajes;
 * el resto son mensajes neutros con una nota educativa para evitar que el juego
 * enseñe a desconfiar de cualquier gesto de cuidado.
 */
export const game2Chat: Game2Chat = {
  id: "alex-instagram",
  title: "Chat con Álex",
  teenName: "Sofi",
  teenAge: 16,
  adultName: "Álex",
  adultAge: 24,
  context:
    "Instagram DM · Álex es asistente del taller de ilustración al que Sofi asiste desde hace tres meses.",
  messages: [
    {
      id: "m01",
      from: "adult",
      text: "Hola Sofi, ¿ya llegaste a casa? Me preocupé cuando no me respondiste. 😊",
      time: "21:08",
      neutralNote:
        "Preocuparse por tu llegada puede ser un gesto de cuidado. La señal aparece cuando ese cuidado se convierte en la obligación de reportar cada movimiento.",
    },
    {
      id: "m02",
      from: "teen",
      text: "Sí, perdón, estaba cenando con mi familia.",
      time: "21:10",
    },
    {
      id: "m03",
      from: "adult",
      text: "Ah, ok. Es que me gusta saber dónde estás. ¿Por qué no me avisaste antes?",
      time: "21:11",
      redFlag: {
        category: "Control sutil",
        severity: "media",
        explanation:
          "Pedir que avises cada movimiento puede parecer cuidado, pero instala la idea de que le debes un reporte. En una relación entre iguales, avisar es una elección, no una obligación.",
        advice:
          "Pregúntate: ¿esto es cuidado o una forma de vigilarme? Puedes decir: “Te cuento cuando quiera hacerlo; no tengo que reportarte todo”.",
      },
    },
    {
      id: "m04",
      from: "teen",
      text: "No pensé que fuera necesario avisarte.",
      time: "21:12",
    },
    {
      id: "m05",
      from: "adult",
      text: "Es que eres muy distraída. Menos mal me tienes a mí para cuidarte.",
      time: "21:13",
      redFlag: {
        category: "Infantilización",
        severity: "media",
        explanation:
          "Te presenta como alguien incapaz de cuidarse y se coloca en un lugar de superioridad. Con el tiempo puede hacerte dudar de tus propias decisiones.",
        advice:
          "Reconocer tus capacidades es parte de tu autonomía. No necesitas que alguien te “administre” ni te diga lo que puedes o no puedes hacer.",
      },
    },
    {
      id: "m06",
      from: "adult",
      text: "¿Con quién estabas? Vi que subiste una foto con un chico.",
      time: "21:20",
      redFlag: {
        category: "Vigilancia de redes",
        severity: "media",
        explanation:
          "Monitorear tus publicaciones para cuestionar tus amistades es una forma de control digital. Tu vida social no tiene que ser aprobada por tu pareja.",
        advice:
          "Puedes limitar el acceso a tu información y hablar con un adulto de confianza si sientes que te vigila. Revisar tus redes no es una prueba de amor.",
      },
    },
    {
      id: "m07",
      from: "teen",
      text: "Es mi compañero de clase, solo estudiamos.",
      time: "21:22",
    },
    {
      id: "m08",
      from: "adult",
      text: "No me gusta. Ese tipo te mira raro. Mejor bloquealo, ¿sí? Por mí.",
      time: "21:23",
      redFlag: {
        category: "Aislamiento",
        severity: "alta",
        explanation:
          "Te pide cortar un vínculo usando su incomodidad como argumento. Aislarte de amigos y compañeros es una señal de alerta clásica: reduce tu red de apoyo.",
        advice:
          "Una pareja puede expresar incomodidad, pero no decidir con quién hablas. Un límite claro: “Mis amistades las elijo yo”.",
      },
    },
    {
      id: "m09",
      from: "teen",
      text: "No sé, es mi amigo...",
      time: "21:25",
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
          "Condiciona el afecto a que obedezcas: “si me quisieras, harías esto”. Es una forma de presión que te hace responsable de sus emociones y te aísla.",
        advice:
          "El amor no se demuestra obedeciendo. Puedes responder: “No voy a tomar decisiones por miedo a perderte”.",
      },
    },
    {
      id: "m11",
      from: "teen",
      text: "Ok... lo pensaré.",
      time: "21:30",
    },
    {
      id: "m12",
      from: "adult",
      text: "Gracias. Eres especial, nunca había conocido a alguien tan madura para tu edad. No le cuentes a tus papás, no entenderían.",
      time: "21:32",
      redFlag: {
        category: "Secreto y grooming",
        severity: "alta",
        explanation:
          "El halago sobre tu madurez y la petición de guardar silencio son señales de grooming. Una relación que necesita ocultarse de los adultos de confianza no es segura.",
        advice:
          "Cuéntaselo a una persona adulta de confianza. El secreto no te protege: protege a quien quiere controlarte.",
      },
    },
    {
      id: "m13",
      from: "teen",
      text: "¿Por qué no entenderían?",
      time: "21:34",
    },
    {
      id: "m14",
      from: "adult",
      text: "Porque ellos no saben lo que tenemos. Confía en mí. Si me quieres, mándame una foto tuya ahora. Solo para mí. 😉",
      time: "21:35",
      redFlag: {
        category: "Presión sexual",
        severity: "alta",
        explanation:
          "Pedir imágenes íntimas y usar el “si me quieres” es coerción sexual. Nadie tiene derecho a presionarte para enviar fotos. Además, compartir imágenes de una persona menor de edad es un delito.",
        advice:
          "No envíes nada. Guarda las capturas, bloquea y busca ayuda de un adulto de confianza o de una institución de protección. No es tu culpa.",
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
