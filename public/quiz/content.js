/* ============================================================
   CONTENIDO DEL QUIZ (Español neutro) — el texto se edita acá,
   no en /shared/app.js
   ============================================================ */

const BRAND = "StartNow";

const QUESTIONS = [
  { n: 1, icon: "👀", text: "¿Sientes que te vas atrasando con cosas que querías hacer?", type: "scale" },
  { n: 2, icon: "⏰", text: "¿Dejas las cosas para el último momento?", type: "scale" },
  { n: 3, icon: "📱", text: "¿Revisas el celular con frecuencia mientras trabajas?", type: "scale" },
  { n: 4, icon: "🧩", text: "¿Te cuesta empezar tareas que sientes 'demasiado grandes'?", type: "scale" },
  { n: 5, icon: "📱", text: "¿Te distraes con facilidad?", type: "scale" },
  { n: 6, icon: "🌫️", text: "¿Sientes que el día se te escapa sin darte cuenta?", type: "scale" },
  { n: 7, icon: "📲", text: "¿Terminas revisando redes sociales en vez de hacer lo que tenías planeado?", type: "scale" },
  { n: 8, icon: "💬", text: "¿Postergas conversaciones difíciles?", type: "scale" },
  { n: 9, icon: "🏠", text: "¿Te cuesta mantener ordenada tu casa o tu espacio de trabajo?", type: "scale" },
  { n: 10, icon: "⚡", text: "¿Sientes estrés por las tareas pendientes?", type: "scale" },
  { n: 11, icon: "🥊", text: "¿Eres duro/a contigo mismo/a cuando procrastinas?", type: "scale" },
  { n: 12, icon: "🔄", text: "Empiezo cosas que no termino.", type: "scale" },
  { n: 13, icon: "📋", text: "Hago planes pero nunca los cumplo.", type: "scale" },
  { n: 14, icon: "⏱️", text: "Tengo la costumbre de llegar tarde.", type: "scale" },
  { n: 15, icon: "📋", text: "Evito tareas que me resultan frustrantes o aburridas.", type: "scale" },
  { n: 16, icon: "🗯️", text: "Me distraigo hablando cuando debería estar trabajando.", type: "scale" },
  {
    n: 17, icon: "🎯", text: "¿Qué es lo que más afecta tu productividad?", type: "multi", subtitle: "Elige todas las que apliquen",
    options: [
      { icon: "⛈️", label: "Estrés y ansiedad" },
      { icon: "❓", label: "Pensar demasiado" },
      { icon: "💎", label: "Perfeccionismo" },
      { icon: "😵", label: "Inseguridad" },
      { icon: "💔", label: "Problemas de pareja o familia" },
      { icon: "☹️", label: "Trauma emocional" },
    ]
  },
  {
    n: 18, icon: "📝", text: "¿Qué es lo que siempre postergas?", type: "single",
    options: [
      { label: "Bajar de peso" }, { label: "Dormir lo suficiente" }, { label: "Leer más" },
      { label: "Revisar mi salud" }, { label: "Definir metas de vida" }, { label: "Cambiar de trabajo" },
      { label: "Encontrar momentos de relajación" }, { label: "Limpiar y ordenar" },
    ]
  },
  {
    n: 19, icon: "🔋", text: "¿Qué es lo que más necesitas ahora mismo?", type: "single",
    options: [
      { label: "Concentración" }, { label: "Calma" }, { label: "Fuerza de voluntad" },
      { label: "Energía" }, { label: "Motivación" }, { label: "No estoy seguro/a" },
    ]
  },
  {
    n: 20, icon: "🌱", text: "¿Qué te gustaría lograr en este camino?", type: "single",
    options: [
      { label: "Mejorar mi bienestar" }, { label: "Terminar lo que empiezo" },
      { label: "Mejorar mi enfoque y productividad" }, { label: "Mejorar mis relaciones" },
      { label: "Mejorar mi carrera" },
    ]
  },
  {
    n: 21, icon: "🚫", text: "¿Qué hábitos te gustaría dejar?", type: "multi",
    options: [
      { label: "Llegar tarde" }, { label: "Inseguridad" }, { label: "Redes sociales" },
      { label: "Comida chatarra o azúcar" }, { label: "Ver series sin parar" }, { label: "Fumar" }, { label: "Dormir poco" },
    ]
  },
  {
    n: 22, icon: "🩺", text: "¿Algún terapeuta o profesional de la salud te recomendó esta app?", type: "single",
    options: [{ label: "Sí" }, { label: "No" }]
  },
  {
    n: 23, icon: "⏳", text: "¿Cuánto tiempo puedes dedicarle por día a tu crecimiento personal?", type: "single",
    options: [{ label: "5 - 10 minutos" }, { label: "15 - 20 minutos" }, { label: "30 + minutos" }]
  },
];

const SCALE_OPTIONS = [
  { icon: "✕", label: "Siempre", weight: 3 },
  { icon: "−", label: "A veces", weight: 1 },
  { icon: "+", label: "Frecuentemente", weight: 2 },
  { icon: "✓", label: "Rara vez", weight: 0 },
];

const INTERSTITIALS = {
  8: {
    title: "¡Vas muy bien! ⚡",
    cards: [
      { heading: "¿Sabías qué?", body: "La investigación conductual sugiere que la mayoría de las personas procrastina regularmente — no es un defecto de carácter, es un patrón que tu cerebro aprendió." },
      { heading: "¿La buena noticia?", body: "Los patrones se pueden cambiar. Continúa para descubrir el tuyo." },
    ],
  },
  16: {
    title: "¡Ya casi terminas!",
    subtitle: "En 60 segundos vas a descubrir:",
    bullets: [
      { icon: "🧑‍🤝‍🧑", text: "Tu tipo de procrastinación (y qué la dispara)" },
      { icon: "📋", text: "Tu plan de acción personalizado (sin consejos genéricos)" },
      { icon: "⏰", text: "Un cronograma real de cambio (cuándo vas a ver resultados)" },
    ],
  },
  22: {
    title: "Basado en ciencia del comportamiento",
    body: "Tu plan personalizado se apoya en técnicas de terapia conductual bien establecidas, usadas para ayudar a las personas a construir hábitos consistentes y cumplir con lo que se proponen.",
    approach: ["Principios de Terapia Cognitivo-Conductual (TCC)", "Marcos de Intención de Implementación", "Investigación sobre comportamiento y formación de hábitos"],
  },
};

const TESTIMONIALS = [
  { name: "Raquel Sánchez, 41", role: "Gerenta de RRHH", quote: "\"Por fin entiendo por qué me estanco\"", body: "Las lecciones diarias me hicieron dar cuenta de que no era perezosa — estaba evitando decisiones que sentía demasiado grandes. Dividirlas en partes pequeñas cambió todo.", date: "14 jun", img: "/shared/images/testimonial-1.jpg" },
  { name: "Tomás Brizuela, 34", role: "Dueño de una pequeña empresa", quote: "\"5 minutos realmente funcionan\"", body: "Era escéptico de que algo tan corto pudiera importar. A las tres semanas, ya cierro mi bandeja de entrada antes de cenar en vez de a medianoche.", date: "29 may", img: "/shared/images/testimonial-2.jpg" },
  { name: "Marcos Duarte, 55", role: "Director comercial", quote: "\"Ojalá lo hubiera encontrado hace 20 años\"", body: "Leí todos los libros de productividad que encontré. Esto es lo primero que cambió mi comportamiento real, no solo mi lista de tareas.", date: "03 jun", img: "/shared/images/testimonial-3.jpg" },
  { name: "Delia Fuentes, 66", role: "Directora de escuela jubilada", quote: "\"Nunca es tarde para cambiar un hábito\"", body: "Pensaba que la procrastinación ya era parte de mi personalidad. Resultó ser un patrón, y los patrones se pueden desaprender.", date: "22 abr", img: "/shared/images/testimonial-4.jpg" },
  { name: "Emilia Carrizo, 39", role: "Consultora de marketing", quote: "\"Mis clientes lo notaron antes que yo\"", body: "No estaba tratando de impresionar a nadie, solo quería sentir menos culpa. Pero dos clientes me preguntaron qué había cambiado en mi forma de responder.", date: "20 jun", img: "/shared/images/testimonial-5.jpg" },
];

const PLANS = [
  { key: "3m", label: "Plan de 3 meses", tag: "Mejor oferta", tagIcon: "👍", badgeClass: "best", discountLabel: "SOLO AHORA: 66%", was: 125.98, now: 42.99, perDay: "1.38", perDayNow: "48" },
  { key: "1m", label: "Plan de 1 mes", tag: "Más elegido", tagIcon: "⭐", badgeClass: "popular", discountLabel: "50% DE DESCUENTO", was: 59.98, now: 29.99, perDay: "1.98", perDayNow: "99" },
  { key: "6m", label: "Plan de 6 meses", tag: "", badgeClass: "", discountLabel: "50% DE DESCUENTO", was: 179.98, now: 89.99, perDay: "0.98", perDayNow: "49" },
];

const FAQ = [
  {
    q: "¿Qué pasa si me cuesta mantenerme motivado/a y disciplinado/a, incluso con un plan armado?",
    a: `${BRAND} no está pensado alrededor de la fuerza de voluntad — está pensado para que no la necesites. Cada día tienes una sola acción pequeña y específica (5-10 minutos), no un plan enorme que tienes que forzarte a cumplir. Las lecciones usan micro-compromisos basados en TCC: pequeños logros que entrenan tu cerebro para asociar el inicio con alivio en vez de con miedo, así la motivación deja de ser algo que tienes que fabricar cada mañana.`,
  },
  {
    q: "¿Cómo puedo manejar y reducir efectivamente las distracciones que afectan mi productividad?",
    a: `Tu lección diaria incluye un ejercicio breve y práctico para el patrón de distracción específico que marcaste en el quiz (revisar el celular, cambiar de tarea, fatiga por decisiones). En vez de un consejo genérico tipo "apaga las notificaciones", obtienes un cambio concreto de entorno o hábito para probar ese día, y construyes sobre lo que funcionó al día siguiente.`,
  },
  {
    q: "¿Qué estrategias o técnicas puedo usar para superar la sensación de agobio o ansiedad al empezar este plan?",
    a: `Nunca te pedimos que ataques todo de una vez. Cada tarea de tu plan está dividida en algo que puedes terminar en menos de 10 minutos — muchas veces menos de 2. El objetivo de la primera semana no son los resultados, es demostrarle a tu cerebro que empezar no tiene que sentirse abrumador. El impulso viene después, no antes.`,
  },
  {
    q: "¿Hay características o enfoques específicos que hagan que este Plan de Gestión de la Procrastinación sea distinto a otros que probé antes?",
    a: `La mayoría de las herramientas de productividad se enfocan en el resultado (una bandeja de entrada vacía, un proyecto terminado). ${BRAND} se enfoca en el patrón neuronal detrás de la procrastinación en sí — usando tus respuestas del quiz para personalizar qué disparador atacar primero, y luego dando seguimiento a tu racha de cumplimiento para que veas el patrón cambiando de verdad, no solo esperando que cambie.`,
  },
];

const BONUS_MODULES = [
  { label: "Dominio del tiempo y el enfoque", was: 36.66 },
  { label: "Manejo del estrés y la ansiedad", was: 19.99 },
  { label: "Construcción de hábitos duraderos", was: 29.99 },
  { label: "Gestión de las relaciones", was: 19.99 },
  { label: "Manejo del dinero", was: 16.99 },
];

const STRINGS = {
  locale: "es-419",
  continueBtn: "Continuar",
  approachIntro: "Nuestro enfoque combina:",
  gender: {
    headline: "Deja de procrastinar: haz el quiz gratis de 2 minutos",
    sub: "Descubre tu tipo de procrastinación y consigue un plan personalizado para terminar por fin lo que empiezas",
    male: "Hombre",
    female: "Mujer",
    testimonialIntro: "Mirá cómo le fue a otras personas con este mismo plan:",
  },
  age: {
    title: "¿Cuál es tu edad?",
    subtitle: "Solo usamos tu edad para personalizar tu plan",
    options: ["18 - 24", "25 - 34", "35 - 44", "45 - 54", "55 - 64", "65+"],
  },
  socialProof: {
    pre: "Estás en el ",
    highlight: "lugar correcto",
    sub: "Este quiz de 2 minutos te ayuda a entender por qué procrastinas — y qué hacer al respecto.",
    callout: "<b>Únete a 1.2 millones de personas</b> que ya empezaron su camino",
  },
  resultsLoading: {
    headlinePre: "Únete a ",
    headlineHighlight: "1.2 millones",
    headlinePost: " de personas que recuperaron el control",
    steps: [
      { label: "Identificando tus disparadores de procrastinación..." },
      { label: "Calculando tu nivel base de productividad..." },
      { label: "Armando tu hoja de ruta personalizada..." },
      { label: "Seleccionando tus primeras lecciones diarias..." },
      { label: "Preparando tu seguimiento de progreso..." },
    ],
    testimonialQuote: "Simple pero poderoso",
    testimonialBody: "Son solo 5 minutos al día, pero cambió por completo cómo enfrento las tareas. Mi casa está más limpia, entrego mi trabajo a tiempo y me siento en control de nuevo.",
    testimonialAuthor: "David R., 58, Consultor",
  },
  results: {
    title: "Tu perfil de procrastinación",
    youLabel: "Tú",
    scoreLabels: ["BAJO", "PROMEDIO", "MEDIO", "ALTO"],
    statLabels: ["Nivel de estrés", "Disparador principal", "Patrón de evitación"],
    stressLevels: { low: "Bajo", average: "Promedio", medium: "Medio", high: "Alto" },
    avoidancePatterns: { overwhelm: "Sobrecarga de tareas", distraction: "Ciclo de distracción" },
    defaultTrigger: "Pensar demasiado",
    copyTemplate: (stress) => `Estás en un ciclo de procrastinación de estrés ${stress.toLowerCase()} que te está drenando la energía y la tranquilidad. No estás fallando — estás en un patrón, y los patrones se pueden cambiar. Miles de personas en tu misma situación encontraron alivio con un enfoque estructurado y basado en ciencia.`,
  },
  planReady: {
    months: ["Mes 1", "Mes 3", "Mes 6"],
    lessAvoidance: "Menos evitación",
    momentum: "Impulso",
    legendWith: "Con",
    legendWithout: "Sin acción",
    disclaimer: "*El gráfico es una ilustración no personalizada y los resultados pueden variar.",
    headlinePre: "¡Tu ",
    headlineHighlight: "Plan Anti-Procrastinación",
    headlinePost: " está listo!",
    subPre: "Podrías empezar a recuperar el control para el",
  },
  name: {
    title: "¿Cómo te llamas?",
    placeholder: "Nombre",
  },
  email: {
    title: "Ingresa tu correo electrónico para ver los resultados completos",
    placeholder: "Correo electrónico",
    privacy: "Nos comprometemos a proteger tus datos personales. Te enviaremos por correo una copia de tus resultados para que los tengas a mano. No te enviaremos spam.",
  },
  included: {
    title: "Qué incluye tu plan:",
    items: [
      ["📖", "Lecciones diarias de 5 minutos", "Entiende por qué procrastinas y cómo dejar de hacerlo. Sesiones cortas."],
      ["🗺️", "Planes de acción personalizados", "Hoja de ruta a medida según los resultados de tu quiz. Nada de consejos genéricos."],
      ["🧠", "Técnicas probadas", "Estrategias de TCC y formación de hábitos usadas por terapeutas."],
      ["📈", "Seguimiento de progreso", "Observa cómo mejora tu productividad semana a semana."],
    ],
  },
  pricing: {
    stickyLabel: "50% de descuento reservado para:",
    getPlanBtn: "QUIERO MI PLAN",
    headline: "Tu plan personalizado para terminar lo que empiezas",
    timelineNow: "Ahora",
    timelineGoal: "Tu meta",
    timelineRows: [
      ["Tus mañanas", "Temes abrir tu lista de tareas", "Prioridades claras, listo/a para el día"],
      ["Tus noches", "Culpa por lo que no hiciste", "Satisfacción por el progreso real"],
      ["Tus relaciones", "Ausente mentalmente, siempre estresado/a", "Presente y conectado/a de verdad"],
      ["Tu diálogo interno", "“¿Por qué no puedo simplemente hacerlo?”", "“Confío en que voy a cumplir”"],
    ],
    weeks: [
      ["Semana 1", ["Despertar sin temor", "Cortar la espiral de culpa", "Sentir más liviana tu lista de tareas"]],
      ["Semanas 2-4", ["Completar 3-5 tareas que evitaste durante meses", "Más energía", "Construir un impulso sostenible"]],
      ["Semanas 5-8", ["Encarar proyectos que sentías imposibles", "Casa y espacio de trabajo manejables", "Estar presente en tus relaciones sin resentimiento"]],
      ["Mes 3+", ["Los nuevos hábitos se sienten automáticos", "Cumplir se vuelve tu comportamiento por defecto", "Confías en ti mismo/a para terminar lo que empiezas"]],
    ],
    shift: "La mayoría de los usuarios sienten un cambio dentro de los 7-10 días.",
    timerBarLabel: "El descuento es válido solo por:",
    perDay: "por día",
    paySafe: "🛡️ Pago 100% seguro",
    payIcons: ["VISA", "Mastercard", "PayPal", "Amex", "Discover", "Maestro"],
    guaranteeLine: "✓ Garantía de devolución de 30 días",
    guaranteeBoxTitle: "Garantía de devolución del 100%",
    guaranteeBoxBody: "Pruébalo sin riesgo durante 30 días. Si no ves progreso, te devolvemos hasta el último centavo — sin preguntas.",
    testimonialsHeadline: "Únete a 1.2 millones de personas que recuperaron el control",
    faqTitle: "Preguntas frecuentes",
  },
  checkout: {
    title: "Elige tu método de pago",
    creditCard: "Tarjeta de crédito",
    total: "Total:",
    discount: "Descuento de bienvenida",
    saved: "Ahorraste $",
    bonusHead: "Según tu perfil, incluimos estos módulos GRATIS:",
    gpay: "Pagar con G Pay",
    paymentNotice: (brand) => `Estamos activando los pagos. Escríbenos a hello@${brand.toLowerCase()}.app para completar tu pedido.`,
    openAppBtn: "Mientras tanto, abre tu plan en la app →",
    finePrint: (brand, months, now, was) => `Te estás suscribiendo a un servicio de ${months} mes(es) de <a href="#">${brand.toLowerCase()}.app</a> con el precio promocional de $${now}.
  Aceptas que el plan elegido se renovará automáticamente al precio completo por períodos sucesivos y se te cobrará $${was} cada ${months} mes(es) hasta que canceles la suscripción.
  Los pagos se cobrarán de la tarjeta que indiques aquí. Puedes cancelar escribiendo a <a href="#">hello@${brand.toLowerCase()}.app</a>. <a href="#">Términos de servicio</a>. El cargo aparecerá en tu resumen como "${brand}".`,
  },
};
