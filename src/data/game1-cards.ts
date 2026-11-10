import type { Game1Card } from "@/lib/types";

/**
 * Tarjetas ficticias inspiradas en publicaciones de redes sociales.
 * Cada tarjeta tiene una única respuesta esperada:
 *  - Compartir (derecha) → mensaje saludable.
 *  - Cuestionar (izquierda) → mensaje que normaliza control o desigualdad.
 */
export const game1Cards: Game1Card[] = [
  {
    id: "estudio-compartido",
    author: {
      name: "Lu & Sofi",
      handle: "@lu_y_sofi",
      avatar: "L",
      avatarColor: "from-teal to-teal-deep",
    },
    time: "Hace 2 h",
    visual: {
      gradient: "from-teal-soft via-cream to-gold-soft",
      emoji: "📚",
      label: "Estudio en equipo",
    },
    caption:
      "Mi pareja me ayuda a organizar mis horarios de estudio y celebra mis logros como si fueran suyos. Hoy entendí que el amor también es hacer espacio para los sueños del otro. 💜",
    likes: 1240,
    comments: 38,
    shares: 96,
    healthy: true,
    feedback: {
      title: "Apoyo real, no control",
      category: "Relación saludable",
      explanation:
        "Apoyar tus metas y respetar tus tiempos es una señal de una relación entre iguales. El cuidado no debería venir con condiciones, vigilancia ni culpa.",
      reflection:
        "¿Esta relación suma a tu proyecto de vida o te pide renunciar a él?",
      takeaway: "El apoyo sano impulsa tus metas; no las reemplaza.",
    },
  },
  {
    id: "doce-anos-mayor",
    author: {
      name: "Confesiones anónimas",
      handle: "@confesiones.reales",
      avatar: "?",
      avatarColor: "from-coral to-rose",
    },
    time: "Hace 5 h",
    visual: {
      gradient: "from-coral-soft via-rose-soft to-plum-mist",
      emoji: "🔒",
      label: "Historia anónima",
    },
    caption:
      "Tengo 16 y él 28. Es 12 años mayor pero me cuida mucho. No me deja ir a fiestas con mis amigos porque sabe cómo son los hombres. Dice que es por mi bien.",
    likes: 2380,
    comments: 412,
    shares: 78,
    healthy: false,
    feedback: {
      title: "Cuidado que encierra",
      category: "Aislamiento y control",
      explanation:
        "Decidir con quién te ves y alejarte de tus amistades no es protección: es control. La diferencia de edad suma una desigualdad de poder que no debería romantizarse.",
      reflection:
        "¿Qué pierdes cuando otra persona decide por ti a quién puedes ver?",
      takeaway: "El amor no te aísla; te conecta con tu red de apoyo.",
    },
  },
  {
    id: "red-de-apoyo",
    author: {
      name: "Sofi",
      handle: "@sofi.dibuja",
      avatar: "S",
      avatarColor: "from-gold to-coral",
    },
    time: "Hace 1 h",
    visual: {
      gradient: "from-gold-soft via-cream to-coral-soft",
      emoji: "🫂",
      label: "Mi red",
    },
    caption:
      "Hoy le conté a mi mamá que me gusta alguien. No me juzgó: me preguntó qué me hace sentir bien y qué no. Hablar con un adulto de confianza también es cuidarme.",
    likes: 890,
    comments: 54,
    shares: 120,
    healthy: true,
    feedback: {
      title: "Una red que escucha",
      category: "Red de apoyo",
      explanation:
        "Contar con adultos que escuchan sin juzgar te ayuda a poner palabras a lo que sientes y a detectar señales de riesgo. No tienes que resolverlo sola.",
      reflection:
        "¿Quién es esa persona a la que puedes contarle lo que te pasa sin miedo?",
      takeaway: "Una red de apoyo es un derecho, no una debilidad.",
    },
  },
  {
    id: "respuesta-instantanea",
    author: {
      name: "Anónima",
      handle: "@no.se.que.es.esto",
      avatar: "A",
      avatarColor: "from-plum to-plum-deep",
    },
    time: "Hace 3 h",
    visual: {
      gradient: "from-plum-mist via-cream to-coral-soft",
      emoji: "📱",
      label: "DM · 47 mensajes",
    },
    caption:
      "Me mandó 47 mensajes y 12 llamadas en una hora porque “se preocupó”. Dice que si no le respondo al instante es porque estoy con alguien. Yo ya no sé si es amor o miedo.",
    likes: 1560,
    comments: 203,
    shares: 44,
    healthy: false,
    feedback: {
      title: "Vigilancia disfrazada de amor",
      category: "Control digital",
      explanation:
        "Exigir respuesta inmediata, revisar tu ubicación o contar tus llamadas no es amor: es control. La ansiedad de otra persona no es tu responsabilidad.",
      reflection:
        "¿Te sientes libre al usar el celular o sientes que rindes cuentas?",
      takeaway: "Los celos y la vigilancia no son pruebas de amor.",
    },
  },
  {
    id: "amigas-confianza",
    author: {
      name: "Vale",
      handle: "@vale.en.paz",
      avatar: "V",
      avatarColor: "from-teal to-teal-deep",
    },
    time: "Hace 4 h",
    visual: {
      gradient: "from-teal-soft via-cream to-plum-mist",
      emoji: "🎨",
      label: "Plan con amigas",
    },
    caption:
      "Mi pareja me dijo: “Si quieres salir con tus amigas, ve. Yo también tengo planes. Nos vemos mañana.” Los celos no son prueba de amor. La confianza sí.",
    likes: 2100,
    comments: 67,
    shares: 310,
    healthy: true,
    feedback: {
      title: "Confianza y espacio",
      category: "Relación saludable",
      explanation:
        "Una relación entre iguales respeta tus amistades, tus tiempos y tu independencia. El espacio personal no amenaza el vínculo: lo fortalece.",
      reflection:
        "¿Puedes tener amistades y planes propios sin sentir culpa?",
      takeaway: "El espacio personal también es parte del amor.",
    },
  },
  {
    id: "nadie-te-entiende",
    author: {
      name: "Él",
      handle: "@solo.tu.y.yo",
      avatar: "É",
      avatarColor: "from-plum-deep to-rose",
    },
    time: "Hace 30 min",
    visual: {
      gradient: "from-plum-deep via-plum to-rose",
      emoji: "🕯️",
      label: "Chat privado",
    },
    caption:
      "“Nadie te entiende como yo. Tus amigas solo tienen celos de lo nuestro. Algún día te vas a dar cuenta de que solo me tienes a mí.”",
    likes: 320,
    comments: 89,
    shares: 12,
    healthy: false,
    feedback: {
      title: "Aislamiento emocional",
      category: "Manipulación",
      explanation:
        "Descalificar a tus amistades y convencerte de que solo esa persona te entiende es una estrategia de aislamiento. Busca reducir tu red de apoyo para aumentar su control.",
      reflection:
        "¿Quién gana cuando te alejas de la gente que te quiere?",
      takeaway:
        "Nadie que te quiera de verdad necesita que te quedes sin red.",
    },
  },
  {
    id: "mi-no-es-valido",
    author: {
      name: "Sofi",
      handle: "@sofi.dibuja",
      avatar: "S",
      avatarColor: "from-coral to-gold",
    },
    time: "Hace 6 h",
    visual: {
      gradient: "from-coral-soft via-cream to-gold-soft",
      emoji: "✋",
      label: "Mi límite",
    },
    caption:
      "Un chico mayor me invitó a salir y le dije que no. No pasó nada malo. Mi “no” es válido y no tengo que dar explicaciones. Mi cuerpo, mis tiempos, mis decisiones.",
    likes: 1730,
    comments: 91,
    shares: 204,
    healthy: true,
    feedback: {
      title: "Un no que se respeta",
      category: "Autonomía y consentimiento",
      explanation:
        "Poner un límite y decir que no es parte de cuidarte. Una persona que respeta tu decisión no insiste, no te castiga ni te hace sentir culpable.",
      reflection: "¿Qué pasa cuando alguien no acepta tu “no”?",
      takeaway:
        "Tu consentimiento es libre, informado y puede cambiar de opinión.",
    },
  },
  {
    id: "madura-para-tu-edad",
    author: {
      name: "Anónima",
      handle: "@secretos.de.una.teen",
      avatar: "?",
      avatarColor: "from-rose to-plum",
    },
    time: "Hace 8 h",
    visual: {
      gradient: "from-rose-soft via-plum-mist to-plum",
      emoji: "🤫",
      label: "Historia anónima",
    },
    caption:
      "Tengo 16 y él 26. Dice que soy “muy madura para mi edad” y que no le cuente a nadie porque “la gente no entendería nuestro amor”. Nuestro amor es un secreto.",
    likes: 980,
    comments: 267,
    shares: 31,
    healthy: false,
    feedback: {
      title: "El secreto como señal",
      category: "Secreto y grooming",
      explanation:
        "Pedirte que ocultes la relación a los adultos de confianza es una señal de alerta. El halago sobre tu “madurez” puede usarse para justificar una diferencia de poder y saltarse límites.",
      reflection:
        "¿Por qué una relación necesitaría esconderse de quienes te cuidan?",
      takeaway: "El afecto sano no exige secretos ni silencios.",
    },
  },
  {
    id: "proyecto-compartido",
    author: {
      name: "Mica",
      handle: "@mica.crea",
      avatar: "M",
      avatarColor: "from-gold to-teal",
    },
    time: "Hace 7 h",
    visual: {
      gradient: "from-gold-soft via-cream to-teal-soft",
      emoji: "🎓",
      label: "Mi proyecto de vida",
    },
    caption:
      "Estoy estudiando para entrar a Diseño. Mi pareja me pregunta cómo van mis proyectos y respeta mis tiempos. El amor también es hacer espacio para los sueños del otro.",
    likes: 1420,
    comments: 45,
    shares: 188,
    healthy: true,
    feedback: {
      title: "Metas que se respetan",
      category: "Relación saludable",
      explanation:
        "Una relación que respeta tus estudios, tus proyectos y tu crecimiento no compite con tu futuro: lo acompaña. Los planes se negocian, no se imponen.",
      reflection:
        "¿Esta persona se alegra por tus logros o compite con ellos?",
      takeaway: "Tu proyecto de vida no se negocia por amor.",
    },
  },
  {
    id: "revisa-redes",
    author: {
      name: "Anónima",
      handle: "@ayuda.con.esto",
      avatar: "A",
      avatarColor: "from-plum via-plum-deep to-coral-deep",
    },
    time: "Hace 9 h",
    visual: {
      gradient: "from-plum via-plum-deep to-coral-deep",
      emoji: "🔐",
      label: "Privacidad",
    },
    caption:
      "Mi novio revisa mis redes y borra a los chicos que me siguen. Dice que es para proteger nuestra relación. Ayer me pidió la contraseña.",
    likes: 760,
    comments: 154,
    shares: 27,
    healthy: false,
    feedback: {
      title: "Control disfrazado de protección",
      category: "Control digital",
      explanation:
        "Pedir contraseñas, revisar tus mensajes o decidir a quién sigues es una invasión de tu privacidad y una forma de control. La protección no se impone.",
      reflection:
        "¿Qué parte de tu vida privada estás cediendo para evitar un conflicto?",
      takeaway: "Tu privacidad no se negocia para demostrar amor.",
    },
  },
];

export const GAME1_TOTAL = game1Cards.length;
