/**
 * LEVEL 3 — AI Tools (8 dars)
 * Har bir dars: What / Why / When / How / Examples / Practice
 * Vositalarning to‘liq ma’lumotnomasi — `data/tools.js` va /ai-tools sahifasida.
 */

const c = 'ai-tools'

export const AI_TOOLS_LESSONS = [
  {
    id: 't-01',
    courseId: c,
    order: 1,
    slug: 'vositani-tanlash',
    title: 'To’g’ri vositani qanday tanlash',
    summary: 'Vazifadan vositaga: tanlov mezonlari va qaror daraxti.',
    duration: 8,
    xp: 50,
    objectives: [
      'Tanlov mezonlarini bilish',
      'Vazifa turiga qarab kategoriyani aniqlash',
      'Ortiqcha vosita to’plashdan qochish',
    ],
    why: 'Ko’pchilik 20 ta vositaga obuna bo’ladi, 2 tasini ishlatadi. To’g’ri tanlov — pul va vaqt tejaydi.',
    blocks: [
      { type: 'heading', body: 'Qaror daraxti' },
      {
        type: 'table',
        head: ['Vazifa', 'Kategoriya', 'Boshlang’ich tanlov'],
        rows: [
          ['Matn yozish, tahlil, fikrlash', 'AI Chat', 'ChatGPT yoki Claude'],
          ['Uzun hujjat / katta kod', 'AI Chat (uzun kontekst)', 'Claude'],
          ['Manbali tadqiqot', 'AI Research', 'Perplexity'],
          ['Kod yozish IDE ichida', 'AI Coding', 'Copilot yoki Cursor'],
          ['Terminalda agent', 'AI Coding', 'Claude Code'],
          ['Rasm', 'AI Image', 'ChatGPT Image / Midjourney'],
          ['Video', 'AI Video', 'Runway / Veo / Kling'],
          ['Ovoz', 'AI Audio', 'ElevenLabs / Suno'],
          ['O’quv materiali', 'AI Research', 'NotebookLM'],
        ],
      },
      { type: 'heading', body: '5 ta tanlov mezoni' },
      {
        type: 'list',
        items: [
          'Vazifaga moslik — universal vosita har doim ham eng yaxshi emas',
          'Kontekst hajmi — uzun hujjat bilan ishlaysizmi?',
          'Integratsiya — siz ishlaydigan muhitga tushadimi?',
          'Maxfiylik — ma’lumot qayerda saqlanadi?',
          'Narx — bepul reja vazifangizga yetadimi?',
        ],
      },
      {
        type: 'callout',
        tone: 'success',
        title: 'Minimal to’plam',
        body: '1 ta kuchli chat (ChatGPT yoki Claude) + 1 ta research (Perplexity) + 1 ta coding vositasi. Bu 3 tasi ehtiyojning 80% ini qoplaydi.',
      },
    ],
    realWorld: [
      'Yangi loyihada stack tanlash',
      'Jamoa uchun vosita standarti',
      'Oylik obuna byudjetini optimallashtirish',
    ],
    practice: {
      title: 'Shaxsiy stack',
      task: 'O’zingizning 5 ta eng ko’p uchraydigan vazifangizni yozing va har biriga vosita biriktiring.',
      hint: 'Har bir vosita uchun «nega aynan bu» degan sababni yozing.',
      sample: 'Kod → Claude Code. Tadqiqot → Perplexity. Matn → Claude. Rasm → ChatGPT Image.',
    },
    keyTakeaways: [
      'Vazifa vositani belgilaydi',
      '3 ta vosita ehtiyojning 80% ini qoplaydi',
      'Integratsiya va maxfiylik ham mezon',
    ],
  },

  {
    id: 't-02',
    courseId: c,
    order: 2,
    slug: 'ai-chat',
    title: 'AI Chat vositalari',
    summary: 'ChatGPT, Claude, Gemini, Copilot, Perplexity — farqlar va tanlov.',
    duration: 10,
    xp: 50,
    objectives: [
      'Har bir chat vositasining kuchini bilish',
      'Vazifaga qarab tanlashni o’rganish',
      'Bir nechta vositani birga ishlatish',
    ],
    why: 'Chat vositalari — kundalik ishning asosi. Ular orasidagi farqni bilish har kuni vaqt tejaydi.',
    blocks: [
      {
        type: 'table',
        head: ['Vosita', 'Eng kuchli tomoni', 'Qachon'],
        rows: [
          ['ChatGPT', 'Keng ekotizim, rasm, fayl tahlili', 'Universal kundalik ish'],
          ['Claude', 'Uzun kontekst, kod, aniq ko’rsatma', 'Hujjat va kod bilan chuqur ish'],
          ['Gemini', 'Google integratsiyasi, multimodal', 'Workspace ichida ish'],
          ['Microsoft Copilot', 'Office 365 integratsiyasi', 'Word/Excel/Outlook ichida'],
          ['Perplexity', 'Manbali qidiruv', 'Dolzarb ma’lumot va tadqiqot'],
        ],
      },
      { type: 'heading', body: 'Kuchli/zaif tomonlar' },
      {
        type: 'compare',
        good: {
          title: 'Chat vositalari nimada zo’r',
          body: '• Fikrlash va tahlil\n• Matn transformatsiyasi\n• Brainstorm\n• Tushuntirish\n• Kod yozish',
        },
        bad: {
          title: 'Nimada zaif',
          body: '• Aniq raqamli hisob\n• Real vaqt ma’lumoti (search’siz)\n• Sizning ichki ma’lumotingiz\n• 100% takrorlanadigan natija',
        },
      },
      { type: 'heading', body: 'Amaliy prompt misollari' },
      {
        type: 'code',
        lang: 'text',
        body: '# Tahlil uchun\n"Bu hisobotni o’qi va: 1) 3 ta asosiy xulosa 2) 2 ta xavf\n3) 3 ta tavsiya ber. Har biri 1 jumla."\n\n# Qaror uchun\n"Ikki variantni solishtir: [A] va [B].\nMezonlar: narx, vaqt, xavf, masshtablanuvchanlik.\nJadval ko’rinishida ber va tavsiyangni yoz."\n\n# O’rganish uchun\n"[Mavzu] ni menga tushuntir. Men [daraja] darajadaman.\nAvval intuitiv misol, keyin texnik tafsilot ber."',
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Ikki modelli ish uslubi',
        body: 'Muhim vazifada bir xil promptni ikki modelga bering va javoblarni solishtiring. Farqlar — tekshirilishi kerak bo’lgan joylarni ko’rsatadi.',
      },
    ],
    realWorld: [
      'Kunlik email va hujjat ishi',
      'Qaror uchun variantlarni solishtirish',
      'Yangi mavzuni tez o’rganish',
    ],
    practice: {
      title: 'Ikki model taqqoslash',
      task: 'Bitta murakkab savolni 2 ta chat vositasiga bering. Javoblarni 3 mezon bo’yicha baholang: aniqlik, foydalilik, struktura.',
      hint: 'Farqlar qayerda? Nima uchun?',
      sample: 'Natija jadvalini yozing va o’zingiz uchun xulosa chiqaring.',
    },
    keyTakeaways: [
      'Har bir chat vositasining o’z kuchi bor',
      'Muhim ishda ikki modelni solishtiring',
      'Chat vositalari — fikrlash uchun, hisob uchun emas',
    ],
  },

  {
    id: 't-03',
    courseId: c,
    order: 3,
    slug: 'ai-coding-tools',
    title: 'AI Coding vositalari',
    summary: 'Claude Code, Copilot, Cursor, Codex, Gemini Code Assist.',
    duration: 10,
    xp: 50,
    objectives: [
      'Coding vositalari turlarini ajratish',
      'Autocomplete va agent farqini bilish',
      'O’z workflow’ingizga mos vositani tanlash',
    ],
    why: 'Dasturchi uchun to’g’ri AI vositasi — kunlik unumdorlikni eng ko’p oshiradigan omil.',
    blocks: [
      {
        type: 'table',
        head: ['Vosita', 'Turi', 'Kuchli tomoni'],
        rows: [
          ['GitHub Copilot', 'IDE autocomplete', 'Yozayotganda tez taklif'],
          ['Cursor', 'AI-native IDE', 'Loyiha bo’ylab tahrir'],
          ['Claude Code', 'Terminal agent', 'Ko’p faylli vazifa, test, refactor'],
          ['Codex', 'Bulutli agent', 'Fon rejimida vazifa bajarish'],
          ['Gemini Code Assist', 'IDE + Google Cloud', 'GCP ekotizimi'],
        ],
      },
      { type: 'heading', body: 'Uch daraja' },
      {
        type: 'steps',
        items: [
          { title: '1. Autocomplete', body: 'Siz yozasiz, AI keyingi qatorni taklif qiladi. Eng past xavf, eng past foyda.' },
          { title: '2. Chat in IDE', body: 'Siz so’raysiz, AI kod bloki beradi. Siz joylashtirasiz.' },
          { title: '3. Agent', body: 'Siz vazifani aytasiz, AI fayllarni ochadi, o’zgartiradi, test qiladi. Eng katta foyda, eng ko’p nazorat talab qiladi.' },
        ],
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Agent bilan ishlash qoidalari',
        body: 'Git branch oching • Kichik vazifa bering • Har o’zgarishni review qiling • Testlarni o’zingiz ishga tushiring • Katta refactoringni bosqichlarga bo’ling',
      },
      {
        type: 'code',
        lang: 'text',
        body: '# Agent uchun yaxshi vazifa\n"src/utils/date.js dagi formatDate funksiyasini\nIntl.DateTimeFormat ga o’tkaz. Mavjud testlar o’tishi shart.\nAPI o’zgarmasin. Test qo’shma."\n\n# Yomon vazifa\n"Loyihani yaxshila."',
      },
    ],
    realWorld: [
      'Legacy kodni migratsiya qilish',
      'Test qamrovini oshirish',
      'Bug fix va refactoring',
    ],
    practice: {
      title: 'Agent vazifasi',
      task: 'Bitta kichik, aniq refactoring vazifasini yozing: fayl, funksiya, kutilgan natija va tekshirish usuli bilan.',
      hint: 'Vazifa 30 daqiqada qo’lda bajariladigan hajmda bo’lsin.',
      sample: 'Yuqoridagi «yaxshi vazifa» namunasiga qarang.',
    },
    keyTakeaways: [
      'Autocomplete → chat → agent: xavf va foyda birga o’sadi',
      'Agentga kichik va aniq vazifa bering',
      'Har doim git va test bilan himoyalaning',
    ],
  },

  {
    id: 't-04',
    courseId: c,
    order: 4,
    slug: 'ai-image',
    title: 'AI Image vositalari',
    summary: 'ChatGPT Image, Midjourney, Firefly, Ideogram — va rasm prompti.',
    duration: 9,
    xp: 50,
    objectives: [
      'Rasm generatsiya vositalarini ajratish',
      'Rasm prompti tuzilishini o’rganish',
      'Litsenziya masalasini tushunish',
    ],
    why: 'Vizual kontent har bir loyihada kerak. AI bilan uni soatlar emas, daqiqalarda olasiz.',
    blocks: [
      {
        type: 'table',
        head: ['Vosita', 'Kuchli tomoni'],
        rows: [
          ['ChatGPT Image', 'Suhbat ichida tahrir, matnli rasm'],
          ['Midjourney', 'Badiiy sifat, uslub boyligi'],
          ['Adobe Firefly', 'Tijoriy litsenziya, Adobe integratsiyasi'],
          ['Ideogram', 'Rasm ichidagi matn (tipografika)'],
        ],
      },
      { type: 'heading', body: 'Rasm prompti anatomiyasi' },
      {
        type: 'code',
        lang: 'text',
        body: '[Sub’yekt] + [Harakat/holat] + [Muhit] + [Yorug’lik] +\n[Uslub] + [Kompozitsiya] + [Texnik parametrlar]\n\nMisol:\n"Yosh dasturchi ayol noutbukda ishlayapti, zamonaviy\nkoworking ofis, tabiiy yon yorug’lik, kinematik foto uslubi,\no’rta plan, sayoz chuqurlik, 16:9"',
      },
      {
        type: 'list',
        items: [
          'Aniq bo’ling: «chiroyli» emas, «issiq rangli, minimal, ko’p bo’sh joy»',
          'Kerak bo’lmagan narsani ayting (negative prompt qo’llab-quvvatlansa)',
          'Nisbatni ko’rsating: 16:9, 1:1, 9:16',
          'Uslubni nomlang: flat illustration, 3D render, watercolor, photo',
          'Iteratsiya qiling — birinchi natija kamdan-kam ideal',
        ],
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Litsenziya va etika',
        body: 'Tijoriy foydalanishdan oldin vositaning shartlarini o’qing. Mavjud rassomning uslubini nomma-nom taqlid qilish — etik va huquqiy jihatdan xavfli.',
      },
    ],
    realWorld: [
      'Blog uchun illyustratsiya',
      'Mahsulot moklari',
      'Taqdimot vizuallari',
    ],
    practice: {
      title: 'Bitta rasm, uch uslub',
      task: 'Bitta g’oyani 3 xil uslubda generatsiya qiling: foto, flat illustration, 3D. Qaysi biri vazifangizga mos?',
      hint: 'Faqat uslub qismini o’zgartiring.',
      sample: 'Prompt asosini saqlab, uslub qatorini almashtiring.',
    },
    keyTakeaways: [
      'Rasm prompti ham struktura talab qiladi',
      'Uslub va yorug’lik — eng ta’sirli parametrlar',
      'Tijoriy foydalanishda litsenziyani tekshiring',
    ],
  },

  {
    id: 't-05',
    courseId: c,
    order: 5,
    slug: 'ai-video',
    title: 'AI Video vositalari',
    summary: 'Runway, Kling, Pika, Veo — imkoniyat va real cheklovlar.',
    duration: 8,
    xp: 50,
    objectives: [
      'Video generatsiya imkoniyatlarini baholash',
      'Realistik kutish shakllantirish',
      'Video promptini yozish',
    ],
    why: 'Video eng qimmat kontent turi. AI uni arzonlashtiradi — lekin chegaralarni bilish shart.',
    blocks: [
      {
        type: 'table',
        head: ['Vosita', 'Kuchli tomoni'],
        rows: [
          ['Runway', 'Professional tahrir vositalari, keng imkoniyat'],
          ['Kling', 'Realistik harakat va fizika'],
          ['Pika', 'Tez va sodda, ijtimoiy tarmoq uchun'],
          ['Veo', 'Google ekotizimi, yuqori sifat'],
        ],
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Real cheklovlar',
        body: 'Klip uzunligi odatda qisqa • Personaj barqarorligi qiyin • Qo’l va matn muammoli • Aniq tahrir cheklangan • Har generatsiya vaqt va pul',
      },
      { type: 'heading', body: 'Video prompti' },
      {
        type: 'code',
        lang: 'text',
        body: '[Sahna] + [Kamera harakati] + [Sub’yekt harakati] +\n[Yorug’lik/kayfiyat] + [Uslub]\n\nMisol:\n"Dengiz sohilida quyosh botishi, kamera sekin o’ngga\npanoramada suriladi, to’lqinlar qirg’oqqa urilmoqda,\noltin soatlik iliq yorug’lik, kinematik uslub"',
      },
      {
        type: 'list',
        items: [
          'Bitta klipda bitta harakat so’rang',
          'Kamera harakatini alohida ayting',
          'Uzun videoni qisqa klip lardan yig’ing',
          'Ovozni alohida vosita bilan qo’shing',
        ],
      },
    ],
    realWorld: [
      'Ijtimoiy tarmoq uchun qisqa klip',
      'Mahsulot demo fon videosi',
      'Storyboard vizualizatsiyasi',
    ],
    practice: {
      title: 'Uch klipli ketma-ketlik',
      task: '15 soniyalik rolik uchun 3 ta klip promptini yozing va ularni mantiqan bog’lang.',
      hint: 'Har bir klip 5 soniya, bitta harakat.',
      sample: 'Klip 1: umumiy plan. Klip 2: yaqin plan. Klip 3: yakuniy kadr.',
    },
    keyTakeaways: [
      'Video AI hali chegaralangan',
      'Bitta klip — bitta harakat',
      'Uzun videoni klip lardan yig’ing',
    ],
  },

  {
    id: 't-06',
    courseId: c,
    order: 6,
    slug: 'ai-audio',
    title: 'AI Audio vositalari',
    summary: 'ElevenLabs, Suno va ovoz bilan ishlash.',
    duration: 7,
    xp: 50,
    objectives: [
      'Ovoz sintezi imkoniyatlarini bilish',
      'Musiqa generatsiyasini tushunish',
      'Etik chegaralarni aniqlash',
    ],
    why: 'Podcast, video ovozi va o’quv materiali uchun ovoz — katta xarajat moddasi.',
    blocks: [
      {
        type: 'table',
        head: ['Vosita', 'Vazifa'],
        rows: [
          ['ElevenLabs', 'Matndan tabiiy ovoz, ko’p til, ovoz klonlash'],
          ['Suno', 'Matndan musiqa va qo’shiq'],
          ['Whisper turidagi modellar', 'Ovozni matnga aylantirish (transkripsiya)'],
        ],
      },
      { type: 'heading', body: 'Amaliy qo’llanish' },
      {
        type: 'list',
        items: [
          'Video uchun voiceover',
          'Maqolani audio versiyaga aylantirish',
          'Ko’p tilli kontentni ovozlashtirish',
          'Uchrashuv yozuvidan transkripsiya va xulosa',
          'Ilova/o’yin uchun fon musiqasi',
        ],
      },
      {
        type: 'callout',
        tone: 'danger',
        title: 'Ovoz klonlash — qat’iy chegara',
        body: 'Boshqa odamning ovozini yozma ruxsatisiz klonlash ko’p mamlakatlarda huquqbuzarlik. Faqat o’z ovozingiz yoki aniq ruxsat bilan ishlating.',
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Sifat maslahati',
        body: 'Ovoz sifatini oshirish uchun matnni tinish belgilari bilan to’g’ri yozing: vergul va nuqta pauzalarni belgilaydi. Qisqa jumlalar tabiiyroq eshitiladi.',
      },
    ],
    realWorld: [
      'YouTube video voiceover',
      'Kurs materiali audio versiyasi',
      'Uchrashuv transkripsiyasi',
    ],
    practice: {
      title: 'Skript va ovoz',
      task: '60 soniyalik voiceover skripti yozing (tinish belgilari bilan) va uni ovozlashtiring.',
      hint: 'Jumlalar 15 so’zdan qisqa bo’lsin.',
      sample: 'Skriptni ovqat qilib o’qing — tabiiy eshitiladimi?',
    },
    keyTakeaways: [
      'Ovoz AI — katta xarajat tejami',
      'Tinish belgilari sifatni belgilaydi',
      'Klonlash faqat ruxsat bilan',
    ],
  },

  {
    id: 't-07',
    courseId: c,
    order: 7,
    slug: 'ai-research',
    title: 'AI Research vositalari',
    summary: 'Perplexity, Deep Research, NotebookLM — manbali ish.',
    duration: 9,
    xp: 50,
    objectives: [
      'Research vositalarining farqini bilish',
      'Manbali javob nima uchun muhimligini tushunish',
      'O’z hujjatlaringiz ustida ishlashni o’rganish',
    ],
    why: 'Oddiy chat hallucination beradi. Research vositalari manba ko’rsatadi — bu tekshirishni imkonli qiladi.',
    blocks: [
      {
        type: 'table',
        head: ['Vosita', 'Nima qiladi', 'Qachon'],
        rows: [
          ['Perplexity', 'Qidiruv + manbali javob', 'Dolzarb savol, tez tekshiruv'],
          ['Deep Research rejimlari', 'Ko’p bosqichli chuqur tadqiqot', 'Katta hisobot, bozor tahlili'],
          ['NotebookLM', 'Faqat SIZ yuklagan manbalar ustida ish', 'O’quv material, ichki hujjatlar'],
          ['ChatGPT Search', 'Chat ichida web qidiruv', 'Suhbat davomida tekshirish'],
        ],
      },
      {
        type: 'callout',
        tone: 'success',
        title: 'NotebookLM — alohida qiymat',
        body: 'U faqat siz bergan hujjatlardan javob beradi va har javobga havola qo’yadi. Bu hallucination xavfini keskin kamaytiradi — o’quv va ichki hujjatlar uchun ideal.',
      },
      { type: 'heading', body: 'Tadqiqot workflow’i' },
      {
        type: 'steps',
        items: [
          { title: '1. Savolni aniqlang', body: 'Keng savol — keng javob. «Bozor qanday?» emas, «2024–2025 da X segmentda o’sish qanday?»' },
          { title: '2. Manbali qidiruv', body: 'Perplexity yoki Deep Research bilan asosiy manbalarni toping.' },
          { title: '3. Manbalarni tekshiring', body: 'Havolalarni oching. Manba ishonchlimi? Sana dolzarbmi?' },
          { title: '4. Chuqur tahlil', body: 'Manbalarni Claude/NotebookLM ga yuklab, sintez so’rang.' },
          { title: '5. Yozing', body: 'Xulosani o’zingiz yozing, AI faqat material tayyorlaydi.' },
        ],
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Manba ko’rsatilgani = to’g’ri degani emas',
        body: 'Model havolani noto’g’ri talqin qilishi mumkin. Muhim da’vo bo’lsa — havolani oching va o’zingiz o’qing.',
      },
    ],
    realWorld: [
      'Bozor tadqiqoti',
      'Akademik adabiyot sharhi',
      'Ichki hujjatlar bo’yicha savol-javob',
    ],
    practice: {
      title: 'Manbali tadqiqot',
      task: 'Bir savol bo’yicha research vositasidan javob oling, 3 ta manbani oching va da’volarni tekshiring.',
      hint: 'Nechta da’vo manbada aynan tasdiqlandi?',
      sample: 'Natijani yozing — bu sizning ishonch darajangizni belgilaydi.',
    },
    keyTakeaways: [
      'Research vositalari manba beradi',
      'NotebookLM — o’z hujjatlaringiz uchun',
      'Manbani baribir o’zingiz oching',
    ],
  },

  {
    id: 't-08',
    courseId: c,
    order: 8,
    slug: 'workflow-birlashtirish',
    title: 'Vositalarni bitta workflow’ga birlashtirish',
    summary: 'Bitta vosita emas, tizim quring.',
    duration: 9,
    xp: 50,
    objectives: [
      'Ko’p vositali workflow loyihalash',
      'Har bosqichda to’g’ri vositani qo’yish',
      'Workflow ni hujjatlashtirish',
    ],
    why: 'Alohida vositalar — alohida foyda. Bog’langan workflow — ko’paytirilgan foyda.',
    blocks: [
      { type: 'heading', body: 'Namuna: blog posti workflow’i' },
      {
        type: 'steps',
        items: [
          { title: '1. Tadqiqot', body: 'Perplexity — mavzu bo’yicha manbali ma’lumot' },
          { title: '2. Struktura', body: 'Claude — manbalar asosida reja va sarlavhalar' },
          { title: '3. Qoralama', body: 'Claude/ChatGPT — bo’limlar bo’yicha yozish' },
          { title: '4. Tahrir', body: 'Siz — fakt tekshiruvi va shaxsiy tajriba qo’shish' },
          { title: '5. Vizual', body: 'ChatGPT Image / Midjourney — illyustratsiya' },
          { title: '6. Tarqatish', body: 'Claude — post uchun 5 ta ijtimoiy tarmoq varianti' },
        ],
      },
      { type: 'heading', body: 'Namuna: dasturchi workflow’i' },
      {
        type: 'list',
        items: [
          'Reja: Claude bilan arxitektura va bosqichlar',
          'Kod: Claude Code / Cursor bilan implementatsiya',
          'Review: alohida suhbatda tanqidiy review',
          'Test: agent testlarni yozadi, siz ishga tushirasiz',
          'Hujjat: kod asosida README va CHANGELOG',
        ],
      },
      {
        type: 'callout',
        tone: 'success',
        title: 'Workflow ni hujjatlashtiring',
        body: 'Har bosqich uchun: qaysi vosita, qaysi prompt shabloni, qanday tekshiruv. Bu hujjat — jamoangiz uchun eng qimmatli aktiv.',
      },
    ],
    realWorld: [
      'Kontent ishlab chiqarish liniyasi',
      'Dasturiy ta’minot ishlab chiqish sikli',
      'Tadqiqot va hisobot tayyorlash',
    ],
    practice: {
      title: 'O’z workflow’ingiz',
      task: 'Takrorlanadigan jarayoningizni 5–6 bosqichga bo’ling va har bosqichga vosita + prompt shabloni biriktiring.',
      hint: 'Bosqichlar orasidagi «uzatish» formatini ham belgilang.',
      sample: 'Workflow ni hujjat qilib saqlang va bir hafta sinang.',
    },
    keyTakeaways: [
      'Workflow > alohida vosita',
      'Har bosqichga mos vosita',
      'Hujjatlashtirilgan workflow — jamoa aktivi',
    ],
  },

  {
    id: 't-09',
    courseId: c,
    order: 9,
    slug: 'productivity-ai',
    title: 'Ish joyidagi AI: Notion, Copilot, Workspace',
    summary: 'AI endi alohida sahifa emas — ish qurollaringizning ichida.',
    duration: 8,
    xp: 50,
    objectives: [
      'Notion AI, Microsoft Copilot va Google Workspace’dagi AI’ni ajrata olish',
      'Har birining kuchli tomonini o’z ishingizga moslashtirish',
      'Mavjud litsenziyangizdagi AI’ni faollashtirish',
    ],
    why: 'Ko’pchilik yangi AI ilova qidiradi, lekin allaqachon to’lagan Office yoki Workspace obunasida AI kutib turibdi.',
    blocks: [
      { type: 'heading', body: 'Uchta katta ekotizim' },
      {
        type: 'table',
        head: ['Vosita', 'Qayerda ishlaydi', 'Eng kuchli tomoni'],
        rows: [
          ['Microsoft Copilot', 'Word, Excel, Outlook, Teams', 'Uzun hujjat va jadval ustida ishlash'],
          ['Google Workspace (Gemini)', 'Docs, Sheets, Gmail, Meet', 'Email va uchrashuv xulosalari'],
          ['Notion AI', 'Notion sahifalari va bazalari', 'Eslatma va bazani tuzish/qidirish'],
        ],
      },
      {
        type: 'text',
        body: 'Bu uchalasining afzalligi bir xil: ma’lumot allaqachon o’sha joyda. Faylni ko’chirib, boshqa oynaga joylashtirish shart emas — kontekst allaqachon mavjud.',
      },
      { type: 'heading', body: 'Real vazifalar' },
      {
        type: 'list',
        items: [
          'Excel/Sheets: formulani tabiiy tilda tasvirlab, AI’ga yozdirish',
          'Word/Docs: qoralamani belgilab, «rasmiyroq qil» yoki «qisqart» deyish',
          'Outlook/Gmail: uzun email zanjiridan vazifalar ro’yxatini chiqarish',
          'Teams/Meet: uchrashuv davomida avtomatik protokol va harakat nuqtalari',
          'Notion: loyiha bazasidan haftalik hisobotni bir tugma bilan yig’ish',
        ],
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Litsenziya farqi',
        body: 'Ko’p hollarda AI funksiyasi alohida qo’shimcha to’lov (add-on) talab qiladi — asosiy obuna avtomatik yoqmaydi. Sozlamalarni tekshiring.',
      },
      {
        type: 'compare',
        bad: {
          title: 'Noto’g’ri yondashuv',
          body: 'Har vazifa uchun yangi AI ilova qidirish, ma’lumotni u yoqdan-bu yoqqa ko’chirish.',
        },
        good: {
          title: 'To’g’ri yondashuv',
          body: 'Avval joriy ish qurolingizdagi AI’ni tekshirish — ko’pincha kontekst bilan birga tayyor turadi.',
        },
      },
    ],
    realWorld: [
      'Buxgalter Excel’da AI bilan formula yozdiradi',
      'Menejer Gmail’da AI bilan uzun zanjirni xulosalaydi',
      'Jamoa Notion bazasini AI bilan haftalik hisobotga aylantiradi',
    ],
    practice: {
      title: 'Ish qurolingizni tekshiring',
      task: 'Kundalik ishlatadigan Office/Workspace/Notion sozlamalarida AI funksiyasi qayerda joylashganini toping va bitta real vazifada sinab ko’ring.',
      hint: 'Sozlamalar yoki lentadagi «AI» yoki «Copilot» belgisini qidiring.',
      sample: 'Outlook’da uzun email zanjirini belgilab, «Summarize» tugmasini bosdim — 40 xabar 5 qatorga tushdi.',
    },
    keyTakeaways: [
      'AI ko’pincha allaqachon to’lagan vositangizda bor',
      'Kontekst joyida bo’lgani uchun natija aniqroq',
      'AI funksiyasi ba’zan alohida faollashtirish talab qiladi',
    ],
  },

  {
    id: 't-10',
    courseId: c,
    order: 10,
    slug: 'no-code-avtomatlashtirish',
    title: 'No-code avtomatlashtirish: Zapier, Make, n8n',
    summary: 'Kod yozmasdan, AI’ni takrorlanuvchi vazifalarga ulash.',
    duration: 9,
    xp: 50,
    objectives: [
      'Trigger → harakat mantig’ini tushunish',
      'AI qadamini avtomatlashtirish zanjiriga qo’shish',
      'Qachon no-code, qachon kod kerakligini ajratish',
    ],
    why: 'Bitta promptni qo’lda ishga tushirish — vaqt tejaydi. Uni avtomatlashtirish — vaqtni butunlay qaytarib beradi.',
    blocks: [
      { type: 'heading', body: 'Asosiy mantiq: trigger → harakat' },
      {
        type: 'text',
        body: 'Zapier, Make va n8n — bir xizmatdagi hodisani (trigger) boshqa xizmatdagi harakatga ulaydigan ko’prik vositalar. AI qadami esa endi ko’pchilik zanjirning o’rtasida — matnni tahlil qiladi, tasniflaydi yoki yozadi.',
      },
      {
        type: 'steps',
        items: [
          { title: 'Trigger', body: 'Nimadir sodir bo’ladi: yangi email keladi, forma to’ldiriladi, fayl yuklanadi.' },
          { title: 'AI qadami', body: 'Matn AI’ga uzatiladi: tasniflash, xulosalash, javob loyihasi yozish.' },
          { title: 'Harakat', body: 'Natija boshqa xizmatga yoziladi: jadvalga qator, Slack xabari, CRM yozuvi.' },
        ],
      },
      {
        type: 'table',
        head: ['Vosita', 'Kimga mos', 'Xarakteri'],
        rows: [
          ['Zapier', 'Boshlang’ich, tez sozlash', 'Eng ko’p integratsiya, oddiy interfeys'],
          ['Make (Integromat)', 'Vizual, murakkab shoxlanish', 'Grafik sxema, kuchliroq mantiq'],
          ['n8n', 'Texnik jamoa, o’z serverida', 'Ochiq kodli, chegara yo’q, sozlash qiyinroq'],
        ],
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Misol zanjir',
        body: 'Yangi forma javobi → AI javobni kategoriyaga ajratadi (shikoyat/savol/taklif) → mos jamoa a’zosiga Slack’da xabar → Google Sheets’ga yoziladi.',
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Nazoratsiz zanjirdan ehtiyot bo’ling',
        body: 'AI qadami xato tasniflasa, xato butun zanjir bo’ylab tarqaladi. Kritik qarorlarda (masalan, mijozga avtomatik javob yuborish) inson tasdig’ini qo’shing.',
      },
      { type: 'heading', body: 'Qachon no-code yetarli emas' },
      {
        type: 'list',
        items: [
          'Zanjir juda murakkablashib, har oy narxi keskin oshsa',
          'Maxsus xavfsizlik yoki maxfiylik talabi bo’lsa',
          'Yuqori tezlik yoki katta hajmda ishlash kerak bo’lsa',
        ],
      },
    ],
    realWorld: [
      'Support so’rovlarini avtomatik tasniflash va yo’naltirish',
      'Ijtimoiy tarmoq izohlarini kuzatib, salbiylarini darhol Slack’ga yuborish',
      'Yangi mijoz formasidan CRM yozuvi va xush kelibsiz emailini avtomatik yaratish',
    ],
    practice: {
      title: 'Bitta zanjirni loyihalang',
      task: 'O’zingizning takrorlanuvchi vazifangiz uchun trigger → AI qadami → harakat zanjirini chizib chiqing (kod yozmasdan, faqat reja).',
      hint: 'Trigger va harakat — mavjud xizmatlar bo’lishi kerak (email, forma, jadval, messenjer).',
      sample: 'Trigger: yangi email support@ ga keladi. AI: shoshilinch/oddiy deb tasniflaydi. Harakat: shoshilinch bo’lsa — Telegram xabari, oddiy bo’lsa — jadvalga yoziladi.',
    },
    keyTakeaways: [
      'Trigger → AI qadami → harakat — asosiy naqsh',
      'Zapier tez, Make kuchli, n8n moslashuvchan',
      'Kritik qarorlarda inson tasdig’ini saqlang',
    ],
  },

  {
    id: 't-11',
    courseId: c,
    order: 11,
    slug: 'brauzer-agentlar',
    title: 'Brauzer va computer-use agentlar',
    summary: 'AI endi faqat javob bermaydi — sichqoncha va klaviaturani o’zi boshqaradi.',
    duration: 8,
    xp: 50,
    objectives: [
      'Brauzer agenti nima ekanini va qanday ishlashini tushunish',
      'Bunday agentlarning real foydasi va xavfini baholash',
      'Ularni qachon, qanday nazorat bilan ishlatishni bilish',
    ],
    why: 'Bu — eng tez rivojlanayotgan va eng ko’p noto’g’ri tushuniladigan kategoriya. Imkoniyat katta, lekin nazoratsiz ishlatish xavfli.',
    blocks: [
      { type: 'heading', body: 'Bu nima o’zi' },
      {
        type: 'text',
        body: 'Brauzer/computer-use agent — ekranni «ko’radigan» va sichqoncha, klaviatura orqali harakat qiladigan AI. Siz vazifani tasvirlaysiz («shu saytdan narxlarni yig’», «shu formani to’ldir»), agent esa qadamlarni o’zi bajaradi.',
      },
      {
        type: 'table',
        head: ['Turi', 'Misol', 'Nima qiladi'],
        rows: [
          ['Research agent', 'Perplexity Comet, ChatGPT Atlas', 'Bir nechta saytni ochib, ma’lumot yig’adi'],
          ['Computer-use', 'Claude computer use, Operator', 'Ilovalarni ochadi, forma to’ldiradi, fayl bilan ishlaydi'],
          ['Task agent', 'Manus va shunga o’xshash', 'Ko’p bosqichli vazifani mustaqil bajaradi'],
        ],
      },
      {
        type: 'callout',
        tone: 'danger',
        title: 'Eng katta xavf',
        body: 'Agent ekrandagi matnni ko’rsatma deb qabul qilishi mumkin (prompt injection). Ishonchsiz sahifada agentni to’lov, parol yoki shaxsiy ma’lumot bilan ishlatmang.',
      },
      { type: 'heading', body: 'Xavfsiz ishlatish qoidalari' },
      {
        type: 'list',
        items: [
          'Faqat kuzatib turadigan (o’qish) vazifalar bilan boshlang',
          'To’lov, o’chirish yoki yuborish kabi qaytarib bo’lmas harakatlarni qo’lda tasdiqlang',
          'Agentga alohida, cheklangan huquqli akkaunt bering — asosiy akkauntingiz emas',
          'Har qadamni ko’rsatadigan (transparent) rejimni yoqing',
        ],
      },
      {
        type: 'compare',
        bad: {
          title: 'Xavfli foydalanish',
          body: 'Agentga bank kartasi va parollarni berib, «xarid qil» deb qo’yib yuborish.',
        },
        good: {
          title: 'Xavfsiz foydalanish',
          body: 'Agentga faqat qidirish va taqqoslashni topshirish, yakuniy xaridni o’zingiz bosish.',
        },
      },
    ],
    realWorld: [
      'Bir nechta saytdan narxlarni taqqoslab, jadval qilib berish',
      'Ko’p bosqichli forma (viza, ariza) ma’lumotlarini oldindan to’ldirish',
      'Takrorlanuvchi ma’muriy ishni (kunlik hisobot yuklash) avtomatlashtirish',
    ],
    practice: {
      title: 'Xavf-foyda tahlili',
      task: 'O’zingiz bajarishi mumkin bo’lgan bitta vazifani tanlang va uni agentga topshirishning foydasi va xavfini yozing — qaysi qadamda inson nazorati shart?',
      hint: 'Pul, parol yoki shaxsiy ma’lumot ishtirok etadigan qadamni alohida belgilang.',
      sample: 'Vazifa: 5 ta saytdan noutbuk narxini solishtirish. Foyda: 20 daqiqa tejaladi. Xavf yo’q — faqat o’qish. Xarid bosqichida esa o’zim tasdiqlayman.',
    },
    keyTakeaways: [
      'Agent ekranni ko’radi va harakat qiladi, faqat javob bermaydi',
      'Eng katta xavf — ishonchsiz kontentdan ko’rsatma qabul qilish',
      'Pul va parol talab qiladigan qadamlarni doim qo’lda tasdiqlang',
    ],
  },

  {
    id: 't-12',
    courseId: c,
    order: 12,
    slug: 'talim-ai',
    title: 'Ta’lim uchun AI vositalari',
    summary: 'AI repetitor — 24 soat mavjud, hech qachon charchamaydi, lekin nazoratsiz qoldirilmasligi kerak.',
    duration: 7,
    xp: 50,
    objectives: [
      'Ta’lim uchun ixtisoslashgan AI vositalarini bilish',
      'AI’ni o’rganishga yordam sifatida, aldov sifatida emas ishlatish',
      'O’qituvchi va o’quvchi nuqtai nazaridan foydalarini ajratish',
    ],
    why: 'Ta’lim — AI eng ko’p bahs tug’diradigan soha. To’g’ri ishlatilsa — kuchli shaxsiy repetitor, noto’g’ri ishlatilsa — o’rganishning o’zini yo’qqa chiqaradi.',
    blocks: [
      { type: 'heading', body: 'Kategoriyalar' },
      {
        type: 'table',
        head: ['Vosita turi', 'Misol', 'Vazifasi'],
        rows: [
          ['Sokrat uslubidagi repetitor', 'Khanmigo', 'Javobni bermaydi, savol berib fikrlashga undaydi'],
          ['Til o’rganish', 'Duolingo Max', 'Suhbat mashqi va shaxsiy tushuntirish'],
          ['Konspekt/eslatma', 'Notion AI, Quizlet', 'Matndan flashcard va test yaratish'],
          ['Umumiy chat', 'ChatGPT, Claude, Gemini', 'Tushuntirish, misol, mashq yaratish'],
        ],
      },
      {
        type: 'callout',
        tone: 'success',
        title: 'Sokrat metodi — eng samarali usul',
        body: 'Javobni so’rash o’rniga: «Menga bu masalani hal qilishga yordam ber, lekin javobni aytma — savol berib bosqichma-bosqich olib bor» deb so’rang.',
      },
      {
        type: 'compare',
        bad: {
          title: 'Aldov sifatida',
          body: 'Uy vazifasini AI’ga yozdirib, o’zgarishsiz topshirish.',
        },
        good: {
          title: 'O’rganish sifatida',
          body: 'Avval o’zi yechishga urinish, keyin AI’dan tushunmagan qismini qayta tushuntirishni so’rash.',
        },
      },
      { type: 'heading', body: 'O’qituvchilar uchun' },
      {
        type: 'list',
        items: [
          'Turli darajadagi o’quvchilar uchun bir mavzuda 3 xil qiyinlikda mashq yaratish',
          'Insho yoki javoblarni birlamchi tekshirish (yakuniy bahoni inson beradi)',
          'Dars rejasi va taqdimot uchun qoralama tayyorlash',
        ],
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'AI aniqlash vositalariga ishonmang',
        body: '«AI yozganmi» deb aniqlaydigan vositalar ko’pincha xato beradi. Baholash mezonini natijaga emas, jarayonga (qoralama, versiya tarixi, og’zaki himoya) qurgan ma’qul.',
      },
    ],
    realWorld: [
      'O’quvchi matematika masalasini Sokrat uslubida yechadi',
      'O’qituvchi bir mavzuda 3 ta darajali mashq yaratadi',
      'Til o’rganuvchi AI bilan kundalik suhbat mashq qiladi',
    ],
    practice: {
      title: 'Sokrat promptini yozing',
      task: 'O’zingiz yaxshi bilmagan mavzuda AI’dan javobni bermasdan, savollar bilan yo’naltirishni so’raydigan prompt yozing.',
      hint: '«Javobni aytma, faqat keyingi savolni ber» kabi qat’iy cheklov qo’shing.',
      sample: 'Sen matematika repetitorisan. Menga integral masalasini yechishga yordam ber, lekin javobni hech qachon aytma — har safar faqat keyingi qadam uchun savol ber.',
    },
    keyTakeaways: [
      'Sokrat uslubi — javob emas, savol berish eng samarali',
      'AI aniqlash vositalariga to’liq ishonib bo’lmaydi',
      'Baholashni jarayonga (versiya, himoya) qurish ishonchliroq',
    ],
  },

  {
    id: 't-13',
    courseId: c,
    order: 13,
    slug: 'marketing-ai',
    title: 'Marketing uchun AI vositalari',
    summary: 'Kontent tezroq yaratiladi — lekin brend ohangi va faktlar hamon sizning nazoratingizda bo’lishi kerak.',
    duration: 7,
    xp: 50,
    objectives: [
      'Marketing uchun ixtisoslashgan AI vositalarini bilish',
      'Brend ohangini AI orqali barqaror saqlashni o’rganish',
      'Kontent hajmi va sifat o’rtasidagi muvozanatni tushunish',
    ],
    why: 'Marketingda tezlik ustuvor tuyuladi, lekin nazoratsiz ko’paytirilgan kontent brendni zaiflashtiradi.',
    blocks: [
      { type: 'heading', body: 'Vositalar xaritasi' },
      {
        type: 'table',
        head: ['Vazifa', 'Vosita misoli', 'Diqqat markazi'],
        rows: [
          ['Kontent yozish', 'Jasper, Copy.ai', 'Shablon va brend ovozi'],
          ['SEO tadqiqoti', 'Surfer SEO, Ahrefs AI', 'Kalit so’z va raqobat tahlili'],
          ['Ijtimoiy tarmoq rejasi', 'Buffer AI, Hootsuite', 'Kalendar va ko’p platformali moslashtirish'],
          ['Reklama matni', 'AdCreative.ai', 'A/B variant generatsiyasi'],
        ],
      },
      { type: 'heading', body: 'Brend ohangini saqlash' },
      {
        type: 'steps',
        items: [
          { title: 'Namuna to’plang', body: '5-10 ta eng yaxshi eski postingizni yig’ing.' },
          { title: 'Ohang hujjati yozing', body: 'Uslub, taqiqlangan so’zlar, CTA formatini bir sahifaga yozing.' },
          { title: 'Har promptga qo’shing', body: 'Ohang hujjatini few-shot namuna sifatida har safar bering.' },
          { title: 'Tekshirib chiqing', body: 'Yaratilgan kontentni ohang hujjati bilan solishtiring, farqni tuzating.' },
        ],
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Hajm sifatni yutib yubormasin',
        body: 'AI bilan kuniga 50 ta post yaratish oson, lekin barchasi bir xil «AI ohangida» chiqsa, auditoriya buni sezadi va ishonch pasayadi.',
      },
      {
        type: 'compare',
        bad: {
          title: 'Nazoratsiz ko’paytirish',
          body: 'Bitta promptdan 20 ta variant olib, tekshirmasdan barchasini joylashtirish.',
        },
        good: {
          title: 'Nazoratli ko’paytirish',
          body: 'AI’dan 5 ta variant olib, eng kuchli 1-2 tasini tanlab, shaxsiy ohang bilan tahrirlash.',
        },
      },
    ],
    realWorld: [
      'Bitta blog postidan 5 ta ijtimoiy tarmoq varianti yaratish',
      'Reklama matni uchun 10 ta sarlavha varianti va A/B test',
      'Haftalik kontent kalendarini AI yordamida rejalashtirish',
    ],
    practice: {
      title: 'Brend ohangi hujjati',
      task: 'O’z loyihangiz (yoki xayoliy brend) uchun 5 qatorli ohang hujjati yozing: uslub, taqiqlangan so’zlar, CTA formati, auditoriya, misol jumla.',
      hint: 'Eski postlaringiz bo’lsa, ulardan uslubni ajratib oling.',
      sample: 'Ohang: do’stona, qisqa jumlalar. Taqiqlangan: «inqilob», «revolyutsiya». CTA: har doim savol bilan tugaydi. Auditoriya: 20-35 yosh.',
    },
    keyTakeaways: [
      'Ohang hujjati — AI bilan barqaror brend ovozining kaliti',
      'Hajm ko’paytirish oson, lekin sifat nazorati siz zimmangizda',
      'Ko’p variant oling, eng kuchlisini tanlab tahrirlang',
    ],
  },

  {
    id: 't-14',
    courseId: c,
    order: 14,
    slug: 'narx-budjet',
    title: 'Narx va budjet: qachon pullik versiyaga o’tish kerak',
    summary: 'Bepul reja qachonga yetadi, pullik reja qachon o’zini oqlaydi — hisob-kitob bilan qaror qiling.',
    duration: 6,
    xp: 50,
    objectives: [
      'Free, freemium va pullik modellarning farqini bilish',
      'Pullik versiyaga o’tish uchun ROI hisoblashni o’rganish',
      'Bir nechta vositaga to’lash o’rniga tejash strategiyasini tuzish',
    ],
    why: 'Ko’pchilik yo hech narsaga to’lamaydi (imkoniyatni yo’qotadi), yo hammasiga to’laydi (pul isrof qiladi). Ikkalasi ham strategik xato.',
    blocks: [
      { type: 'heading', body: 'Uchta model' },
      {
        type: 'table',
        head: ['Model', 'Ma’nosi', 'Xavfi'],
        rows: [
          ['Free', 'To’liq bepul, cheklangan funksiya', 'Ma’lumotingiz o’qitish uchun ishlatilishi mumkin'],
          ['Freemium', 'Asosiy bepul, kengaytirilgan pullik', 'Eng keng tarqalgan AI modeli'],
          ['Faqat pullik', 'To’liq funksiya uchun obuna', 'Ko’p vosita — ko’p oylik xarajat'],
        ],
      },
      { type: 'heading', body: 'Pullik versiyaga o’tish hisobi' },
      {
        type: 'code',
        lang: 'text',
        body: 'Oylik tejalgan vaqt (soat) × soatlik qiymatingiz\nvs\nOylik obuna narxi\n\nAgar tejalgan qiymat narxdan 3x yuqori bo’lsa — o’tish mantiqiy.',
      },
      {
        type: 'callout',
        tone: 'success',
        title: 'Misol hisob',
        body: 'Pullik reja oyiga 10 soat tejaydi. Soatingiz 50 000 so’m tursa — 500 000 so’m qiymat. Obuna 150 000 so’m bo’lsa, bu aniq foydali investitsiya.',
      },
      { type: 'heading', body: 'Tejash strategiyalari' },
      {
        type: 'list',
        items: [
          'Bitta universal vositaga (masalan Claude yoki ChatGPT Plus) to’lab, boshqalarini bepul rejada ishlatish',
          'Yillik obunani tanlash — odatda 15-20% arzon',
          'Talaba yoki jamoaviy chegirmalarni tekshirish',
          'Har 3-6 oyda ishlatilmayotgan obunalarni bekor qilish',
        ],
      },
      {
        type: 'compare',
        bad: {
          title: 'Rejasiz xarajat',
          body: '5 ta turli AI vositasiga obuna bo’lib, ko’pchiligini oyiga bir marta ochish.',
        },
        good: {
          title: 'Rejali xarajat',
          body: 'Eng ko’p ishlatiladigan 1-2 vositaga to’lab, qolganini bepul rejada sinash.',
        },
      },
    ],
    realWorld: [
      'Frilanser oyiga qaysi vositalar daromad keltirishini hisoblab chiqadi',
      'Kichik jamoa bitta jamoaviy obunaga o’tib, alohida-alohida to’lovlardan voz kechadi',
      'Talaba bepul reja doirasida universitet loyihalarini bajaradi',
    ],
    practice: {
      title: 'O’z AI budjetingizni hisoblang',
      task: 'Hozir foydalanayotgan (yoki foydalanmoqchi bo’lgan) AI vositalarini ro’yxatlang, har birining oylik narxini va taxminiy tejagan vaqtini yozing.',
      hint: 'Tejalgan vaqtni soatlik qiymatingizga ko’paytirib, narx bilan solishtiring.',
      sample: 'ChatGPT Plus — 20$/oy, oyiga 15 soat tejaydi → aniq foydali. Figma AI — 15$/oy, oyiga 1 marta ishlataman → bekor qilish kerak.',
    },
    keyTakeaways: [
      'Free, freemium va pullik — har birining o’z o’rni bor',
      'Qaror ROI hisobiga asoslanishi kerak, hissiyotga emas',
      'Yillik obuna va jamoaviy reja odatda tejamkor',
    ],
  },

  {
    id: 't-15',
    courseId: c,
    order: 15,
    slug: 'maxfiylik-xavfsizlik',
    title: 'Vositalarda maxfiylik va ma’lumot xavfsizligi',
    summary: 'Har bir «yopishtirish» — kimgadir ma’lumot yuborish demakdir. Qayerga yuborayotganingizni biling.',
    duration: 7,
    xp: 50,
    objectives: [
      'Consumer va enterprise AI rejalari orasidagi maxfiylik farqini bilish',
      'Qaysi ma’lumotni AI’ga yuborish mumkin, qaysini mumkin emasligini aniqlash',
      'Kompaniya siyosati bo’lmasa ham, shaxsiy xavfsizlik qoidalarini qo’llash',
    ],
    why: 'AI vositasi qulay bo’lgani uchun uni o’ylamasdan ishlatish — nazoratsiz ma’lumot sizib chiqishining eng keng tarqalgan sababi.',
    blocks: [
      { type: 'heading', body: 'Consumer vs Enterprise' },
      {
        type: 'table',
        head: ['', 'Consumer (bepul/shaxsiy)', 'Enterprise/Team'],
        rows: [
          ['Ma’lumot o’qitishga ketadimi?', 'Ko’pincha — ha (sozlamada o’chirish mumkin)', 'Odatda — yo’q, shartnomada kafolatlangan'],
          ['Ma’lumot saqlash muddati', 'Noaniq yoki uzoq', 'Aniq belgilangan, o’chirish mumkin'],
          ['Kim mas’ul', 'Foydalanuvchining o’zi', 'Kompaniya IT/xavfsizlik bo’limi'],
        ],
      },
      {
        type: 'callout',
        tone: 'danger',
        title: 'Oltin qoida',
        body: 'Agar ma’lumotni bexavotir email orqali yuborolmasangiz — uni bepul AI chatga ham yuklamang.',
      },
      { type: 'heading', body: 'AI’ga yuklamasligingiz kerak bo’lgan narsalar' },
      {
        type: 'list',
        items: [
          'Parollar, API kalitlar, tokenlar',
          'Mijozning shaxsiy ma’lumotlari (ism, telefon, manzil) — placeholder’siz',
          'Chiqmagan moliyaviy hisobotlar yoki shartnomalar',
          'Kompaniyaning ochiq bo’lmagan strategik rejalari',
        ],
      },
      {
        type: 'code',
        lang: 'text',
        body: 'Yomon: "Mijoz Aziz Karimov (+998901234567) shartnomasini tahlil qil..."\n\nYaxshi: "Mijoz [ISM] ([TELEFON]) shartnomasini tahlil qil..."',
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Sozlamalarni tekshiring',
        body: 'Ko’pchilik AI xizmati «Chat History & Training» sozlamasida ma’lumotni o’qitish uchun ishlatishni o’chirish imkonini beradi — buni faollashtiring.',
      },
    ],
    realWorld: [
      'Yurist shartnomani tahlil qildirishdan oldin ismlarni placeholder bilan almashtiradi',
      'Kompaniya jamoaviy AI rejasiga o’tib, ma’lumot siyosatini hujjatlashtiradi',
      'Dasturchi API kalitni kod bilan birga AI’ga yubormaslikni odat qiladi',
    ],
    practice: {
      title: 'Xavf tekshiruvi',
      task: 'Oxirgi haftada AI’ga yuklagan 3 ta ma’lumotingizni eslang va har birini «xavfsiz / placeholder kerak / umuman yuklamaslik kerak edi» toifasiga ajrating.',
      hint: 'Shaxs ismi, raqam yoki hali e’lon qilinmagan narsa bormi — shu savol bilan boshlang.',
      sample: 'Email zanjirini yukladim — mijoz raqami bor edi, placeholder bilan almashtirishim kerak edi.',
    },
    keyTakeaways: [
      'Consumer va enterprise rejalar maxfiylik bo’yicha jiddiy farq qiladi',
      'Parol, shaxsiy ma’lumot va chiqmagan hujjatlarni yuklamang',
      'Ma’lumotni o’qitishga ishlatish sozlamasini tekshiring va o’chiring',
    ],
  },

  {
    id: 't-16',
    courseId: c,
    order: 16,
    slug: 'stack-yakuni',
    title: 'Shaxsiy AI stack’ingizni yakunlash',
    summary: 'Endi 15 ta darsdan so’ng — vositalarni tasodifiy emas, ongli tanlaysiz.',
    duration: 8,
    xp: 50,
    objectives: [
      'O’rgangan barcha kategoriyalarni bitta shaxsiy stack’ga yig’ish',
      'Har vosita uchun aniq vazifa va budjet belgilash',
      'Stack’ni muntazam qayta ko’rib chiqish odatini shakllantirish',
    ],
    why: 'Vosita bilishning o’zi yetarli emas — ularni o’z ishingiz uchun tizimga aylantirish darajaga chiqaradi.',
    blocks: [
      { type: 'heading', body: 'Stack qurish shabloni' },
      {
        type: 'table',
        head: ['Kategoriya', 'Tanlangan vosita', 'Asosiy vazifa'],
        rows: [
          ['Umumiy chat', '?', 'Kundalik yozish, tahlil, savol-javob'],
          ['Coding (agar kerak bo’lsa)', '?', 'Kod yozish va debug'],
          ['Rasm/video/audio (agar kerak bo’lsa)', '?', 'Vizual va ovozli kontent'],
          ['Research', '?', 'Manbali tadqiqot'],
          ['Avtomatlashtirish', '?', 'Takrorlanuvchi vazifalar'],
        ],
      },
      {
        type: 'steps',
        items: [
          { title: '1. Vazifalaringizni sanang', body: 'Haftada takrorlanadigan 5-7 ta vazifani yozing.' },
          { title: '2. Kategoriyaga ajrating', body: 'Har vazifa qaysi kategoriyaga (chat, coding, vizual, research, avtomatlashtirish) tegishli?' },
          { title: '3. Bitta vositani tanlang', body: 'Har kategoriya uchun ko’p emas, bitta-ikkita asosiy vosita belgilang.' },
          { title: '4. Budjetni hisoblang', body: 'Level 3 dagi narx darsidan foydalanib, oylik xarajatni rejalashtiring.' },
          { title: '5. 3 oyda qayta ko’ring', body: 'Yangi vositalar tez chiqadi — stack’ni muntazam yangilab turing.' },
        ],
      },
      {
        type: 'callout',
        tone: 'success',
        title: 'Level 3 tugadi',
        body: 'Endi Level 4 — AI for Programmers yoki Level 5 — AI for Work ga o’ting. AI Tools Directory sahifasida barcha vositalar ma’lumotnomasi bor.',
      },
    ],
    realWorld: [
      'Frilanser 4 ta kategoriyada bittadan vosita bilan ishlaydi, qolganini sinab ko’rmaydi',
      'Jamoa har chorakda stack’ni qayta ko’rib, eskirgan obunalarni bekor qiladi',
      'Yangi loyihaga kirishda birinchi navbatda mavjud stack yetarli emasligini tekshiradi',
    ],
    practice: {
      title: 'Shaxsiy AI stack jadvali',
      task: 'Yuqoridagi jadval shaklida o’zingizning haqiqiy stack’ingizni to’ldiring: har kategoriya uchun tanlangan vosita va asosiy vazifa.',
      hint: 'Ishlatmaydigan kategoriyani bo’sh qoldiring — hammasi kerak emas.',
      sample: 'Umumiy chat: Claude — kod va uzun hujjat tahlili. Avtomatlashtirish: Zapier — email tasniflash.',
    },
    keyTakeaways: [
      'Stack — tasodifiy to’plam emas, vazifaga qurilgan tizim',
      'Har kategoriyada bitta-ikkita vositaga to’xtalish yetarli',
      'Stack’ni muntazam qayta ko’rib chiqish shart',
    ],
  },
]
