import type { Game1Card } from "@/lib/types";

/**
 * Tarjetas con lenguaje juvenil y fotos públicas (Wikimedia Commons / Unsplash source).
 */
export const game1Cards: Game1Card[] = [
  {
    id: "apoyo-metas",
    author: { name: "Lu & Sofi", handle: "@lu_y_sofi", avatar: "L", avatarColor: "from-teal to-teal-deep" },
    time: "hace 2 h",
    visual: {
      gradient: "from-teal-soft via-cream to-gold-soft",
      emoji: "📚",
      label: "Equipo",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
      imageAlt: "Amigas estudiando juntas",
    },
    caption:
      "Mi compa me ayudó a armar mi horario pa’ estudiar y se puso igual de feliz que yo cuando me fue bien. Neta, así se siente que alguien te eche porras de verdad. 💜",
    likes: 1240,
    comments: 38,
    shares: 96,
    healthy: true,
    feedback: {
      title: "Echarse porras, no controlar",
      category: "Relación sana",
      explanation:
        "Que alguien celebre tus logros y respete tus tiempos está chido. El apoyo real no trae condiciones, ni te vigila ni te hace sentir culpa.",
      reflection: "¿Esta persona suma a lo que quieres lograr o te pide dejarlo?",
      takeaway: "Quien te quiere de verdad te impulsa, no te frena.",
    },
  },
  {
    id: "mayor-que-tu",
    author: { name: "Anónimo", handle: "@confes.reales", avatar: "?", avatarColor: "from-coral to-rose" },
    time: "hace 5 h",
    visual: {
      gradient: "from-coral-soft via-rose-soft to-plum-mist",
      emoji: "🔒",
      label: "Confesión",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/640px-Cat03.jpg",
      imageAlt: "Imagen genérica",
    },
    caption:
      "Tengo 16 y él 28. Sí es más grande pero me cuida un buen. No me deja salir con mis compas porque dice que ‘sabe cómo son’. Dice que es por mi bien.",
    likes: 2380,
    comments: 412,
    shares: 78,
    healthy: false,
    feedback: {
      title: "‘Cuidarte’ que en realidad te encierra",
      category: "Aislamiento y control",
      explanation:
        "Decidir por ti con quién sales o alejarte de tus amistades no es cuidarte, es controlarte. Y con esa diferencia de edad hay más desigualdad de poder, aunque lo pinten bonito.",
      reflection: "¿Qué pierdes cuando alguien más decide por ti con quién te juntas?",
      takeaway: "El amor no te aísla de tu gente, te conecta.",
    },
  },
  {
    id: "red-de-apoyo",
    author: { name: "Sofi", handle: "@sofi.dibuja", avatar: "S", avatarColor: "from-gold to-coral" },
    time: "hace 1 h",
    visual: {
      gradient: "from-gold-soft via-cream to-coral-soft",
      emoji: "🫂",
      label: "Mi gente",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
      imageAlt: "Grupo de amistades",
    },
    caption:
      "Hoy le conté a mi mamá que me late alguien. No me regañó ni me juzgó, solo me preguntó qué me hace sentir bien y qué no. Hablar con alguien de confianza también es cuidarte.",
    likes: 890,
    comments: 54,
    shares: 120,
    healthy: true,
    feedback: {
      title: "Tener con quién hablar",
      category: "Red de apoyo",
      explanation:
        "Tener personas adultas que te escuchan sin juzgarte te ayuda a ponerle nombre a lo que sientes. No tienes que cargar con todo sola o solo.",
      reflection: "¿Con quién puedes hablar de lo que te pasa sin que te caigan encima?",
      takeaway: "Pedir apoyo es fuerza, no debilidad.",
    },
  },
  {
    id: "mensajes-sin-parar",
    author: { name: "Anónima", handle: "@ya.no.se", avatar: "A", avatarColor: "from-plum to-plum-deep" },
    time: "hace 3 h",
    visual: {
      gradient: "from-plum-mist via-cream to-coral-soft",
      emoji: "📱",
      label: "47 mensajes",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      imageAlt: "Teléfono con notificaciones",
    },
    caption:
      "Me mandó 47 mensajes y 12 llamadas en una hora porque ‘se preocupó’. Dice que si no le contesto al toque es porque ando con alguien. Ya no sé si es amor o miedo.",
    likes: 1560,
    comments: 203,
    shares: 44,
    healthy: false,
    feedback: {
      title: "Eso no es amor, es vigilarte",
      category: "Control digital",
      explanation:
        "Exigir que contestes al instante, estarte contando llamadas o checando dónde andas no es amor, es control. La ansiedad del otro no es tu culpa ni tu chamba.",
      reflection: "¿Usas tu cel en paz o sientes que tienes que rendir cuentas?",
      takeaway: "Los celos y la vigilancia no prueban amor.",
    },
  },
  {
    id: "confianza-chida",
    author: { name: "Vale", handle: "@vale.en.paz", avatar: "V", avatarColor: "from-teal to-teal-deep" },
    time: "hace 4 h",
    visual: {
      gradient: "from-teal-soft via-cream to-plum-mist",
      emoji: "🎨",
      label: "Plan con compas",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
      imageAlt: "Amistades pasando tiempo juntas",
    },
    caption:
      "Le dije a mi pareja que iba a salir con mis compas y me dijo: ‘Va, pásatela bien, yo también tengo planes. Nos vemos mañana’. Los celos no son prueba de amor, la confianza sí.",
    likes: 2100,
    comments: 67,
    shares: 310,
    healthy: true,
    feedback: {
      title: "Confiar y dar espacio",
      category: "Relación sana",
      explanation:
        "Una relación chida respeta tus amistades, tus tiempos y tu independencia. Tener tu espacio no rompe el vínculo, lo hace más sano.",
      reflection: "¿Puedes tener tus planes sin sentir culpa?",
      takeaway: "El espacio personal también es parte de querer bien.",
    },
  },
  {
    id: "nadie-te-entiende",
    author: { name: "Él", handle: "@solo.tu.y.yo", avatar: "É", avatarColor: "from-plum-deep to-rose" },
    time: "hace 30 min",
    visual: {
      gradient: "from-plum-deep via-plum to-rose",
      emoji: "🕯️",
      label: "Chat",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
      imageAlt: "Mensaje en pantalla",
    },
    caption:
      "“Nadie te entiende como yo. Tus compas te tienen envidia de lo nuestro. Un día te vas a dar cuenta de que solo me tienes a mí.”",
    likes: 320,
    comments: 89,
    shares: 12,
    healthy: false,
    feedback: {
      title: "Aislarte poquito a poquito",
      category: "Manipulación",
      explanation:
        "Hablar mal de tus amistades y hacerte creer que solo esa persona te entiende es una forma de aislarte. La idea es que te quedes sin tu red para que dependa más de ti.",
      reflection: "¿Quién gana cuando te alejas de la gente que te quiere?",
      takeaway: "Quien te quiere bien no necesita que te quedes sin tu gente.",
    },
  },
  {
    id: "mi-no-vale",
    author: { name: "Sofi", handle: "@sofi.dibuja", avatar: "S", avatarColor: "from-coral to-gold" },
    time: "hace 6 h",
    visual: {
      gradient: "from-coral-soft via-cream to-gold-soft",
      emoji: "✋",
      label: "Mi límite",
      image: "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?w=800&q=80",
      imageAlt: "Persona poniendo un límite",
    },
    caption:
      "Un vato más grande me invitó a salir y le dije que nel. No pasó nada. Mi ‘no’ vale y no tengo que dar mil explicaciones. Mi cuerpo, mis tiempos, mis reglas.",
    likes: 1730,
    comments: 91,
    shares: 204,
    healthy: true,
    feedback: {
      title: "Tu ‘no’ se respeta",
      category: "Autonomía",
      explanation:
        "Poner límites y decir que no es cuidarte. Si alguien respeta tu decisión, no te insiste, no te castiga ni te hace sentir mal.",
      reflection: "¿Qué pasa cuando alguien no acepta tu ‘no’?",
      takeaway: "Tu decisión es tuya y puede cambiar cuando tú quieras.",
    },
  },
  {
    id: "secreto-madurez",
    author: { name: "Anónima", handle: "@secreto.teen", avatar: "?", avatarColor: "from-rose to-plum" },
    time: "hace 8 h",
    visual: {
      gradient: "from-rose-soft via-plum-mist to-plum",
      emoji: "🤫",
      label: "Secreto",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
      imageAlt: "Persona en silencio",
    },
    caption:
      "Tengo 16 y él 26. Dice que soy ‘muy madura para mi edad’ y que no le cuente a nadie porque ‘no entenderían lo nuestro’. Todo tiene que ser en secreto.",
    likes: 980,
    comments: 267,
    shares: 31,
    healthy: false,
    feedback: {
      title: "Cuando te piden guardar secreto",
      category: "Secreto / grooming",
      explanation:
        "Que te pidan esconder la relación de personas adultas de confianza es red flag. El halago de ‘eres muy madura’ a veces se usa para justificar diferencias de poder y saltarse límites.",
      reflection: "¿Por qué algo que está bien tendría que esconderse de quienes te cuidan?",
      takeaway: "Lo sano no exige secretos ni silencios.",
    },
  },
  {
    id: "tus-suenos",
    author: { name: "Mica", handle: "@mica.crea", avatar: "M", avatarColor: "from-gold to-teal" },
    time: "hace 7 h",
    visual: {
      gradient: "from-gold-soft via-cream to-teal-soft",
      emoji: "🎓",
      label: "Mis metas",
      image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&q=80",
      imageAlt: "Estudiante con metas",
    },
    caption:
      "Estoy estudiando para entrar a Diseño. Mi pareja me pregunta cómo voy con mis proyectos y respeta mis tiempos. Querer también es darle espacio a los sueños del otro.",
    likes: 1420,
    comments: 45,
    shares: 188,
    healthy: true,
    feedback: {
      title: "Tus metas importan",
      category: "Relación sana",
      explanation:
        "Una relación que respeta tus estudios y tus planes no compite con tu futuro, lo acompaña. Las decisiones se platican, no se imponen.",
      reflection: "¿Se alegra por tus logros o compite con ellos?",
      takeaway: "Tu proyecto de vida no se negocia por ‘amor’.",
    },
  },
  {
    id: "password-redes",
    author: { name: "Anónima", handle: "@ayuda.plis", avatar: "A", avatarColor: "from-plum via-plum-deep to-coral-deep" },
    time: "hace 9 h",
    visual: {
      gradient: "from-plum via-plum-deep to-coral-deep",
      emoji: "🔐",
      label: "Privacidad",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80",
      imageAlt: "Privacidad digital",
    },
    caption:
      "Mi novio checa mis redes y borra a los vatos que me siguen. Dice que es ‘para cuidar lo nuestro’. Ayer me pidió mi contraseña.",
    likes: 760,
    comments: 154,
    shares: 27,
    healthy: false,
    feedback: {
      title: "Tu privacidad no se negocia",
      category: "Control digital",
      explanation:
        "Pedir contraseñas, revisar tus mensajes o decidir a quién sigues es meterse con tu privacidad y es control. Protegerse no es controlar al otro.",
      reflection: "¿Qué parte de tu vida privada estás cediendo para evitar pleitos?",
      takeaway: "Tu privacidad no es prueba de amor.",
    },
  },
];

export const GAME1_TOTAL = game1Cards.length;
