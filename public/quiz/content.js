/* ============================================================
   CONTENIDO DEL QUIZ (Español neutro) — el texto se edita acá,
   no en /shared/app.js
   ============================================================ */

const BRAND = "StartNow";

// fact: dato que aparece debajo de la respuesta. text = el dato (de un estudio real),
// app = qué hace StartNow al respecto (SOLO cosas que la app realmente tiene, ver src/appContent.es.js),
// source = fuente en letra chica. En preguntas "multi", text puede ser una función que recibe lo elegido.
// factOff = dato desactivado (no se muestra); renombrar a "fact" para volver a mostrarlo.
const QUESTIONS = [
  {
    n: 1, icon: "🌙", text: "¿Terminas el día con la sensación de que no avanzaste en lo que de verdad importaba?", type: "scale",
    fact: {
      text: "Un estudio siguió durante 9 meses a <b>3.525 personas</b>: las que más postergaban tuvieron después más estrés, ansiedad, peor sueño, más soledad y más problemas de dinero.",
      app: "StartNow te da <b>una sola tarea pequeña al día</b>, casi todas de 2 a 10 minutos. Cada noche la marcas como completada y ves que sí avanzaste.",
      source: "JAMA Network Open, 2023",
    },
  },
  {
    n: 2, icon: "⏰", text: "¿Esperas a que la presión (o el pánico) del último momento te obligue a empezar?", type: "scale",
    factOff: {
      text: "Un análisis de 36 estudios con <b>8.603 personas</b> encontró que quienes postergan tienen peor salud… y aun así creen que en el futuro van a estar mejor sin cambiar nada.",
      app: "Tu plan de 30 días empieza con <b>victorias de 2 minutos</b> desde el día 1, para que empezar deje de costarte.",
      source: "British Journal of Health Psychology, 2026",
    },
  },
  {
    n: 3, icon: "📱", text: "¿Agarras el celular 'solo un segundo' y de repente ya pasó media hora?", type: "scale",
    factOff: {
      text: "Un metaanálisis confirmó que <b>cuanto más enganche con el celular, más se posterga</b>.",
      app: "Tu plan incluye tareas concretas como <b>silenciar notificaciones, alejar el ícono de tus redes y pasar una mañana sin redes</b>.",
      source: "Personality and Individual Differences, 2024",
    },
  },
  {
    n: 4, icon: "🧩", text: "¿Una tarea grande te paraliza tanto que prefieres ni empezarla?", type: "scale",
    factOff: {
      text: "Un análisis de 21 estudios con <b>15.907 personas</b> mostró que definir un plan concreto (\"si pasa X, hago Y\") ayuda a cumplir las metas.",
      app: "En el día 11 aprendes a <b>dividir tu tarea más grande en 3 pasos chicos</b>. Y cada día del plan es una sola tarea pequeña.",
      source: "Frontiers in Psychology, 2021",
    },
  },
  {
    n: 5, icon: "🎯", text: "¿Cualquier ruido, mensaje o pensamiento te saca por completo de lo que estabas haciendo?", type: "scale",
    fact: {
      text: "Hoy mantenemos la atención en una pantalla solo <b>47 segundos</b> en promedio. Después de una interrupción, tardamos unos <b>25 minutos</b> en volver a concentrarnos del todo.",
      app: "En el día 14 haces tu primer <b>bloque de 25 minutos sin interrupciones</b>.",
      source: "Dra. Gloria Mark, Universidad de California, \"Attention Span\", 2023",
    },
  },
  {
    n: 6, icon: "⚡", text: "¿Los pendientes te dan vueltas en la cabeza incluso cuando intentas descansar?", type: "scale",
    factOff: {
      text: "Un análisis de 18 estudios con <b>35.097 personas</b> encontró que postergar la hora de dormir está ligado a más estrés, ansiedad y depresión. La relación más fuerte es con el estrés.",
      app: "Tu plan incluye <b>dejar tu espacio listo para mañana antes de dormir</b> y una revisión semanal de cómo te sientes.",
      source: "Frontiers in Psychology, 2026",
    },
  },
  {
    n: 7, icon: "🥊", text: "¿Te llenas de culpa cada vez que dejas algo para después?", type: "scale",
    factOff: {
      text: "Una revisión de la Universidad de Texas concluyó que <b>tratarte con comprensión te impulsa a cambiar mucho más que criticarte</b>. La culpa no te hace actuar: alimenta el ciclo.",
      app: "En el día 17 practicas <b>hablarte sin castigarte</b>: anotas un error y lo completas con \"y aun así seguí adelante\".",
      source: "Annual Review of Psychology, 2023",
    },
  },
  {
    n: 8, icon: "📋", text: "¿Armas planes con entusiasmo y a los pocos días los abandonas?", type: "scale",
    fact: {
      text: "Un metaanálisis de 20 estudios con <b>2.601 personas</b> encontró que un hábito nuevo tarda en promedio <b>59 a 66 días</b> en formarse. No se logra con fuerza de voluntad: hace falta un sistema.",
      app: "StartNow es ese sistema: <b>una tarea pequeña al día y un seguimiento de tu racha</b>. Al terminar los 30 días, puedes repetir el plan para reforzarlo.",
      source: "Healthcare, 2024",
    },
  },
  {
    n: 9, icon: "🎯", text: "¿Qué es lo que más afecta tu productividad?", type: "multi", subtitle: "Elige todas las que apliquen",
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
    n: 10, icon: "📝", text: "¿Qué es lo que siempre postergas?", type: "multi", subtitle: "Elige todas las que apliquen",
    options: [
      { label: "Hacer ejercicio" }, { label: "Dormir lo suficiente" }, { label: "Leer más" },
      { label: "Revisar mi salud" }, { label: "Definir metas de vida" }, { label: "Buscar un mejor trabajo" },
      { label: "Encontrar momentos de relajación" }, { label: "Limpiar y ordenar" },
    ],
    fact: {
      icon: "⏳",
      heading: "Piénsalo",
      text: (picked) => picked.length
        ? `Si nada cambia, dentro de un año <b>${picked.map(p => p.toLowerCase()).join(", ")}</b> seguirá en tu lista de pendientes.`
        : "Si nada cambia, dentro de un año tu lista de pendientes seguirá igual.",
      app: "Tu plan empieza hoy con <b>una tarea de 2 minutos</b>.",
    },
  },
];

const SCALE_OPTIONS = [
  { icon: "🔴", label: "Siempre, es mi día a día", weight: 3 },
  { icon: "🟠", label: "Muy seguido", weight: 2 },
  { icon: "🟡", label: "Solo de vez en cuando", weight: 1 },
  { icon: "🟢", label: "Casi nunca me pasa", weight: 0 },
];

const INTERSTITIALS = {
  8: {
    title: "¡Ya casi terminas!",
    subtitle: "En 60 segundos vas a descubrir:",
    bullets: [
      { icon: "🧑‍🤝‍🧑", text: "Tu perfil de procrastinación (y qué la dispara)" },
      { icon: "📋", text: "Tu plan de 30 días: una tarea pequeña por día" },
      { icon: "⏰", text: "Qué vas a trabajar cada semana del plan" },
    ],
  },
};

// Etiquetas de la tarjeta de dato que aparece debajo de cada respuesta
const FACT_LABELS = { heading: "¿Sabías que…?", app: "Con StartNow:", source: "Fuente:" };


// checkoutUrl: pega aquí el link de pago de Hotmart de cada plan cuando lo tengas.
// Mientras esté vacío, el botón muestra el aviso de "activando pagos" en vez de cobrar.
// checkoutUrlFull: link de Hotmart a PRECIO NORMAL (el valor de "was"). Se usa cuando vence
// el descuento de 15 minutos. Vacío = se sigue usando checkoutUrl.
const PLANS = [
  { key: "essential", label: "Plan de 30 días", tag: "", tagIcon: "", badgeClass: "", discountLabel: "25% DE DESCUENTO", was: 19.99, now: 14.99, modules: [], checkoutUrl: "https://pay.hotmart.com/G106789484C", checkoutUrlFull: "https://pay.hotmart.com/G106789484C?off=c9ih36ad", checkoutUrlByCountry: { CO: "https://pay.hotmart.com/G106789484C?off=3svmchcp" }, checkoutUrlFullByCountry: { CO: "https://pay.hotmart.com/G106789484C?off=l62dgzdm" } },
];

const FAQ = [
  {
    q: "¿Qué pasa si me cuesta mantenerme motivado/a y disciplinado/a, incluso con un plan armado?",
    a: `${BRAND} no está pensado alrededor de la fuerza de voluntad — está pensado para que no la necesites. Cada día tienes una sola tarea pequeña y específica (casi todas de 2 a 10 minutos), no un plan enorme que tienes que forzarte a cumplir. Son micro-compromisos: pequeños logros que le enseñan a tu cerebro que empezar no es tan difícil. Además, tu racha te muestra cada día cuánto llevas avanzado.`,
  },
  {
    q: "¿Cómo puedo manejar y reducir efectivamente las distracciones que afectan mi productividad?",
    a: `La semana 2 del plan está dedicada a cortar el ciclo de distracción, con tareas concretas para probar ese mismo día: silenciar las notificaciones de una app, mover el ícono de tu red social favorita a la última pantalla, hacer un bloque de 25 minutos en "No molestar" y, más adelante, pasar una mañana sin redes. Cada paso es pequeño y se suma al anterior.`,
  },
  {
    q: "¿Qué estrategias o técnicas puedo usar para superar la sensación de agobio o ansiedad al empezar este plan?",
    a: `Nunca te pedimos que ataques todo de una vez. Casi todas las tareas de tu plan se terminan en menos de 10 minutos — y la primera semana, muchas en 2. El objetivo de la primera semana no son los resultados, es demostrarle a tu cerebro que empezar no tiene que sentirse abrumador. El impulso viene después, no antes.`,
  },
  {
    q: "¿Hay características o enfoques específicos que hagan que este Plan de Gestión de la Procrastinación sea distinto a otros que probé antes?",
    a: `La mayoría de las herramientas de productividad se enfocan en el resultado (una bandeja de entrada vacía, un proyecto terminado). ${BRAND} se enfoca en el hábito de empezar: una tarea pequeña al día durante 30 días, con una lección corta que explica por qué funciona. Según tus respuestas del quiz, destacamos las tareas de tu disparador principal, y tu racha y las revisiones semanales te muestran cómo va cambiando el patrón.`,
  },
];

const BONUS_MODULES = [
  { key: "time-focus", label: "Dominio del tiempo y el enfoque", was: 19.99 },
  { key: "stress-anxiety", label: "Manejo del estrés y la ansiedad", was: 14.99 },
  { key: "habits", label: "Construcción de hábitos duraderos", was: 19.99 },
  { key: "relationships", label: "Gestión de las relaciones", was: 14.99 },
  { key: "money", label: "Manejo del dinero", was: 12.99 },
];

const STRINGS = {
  locale: "es-419",
  continueBtn: "Continuar",
  approachIntro: "Nuestro enfoque combina:",
  gender: {
    headline: "Deja de procrastinar: haz el quiz gratis de 2 minutos",
    sub: "Descubre tu tipo de procrastinación y consigue tu plan de 30 días para terminar por fin lo que empiezas",
    male: "Hombre",
    female: "Mujer",
  },
  age: {
    title: "¿Cuál es tu edad?",
    subtitle: "Es solo para conocerte un poco mejor",
    options: ["18 - 24", "25 - 34", "35 - 44", "45 - 54", "55 - 64", "65+"],
  },
  socialProof: {
    pre: "Estás en el ",
    highlight: "lugar correcto",
    sub: "Este quiz de 2 minutos te ayuda a entender por qué procrastinas — y qué hacer al respecto.",
    callout: "<b>Solo 10 preguntas</b> y al final ves tu perfil y tu plan de 30 días",
  },
  therapist: {
    nameTitle: "¡Qué buena señal! ¿Cómo se llama?",
    nameSub: "Nos alegra saber que un profesional acompaña tu proceso. Compártenos su nombre (o déjalo vacío si prefieres).",
    namePlaceholder: "Nombre del terapeuta o profesional",
    ackTitle: (name) => name ? `${name} sabe lo que hace` : "Tu terapeuta sabe lo que hace",
    ackBody: (name) => `Las micro-intervenciones basadas en TCC — como las de este plan — se usan cada vez más como complemento entre sesiones. Que ${name || "tu terapeuta"} te haya recomendado este enfoque habla muy bien de tu proceso: vas a trabajar el patrón, no solo el síntoma.`,
    ackTip: "Consejo: cuéntale cómo avanzas con tu plan de 30 días — el acompañamiento profesional multiplica los resultados.",
  },
  resultsLoading: {
    headlinePre: "Estamos preparando ",
    headlineHighlight: "tu plan",
    headlinePost: " de 30 días",
    steps: [
      { label: "Identificando tus disparadores de procrastinación..." },
      { label: "Calculando tu nivel de procrastinación..." },
      { label: "Destacando las tareas para tu disparador principal..." },
      { label: "Preparando tu plan de 30 días..." },
      { label: "Preparando tu seguimiento de racha..." },
    ],
    // Datos que rotan debajo de las barras (los mismos estudios que se sacaron de las preguntas 2, 3, 4, 6 y 7)
    factsHeading: "¿Sabías que…?",
    facts: [
      { text: "Un análisis de 36 estudios con <b>8.603 personas</b> encontró que quienes postergan tienen peor salud.", source: "British Journal of Health Psychology, 2026" },
      { text: "<b>Cuanto más enganche con el celular, más se posterga.</b> Lo confirmó un metaanálisis.", source: "Personality and Individual Differences, 2024" },
      { text: "Tener un plan concreto (\"si pasa X, hago Y\") ayuda a cumplir las metas, según 21 estudios con <b>15.907 personas</b>.", source: "Frontiers in Psychology, 2021" },
      { text: "Postergar la hora de dormir está ligado a <b>más estrés, ansiedad y depresión</b>. Así lo encontró un análisis con 35.097 personas.", source: "Frontiers in Psychology, 2026" },
      { text: "<b>Tratarte con comprensión te impulsa a cambiar más que criticarte.</b> La culpa alimenta el ciclo.", source: "Annual Review of Psychology, 2023" },
    ],
    includesHeading: "Lo que trae tu plan",
    includes: [
      "30 tareas pequeñas, una por día",
      "De 2 a 10 minutos al día",
      "Seguimiento de tu racha",
      "Pago único, sin suscripción",
      "Garantía de 7 días",
    ],
  },
  results: {
    title: "Tu perfil de procrastinación",
    youLabel: "Tú",
    scoreLabels: ["BAJO", "PROMEDIO", "MEDIO", "ALTO"],
    statLabels: ["Nivel de estrés", "Disparador principal", "Patrón de evitación"],
    stressLevels: { low: "Bajo", average: "Promedio", medium: "Medio", high: "Alto" },
    avoidancePatterns: { overwhelm: "Sobrecarga de tareas", distraction: "Ciclo de distracción" },
    defaultTrigger: "Pensar demasiado",
    copyTemplate: (stress) => `Estás en un ciclo de procrastinación de estrés ${stress.toLowerCase()} que te está drenando la energía y la tranquilidad. No estás fallando — estás en un patrón, y los patrones se pueden cambiar con pasos pequeños y repetidos, no con fuerza de voluntad.`,
  },
  planReady: {
    days: ["Día 1", "Día 8", "Día 15", "Día 22", "Día 30"],
    lessAvoidance: "Menos ansiedad",
    momentum: "Más constancia",
    habitInstalled: "Días más livianos",
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
    privacy: `Tus datos se guardan solo en tu navegador y no te enviaremos spam. <a href="/privacidad/" target="_blank">Política de privacidad</a>.`,
    invalid: "Ingresa un correo electrónico válido para continuar.",
  },
  included: {
    title: "Qué incluye tu plan:",
    items: [
      ["📖", "Una microtarea al día", "Casi todas de 2 a 10 minutos, cada una con una lección corta que explica por qué funciona."],
      ["🗺️", "Plan de 30 días en 4 etapas", "De victorias de 2 minutos a hábitos que ya no te cuestan. Según tu quiz, destacamos las tareas de tu disparador principal."],
      ["🔔", "Recordatorio diario", "Activa las notificaciones y te avisamos de tu tarea del día."],
      ["📈", "Seguimiento de tu racha", "Racha actual, mejor racha, días completados y una revisión semanal de cómo te sientes."],
    ],
  },
  pricing: {
    stickyLabel: "Descuento reservado para:",
    getPlanBtn: "QUIERO MI PLAN",
    headline: "Tu plan de 30 días para terminar lo que empiezas",
    headlineSub: "Una tarea pequeña al día durante 30 días, con su lección. En la página de pago puedes sumar módulos extra si quieres.",
    timelineNow: "Hoy",
    timelineGoal: "Lo que buscamos",
    timelineRows: [
      ["Tus mañanas", "Se te hace un nudo con solo mirar tu lista de pendientes", "Arrancas el día con prioridades claras y ganas de avanzar"],
      ["Tus noches", "Te acuestas repasando todo lo que no llegaste a hacer", "Te duermes tranquilo/a, sabiendo que sí avanzaste"],
      ["Tus relaciones", "Estás ahí, pero con la cabeza en mil pendientes", "Estás presente de verdad, sin la mente en otro lado"],
      ["Tu diálogo interno", "“¿Por qué no puedo simplemente hacerlo?”", "“Sé que voy a cumplir lo que me propongo”"],
    ],
    weeks: [
      ["Semana 1 · Victorias de 2 minutos", ["Tareas mínimas para que tu cerebro aprenda a terminar cosas", "Nombrar lo que evitas, sin presión", "Enviar ese mensaje que vienes postergando"]],
      ["Semana 2 · Cortar la distracción", ["Silenciar notificaciones y alejar tus redes", "Dividir tu tarea más grande en 3 pasos", "Tu primer bloque de 25 minutos sin interrupciones"]],
      ["Semana 3 · Constancia sin fuerza de voluntad", ["Dejar tu espacio listo para mañana", "Hacer lo urgente antes de mirar el celular", "Hablarte sin castigarte cuando fallas"]],
      ["Semana 4 · Día 30", ["Terminar algo que dejaste a medias", "Comparar tu día 1 con hoy", "Planear cómo seguir (puedes repetir el plan)"]],
    ],
    shift: "El primer objetivo: que empezar deje de costarte tanto.",
    timerBarLabel: "El descuento es válido solo por:",
    expiredStickyLabel: "El descuento venció",
    expiredBarLabel: "⏰ El descuento de bienvenida venció. Estos son los precios normales.",
    expiredTag: "PRECIO NORMAL",
    oneTimeLabel: "Pago único",
    savingsLabel: "Ahorras",
    corePlanLabel: "Plan de 30 días",
    paySafe: "🛡️ Pago 100% seguro",
    payIcons: ["VISA", "Mastercard", "PayPal", "Amex", "Discover", "Maestro"],
    guaranteeLine: "✓ Garantía de devolución de 7 días",
    guaranteeBoxTitle: "Garantía de devolución del 100%",
    guaranteeBoxBody: "Pruébalo sin riesgo durante 7 días. Si no ves progreso, te devolvemos hasta el último centavo — sin preguntas.",
    faqTitle: "Preguntas frecuentes",
  },
  checkout: {
    title: "Revisa tu pedido",
    total: "Total:",
    discount: "Descuento de bienvenida",
    saved: "Ahorraste $",
    bonusHead: "Tu plan incluye estos módulos:",
    includedLabel: "incluido",
    noModulesLine: "En la página de pago de Hotmart puedes sumar el Pack Enfoque y Hábitos (2 módulos extra) con solo marcar una casilla.",
    fastBonusTag: "🎁 REGALO POR COMPRAR HOY",
    fastBonusName: "Guía en video: Cómo doblar sábanas como un profesional",
    fastBonusDesc: "El truco japonés para que tu ropero y tus cajones se vean impecables en minutos. Un extra que solo recibes si completas tu compra ahora.",
    fastBonusValue: 19.99,
    fastBonusFree: "GRATIS hoy",
    fastBonusUrgency: "⏰ Este regalo solo se incluye si completas tu compra hoy.",
    workbookBonusTag: "🎁 2 BONOS ESPECIALES INCLUIDOS",
    workbookBonusFree: "GRATIS",
    workbookBonusNote: "Workbooks interactivos dentro de tu app: escribes, marcas y avanzas día a día.",
    workbookBonuses: [
      { icon: "⚡", img: "/shared/images/bonos/bono1.jpg", name: "Bono #1 — StartNow: Reto de 7 días", desc: "El protocolo de 2 minutos para dejar de esperar “el momento perfecto” y volver a ponerte en movimiento.", value: "$17–$27" },
      { icon: "📵", img: "/shared/images/bonos/bono2.jpg", name: "Bono #2 — El Protocolo Anti-Scroll", desc: "7 días para dejar de escapar al celular cuando tienes algo importante que hacer, sin eliminar tus redes.", value: "$19" },
    ],
    payBtn: "Continuar al pago seguro →",
    payHint: "🔒 Pago procesado por Hotmart. En el siguiente paso eliges tarjeta u otro medio de pago disponible en tu país y ves el precio final en tu moneda.",
    paymentNotice: (brand) => `Estamos activando los pagos. Escríbenos a ellie@eleanorgrantofficial.com para completar tu pedido.`,
    appUrl: "/app/",
    openAppBtn: "Mientras tanto, abre tu plan en la app →",
    finePrint: (brand, planLabel, now, was) => `Estás haciendo un pago único de $${now} por tu ${planLabel} de ${brand} (precio de lista $${was}).
  Sin suscripción, sin renovación automática, sin cargos recurrentes.
  El pago se procesa de forma segura a través de Hotmart. Dudas o soporte: <a href="mailto:ellie@eleanorgrantofficial.com">ellie@eleanorgrantofficial.com</a>. <a href="/terminos/" target="_blank">Términos de servicio</a> · <a href="/privacidad/" target="_blank">Política de privacidad</a>. El cargo puede aparecer en tu resumen a nombre de Hotmart.`,
  },
};
