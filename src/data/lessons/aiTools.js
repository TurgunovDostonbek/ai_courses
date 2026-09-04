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
      {
        type: 'callout',
        tone: 'info',
        title: 'Level 3 tugadi',
        body: 'Endi Level 4 — AI for Programmers yoki Level 5 — AI for Work ga o’ting. AI Tools Directory sahifasida barcha vositalar ma’lumotnomasi bor.',
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
]
