/* ============================================================
   QUIZ CONTENT (English) — edit text here, not in /shared/app.js
   ============================================================ */

const BRAND = "StartNow";

// fact: shown under the answer. text = the finding (real study), app = what StartNow does about it
// (ONLY things the app actually has — see src/appContent.es.js), source = small-print citation.
// For "multi" questions, text can be a function that receives the selected options.
const QUESTIONS = [
  {
    n: 1, icon: "🌙", text: "Do you end the day feeling like you didn't move forward on what actually mattered?", type: "scale",
    fact: {
      text: "A study followed <b>3,525 people</b> for 9 months: those who procrastinated most later had more stress, anxiety, worse sleep, more loneliness and more money problems.",
      app: "StartNow gives you <b>one small task a day</b>, most of them 2 to 10 minutes. Each night you mark it done and see that you actually moved forward.",
      source: "JAMA Network Open, 2023",
    },
  },
  {
    n: 2, icon: "⏰", text: "Do you wait until last-minute pressure (or panic) forces you to start?", type: "scale",
    factOff: {
      text: "An analysis of 36 studies with <b>8,603 people</b> found that procrastinators have worse health… and still believe their future will be better without changing anything.",
      app: "Your 30-day plan starts with <b>2-minute wins</b> from day 1, so starting stops feeling so hard.",
      source: "British Journal of Health Psychology, 2026",
    },
  },
  {
    n: 3, icon: "📱", text: "Do you grab your phone 'just for a second' and suddenly half an hour is gone?", type: "scale",
    factOff: {
      text: "A meta-analysis confirmed that <b>the more hooked people are on their phone, the more they procrastinate</b>.",
      app: "Your plan includes concrete tasks like <b>silencing notifications, moving your social app icons away and spending a morning without social media</b>.",
      source: "Personality and Individual Differences, 2024",
    },
  },
  {
    n: 4, icon: "🧩", text: "Does a big task paralyze you so much you'd rather not start it at all?", type: "scale",
    factOff: {
      text: "An analysis of 21 studies with <b>15,907 people</b> showed that making a concrete plan (\"if X happens, I'll do Y\") helps people reach their goals.",
      app: "On day 11 you learn to <b>break your biggest task into 3 small steps</b>. And every day of the plan is just one small task.",
      source: "Frontiers in Psychology, 2021",
    },
  },
  {
    n: 5, icon: "🎯", text: "Does any noise, message, or stray thought pull you completely out of what you were doing?", type: "scale",
    fact: {
      text: "Today we keep our attention on a screen for only <b>47 seconds</b> on average. After an interruption, it takes about <b>25 minutes</b> to fully refocus.",
      app: "On day 14 you do your first <b>25-minute block with no interruptions</b>.",
      source: "Dr. Gloria Mark, University of California, \"Attention Span\", 2023",
    },
  },
  {
    n: 6, icon: "⚡", text: "Do your to-dos keep circling in your head even when you try to rest?", type: "scale",
    factOff: {
      text: "An analysis of 18 studies with <b>35,097 people</b> found that putting off bedtime is linked to more stress, anxiety and depression. The strongest link is with stress.",
      app: "Your plan includes <b>getting your space ready for tomorrow before bed</b> and a weekly check-in on how you feel.",
      source: "Frontiers in Psychology, 2026",
    },
  },
  {
    n: 7, icon: "🥊", text: "Do you fill up with guilt every time you put something off?", type: "scale",
    factOff: {
      text: "A review from the University of Texas concluded that <b>treating yourself with understanding drives change far more than self-criticism</b>. Guilt doesn't make you act — it feeds the cycle.",
      app: "On day 17 you practice <b>talking to yourself without punishment</b>: you write down a mistake and finish it with \"and I still kept going\".",
      source: "Annual Review of Psychology, 2023",
    },
  },
  {
    n: 8, icon: "📋", text: "Do you make plans full of excitement and abandon them a few days later?", type: "scale",
    fact: {
      text: "A meta-analysis of 20 studies with <b>2,601 people</b> found that a new habit takes <b>59 to 66 days</b> on average to form. Willpower isn't enough — you need a system.",
      app: "StartNow is that system: <b>one small task a day and a streak tracker</b>. After the 30 days, you can repeat the plan to reinforce it.",
      source: "Healthcare, 2024",
    },
  },
  {
    n: 9, icon: "🎯", text: "What affects your productivity the most?", type: "multi", subtitle: "Select all that apply",
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
    n: 10, icon: "📝", text: "What do you keep putting off?", type: "multi", subtitle: "Select all that apply",
    options: [
      { label: "Exercising" }, { label: "Getting enough sleep" }, { label: "Reading more" },
      { label: "Checking my health" }, { label: "Defining life goals" }, { label: "Finding a better job" },
      { label: "Finding relaxation" }, { label: "Cleaning and chores" },
    ],
    fact: {
      icon: "⏳",
      heading: "Think about it",
      text: (picked) => picked.length
        ? `If nothing changes, a year from now <b>${picked.map(p => p.toLowerCase()).join(", ")}</b> will still be on your to-do list.`
        : "If nothing changes, a year from now your to-do list will look the same.",
      app: "Your plan starts today with <b>a 2-minute task</b>.",
    },
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
    title: "Almost done!",
    subtitle: "In 60 seconds, you'll discover:",
    bullets: [
      { icon: "🧑‍🤝‍🧑", text: "Your procrastination profile (and what triggers it)" },
      { icon: "📋", text: "Your 30-day plan: one small task a day" },
      { icon: "⏰", text: "What you'll work on each week of the plan" },
    ],
  },
};

// Labels for the fact card shown under each answer
const FACT_LABELS = { heading: "Did you know…?", app: "With StartNow:", source: "Source:" };


// checkoutUrl: paste each plan's Stripe/PayPal payment link here when you have it.
// While empty, the button shows the "activating payments" notice instead of charging.
// checkoutUrlFull: payment link at the REGULAR price ("was"), used once the 15-minute
// discount expires. Empty = checkoutUrl is used instead.
const PLANS = [
  { key: "essential", label: "30-Day Plan", tag: "", tagIcon: "", badgeClass: "", discountLabel: "SAVE 40%", was: 24.99, now: 14.99, modules: [], checkoutUrl: "https://pay.hotmart.com/G106789484C", checkoutUrlFull: "https://pay.hotmart.com/G106789484C?off=le7ngksq" },
];

const FAQ = [
  {
    q: "What if I struggle with staying motivated and disciplined, even with a plan in place?",
    a: `${BRAND} isn't built around willpower — it's built around removing the need for it. Each day you get one small, specific task (most take 2 to 10 minutes), not a big plan you have to force yourself through. They're micro-commitments: tiny wins that teach your brain that starting isn't that hard. And your streak shows you every day how far you've come.`,
  },
  {
    q: "How can I effectively manage and minimize distractions that hinder my productivity?",
    a: `Week 2 of the plan is dedicated to breaking the distraction cycle, with concrete tasks to try that same day: silencing notifications from one app, moving your favorite social app to the last screen of your phone, doing a 25-minute "Do Not Disturb" block and, later on, spending a morning without social media. Each step is small and builds on the last.`,
  },
  {
    q: "What strategies or techniques can I use to overcome feelings of being overwhelmed or anxious when starting this plan?",
    a: `We never ask you to tackle everything at once. Almost every task in your plan takes under 10 minutes — and in week one, many take 2. The goal in week one isn't results, it's proving to your brain that starting doesn't have to feel overwhelming. Momentum comes after that, not before.`,
  },
  {
    q: "Are there specific features or approaches that make this Procrastination Management Plan different from others I've tried in the past?",
    a: `Most productivity tools focus on the outcome (a clean inbox, a finished project). ${BRAND} focuses on the habit of starting: one small task a day for 30 days, with a short lesson explaining why it works. Based on your quiz answers, we highlight the tasks for your main trigger, and your streak and weekly check-ins show you how the pattern is changing.`,
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
    sub: "Discover your procrastination type and get your 30-day plan to finally finish what you start",
    male: "Male",
    female: "Female",
  },
  age: {
    title: "What is your age?",
    subtitle: "Just so we can get to know you a little better",
    options: ["18 - 24", "25 - 34", "35 - 44", "45 - 54", "55 - 64", "65+"],
  },
  socialProof: {
    pre: "You're in the ",
    highlight: "right place",
    sub: "This 2-minute quiz helps you understand why you procrastinate—and what to do about it.",
    callout: "<b>Just 10 questions</b> — then you'll see your profile and your 30-day plan",
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
    headlinePre: "We're putting together ",
    headlineHighlight: "your 30-day plan",
    headlinePost: "",
    steps: [
      { label: "Identifying your procrastination triggers...", pct: 100 },
      { label: "Calculating your procrastination level...", pct: 100 },
      { label: "Highlighting tasks for your main trigger...", pct: 100 },
      { label: "Preparing your 30-day plan...", pct: 100 },
      { label: "Preparing your streak tracker...", pct: 0 },
    ],
    // Facts that rotate under the bars (the same studies removed from questions 2, 3, 4, 6 and 7)
    factsHeading: "Did you know…?",
    facts: [
      { text: "An analysis of 36 studies with <b>8,603 people</b> found that people who procrastinate have worse health.", source: "British Journal of Health Psychology, 2026" },
      { text: "<b>The more hooked you are on your phone, the more you procrastinate.</b> A meta-analysis confirmed it.", source: "Personality and Individual Differences, 2024" },
      { text: "Having a concrete plan (\"if X happens, I do Y\") helps you reach your goals, according to 21 studies with <b>15,907 people</b>.", source: "Frontiers in Psychology, 2021" },
      { text: "Putting off bedtime is linked to <b>more stress, anxiety and depression</b>, according to an analysis of 35,097 people.", source: "Frontiers in Psychology, 2026" },
      { text: "<b>Treating yourself with understanding drives change more than self-criticism.</b> Guilt feeds the cycle.", source: "Annual Review of Psychology, 2023" },
    ],
    includesHeading: "What your plan includes",
    includes: [
      "30 small tasks, one per day",
      "2 to 10 minutes a day",
      "Streak tracking",
      "One-time payment, no subscription",
      "7-day guarantee",
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
    copyTemplate: (stress) => `You're stuck in a ${stress.toLowerCase()}-stress procrastination cycle that's draining your energy and peace of mind. You're not failing — you're stuck in a pattern, and patterns can be changed with small, repeated steps, not willpower.`,
  },
  planReady: {
    days: ["Day 1", "Day 8", "Day 15", "Day 22", "Day 30"],
    lessAvoidance: "Less anxiety",
    momentum: "More consistency",
    habitInstalled: "Lighter days",
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
    privacy: `Your data stays in your browser, and we won't send you spam. <a href="/en/privacy/" target="_blank">Privacy Policy</a>.`,
    invalid: "Enter a valid email address to continue.",
  },
  included: {
    title: "What's included in your plan:",
    items: [
      ["📖", "One Micro-Task a Day", "Most take 2 to 10 minutes, each with a short lesson explaining why it works."],
      ["🗺️", "30-Day Plan in 4 Stages", "From 2-minute wins to habits that no longer feel hard. Based on your quiz, we highlight the tasks for your main trigger."],
      ["🔔", "Daily Reminder", "Turn on notifications and we'll remind you of your task for the day."],
      ["📈", "Streak Tracking", "Current streak, best streak, days completed and a weekly check-in on how you feel."],
    ],
  },
  pricing: {
    stickyLabel: "Discount reserved for:",
    getPlanBtn: "GET MY PLAN",
    headline: "Your 30-day plan to finish what you start",
    headlineSub: "One small task a day for 30 days, each with its lesson. You can add extra modules on the checkout page if you want.",
    timelineNow: "Today",
    timelineGoal: "What we aim for",
    timelineRows: [
      ["Your mornings", "Your stomach drops before you even open your to-do list", "You start the day with clear priorities and real momentum"],
      ["Your evenings", "You lie awake replaying everything you didn't get to", "You fall asleep knowing you actually made progress"],
      ["Your relationships", "You're there, but your mind is somewhere else entirely", "You're fully present, without a mind full of unfinished tasks"],
      ["Your self-talk", "“Why can't I just get this done?”", "“I trust myself to follow through”"],
    ],
    weeks: [
      ["Week 1 · 2-minute wins", ["Tiny tasks that teach your brain to finish things", "Naming what you avoid, with no pressure", "Sending that message you've been putting off"]],
      ["Week 2 · Breaking the distraction cycle", ["Silencing notifications and moving social apps away", "Breaking your biggest task into 3 steps", "Your first 25-minute block with no interruptions"]],
      ["Week 3 · Consistency without willpower", ["Getting your space ready for tomorrow", "Doing the urgent thing before checking your phone", "Talking to yourself without punishment when you slip"]],
      ["Week 4 · Day 30", ["Finishing something you left half-done", "Comparing day 1 with today", "Planning how to keep going (you can repeat the plan)"]],
    ],
    shift: "The first goal: making starting feel less hard.",
    timerBarLabel: "Discount only valid for:",
    expiredStickyLabel: "Your discount has expired",
    expiredBarLabel: "⏰ Your introductory discount has expired. These are the regular prices.",
    expiredTag: "REGULAR PRICE",
    oneTimeLabel: "One-time payment",
    savingsLabel: "You save",
    corePlanLabel: "30-day plan",
    paySafe: "🛡️ Pay safe & secure",
    payIcons: ["VISA", "Mastercard", "PayPal", "Amex", "Discover", "Maestro"],
    guaranteeLine: "✓ 7-day money-back guarantee",
    guaranteeBoxTitle: "100% Money-Back Guarantee",
    guaranteeBoxBody: "Try risk-free for 7 days. If you don't see progress, we'll refund every penny — no questions asked.",
    faqTitle: "People often ask",
  },
  checkout: {
    title: "Review your order",
    total: "Total:",
    discount: "Introductory discount",
    saved: "You just saved $",
    bonusHead: "Your plan includes these modules:",
    includedLabel: "included",
    noModulesLine: "On the Hotmart checkout page, you can add the Focus & Habits Pack (2 extra modules) just by checking a box.",
    fastBonusTag: "🎁 GIFT FOR BUYING TODAY",
    fastBonusName: "Video guide: How to fold sheets like a pro",
    fastBonusDesc: "The Japanese trick to make your closet and drawers look spotless in minutes. An extra you only get if you complete your purchase now.",
    fastBonusValue: 19.99,
    fastBonusFree: "FREE today",
    fastBonusUrgency: "⏰ This gift is only included if you complete your purchase today.",
    workbookBonusTag: "🎁 2 SPECIAL BONUSES INCLUDED",
    workbookBonusFree: "FREE",
    workbookBonusNote: "Interactive workbooks inside your app: write, check things off and move forward day by day.",
    workbookBonuses: [
      { icon: "⚡", img: "/shared/images/bonos/bono1-en.jpg", name: "Bonus #1 — StartNow: 7-Day Challenge", desc: "The 2-minute protocol to stop waiting for “the perfect moment” and get moving again.", value: "$17–$27" },
      { icon: "📵", img: "/shared/images/bonos/bono2-en.jpg", name: "Bonus #2 — The Anti-Scroll Protocol", desc: "7 days to stop escaping to your phone when you have something important to do, without deleting your social media.", value: "$19" },
    ],
    payBtn: "Continue to secure checkout →",
    payHint: "🔒 Payment processed by Hotmart. On the next step you'll choose your card or another payment method available in your country and see the final price in your currency.",
    paymentNotice: (brand) => `We're activating payments. Email us at ellie@eleanorgrantofficial.com to complete your order.`,
    appUrl: "/en/app/",
    openAppBtn: "Meanwhile, open your plan in the app →",
    finePrint: (brand, planLabel, now, was) => `You're making a one-time payment of $${now} for your ${planLabel} from ${brand} (list price $${was}).
  No subscription, no auto-renewal, no recurring charges.
  Payment is processed securely by Hotmart. Questions or support: <a href="mailto:ellie@eleanorgrantofficial.com">ellie@eleanorgrantofficial.com</a>. <a href="/en/terms/" target="_blank">Terms of Service</a> · <a href="/en/privacy/" target="_blank">Privacy Policy</a>. The charge may appear on your statement under Hotmart.`,
  },
};
