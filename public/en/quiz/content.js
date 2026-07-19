/* ============================================================
   QUIZ CONTENT (English) — edit text here, not in /shared/app.js
   ============================================================ */

const BRAND = "StartNow";

const QUESTIONS = [
  { n: 1, icon: "🌙", text: "Do you end the day feeling like you didn't move forward on what actually mattered?", type: "scale" },
  { n: 2, icon: "⏰", text: "Do you wait until last-minute pressure (or panic) forces you to start?", type: "scale" },
  { n: 3, icon: "📱", text: "Do you grab your phone 'just for a second' and suddenly half an hour is gone?", type: "scale" },
  { n: 4, icon: "🧩", text: "Does a big task paralyze you so much you'd rather not start it at all?", type: "scale" },
  { n: 5, icon: "🎯", text: "Does any noise, message, or stray thought pull you completely out of what you were doing?", type: "scale" },
  { n: 6, icon: "🌫️", text: "Does night fall and you can't quite say where the hours went?", type: "scale" },
  { n: 7, icon: "📲", text: "Do you catch yourself scrolling instead of doing the thing you 'were just about to start'?", type: "scale" },
  { n: 8, icon: "💬", text: "Do you avoid that uncomfortable message or conversation you know you'll have to have eventually?", type: "scale" },
  { n: 9, icon: "🏠", text: "Does the mess pile up until you don't even know where to begin?", type: "scale" },
  { n: 10, icon: "⚡", text: "Do your to-dos keep circling in your head even when you try to rest?", type: "scale" },
  { n: 11, icon: "🥊", text: "Do you fill up with guilt every time you put something off?", type: "scale" },
  { n: 12, icon: "🔄", text: "Do you have several things started and none of them finished?", type: "scale" },
  { n: 13, icon: "📋", text: "Do you make plans full of excitement and abandon them a few days later?", type: "scale" },
  { n: 14, icon: "⏱️", text: "Do you end up running late even when you had plenty of time to get ready?", type: "scale" },
  { n: 15, icon: "🥱", text: "Do you save for last exactly what bores or frustrates you the most?", type: "scale" },
  { n: 16, icon: "🗯️", text: "Do you get tangled up in other things when you should really be focused?", type: "scale" },
  {
    n: 17, icon: "🎯", text: "What affects your productivity the most?", type: "multi", subtitle: "Select all that apply",
    options: [
      { icon: "⛈️", label: "Stress and anxiety" },
      { icon: "❓", label: "Overthinking" },
      { icon: "💎", label: "Perfectionism" },
      { icon: "😵", label: "Self-doubt" },
      { icon: "💔", label: "Relationship problems" },
      { icon: "☹️", label: "Emotional trauma" },
    ]
  },
  {
    n: 18, icon: "📝", text: "What do you keep putting off?", type: "multi", subtitle: "Select all that apply",
    options: [
      { label: "Exercising" }, { label: "Getting enough sleep" }, { label: "Reading more" },
      { label: "Checking my health" }, { label: "Defining life goals" }, { label: "Finding a better job" },
      { label: "Finding relaxation" }, { label: "Cleaning and chores" },
    ]
  },
  {
    n: 19, icon: "🔋", text: "What do you need most right now?", type: "single",
    options: [
      { label: "Focus" }, { label: "Calm" }, { label: "Willpower" },
      { label: "Energy" }, { label: "Motivation" }, { label: "Not sure" },
    ]
  },
  {
    n: 20, icon: "🌱", text: "What would you like to achieve on this journey?", type: "single",
    options: [
      { label: "Improve my well-being" }, { label: "Finish what I start" },
      { label: "Improve my focus and productivity" }, { label: "Improve my relationships" },
      { label: "Improve my career" },
    ]
  },
  {
    n: 21, icon: "🚫", text: "Which habits would you like to break?", type: "multi",
    options: [
      { label: "Being late" }, { label: "Self doubt" }, { label: "Social media" },
      { label: "Junk food or sugar" }, { label: "Binge-watching" }, { label: "Smoking" }, { label: "Losing sleep" },
    ]
  },
  {
    n: 22, icon: "🩺", text: "Did a therapist or healthcare provider recommend this app?", type: "single",
    options: [{ label: "Yes" }, { label: "No" }]
  },
  {
    n: 23, icon: "⏳", text: "How much time can you commit to personal growth daily?", type: "single",
    options: [{ label: "5 - 10 minutes" }, { label: "15 - 20 minutes" }, { label: "30 + minutes" }]
  },
];

const SCALE_OPTIONS = [
  { icon: "🔴", label: "Always — it's my daily life", weight: 3 },
  { icon: "🟠", label: "Very often", weight: 2 },
  { icon: "🟡", label: "Only once in a while", weight: 1 },
  { icon: "🟢", label: "Almost never", weight: 0 },
];

const INTERSTITIALS = {
  8: {
    title: "You're doing great! ⚡",
    cards: [
      { heading: "Did you know?", body: "Behavioral research suggests most people procrastinate regularly — it's not a character flaw, it's a pattern your brain learned." },
      { heading: "The good news?", body: "Patterns can be changed. Keep going to discover yours." },
    ],
  },
  16: {
    title: "Almost done!",
    subtitle: "In 60 seconds, you'll discover:",
    bullets: [
      { icon: "🧑‍🤝‍🧑", text: "Your procrastination type (and what triggers it)" },
      { icon: "📋", text: "Your personalized action plan (no generic advice)" },
      { icon: "⏰", text: "Timeline for real change (when you'll see results)" },
    ],
  },
  22: {
    title: "Grounded in behavioral science",
    body: "Your personalized plan draws on well-established behavioral therapy techniques used to help people build consistent habits and follow through on tasks.",
    approach: ["Cognitive Behavioral Therapy (CBT) principles", "Implementation Intention frameworks", "Behavioral & habit-formation research"],
  },
};

const TESTIMONIALS = [
  { name: "Rachel Simmons, 41", role: "HR Manager", quote: "\"I finally understand why I stall\"", body: "The daily lessons made me realize I wasn't lazy — I was avoiding decisions that felt too big. Breaking them down changed everything.", date: "Jun 14", img: "/shared/images/testimonial-1.jpg" },
  { name: "Tyler Brooks, 34", role: "Small Business Owner", quote: "\"5 minutes actually works\"", body: "I was skeptical something this short could matter. Three weeks in, I'm closing my inbox before dinner instead of at midnight.", date: "May 29", img: "/shared/images/testimonial-2.jpg" },
  { name: "Mark Douglas, 55", role: "Sales Director", quote: "\"Wish I'd found this 20 years ago\"", body: "I've read every productivity book out there. This is the first thing that changed my actual behavior, not just my to-do list.", date: "Jun 03", img: "/shared/images/testimonial-3.jpg" },
  { name: "Deborah Whitfield, 66", role: "Retired School Principal", quote: "\"It's never too late to change a habit\"", body: "I figured procrastination was just part of my personality by now. Turns out it was a pattern, and patterns can be unlearned.", date: "Apr 22", img: "/shared/images/testimonial-4.jpg" },
  { name: "Emily Carter, 39", role: "Marketing Consultant", quote: "\"My clients noticed before I did\"", body: "I wasn't trying to impress anyone, I just wanted less guilt. But two clients asked what changed about how I follow up.", date: "Jun 20", img: "/shared/images/testimonial-5.jpg" },
];

// checkoutUrl: paste each plan's Stripe/PayPal payment link here when you have it.
// While empty, the button shows the "activating payments" notice instead of charging.
const PLANS = [
  { key: "essential", label: "Essential Plan", tag: "Most popular", tagIcon: "⭐", badgeClass: "popular", discountLabel: "SAVE 50%", was: 29.99, now: 14.99, modules: [], checkoutUrl: "" },
  { key: "plus", label: "Plus Plan", tag: "Best offer", tagIcon: "👍", badgeClass: "best", discountLabel: "ONLY NOW: 66%", was: 74.99, now: 24.99, modules: ["time-focus", "habits"], checkoutUrl: "" },
  { key: "complete", label: "Complete Plan", tag: "Everything included", tagIcon: "🎁", badgeClass: "", discountLabel: "SAVE 73%", was: 149.99, now: 39.99, modules: ["time-focus", "stress-anxiety", "habits", "relationships", "money"], checkoutUrl: "" },
];

const FAQ = [
  {
    q: "What if I struggle with staying motivated and disciplined, even with a plan in place?",
    a: `${BRAND} isn't built around willpower — it's built around removing the need for it. Each day you get one small, specific action (5-10 minutes), not a big plan you have to force yourself through. The lessons use CBT-based micro-commitments: tiny wins that train your brain to associate starting with relief instead of dread, so motivation stops being something you have to manufacture every morning.`,
  },
  {
    q: "How can I effectively manage and minimize distractions that hinder my productivity?",
    a: `Your daily lesson includes a short, practical exercise for the specific distraction pattern you flagged in the quiz (phone checking, task-switching, decision fatigue). Instead of generic "turn off notifications" advice, you get one concrete environment or habit change to try that day, then build on what worked the next day.`,
  },
  {
    q: "What strategies or techniques can I use to overcome feelings of being overwhelmed or anxious when starting this plan?",
    a: `We never ask you to tackle everything at once. Every task in your plan is broken down to something you can finish in under 10 minutes — often under 2. The goal in week one isn't results, it's proving to your brain that starting doesn't have to feel overwhelming. Momentum comes after that, not before.`,
  },
  {
    q: "Are there specific features or approaches that make this Procrastination Management Plan different from others I've tried in the past?",
    a: `Most productivity tools focus on the outcome (a clean inbox, a finished project). ${BRAND} focuses on the neural pattern behind procrastination itself — using your quiz answers to personalize which trigger to address first, then tracking your completion streak so you can see the pattern actually changing, not just hope it is.`,
  },
];

const BONUS_MODULES = [
  { key: "time-focus", label: "Time & focus mastery", was: 19.99 },
  { key: "stress-anxiety", label: "Stress & anxiety management", was: 14.99 },
  { key: "habits", label: "Building lasting habits", was: 19.99 },
  { key: "relationships", label: "Relationship management", was: 14.99 },
  { key: "money", label: "Money management", was: 12.99 },
];

const STRINGS = {
  locale: "en-US",
  continueBtn: "Continue",
  approachIntro: "Our approach combines:",
  gender: {
    headline: "Stop Procrastinating: Take the Free 2-Minute Quiz",
    sub: "Discover your procrastination type and get a personalized plan to finally finish what you start",
    male: "Male",
    female: "Female",
    testimonialIntro: "See how it went for other people on this same plan:",
  },
  age: {
    title: "What is your age?",
    subtitle: "We only use your age to personalize your plan",
    options: ["18 - 24", "25 - 34", "35 - 44", "45 - 54", "55 - 64", "65+"],
  },
  socialProof: {
    pre: "You're in the ",
    highlight: "right place",
    sub: "This 2-minute quiz helps you understand why you procrastinate—and what to do about it.",
    callout: "<b>Join 1.2 million people</b> who've already started their journey",
  },
  therapist: {
    nameTitle: "That's a great sign! What's their name?",
    nameSub: "We love knowing a professional is part of your journey. Share their name (or leave it blank if you prefer).",
    namePlaceholder: "Therapist or provider's name",
    ackTitle: (name) => name ? `${name} knows what they're doing` : "Your therapist knows what they're doing",
    ackBody: (name) => `CBT-based micro-interventions — like the ones in this plan — are increasingly used as a complement between sessions. The fact that ${name || "your therapist"} recommended this approach says a lot about your process: you'll be working on the pattern, not just the symptom.`,
    ackTip: "Tip: let them know how your 30-day plan is going — professional support multiplies the results.",
  },
  resultsLoading: {
    headlinePre: "Join ",
    headlineHighlight: "1.2 million",
    headlinePost: " people taking back control",
    steps: [
      { label: "Identifying your procrastination triggers...", pct: 100 },
      { label: "Calculating your productivity baseline...", pct: 100 },
      { label: "Building your custom roadmap...", pct: 100 },
      { label: "Selecting your first daily lessons...", pct: 100 },
      { label: "Preparing your progress tracker...", pct: 0 },
    ],
    testimonials: [
      { quote: "Simple but powerful", body: "Just 5 minutes a day, but it's completely changed how I approach tasks. My house is cleaner, my work is on time, and I feel in control again.", author: "David R., 58, Consultant" },
      { quote: "I finally stopped putting things off", body: "For years I started things I never finished. Within two weeks I could feel the difference: I do what I set out to do without fighting myself.", author: "Carolina M., 34, Designer" },
      { quote: "It's not willpower, it's method", body: "I'd tried everything before. This is the first thing that actually stuck. The 5-minute micro-tasks make starting stop feeling scary.", author: "Andrew T., 41, Accountant" },
    ],
  },
  results: {
    title: "Your Procrastination Profile",
    youLabel: "You",
    scoreLabels: ["LOW", "AVERAGE", "MEDIUM", "HIGH"],
    statLabels: ["Stress level", "Main Trigger", "Avoidance Pattern"],
    stressLevels: { low: "Low", average: "Average", medium: "Medium", high: "High" },
    avoidancePatterns: { overwhelm: "Task Overwhelm", distraction: "Distraction Loop" },
    defaultTrigger: "Overthinking",
    copyTemplate: (stress) => `You're stuck in a ${stress.toLowerCase()}-stress procrastination cycle that's draining your energy and peace of mind. You're not failing — you're stuck in a pattern, and patterns can be changed. Thousands of people at your level have found relief using a structured, science-informed approach.`,
  },
  planReady: {
    months: ["Week 1", "Week 3", "Day 30"],
    lessAvoidance: "Less avoidance",
    momentum: "Momentum",
    habitInstalled: "Habit installed",
    legendWith: "With",
    legendWithout: "Without action",
    disclaimer: "*The chart is a non-personalized illustration and results may vary.",
    headlinePre: "Your ",
    headlineHighlight: "Anti-Procrastination Plan",
    headlinePost: " is ready!",
    subPre: "You could start regaining control by",
  },
  name: {
    title: "What's your name?",
    placeholder: "Name",
  },
  email: {
    title: "Enter your email to see the full results",
    placeholder: "Email",
    privacy: "We are committed to protecting your personal data. We'll email you a copy of your results for convenient access. We are not going to send you spam.",
    invalid: "Enter a valid email address to continue.",
  },
  included: {
    title: "What's included in your plan:",
    items: [
      ["📖", "Daily 5-Minute Lessons", "Understand why you procrastinate and how to stop. Bite-sized sessions."],
      ["🗺️", "Personalized Action Plans", "Custom roadmap based on your quiz results. No generic advice."],
      ["🧠", "Proven Techniques", "CBT and habit-formation strategies used by therapists."],
      ["📈", "Progress Tracking", "Watch your productivity improve week by week."],
    ],
  },
  pricing: {
    stickyLabel: "Discount reserved for:",
    getPlanBtn: "GET MY PLAN",
    headline: "Your personalized plan to finish what you start",
    headlineSub: "Choose your plan — some include free bonus modules (focus, stress, habits, relationships, and money).",
    timelineNow: "Now",
    timelineGoal: "Your goal",
    timelineRows: [
      ["Your mornings", "Dread opening your to-do list", "Clear priorities, ready to tackle the day"],
      ["Your evenings", "Guilt about what you didn't do", "Satisfaction from real progress"],
      ["Your relationships", "Mentally absent, always stressed", "Fully present and engaged"],
      ["Your self-talk", "“Why can't I just do it?”", "“I trust myself to follow through”"],
    ],
    weeks: [
      ["Week 1", ["Wake up without dread", "Stop the guilt spiral", "Feel lighter about your to-do list"]],
      ["Weeks 2-3", ["Complete 3-5 tasks you've avoided for months", "Energy increases", "Build sustainable momentum"]],
      ["Week 4 · Day 30", ["Tackle projects that felt impossible", "Home and workspace feel manageable", "Show up for relationships without resentment"]],
      ["After day 30", ["New habits feel automatic", "Consistent follow-through becomes your default", "You trust yourself to finish what you start"]],
    ],
    shift: "Most users feel a shift within 7-10 days.",
    timerBarLabel: "Discount only valid for:",
    oneTimeLabel: "One-time payment",
    savingsLabel: "You save",
    corePlanLabel: "30-day plan",
    paySafe: "🛡️ Pay safe & secure",
    payIcons: ["VISA", "Mastercard", "PayPal", "Amex", "Discover", "Maestro"],
    guaranteeLine: "✓ 7-day money-back guarantee",
    guaranteeBoxTitle: "100% Money-Back Guarantee",
    guaranteeBoxBody: "Try risk-free for 7 days. If you don't see progress, we'll refund every penny — no questions asked.",
    testimonialsHeadline: "Join 1.2 million people taking back control",
    faqTitle: "People often ask",
  },
  checkout: {
    title: "Select payment method",
    creditCard: "Credit card",
    total: "Total:",
    discount: "Introductory discount",
    saved: "You just saved $",
    bonusHead: "Your plan includes these modules:",
    includedLabel: "included",
    noModulesLine: "This plan doesn't include bonus modules — you can add them anytime.",
    fastBonusTag: "🎁 GIFT FOR BUYING TODAY",
    fastBonusName: "Video guide: How to fold sheets like a pro",
    fastBonusDesc: "The Japanese trick to make your closet and drawers look spotless in minutes. An extra you only get if you complete your purchase now.",
    fastBonusValue: 19.99,
    fastBonusFree: "FREE today",
    fastBonusUrgency: "⏰ This gift disappears if you leave this page.",
    gpay: "Buy with G Pay",
    paymentNotice: (brand) => `We're activating payments. Email us at hello@${brand.toLowerCase()}.app to complete your order.`,
    openAppBtn: "Meanwhile, open your plan in the app →",
    finePrint: (brand, planLabel, now, was) => `You're making a one-time payment of $${now} for your ${planLabel} on <a href="#">${brand.toLowerCase()}.app</a> (list price $${was}).
  No subscription, no auto-renewal, no recurring charges — full lifetime access to the content included in this plan.
  Payment is charged to the card you specify here. Questions or support: <a href="#">hello@${brand.toLowerCase()}.app</a>. <a href="#">Terms of Service</a>. The charge will appear on your bill as "${brand}".`,
  },
};
