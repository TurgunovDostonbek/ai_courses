/**
 * LEVEL 4 — AI for Programmers (18 dars)
 */

const c = 'ai-coding'

export const AI_CODING_LESSONS = [
  {
    id: 'd-01',
    courseId: c,
    order: 1,
    slug: 'ai-bilan-kod-yozish',
    title: 'AI bilan kod yozish',
    summary: 'Kontekst berish, spetsifikatsiya yozish va natijani nazorat qilish.',
    duration: 10,
    xp: 50,
    objectives: [
      'Kod so’rovi uchun kontekst to’plamini bilish',
      'Spetsifikatsiya yozishni o’rganish',
      'Generatsiya qilingan kodni qabul qilish mezonlarini belgilash',
    ],
    why: 'AI kod yozishda kuchli — lekin faqat siz vazifani aniq qo’ysangiz.',
    blocks: [
      { type: 'heading', body: 'Kod so’rovi uchun kontekst to’plami' },
      {
        type: 'list',
        items: [
          'Til va versiya: JavaScript (ES2022), React 19',
          'Muhit: brauzer / Node / React Native',
          'Mavjud stack: nima ishlatiladi, nima taqiqlangan',
          'Kod uslubi: nomlash, fayl tuzilishi, formatter',
          'Kirish/chiqish: aniq misol bilan',
          'Chegaraviy holatlar: bo’sh, null, xato',
        ],
      },
      {
        type: 'compare',
        bad: {
          title: 'Yomon so’rov',
          body: '«Sana formatlash funksiyasi yoz.»',
        },
        good: {
          title: 'Yaxshi so’rov',
          body: '«JavaScript (ES2022, brauzer) funksiya yoz:\nformatDate(iso, locale) → "12-mart, 2026"\n\n- Kutubxona ishlatma, Intl.DateTimeFormat dan foydalan\n- Noto’g’ri sana bo’lsa null qaytar\n- locale default: "uz-UZ"\n- JSDoc izoh qo’sh\n\nMisollar:\nformatDate("2026-03-12") → "12-mart, 2026"\nformatDate("xato") → null»',
        },
      },
      {
        type: 'callout',
        tone: 'success',
        title: 'Test-first yondashuv',
        body: 'Avval testlarni yozing (yoki AI ga yozdiring va tasdiqlang), keyin implementatsiyani so’rang. Bu «ishlaydi» degan da’voni tekshirilishi mumkin faktga aylantiradi.',
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Qabul qilish mezonlari',
        body: 'Kodni tushunmasangiz — merge qilmang. AI yozgan har bir qator sizning javobgarligingizda qoladi.',
      },
    ],
    realWorld: [
      'Utility funksiyalar',
      'Komponent skeleti',
      'Data transformatsiyasi',
    ],
    practice: {
      title: 'Spetsifikatsiya yozing',
      task: 'Real kerak bo’lgan funksiya uchun to’liq spetsifikatsiya yozing (kontekst + misollar + chegaraviy holatlar) va kod oling.',
      hint: 'Kamida 3 ta kirish/chiqish misoli bering.',
      sample: 'Yuqoridagi formatDate namunasiga qarang.',
    },
    keyTakeaways: [
      'Kontekst to’plami = kod sifati',
      'Misollar spetsifikatsiyaning yadrosi',
      'Tushunmagan kodni merge qilmang',
    ],
  },

  {
    id: 'd-02',
    courseId: c,
    order: 2,
    slug: 'ai-bilan-debugging',
    title: 'AI bilan debugging',
    summary: 'Xatoni tez topish uchun to’g’ri ma’lumot berish.',
    duration: 9,
    xp: 50,
    objectives: [
      'Debug so’rovi uchun minimal ma’lumot to’plamini bilish',
      'Gipoteza-asosida debug qilishni o’rganish',
      'Reproduksiyani soddalashtirish',
    ],
    why: 'Debugging — dasturchi vaqtining katta qismi. AI bu vaqtni sezilarli qisqartiradi.',
    blocks: [
      { type: 'heading', body: 'Debug so’rovi shabloni' },
      {
        type: 'code',
        lang: 'text',
        body: '# Kutilgan xatti-harakat\nForma yuborilganda foydalanuvchi /dashboard ga o’tishi kerak.\n\n# Haqiqiy xatti-harakat\nSahifa yangilanadi, URL o’zgarmaydi.\n\n# Xato xabari\nWarning: Cannot update a component while rendering...\n\n# Kod\n{{minimal reproduksiya}}\n\n# Muhit\nReact 19, React Router 7, Chrome 141\n\n# Nima sinadim\n- preventDefault qo’shdim — yordam bermadi\n- console.log qo’ydim — handler chaqirilyapti\n\n# So’rov\n3 ta eng ehtimolli sababni ayt, har biri uchun\nqanday tekshirishni yoz. Kod yozma.',
      },
      {
        type: 'callout',
        tone: 'success',
        title: '«Kod yozma, sabab ayt»',
        body: 'Bu ibora AI ni darrov tuzatishga urinishdan to’xtatadi va diagnostikaga majbur qiladi. Ko’p holatda sabab siz o’ylagandan boshqa joyda bo’ladi.',
      },
      { type: 'heading', body: 'Minimal reproduksiya' },
      {
        type: 'list',
        items: [
          'Butun faylni emas, muammoli 20–40 qatorni bering',
          'Aloqasi yo’q kodni olib tashlang',
          'Agar reproduksiya qila olmasangiz — muammo boshqa joyda',
          'Reproduksiyani soddalashtirishning o’zi ko’pincha sababni ochadi',
        ],
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Xato xabarini to’liq bering',
        body: 'Stack trace ning birinchi 5–10 qatori odatda yetarli. «Xato chiqdi» deb yozish — AI ni taxmin qilishga majbur qiladi.',
      },
    ],
    realWorld: [
      'Production bug tahlili',
      'Test failure sabablari',
      'Performance muammosi',
    ],
    practice: {
      title: 'Debug shabloni',
      task: 'Oxirgi bug’ingizni yuqoridagi shablon bo’yicha yozing va 3 ta gipoteza oling.',
      hint: 'Gipotezalarni ustuvorlik bo’yicha tekshiring.',
      sample: 'Shablonni saqlang — har safar ishlatasiz.',
    },
    keyTakeaways: [
      'Kutilgan vs haqiqiy — asosiy ma’lumot',
      'Minimal reproduksiya majburiy',
      '«Sabab ayt, kod yozma» — kuchli ibora',
    ],
  },

  {
    id: 'd-03',
    courseId: c,
    order: 3,
    slug: 'ai-bilan-refactoring',
    title: 'AI bilan refactoring',
    summary: 'Xavfsiz, bosqichma-bosqich va tekshiriladigan refactoring.',
    duration: 9,
    xp: 50,
    objectives: [
      'Refactoring maqsadini aniqlashtirish',
      'Bosqichma-bosqich ishlashni o’rganish',
      'Xatti-harakat o’zgarmasligini kafolatlash',
    ],
    why: 'Refactoring — AI eng foydali bo’ladigan sohalardan biri, lekin eng xavflisi ham.',
    blocks: [
      {
        type: 'callout',
        tone: 'danger',
        title: 'Oltin qoida',
        body: 'Refactoring — xatti-harakatni o’zgartirmasdan strukturani yaxshilash. Agar AI bir vaqtda funksionallikni ham «yaxshilasa» — bu refactoring emas, bu yangi bug.',
      },
      { type: 'heading', body: 'Xavfsiz jarayon' },
      {
        type: 'steps',
        items: [
          { title: '1. Testlar bormi?', body: 'Yo’q bo’lsa — avval testlarni yozing. Test yo’q refactoring — tavakkalchilik.' },
          { title: '2. Maqsadni ayting', body: '«Yaxshila» emas: «Bu 200 qatorli komponentni 3 ta kichik komponentga bo’l».' },
          { title: '3. Bitta o’zgarish', body: 'Har bir refactoring alohida commit.' },
          { title: '4. Testlarni ishga tushiring', body: 'Siz ishga tushiring — AI ning «testlar o’tdi» degan gapiga ishonmang.' },
          { title: '5. Diff ni o’qing', body: 'Har bir o’zgarishni ko’zdan kechiring.' },
        ],
      },
      {
        type: 'code',
        lang: 'text',
        body: 'Vazifa: UserProfile.jsx ni refactor qil.\n\nMaqsad:\n- Fetch logikasini useUserProfile hook’iga chiqar\n- Komponentda faqat render qolsin\n\nQat’iy qoidalar:\n- Public props o’zgarmasin\n- Xatti-harakat 1:1 saqlansin\n- Mavjud testlar o’zgarmasin va o’tsin\n- Yangi kutubxona qo’shma\n\nAvval rejani ayt, tasdiqlaganimdan keyin yoz.',
      },
      { type: 'heading', body: 'Yaxshi refactoring vazifalari' },
      {
        type: 'list',
        items: [
          'Uzun funksiyani bo’lish',
          'Takrorlanuvchi kodni ajratish',
          'Nomlarni yaxshilash',
          'Callback’dan async/await ga o’tish',
          'Prop drilling → context yoki hook',
        ],
      },
    ],
    realWorld: [
      'Legacy komponentni zamonaviylashtirish',
      'Dublikat kodni yo’qotish',
      'Modullarga bo’lish',
    ],
    practice: {
      title: 'Bitta refactoring',
      task: 'Bitta uzun funksiyangizni AI bilan refactor qiling: avval test, keyin reja, keyin ijro, keyin diff review.',
      hint: 'Testlar o’zgarmasligi — asosiy tekshiruv.',
      sample: 'Har bosqichni alohida commit qiling.',
    },
    keyTakeaways: [
      'Test yo’q — refactoring yo’q',
      'Xatti-harakat o’zgarmasligi shart',
      'Bitta o’zgarish — bitta commit',
    ],
  },

  {
    id: 'd-04',
    courseId: c,
    order: 4,
    slug: 'ai-bilan-code-review',
    title: 'AI bilan code review',
    summary: 'Ikkinchi ko’z sifatida AI — nimani topadi, nimani topmaydi.',
    duration: 8,
    xp: 50,
    objectives: [
      'Review promptini tuzish',
      'Review yo’nalishlarini belgilash',
      'AI review chegaralarini bilish',
    ],
    why: 'AI review — arzon va tez birinchi filtr. U odam reviewer vaqtini muhim narsalarga bo’shatadi.',
    blocks: [
      {
        type: 'code',
        lang: 'text',
        body: 'Sen tajribali code reviewersan.\n\nQuyidagi diff’ni review qil. Faqat quyidagilarga e’tibor ber:\n1. Correctness — mantiqiy xatolar, chegaraviy holatlar\n2. Xavfsizlik — injection, XSS, sirlar\n3. Performance — keraksiz render, N+1\n4. Xato ishlash — try/catch, loading, empty state\n\nHar bir topilma uchun:\n- Fayl:qator\n- Nima uchun muammo\n- Aniq tuzatish\n- Jiddiylik: kritik / muhim / kichik\n\nUslub va formatlash haqida yozma (linter bor).\nMuammo topmasang — "topilmadi" deb yoz.',
      },
      {
        type: 'compare',
        good: {
          title: 'AI yaxshi topadi',
          body: '• Null/undefined tekshiruvi yo’qligi\n• Chegaraviy holatlar\n• Xato ishlashning yo’qligi\n• Aniq xavfsizlik naqshlari\n• Dublikat kod\n• Keraksiz re-render',
        },
        bad: {
          title: 'AI topa olmaydi',
          body: '• Biznes mantiqi to’g’rimi\n• Arxitektura qarori mosmi\n• Jamoa konvensiyalari\n• Real performance (o’lchov kerak)\n• Nima uchun bu yechim tanlangani',
        },
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Ikki bosqichli review',
        body: '1) AI review — mexanik muammolar. 2) Odam review — arxitektura va biznes mantiqi. Bu tartib odam vaqtini eng qimmatli joyga yo’naltiradi.',
      },
    ],
    realWorld: [
      'PR ni yuborishdan oldin self-review',
      'Katta diff ni tez skanerlash',
      'Junior kodini o’qitish bilan review qilish',
    ],
    practice: {
      title: 'Self-review',
      task: 'Oxirgi PR ingizni AI review dan o’tkazing. Nechta haqiqiy muammo topildi? Nechta noto’g’ri signal?',
      hint: 'Noto’g’ri signallar ham foydali — prompt ni sozlash uchun.',
      sample: 'Review promptini o’z stack’ingizga moslang va saqlang.',
    },
    keyTakeaways: [
      'AI review — birinchi filtr',
      'Yo’nalishlarni aniq belgilang',
      'Arxitektura qarori — odamda',
    ],
  },

  {
    id: 'd-05',
    courseId: c,
    order: 5,
    slug: 'ai-bilan-documentation',
    title: 'AI bilan documentation',
    summary: 'Kod bor, hujjat yo’q — bu muammoni AI hal qiladi.',
    duration: 7,
    xp: 50,
    objectives: [
      'Hujjat turlarini ajratish',
      'Kod asosida hujjat generatsiya qilish',
      'Hujjatni dolzarb saqlash',
    ],
    why: 'Hujjat yozishni hech kim yoqtirmaydi. AI buni zerikarli ishdan 10 daqiqalik vazifaga aylantiradi.',
    blocks: [
      {
        type: 'table',
        head: ['Hujjat turi', 'Prompt yo’nalishi'],
        rows: [
          ['README', 'Nima, nega, qanday ishga tushirish, misollar'],
          ['API docs', 'Endpoint, parametr, javob, xato kodlari'],
          ['JSDoc', 'Har funksiya: maqsad, parametr, qaytish, misol'],
          ['ADR', 'Qaror, kontekst, alternativalar, oqibatlar'],
          ['CHANGELOG', 'Commit’lardan foydalanuvchi tiliga o’tkazish'],
          ['Onboarding', 'Yangi dasturchi uchun 1-kun yo’riqnomasi'],
        ],
      },
      {
        type: 'code',
        lang: 'text',
        body: 'Quyidagi modul uchun README yoz.\n\nAuditoriya: loyihaga yangi qo’shilgan dasturchi.\n\nBo’limlar:\n1. Bu modul nima qiladi (2 jumla)\n2. Nega kerak (biznes sabab)\n3. Asosiy tushunchalar\n4. Ishlatish misoli (kod)\n5. Keng tarqalgan xatolar\n\nQoidalar:\n- Faqat koddagi haqiqatni yoz, taxmin qilma\n- Noaniq joyni "TODO: aniqlashtirish kerak" deb belgila\n\nKod:\n{{kod}}',
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Hujjat ham tekshiriladi',
        body: 'AI koddan ko’rmagan narsani «to’ldirib» yozishi mumkin. Har bir da’voni kodga solishtiring — ayniqsa sozlamalar va default qiymatlarni.',
      },
    ],
    realWorld: [
      'Legacy loyihaga hujjat yozish',
      'API reference',
      'Jamoa onboarding materiali',
    ],
    practice: {
      title: 'README generatsiyasi',
      task: 'Hujjatsiz modulingiz uchun README oling, tekshiring va TODO belgilangan joylarni o’zingiz to’ldiring.',
      hint: 'AI ga «taxmin qilma» deyishni unutmang.',
      sample: 'Yuqoridagi shablonni ishlating.',
    },
    keyTakeaways: [
      'Hujjat — AI ning eng oson yutug’i',
      '«Taxmin qilma» qoidasi shart',
      'Har da’voni kodga solishtiring',
    ],
  },

  {
    id: 'd-06',
    courseId: c,
    order: 6,
    slug: 'ai-bilan-testing',
    title: 'AI bilan testing',
    summary: 'Test yozish — AI uchun ideal vazifa.',
    duration: 9,
    xp: 50,
    objectives: [
      'Test turlarini ajratish',
      'Chegaraviy holatlarni AI bilan topish',
      'Foydasiz testlardan qochish',
    ],
    why: 'Test yozish takrorlanuvchi va naqshli — aynan AI kuchli bo’lgan joy.',
    blocks: [
      {
        type: 'code',
        lang: 'text',
        body: 'Quyidagi funksiya uchun Vitest testlari yoz.\n\nQamrov:\n- Happy path (2 ta)\n- Chegaraviy holatlar: bo’sh, null, undefined, juda katta qiymat\n- Xato holatlari\n- Har bir shart tarmog’i\n\nQoidalar:\n- describe/it strukturasi\n- Test nomlari xatti-harakatni tasvirlasin\n- Implementatsiya tafsilotini emas, natijani tekshir\n- Mock’ni faqat zarur bo’lsa ishlat\n\nKod:\n{{kod}}',
      },
      {
        type: 'callout',
        tone: 'success',
        title: 'Eng qimmatli qo’llanish',
        body: '«Bu funksiyada men o’ylamagan qaysi chegaraviy holatlar bor?» — AI ko’pincha siz o’tkazib yuborgan holatlarni topadi.',
      },
      {
        type: 'compare',
        good: {
          title: 'Foydali test',
          body: 'it("bo’sh massivda 0 qaytaradi")\nit("salbiy qiymatda xato tashlaydi")\n— xatti-harakatni tekshiradi',
        },
        bad: {
          title: 'Foydasiz test',
          body: 'it("useState ni chaqiradi")\n— implementatsiya tafsilotini tekshiradi, refactoringda buziladi',
        },
      },
      {
        type: 'list',
        items: [
          'Testlarni o’zingiz ishga tushiring',
          'O’tgan testni ataylab buzing — u haqiqatan tekshiryaptimi?',
          'Qamrov foizi maqsad emas, xatti-harakat qamrovi maqsad',
        ],
      },
    ],
    realWorld: [
      'Yangi funksiya uchun test',
      'Legacy kodga test qo’shish',
      'Bug fix uchun regression test',
    ],
    practice: {
      title: 'Chegaraviy holatlar',
      task: 'Bitta funksiyangiz uchun AI dan chegaraviy holatlar ro’yxatini so’rang. Nechtasi sizga yangi edi?',
      hint: 'Keyin shu holatlar uchun test yozdiring.',
      sample: 'Bitta testni ataylab buzib, u ishlayotganini tasdiqlang.',
    },
    keyTakeaways: [
      'Test yozish — AI uchun ideal vazifa',
      'Chegaraviy holatlarni AI dan so’rang',
      'Xatti-harakatni tekshiring, implementatsiyani emas',
    ],
  },

  {
    id: 'd-07',
    courseId: c,
    order: 7,
    slug: 'ai-bilan-git',
    title: 'AI bilan Git',
    summary: 'Commit xabarlari, tarixni tushunish va murakkab operatsiyalar.',
    duration: 7,
    xp: 50,
    objectives: [
      'Yaxshi commit xabari yozdirish',
      'Git tarixini tahlil qilish',
      'Xavfli operatsiyalarni oldindan tekshirish',
    ],
    why: 'Yaxshi git tarixi — kelajakdagi o’zingizga qilingan sovg’a.',
    blocks: [
      {
        type: 'code',
        lang: 'text',
        body: 'Quyidagi diff uchun Conventional Commits formatida\ncommit xabari yoz.\n\nFormat:\ntype(scope): qisqa tavsif (maks 72 belgi)\n\n[bo’sh qator]\nNima uchun bu o’zgarish kerak edi (2-3 qator)\n\nTurlar: feat, fix, refactor, docs, test, chore, perf\n\nDiff:\n{{diff}}',
      },
      {
        type: 'list',
        items: [
          '«Bu commit nima qilgan?» — begona commit’ni tushunish',
          '«Bu fayl oxirgi 10 commit’da qanday o’zgargan?» — tarix tahlili',
          '«Bu ikki branch orasidagi farqni odam tilida tushuntir»',
          '«Merge conflict’ni qanday hal qilay?» — kontekst bilan',
        ],
      },
      {
        type: 'callout',
        tone: 'danger',
        title: 'Xavfli buyruqlar',
        body: 'reset --hard, push --force, rebase, clean -fd — bajarishdan oldin AI dan «bu buyruq nima qiladi va nimani yo’qotaman?» deb so’rang. Va avval branch backup qiling.',
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Xavfsiz odat',
        body: 'Xavfli operatsiyadan oldin: git branch backup-$(sana). Bir soniya vaqt, soatlab ishni saqlaydi.',
      },
    ],
    realWorld: [
      'Commit xabarlarini standartlashtirish',
      'Release notes tayyorlash',
      'Murakkab rebase ni rejalashtirish',
    ],
    practice: {
      title: 'Commit generatori',
      task: 'Oxirgi 3 commit’ingizni Conventional Commits formatida qayta yozdiring va farqni baholang.',
      hint: '«Nima uchun» qismini unutmang — eng qimmatli qism shu.',
      sample: 'feat(auth): refresh token rotatsiyasini qo’shish',
    },
    keyTakeaways: [
      'Commit xabari — kelajakka xabar',
      'Xavfli buyruqni avval so’rang',
      'Backup branch — arzon sug’urta',
    ],
  },

  {
    id: 'd-08',
    courseId: c,
    order: 8,
    slug: 'ai-bilan-github',
    title: 'AI bilan GitHub',
    summary: 'PR tavsifi, issue, review va release jarayoni.',
    duration: 7,
    xp: 50,
    objectives: [
      'Yaxshi PR tavsifi yozdirish',
      'Issue ni aniq shakllantirish',
      'Release notes tayyorlash',
    ],
    why: 'Yaxshi PR tavsifi — reviewer vaqtini tejaydi va merge ni tezlashtiradi.',
    blocks: [
      {
        type: 'code',
        lang: 'text',
        body: 'Ushbu diff uchun PR tavsifi yoz.\n\nShablon:\n## Nima o’zgardi\n[2-3 punkt]\n\n## Nima uchun\n[muammo va sabab]\n\n## Qanday tekshirish\n1. [qadam]\n2. [qadam]\n\n## Xavflar\n[nima buzilishi mumkin]\n\n## Screenshot\n[kerak bo’lsa]\n\nDiff:\n{{diff}}',
      },
      {
        type: 'table',
        head: ['Artefakt', 'AI qanday yordam beradi'],
        rows: [
          ['PR tavsifi', 'Diff dan avtomatik shablon to’ldirish'],
          ['Issue', 'Noaniq shikoyatni aniq bug report ga aylantirish'],
          ['Review javobi', 'Reviewer izohiga muloyim va aniq javob'],
          ['Release notes', 'Commit’lardan foydalanuvchi tiliga'],
          ['Onboarding', 'Repo strukturasini tushuntirish'],
        ],
      },
      {
        type: 'callout',
        tone: 'success',
        title: 'Yaxshi issue shabloni',
        body: 'Kutilgan xatti-harakat • Haqiqiy xatti-harakat • Reproduksiya qadamlari • Muhit • Screenshot/log • Ta’sir doirasi. AI shu shablonni erkin matndan to’ldirib beradi.',
      },
    ],
    realWorld: [
      'Kunlik PR jarayoni',
      'Bug tracking',
      'Reliz tayyorlash',
    ],
    practice: {
      title: 'PR tavsifi',
      task: 'Joriy branch diff’ingiz uchun to’liq PR tavsifi generatsiya qiling va tuzating.',
      hint: '«Qanday tekshirish» bo’limi eng foydali qism.',
      sample: 'Shablonni jamoangiz uchun standart qiling.',
    },
    keyTakeaways: [
      'PR tavsifi reviewer vaqtini tejaydi',
      'Issue shabloni bug’ni tez hal qiladi',
      'Release notes — commit’lardan',
    ],
  },

  {
    id: 'd-09',
    courseId: c,
    order: 9,
    slug: 'ai-bilan-react',
    title: 'AI bilan React',
    summary: 'Komponent, hook, state va performance masalalari.',
    duration: 10,
    xp: 50,
    objectives: [
      'React uchun kontekst berishni bilish',
      'Komponent so’rovini to’g’ri yozish',
      'AI ning React bo’yicha tipik xatolarini tanish',
    ],
    why: 'React ekotizimi tez o’zgaradi. AI eski naqshlarni taklif qilishi mumkin — buni bilish kerak.',
    blocks: [
      {
        type: 'code',
        lang: 'text',
        body: 'React 19 komponenti yoz: <DataTable />\n\nProps:\n- columns: {key, label, sortable}[]\n- rows: object[]\n- onRowClick?: (row) => void\n- loading?: boolean\n\nTalablar:\n- Ustun bo’yicha saralash (client-side)\n- loading da skeleton\n- Bo’sh holat uchun empty state\n- Klaviatura bilan navigatsiya\n- CSS Modules (Tailwind ishlatma)\n- TypeScript ishlatma, JSDoc yoz\n\nQoida: kutubxona qo’shma, faqat React.',
      },
      { type: 'heading', body: 'AI ning tipik React xatolari' },
      {
        type: 'list',
        items: [
          'Eskirgan naqshlar (class komponent, eski lifecycle)',
          'Keraksiz useEffect — derived state uchun effect kerak emas',
          'useMemo/useCallback ni har joyda ishlatish',
          'key sifatida index ishlatish',
          'State ni ortiqcha bo’lish yoki noto’g’ri joyda saqlash',
          'Cleanup funksiyasini unutish',
        ],
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Har doim versiyani ayting',
        body: '«React 19» deb yozing. Aks holda model 2020-yilgi naqshlarni taklif qilishi mumkin — ular ishlaydi, lekin eskirgan.',
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Foydali so’rov',
        body: '«Bu komponentda keraksiz re-render qayerda bo’lishi mumkin? Har biri uchun sabab va o’lchash usulini ayt.» — optimizatsiyadan oldin diagnostika.',
      },
    ],
    realWorld: [
      'Yangi komponent yaratish',
      'Legacy komponentni hook’larga o’tkazish',
      'Performance muammosini tahlil qilish',
    ],
    practice: {
      title: 'Komponent so’rovi',
      task: 'Kerakli komponentingiz uchun to’liq props + talablar + cheklovlar bilan so’rov yozing.',
      hint: 'Versiya, styling usuli va taqiqlangan kutubxonalarni ayting.',
      sample: 'Yuqoridagi DataTable namunasiga qarang.',
    },
    keyTakeaways: [
      'Versiya va cheklovlarni ayting',
      'AI eski naqsh taklif qilishi mumkin',
      'Optimizatsiyadan oldin diagnostika',
    ],
  },

  {
    id: 'd-10',
    courseId: c,
    order: 10,
    slug: 'ai-bilan-javascript',
    title: 'AI bilan JavaScript',
    summary: 'Async, array metodlari, xato ishlash va zamonaviy sintaksis.',
    duration: 8,
    xp: 50,
    objectives: [
      'JS uchun aniq so’rov yozish',
      'Async kod bilan ishlash',
      'Xato ishlashni talab qilish',
    ],
    why: 'JavaScript — eng ko’p ishlatiladigan til. AI unda kuchli, lekin nozik joylar bor.',
    blocks: [
      {
        type: 'list',
        items: [
          'Muhitni ayting: brauzer / Node / ikkalasi',
          'Modul turini ayting: ESM / CommonJS',
          'ES versiyasini ayting: ES2022+',
          'Xato ishlashni talab qiling: «har bir async da try/catch»',
          'Kutubxona cheklovini ayting: «faqat native API»',
        ],
      },
      {
        type: 'code',
        lang: 'text',
        body: 'Node.js 22 (ESM) uchun funksiya yoz:\nfetchWithRetry(url, { retries = 3, timeoutMs = 5000 })\n\nTalablar:\n- AbortController bilan timeout\n- Eksponensial backoff (100ms, 200ms, 400ms)\n- Faqat 5xx va tarmoq xatolarida qayta urin\n- 4xx da darrov xato tashla\n- Har urinishni log qil\n- Native fetch ishlat, kutubxona qo’shma\n\nJSDoc va 3 ta ishlatish misolini ham ber.',
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Tekshirish kerak bo’lgan joylar',
        body: 'Sana/vaqt zonasi mantiqi • Suzuvchi nuqta hisoblari • Regex • Prototype manipulyatsiyasi • Race condition — bu joylarda AI xatosi ko’p uchraydi.',
      },
      {
        type: 'callout',
        tone: 'success',
        title: 'Foydali so’rov',
        body: '«Bu kodda qanday race condition yoki memory leak bo’lishi mumkin?» — AI bunday tahlilni yaxshi bajaradi.',
      },
    ],
    realWorld: [
      'API klient yozish',
      'Data transformatsiya pipeline’i',
      'Utility kutubxona',
    ],
    practice: {
      title: 'Async funksiya',
      task: 'Retry va timeout bilan async funksiya so’rang, keyin «bu kodda qanday muammo bo’lishi mumkin?» deb tahlil qildiring.',
      hint: 'AbortController cleanup qilinganini tekshiring.',
      sample: 'Yuqoridagi fetchWithRetry namunasi.',
    },
    keyTakeaways: [
      'Muhit va modul turini ayting',
      'Xato ishlashni aniq talab qiling',
      'Sana, regex va async — tekshiruv zonalari',
    ],
  },

  {
    id: 'd-11',
    courseId: c,
    order: 11,
    slug: 'ai-bilan-typescript',
    title: 'AI bilan TypeScript',
    summary: 'Tiplar, generiklar va migratsiya strategiyasi.',
    duration: 8,
    xp: 50,
    objectives: [
      'Tip so’rovini aniq yozish',
      'any dan qochish',
      'JS → TS migratsiyasini rejalashtirish',
    ],
    why: 'TypeScript loyihalarida AI kuchli yordamchi — tip xatolarini u tez tushuntiradi.',
    blocks: [
      {
        type: 'callout',
        tone: 'info',
        title: 'Eslatma',
        body: 'Bu platforma JavaScript’da yozilgan. Bu dars TypeScript ishlatadigan loyihalar uchun — tamoyillar universal.',
      },
      {
        type: 'code',
        lang: 'text',
        body: 'TypeScript 5 uchun tiplar yoz:\n\nKontekst: API javobi quyidagicha keladi\n{{JSON namuna}}\n\nTalablar:\n- any ishlatma, unknown + type guard ishlat\n- Ixtiyoriy maydonlarni aniq belgila\n- Union turlarni literal bilan yoz\n- Runtime tekshiruv uchun type guard funksiya ham ber\n- Export qilinadigan public tiplarni ajrat',
      },
      { type: 'heading', body: 'Eng foydali qo’llanishlar' },
      {
        type: 'list',
        items: [
          '«Bu tip xatosini oddiy tilda tushuntir» — TS xatolari uzun bo’ladi',
          'JSON namunadan tip generatsiya qilish',
          'Generik funksiya tiplarini yozish',
          'any larni asta-sekin aniq tiplarga almashtirish',
          'Utility type larni tushuntirish (Partial, Pick, Omit)',
        ],
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Xavf: yashirin any',
        body: 'AI ba’zan muammoni «hal qilish» uchun as any yoki @ts-ignore qo’yadi. Buni aniq taqiqlang: «as any va ts-ignore ishlatma».',
      },
    ],
    realWorld: [
      'API tiplarini generatsiya qilish',
      'Tip xatolarini tushunish',
      'JS loyihani TS ga o’tkazish',
    ],
    practice: {
      title: 'JSON → tiplar',
      task: 'Real API javobingizdan tiplar va type guard generatsiya qiling.',
      hint: '«as any ishlatma» qoidasini qo’shing.',
      sample: 'Ixtiyoriy maydonlarni to’g’ri belgilanganini tekshiring.',
    },
    keyTakeaways: [
      'any va ts-ignore ni taqiqlang',
      'JSON dan tip generatsiya — tez yutuq',
      'Tip xatosini tushuntirishni so’rang',
    ],
  },

  {
    id: 'd-12',
    courseId: c,
    order: 12,
    slug: 'ai-bilan-api',
    title: 'AI bilan API',
    summary: 'Dizayn, klient kodi, hujjat va xato ishlash.',
    duration: 9,
    xp: 50,
    objectives: [
      'API dizayn qarorlarini muhokama qilish',
      'Klient kodi generatsiya qilish',
      'Xato ishlash strategiyasini qurish',
    ],
    why: 'API — tizimlar orasidagi shartnoma. Uni to’g’ri loyihalash keyingi oylarni belgilaydi.',
    blocks: [
      {
        type: 'code',
        lang: 'text',
        body: 'REST API endpoint’larini loyihalash uchun yordam ber.\n\nDomen: onlayn kurs platformasi\nEntitylar: Course, Lesson, Enrollment, Progress\n\nHar bir endpoint uchun:\n- Metod va yo’l\n- Query parametrlar\n- Request body\n- Success javob (status + shakl)\n- Xato javoblar (status + kod)\n\nQoidalar:\n- REST konvensiyalari\n- Pagination: cursor-based\n- Versiyalash: /v1\n- Xato formati bir xil bo’lsin\n\nAvval jadval ko’rinishida umumiy ro’yxat ber.',
      },
      { type: 'heading', body: 'API bilan ishlashda AI qayerda foydali' },
      {
        type: 'list',
        items: [
          'OpenAPI spetsifikatsiyasidan klient kodi',
          'Xato ishlash qatlamini yozish',
          'Retry va rate limit mantiqi',
          'Mock server / test ma’lumot generatsiyasi',
          'API hujjatini yozish',
          'Ikki API o’rtasida adapter yozish',
        ],
      },
      {
        type: 'callout',
        tone: 'danger',
        title: 'Xavfsizlik',
        body: 'API kalitlarni hech qachon promptga qo’ymang. Kalitlar env faylda, kodda esa process.env orqali. AI ga «kalitni hardcode qilma» deb aniq ayting.',
      },
    ],
    realWorld: [
      'Yangi API loyihalash',
      'Uchinchi tomon API bilan integratsiya',
      'Xato ishlash qatlamini standartlashtirish',
    ],
    practice: {
      title: 'API klient',
      task: 'Bitta endpoint uchun to’liq klient funksiyasi yozdiring: retry, timeout, xato ishlash va tiplar bilan.',
      hint: 'Xato formatini oldindan belgilang.',
      sample: 'Barcha xatolarni bitta AppError turiga normalizatsiya qiling.',
    },
    keyTakeaways: [
      'API — shartnoma, uni ehtiyot bilan loyihalang',
      'Xato formatini standartlashtiring',
      'Kalitlarni hech qachon promptga qo’ymang',
    ],
  },

  {
    id: 'd-13',
    courseId: c,
    order: 13,
    slug: 'ai-bilan-database',
    title: 'AI bilan database',
    summary: 'Sxema dizayni, so’rovlar va migratsiyalar.',
    duration: 9,
    xp: 50,
    objectives: [
      'Sxema dizaynida AI dan foydalanish',
      'SQL so’rovlarini optimallashtirish',
      'Migratsiyalarni xavfsiz bajarish',
    ],
    why: 'Ma’lumotlar bazasi xatosi eng qimmat xato turi — ma’lumot yo’qolsa qaytmaydi.',
    blocks: [
      {
        type: 'code',
        lang: 'text',
        body: 'PostgreSQL sxemasi loyihalashda yordam ber.\n\nDomen: kurs platformasi\nTalablar:\n- Foydalanuvchi bir nechta kursga yozila oladi\n- Har dars bo’yicha progress saqlanadi\n- Quiz natijalari tarixi kerak\n\nHar jadval uchun:\n- Ustunlar, turlar, cheklovlar\n- Indekslar (va nima uchun)\n- Tashqi kalitlar va ON DELETE xatti-harakati\n\nKeyin: 3 ta eng tez-tez ishlatiladigan so’rovni yoz\nva ular uchun indekslar yetarli ekanini tekshir.',
      },
      {
        type: 'callout',
        tone: 'danger',
        title: 'Hech qachon to’g’ridan-to’g’ri ishga tushirmang',
        body: 'AI yozgan migration yoki DELETE/UPDATE so’rovini avval: 1) o’qing 2) test bazada sinang 3) backup oling 4) tranzaksiya ichida bajaring.',
      },
      {
        type: 'list',
        items: [
          '«Bu so’rov nima qiladi?» — begona SQL ni tushunish',
          '«EXPLAIN natijasini tahlil qil» — performance',
          '«Bu so’rovni optimallashtir» — indeks va JOIN tartibi',
          '«Bu migration qайtarilishi (rollback) mumkinmi?»',
          'Test ma’lumot generatsiyasi',
        ],
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Real ma’lumot bermang',
        body: 'Sxema va anonimlashtirilgan namunalar bilan ishlang. Mijoz ma’lumotlari bo’lgan dump ni promptga tashlamang.',
      },
    ],
    realWorld: [
      'Yangi loyiha sxemasi',
      'Sekin so’rovni tezlashtirish',
      'Migratsiya rejasi',
    ],
    practice: {
      title: 'Sxema review',
      task: 'Mavjud sxemangizni AI ga bering va «qanday muammolar bo’lishi mumkin?» deb so’rang: indeks, normalizatsiya, o’sish.',
      hint: 'Real ma’lumotsiz, faqat DDL bering.',
      sample: 'Topilgan muammolarni ustuvorlik bo’yicha tartiblang.',
    },
    keyTakeaways: [
      'Migration — avval test bazada',
      'Backup majburiy',
      'Real ma’lumotni promptga bermang',
    ],
  },

  {
    id: 'd-14',
    courseId: c,
    order: 14,
    slug: 'frontend-architecture',
    title: 'AI bilan frontend architecture',
    summary: 'Papka strukturasi, state boshqaruvi va komponent chegaralari.',
    duration: 9,
    xp: 50,
    objectives: [
      'Arxitektura qarorlarini muhokama qilish',
      'Trade-off larni baholash',
      'Qarorni hujjatlashtirish',
    ],
    why: 'Arxitektura xatosi kod xatosidan qimmat — uni tuzatish oylar oladi.',
    blocks: [
      {
        type: 'code',
        lang: 'text',
        body: 'Frontend arxitektura bo’yicha maslahat ber.\n\nLoyiha: AI ta’lim platformasi\nStack: React 19, Vite, CSS Modules, React Router\nHajm: ~20 sahifa, ~80 komponent\nJamoa: 2 dasturchi\nMuhim: tez yuklanish, oson kengaytirish\n\nSavollar:\n1. Papka strukturasi: feature-based yoki type-based?\n2. State: Context yetadimi yoki Redux Toolkit kerakmi?\n3. Data qatlamini qanday ajratish?\n\nHar savol uchun:\n- 2 ta variant\n- Trade-off jadvali\n- Ushbu kontekst uchun tavsiya va sabab\n\nBitta "to’g’ri javob" berma — variantlarni ko’rsat.',
      },
      {
        type: 'callout',
        tone: 'success',
        title: 'Kuchli ibora: «Bitta to’g’ri javob berma»',
        body: 'AI odatda bitta yechim taklif qiladi. Variantlar va trade-off so’rasangiz — qaror sizniki bo’lib qoladi va siz uni asoslay olasiz.',
      },
      { type: 'heading', body: 'Arxitektura savollariga tayyor shablon' },
      {
        type: 'list',
        items: [
          'Kontekst: hajm, jamoa, muddat, cheklovlar',
          'Muqobil variantlar (kamida 2 ta)',
          'Har biri uchun: afzallik, kamchilik, xarajat',
          'Qaysi shartda qaysi variant yaxshi',
          'Qarorni ADR sifatida yozib qo’ying',
        ],
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Chegara',
        body: 'AI sizning jamoangiz tajribasini, mahalliy cheklovlarni va tashkiliy siyosatni bilmaydi. Yakuniy qaror — sizniki.',
      },
    ],
    realWorld: [
      'Yangi loyiha bootstrap',
      'Monolitni modullarga bo’lish',
      'State boshqaruvini almashtirish',
    ],
    practice: {
      title: 'ADR yozing',
      task: 'Bitta arxitektura qarori uchun variantlar va trade-off larni oling, tanlang va ADR yozing.',
      hint: 'ADR: Kontekst / Qaror / Alternativalar / Oqibatlar.',
      sample: 'Bu hujjat 6 oydan keyin «nega shunday qilganmiz?» savoliga javob beradi.',
    },
    keyTakeaways: [
      'Variantlar va trade-off so’rang',
      'Qaror sizniki, AI — maslahatchi',
      'Qarorni ADR bilan hujjatlashtiring',
    ],
  },

  {
    id: 'd-15',
    courseId: c,
    order: 15,
    slug: 'ai-bilan-project-planning',
    title: 'AI bilan project planning',
    summary: 'Talablardan bosqichlarga: reja, baholash va xavflar.',
    duration: 9,
    xp: 50,
    objectives: [
      'Talablarni aniqlashtirish',
      'Vazifalarni bo’lish va baholash',
      'Xavflarni oldindan aniqlash',
    ],
    why: 'Yomon rejalashtirilgan loyiha — kod qanchalik yaxshi bo’lmasin, muvaffaqiyatsiz bo’ladi.',
    blocks: [
      {
        type: 'code',
        lang: 'text',
        body: 'Sen tajribali tech lead san.\n\nLoyiha: {{tavsif}}\nMuddat: {{vaqt}}\nJamoa: {{kim}}\n\nQil:\n1. Noaniq talablarni aniqlashtiruvchi 10 ta savol ber\n(hozircha reja tuzma — avval savollar)\n\nMen javob bergach:\n2. Epiclar va vazifalarga bo’l\n3. Har vazifaga baho (S/M/L) va bog’liqlik\n4. Kritik yo’lni ko’rsat\n5. Top 5 xavf va ularni yumshatish\n6. MVP chegarasini taklif qil',
      },
      {
        type: 'callout',
        tone: 'success',
        title: 'Eng qimmatli qadam: savollar',
        body: '«Avval savol ber» — bu AI ni taxmin qilishdan to’xtatadi va sizning o’zingiz o’ylamagan bo’shliqlarni ochadi.',
      },
      {
        type: 'list',
        items: [
          'Baholarni AI dan olib, o’zingiz 1.5–2x ga ko’paytiring',
          'MVP chegarasini qat’iy belgilang',
          'Xavflarni haftalik qayta ko’rib chiqing',
          'Har epicdan keyin rejani yangilang',
        ],
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'AI baholari optimistik',
        body: 'Model integratsiya muammolari, kutilmagan bug lar va jamoa kontekstini hisobga olmaydi. Uning bahosi — quyi chegara.',
      },
    ],
    realWorld: [
      'Sprint rejalashtirish',
      'Yangi feature baholash',
      'Roadmap tuzish',
    ],
    practice: {
      title: 'Savol-avval rejalashtirish',
      task: 'Keyingi feature’ingiz uchun avval 10 ta aniqlashtiruvchi savol oling, javob bering va keyin reja tuzdiring.',
      hint: 'Savollarning qanchasiga darrov javob bera oldingiz?',
      sample: 'Javob bera olmagan savollar — eng katta xavf manbai.',
    },
    keyTakeaways: [
      'Avval savollar, keyin reja',
      'Baholarni 1.5–2x ga ko’paytiring',
      'MVP chegarasini qat’iy saqlang',
    ],
  },

  {
    id: 'd-16',
    courseId: c,
    order: 16,
    slug: 'ai-kodini-tekshirish',
    title: 'AI-generated code’ni tekshirish',
    summary: 'Qabul qilishdan oldin majburiy tekshiruv ro’yxati.',
    duration: 9,
    xp: 50,
    objectives: [
      'Tekshiruv ro’yxatini o’zlashtirish',
      'Yashirin xavflarni tanish',
      'Qabul qilish qoidasini o’rnatish',
    ],
    why: 'AI kodi ishlaydigan ko’rinadi — lekin «ishlaydigan ko’rinish» va «to’g’ri» bir xil emas.',
    blocks: [
      { type: 'heading', body: 'Majburiy tekshiruv ro’yxati' },
      {
        type: 'list',
        items: [
          'Men bu kodni to’liq tushunamanmi? (Yo’q → merge qilmang)',
          'Chegaraviy holatlar: bo’sh, null, katta hajm, parallel chaqiruv',
          'Xato ishlash bormi — yoki xato jim yutilyaptimi?',
          'Xavfsizlik: kirish validatsiyasi, injection, XSS, sirlar',
          'Performance: sikl ichida so’rov, keraksiz render, xotira',
          'Bog’liqliklar: yangi kutubxona qo’shildimi? Kerakmi?',
          'Loyiha konvensiyalariga mosmi?',
          'Testlar bormi va ular haqiqatan tekshiryaptimi?',
        ],
      },
      {
        type: 'callout',
        tone: 'danger',
        title: 'Eng xavfli naqsh: jim yutilgan xato',
        body: 'try { ... } catch (e) { } — AI ba’zan shunday yozadi. Kod «ishlaydi», lekin xato yashiriladi va keyinroq tushunarsiz nosozlik beradi.',
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Mavjud bo’lmagan paket',
        body: 'AI ba’zan mavjud bo’lmagan kutubxona yoki funksiya nomini taklif qiladi. Har bir yangi importni tekshiring — npm da bormi, oxirgi marta qachon yangilangan.',
      },
      {
        type: 'callout',
        tone: 'success',
        title: 'Qabul qoidasi',
        body: 'Agar kodni hamkasbingizga tushuntira olmasangiz — u sizning kodingiz emas. Tushunmaguningizcha merge qilmang.',
      },
    ],
    realWorld: [
      'PR ga qo’shishdan oldin',
      'Production ga chiqarishdan oldin',
      'Junior dasturchi ishini tekshirish',
    ],
    practice: {
      title: 'Ro’yxat bo’yicha audit',
      task: 'AI yozgan oxirgi kodni 8 punktli ro’yxat bo’yicha tekshiring. Nechta muammo topildi?',
      hint: 'Ayniqsa xato ishlash va chegaraviy holatlarga qarang.',
      sample: 'Ro’yxatni jamoangiz uchun PR checklist qiling.',
    },
    keyTakeaways: [
      'Tushunmagan kodni merge qilmang',
      'Jim yutilgan xato — eng xavfli naqsh',
      'Yangi importlarni tekshiring',
    ],
  },

  {
    id: 'd-17',
    courseId: c,
    order: 17,
    slug: 'vibe-coding',
    title: 'Vibe Coding',
    summary: 'Tez prototiplash uslubi — qachon foydali, qachon xavfli.',
    duration: 8,
    xp: 50,
    objectives: [
      'Vibe coding nima ekanini tushunish',
      'Mos va nomos holatlarni ajratish',
      'Prototipdan production ga o’tish qoidasini bilish',
    ],
    why: 'Bu uslub juda samarali — lekin faqat to’g’ri kontekstda. Noto’g’ri joyda qo’llanilsa, texnik qarz to’playdi.',
    blocks: [
      {
        type: 'text',
        body: 'Vibe coding — kodni qatorma-qator o’qimasdan, natijaga qarab AI bilan tez iteratsiya qilish uslubi. Siz nima kerakligini aytasiz, ko’rasiz, tuzatasiz — kod tafsilotiga chuqur kirmasdan.',
      },
      {
        type: 'compare',
        good: {
          title: 'Mos holatlar',
          body: '• Prototip va MVP\n• Shaxsiy skriptlar\n• Ichki vositalar\n• G’oyani tez sinash\n• O’rganish uchun demo\n• Hackathon',
        },
        bad: {
          title: 'Nomos holatlar',
          body: '• Production kod\n• To’lov va moliya\n• Autentifikatsiya\n• Foydalanuvchi ma’lumotlari\n• Uzoq yashaydigan tizim\n• Jamoa qo’llab-quvvatlaydigan kod',
        },
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Asosiy xavf',
        body: 'Prototip «ishlaydi» degan sabab bilan production ga ko’chib o’tadi. Keyin uni hech kim tushunmaydi va o’zgartira olmaydi.',
      },
      { type: 'heading', body: 'Prototipdan production ga o’tish' },
      {
        type: 'steps',
        items: [
          { title: '1. To’xtang', body: 'Prototip maqsadga yetdi — endi qayta yozish bosqichi.' },
          { title: '2. Talablarni yozing', body: 'Prototip nima qilishini aniq hujjatlashtiring.' },
          { title: '3. Testlar yozing', body: 'Kutilgan xatti-harakatni test bilan qulflang.' },
          { title: '4. Qayta yozing', body: 'Endi har qatorni tushunib, review qilib yozing.' },
          { title: '5. Xavfsizlik va xato ishlash', body: 'Prototipda bo’lmagan hamma narsani qo’shing.' },
        ],
      },
    ],
    realWorld: [
      'Bir kunlik MVP',
      'Ichki avtomatlashtirish skripti',
      'Mijozga ko’rsatiladigan demo',
    ],
    practice: {
      title: 'Chegarani belgilang',
      task: 'O’z loyihangizda vibe coding mumkin bo’lgan va mumkin bo’lmagan qismlarni ajrating.',
      hint: 'Xato narxi yuqori joylar — mumkin emas.',
      sample: 'Ichki admin panel — mumkin. To’lov oqimi — mumkin emas.',
    },
    keyTakeaways: [
      'Vibe coding — prototip uchun ideal',
      'Production uchun qayta yozish shart',
      'Chegarani oldindan belgilang',
    ],
  },

  {
    id: 'd-18',
    courseId: c,
    order: 18,
    slug: 'ai-coding-agents',
    title: 'AI Coding Agents',
    videoNote: true,
    summary: 'Agentlarni boshqarish: kontekst, chegaralar va nazorat.',
    duration: 10,
    xp: 50,
    objectives: [
      'Agent va chat farqini tushunish',
      'Agentga vazifa qo’yishni o’rganish',
      'Nazorat mexanizmlarini o’rnatish',
    ],
    why: 'Agentlar — dasturlashdagi eng katta o’zgarish. Ularni boshqarish alohida ko’nikma.',
    blocks: [
      {
        type: 'text',
        body: 'Coding agent — fayllarni o’qiy oladigan, o’zgartira oladigan, buyruq ishga tushira oladigan va natijaga qarab o’zini tuzata oladigan AI. U javob bermaydi — u ishlaydi.',
      },
      { type: 'heading', body: 'Agent bilan ishlash qoidalari' },
      {
        type: 'steps',
        items: [
          { title: '1. Toza git holati', body: 'Har doim alohida branch. O’zgarishlarni har doim diff orqali ko’ring.' },
          { title: '2. Kichik vazifa', body: 'Bir vazifa = bir maqsad. «Loyihani yaxshila» emas.' },
          { title: '3. Muvaffaqiyat mezoni', body: '«Testlar o’tsin», «build xatosiz», «lint toza» — o’lchanadigan mezon bering.' },
          { title: '4. Kontekst faylini yozing', body: 'Loyiha qoidalarini (stack, uslub, taqiqlar) fayl sifatida saqlang — agent uni o’qiydi.' },
          { title: '5. Tekshiring', body: 'Testlarni o’zingiz ishga tushiring. Agentning hisobotiga ishonmang.' },
        ],
      },
      {
        type: 'code',
        lang: 'text',
        body: '# Yaxshi agent vazifasi\n\nMaqsad: Barcha komponentlarda inline style’larni\nCSS Modules ga o’tkazish.\n\nQamrov: src/components/common/ (faqat shu papka)\n\nQoidalar:\n- Vizual natija o’zgarmasin\n- Har komponent uchun alohida .module.css\n- Mavjud class nomlarini saqla\n- Yangi kutubxona qo’shma\n\nTugash mezoni:\n- npm run build xatosiz\n- npm run lint toza\n- Vizual farq yo’q\n\nAvval o’zgartiriladigan fayllar ro’yxatini ber.',
      },
      {
        type: 'callout',
        tone: 'danger',
        title: 'Nazoratni qo’ldan bermang',
        body: 'Agentga cheksiz ruxsat bermang. Ayniqsa: fayl o’chirish, git force operatsiyalari, deploy, ma’lumotlar bazasi buyruqlari — bularni har doim o’zingiz bajaring.',
      },
    ],
    realWorld: [
      'Katta migratsiya',
      'Test qamrovini oshirish',
      'Kod bazasi bo’ylab bir xil o’zgarish',
    ],
    practice: {
      title: 'Agent vazifasi',
      task: 'Bitta aniq, qamrovi cheklangan agent vazifasi yozing: maqsad, qamrov, qoidalar, tugash mezoni bilan.',
      hint: 'Vazifa 1 soatda qo’lda bajariladigan hajmda bo’lsin.',
      sample: 'Yuqoridagi CSS Modules migratsiyasi namunasiga qarang.',
    },
    keyTakeaways: [
      'Agent ishlaydi, chat javob beradi',
      'Kichik qamrov + o’lchanadigan mezon',
      'Xavfli operatsiyalar — faqat siz',
    ],
  },

  {
    id: 'd-19',
    courseId: c,
    order: 19,
    slug: 'xavfsizlik-audit',
    title: 'AI bilan xavfsizlik audit',
    summary: 'Kod yozayotgan AI xatoni ko‘rmaydi — lekin qidirishga aniq yo‘naltirsangiz, topa oladi.',
    duration: 9,
    xp: 50,
    objectives: [
      'AI’dan xavfsizlik audit uchun to‘g‘ri foydalanishni bilish',
      'Eng ko‘p uchraydigan zaifliklar ro‘yxatini tanish',
      'AI topilmasini haqiqiy xavfdan ajratish',
    ],
    why: 'AI kod yozganda xavfsizlik haqida o‘ylamaydi — siz alohida so‘ramasangiz. Xavfsizlik tekshiruvi standart review’ning bir qismi bo‘lishi kerak.',
    blocks: [
      { type: 'heading', body: 'Nega alohida so‘rash kerak' },
      {
        type: 'text',
        body: '«Kodimni tekshir» so‘rovi ko‘pincha uslub va mantiqqa e’tibor beradi. Xavfsizlik — alohida, aniq nomlangan tekshiruv talab qiladi.',
      },
      {
        type: 'table',
        head: ['Zaiflik', 'Nimani qidirish kerak'],
        rows: [
          ['SQL/NoSQL injection', 'Foydalanuvchi kirishi to‘g‘ridan-to‘g‘ri so‘rovga qo‘shilishi'],
          ['XSS', 'Foydalanuvchi matni tozalanmasdan HTML’ga chiqishi'],
          ['Ochiq sirlar', 'API kalit, parol kodda qattiq yozilgani'],
          ['Ruxsat nazorati', 'Endpoint foydalanuvchi huquqini tekshirmasligi'],
          ['Zaif validatsiya', 'Kirish ma’lumoti chegara va turini tekshirmaslik'],
        ],
      },
      {
        type: 'code',
        lang: 'text',
        body: 'Sen xavfsizlik auditorisan.\n\nQuyidagi kodni FAQAT xavfsizlik nuqtai nazaridan tekshir:\n1. Injection (SQL, NoSQL, komandalar)\n2. XSS va ma\'lumot tozalash\n3. Autentifikatsiya va ruxsat nazorati\n4. Ochiq sirlar yoki maxfiy ma\'lumot\n5. Kirish validatsiyasi\n\nHar topilma uchun: qator, xavf darajasi (kritik/muhim/kichik), aniq tuzatish.\nUslub yoki formatlash haqida yozma.\n\nKOD:\n{{kod}}',
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'AI hammasini topmaydi',
        body: 'AI review — birinchi qatlam, oxirgi emas. Kritik loyihalarda maxsus xavfsizlik vositalari (SAST) va inson auditi ham kerak.',
      },
      { type: 'heading', body: 'Topilmani baholash' },
      {
        type: 'steps',
        items: [
          { title: '1. Haqiqatan qo‘llaniladimi?', body: 'Kod real ishlatiladigan yo‘lda ekanini tekshiring.' },
          { title: '2. Xavf darajasini baholang', body: 'Foydalanuvchi ma’lumotiga ta’sirmi, ichki vositami?' },
          { title: '3. Tuzatishni sinang', body: 'Tavsiya qilingan tuzatish boshqa narsani buzmasligini tekshiring.' },
        ],
      },
    ],
    realWorld: [
      'Yangi API endpoint qo‘shishdan oldin xavfsizlik so‘rovi bilan tekshirish',
      'Ochiq kodli kutubxonadan olingan kod bo‘lagini integratsiyadan oldin audit qilish',
      'Pull request’ga majburiy xavfsizlik review qadamini qo‘shish',
    ],
    practice: {
      title: 'O‘z endpoint’ingizni audit qiling',
      task: 'Foydalanuvchi kirishini qabul qiladigan bitta funksiya yoki endpoint’ni tanlang va yuqoridagi promptni ishlatib xavfsizlik auditidan o‘tkazing.',
      hint: 'Formani yoki API endpoint’ni tanlang — bular eng ko‘p hujum nishoniga aylanadi.',
      sample: 'Login formasi tekshirilganda, parol xato xabarida "foydalanuvchi topilmadi" va "parol xato" alohida ko‘rsatilgani aniqlandi — bu email enumeration xavfi.',
    },
    keyTakeaways: [
      'Xavfsizlik tekshiruvi alohida, aniq so‘rov talab qiladi',
      'Har topilmani haqiqiy qo‘llanilishiga qarab baholang',
      'AI audit — birinchi qatlam, yagona himoya emas',
    ],
  },

  {
    id: 'd-20',
    courseId: c,
    order: 20,
    slug: 'performance-optimizatsiya',
    title: 'AI bilan performance optimizatsiya',
    summary: 'Sekin kodni tezlashtirish — avval o‘lchash, keyin o‘zgartirish.',
    duration: 8,
    xp: 50,
    objectives: [
      'AI yordamida sekin kod joyini aniqlashni bilish',
      'Optimizatsiyani o‘lchov bilan tasdiqlashni o‘rganish',
      'Erta optimizatsiya xavfini tushunish',
    ],
    why: 'AI «tezroq» kod taklif qilishi mumkin, lekin haqiqiy tezlashuvni faqat o‘lchov ko‘rsatadi.',
    blocks: [
      { type: 'heading', body: 'Optimizatsiya tartibi' },
      {
        type: 'steps',
        items: [
          { title: '1. O‘lchang', body: 'Qaysi qism sekin ekanini profiler yoki vaqt o‘lchov bilan aniqlang — taxmin qilmang.' },
          { title: '2. AI’dan sabab so‘rang', body: 'Sekin kod bo‘lagini bering, nega sekinligini tushuntirishni so‘rang.' },
          { title: '3. Variantlarni solishtiring', body: 'AI’dan bir nechta optimizatsiya yo‘lini trade-off bilan so‘rang.' },
          { title: '4. Qayta o‘lchang', body: 'O‘zgarishdan keyin haqiqatan tezlashganini tasdiqlang.' },
        ],
      },
      {
        type: 'callout',
        tone: 'danger',
        title: 'Erta optimizatsiya — vaqt isrofi',
        body: '«Ehtimol sekin bo‘lishi mumkin» degan joyni optimallashtirish — o‘qilishi qiyin kod va real foyda yo‘qligi bilan tugaydi. Avval o‘lchang.',
      },
      {
        type: 'code',
        lang: 'text',
        body: 'Ushbu funksiya 1000 ta element bilan 2 soniya ishlayapti (kutilgan: <100ms).\n\nProfayl natijasi: {{profiler natijasi}}\n\nSabab va 2-3 ta optimizatsiya variantini trade-off (o\'qilishi, xotira, murakkablik) bilan taklif qil. Kodni darrov qayta yozma.',
      },
      { type: 'heading', body: 'Ko‘p uchraydigan sabablar' },
      {
        type: 'table',
        head: ['Sabab', 'Odatiy yechim'],
        rows: [
          ['Keraksiz qayta render (frontend)', 'Memoizatsiya, kalitlarni to‘g‘ri qo‘yish'],
          ['N+1 so‘rov (backend)', 'Bitta so‘rovda birlashtirib olish (join/batch)'],
          ['Katta massivda ichma-ich sikl', 'Map/Set bilan qidiruvni tezlashtirish'],
          ['Keraksiz qayta hisoblash', 'Natijani keshlash'],
        ],
      },
      {
        type: 'compare',
        bad: {
          title: 'Taxmin bilan optimizatsiya',
          body: '«Bu sikl sekin ko‘rinyapti» deb, o‘lchovsiz kodni qayta yozish.',
        },
        good: {
          title: 'O‘lchovga asoslangan optimizatsiya',
          body: 'Profiler bilan aniq sekin joyni topib, o‘sha yerga e’tibor qaratish.',
        },
      },
    ],
    realWorld: [
      'Sahifa yuklanish vaqtini profiler bilan tahlil qilib, eng sekin komponentni topish',
      'Ma’lumotlar bazasi so‘rovini N+1 muammosidan xalos qilish',
      'Katta ro‘yxatni render qilishda virtualizatsiya qo‘llash',
    ],
    practice: {
      title: 'Sekin joyni toping va tuzating',
      task: 'O‘z loyihangizda sekin ishlaydigan bitta funksiyani profil qiling, AI’dan sabab va yechim so‘rang, keyin qayta o‘lchang.',
      hint: 'Brauzer DevTools yoki tilingizning profiler vositasidan foydalaning.',
      sample: 'Ro‘yxat filtri har harf kiritilganda butun massivni qayta hisoblardi — debounce qo‘shilgach, 300ms dan 20ms ga tushdi.',
    },
    keyTakeaways: [
      'Avval o‘lchang, keyin optimallashtiring',
      'AI trade-off’larni tushuntirsin, darrov qayta yozmasin',
      'Optimizatsiyadan keyin natijani albatta qayta o‘lchang',
    ],
  },

  {
    id: 'd-21',
    courseId: c,
    order: 21,
    slug: 'notanish-kod-bazasi',
    title: 'Notanish kod bazasini AI bilan o‘rganish',
    summary: 'Yangi loyihaga kirganda, AI eng tez xarita chizuvchi hamrohingiz.',
    duration: 8,
    xp: 50,
    objectives: [
      'Katta, notanish kod bazasida yo‘nalishni tez topishni bilish',
      'AI’dan arxitektura xaritasini so‘rashni o‘rganish',
      'Tushunmagan qismni xavfsiz aniqlashtirishni bilish',
    ],
    why: 'Yangi ishga yoki loyihaga kirganda eng ko‘p vaqt ketadigan narsa — «bu qayerda va nega shunday» ni tushunish.',
    blocks: [
      { type: 'heading', body: 'Birinchi kun strategiyasi' },
      {
        type: 'steps',
        items: [
          { title: '1. Umumiy xarita', body: 'Papka strukturasi va asosiy texnologiyalarni AI’ga tushuntirtiring.' },
          { title: '2. Kirish nuqtasi', body: 'Ilova qayerdan boshlanishini (main, entry point) toping.' },
          { title: '3. Bitta oqimni kuzating', body: 'Bitta real foydalanuvchi harakatini (masalan, login) boshidan oxirigacha kuzating.' },
          { title: '4. Savol bering', body: 'Tushunmagan qismni AI’dan alohida so‘rang — kod bo‘lagi bilan birga.' },
        ],
      },
      {
        type: 'code',
        lang: 'text',
        body: 'Ushbu papka strukturasi va asosiy fayllarni ko\'rib chiq:\n{{papka strukturasi}}\n\nQisqacha tushuntir:\n1. Bu qanday arxitektura (qatlamlar)\n2. Asosiy texnologiyalar\n3. Yangi funksiya qo\'shish uchun qaysi fayllardan boshlash kerak\n\nBilmagan narsangni "aniq emas" deb belgila, taxmin qilma.',
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'AI butun loyihani "ko‘rmaydi"',
        body: 'Context window cheklangan — AI faqat siz bergan fayllarni biladi. Katta loyihada eng muhim fayllarni tanlab berish siz zimmangizda.',
      },
      { type: 'heading', body: 'Tez-tez beriladigan savollar' },
      {
        type: 'list',
        items: [
          '«Bu funksiya qayerda ishlatiladi?» — chaqiruvchilarni topish',
          '«Nega bu yerda shunday yozilgan?» — tarixiy sabab yoki workaround borligini aniqlash',
          '«Bu o‘xshash ikki fayl orasidagi farq nima?» — dublikatsiya yoki ataylab ajratilganini bilish',
        ],
      },
      {
        type: 'callout',
        tone: 'success',
        title: 'Kod tarixi ham manba',
        body: 'Git blame va eski commit xabarlarini AI’ga birga bering — "nega" degan savolga ko‘pincha shu yerda javob bor.',
      },
    ],
    realWorld: [
      'Yangi dasturchi birinchi haftada loyiha arxitekturasini AI bilan tez tushunadi',
      'Frilanser mijoz kod bazasiga kirib, o‘zgartirish qilishdan oldin xarita chizadi',
      'Jamoa eski, hujjatlanmagan modulni AI yordamida qayta hujjatlaydi',
    ],
    practice: {
      title: 'Notanish kodni xaritalang',
      task: 'O‘zingiz yozmagan (ochiq kodli yoki jamoadoshingizniki) bir modulni tanlang va yuqoridagi promptni ishlatib uning arxitekturasini tushuntirtiring.',
      hint: 'Kichik, lekin real modulni tanlang — butun loyihani emas.',
      sample: 'AI aniqladi: bu modul repository pattern ishlatadi, yangi endpoint qo‘shish uchun 3 ta fayl o‘zgartirish kerak ekan.',
    },
    keyTakeaways: [
      'Umumiy xaritadan boshlab, bitta oqimga chuqurlashing',
      'AI faqat siz bergan kontekstni biladi — muhim faylni tanlash sizda',
      'Git tarixi «nega» savoliga ko‘pincha javob beradi',
    ],
  },

  {
    id: 'd-22',
    courseId: c,
    order: 22,
    slug: 'agent-konfiguratsiyasi',
    title: 'Coding agentlarga konfiguratsiya berish',
    summary: 'Har safar qayta tushuntirish o‘rniga — bir marta yozib, doim ishlatish.',
    duration: 9,
    xp: 50,
    objectives: [
      'Loyiha konfiguratsiya faylining vazifasini tushunish',
      'Yaxshi konfiguratsiya fayli qanday yozilishini bilish',
      'Konfiguratsiyani vaqt o‘tishi bilan yaxshilashni o‘rganish',
    ],
    why: 'Har suhbatda loyiha konvensiyalarini qayta tushuntirish — vaqt yo‘qotish. Konfiguratsiya fayli buni bir marta hal qiladi.',
    blocks: [
      {
        type: 'text',
        body: 'Ko‘pchilik coding agent (Claude Code, Cursor va h.k.) loyiha ildizidagi maxsus faylni (masalan CLAUDE.md yoki .cursor/rules) avtomatik o‘qiydi va har suhbatda kontekst sifatida ishlatadi.',
      },
      { type: 'heading', body: 'Nima yozish kerak' },
      {
        type: 'table',
        head: ['Bo‘lim', 'Misol'],
        rows: [
          ['Texnologiya va konvensiya', 'React + TypeScript, CSS Modules, funksional komponentlar'],
          ['Buyruqlar', 'Test: npm test. Build: npm run build. Lint: npm run lint'],
          ['Qat’iy qoidalar', '«any» tipini ishlatma, har PR uchun test yoz'],
          ['Loyiha tuzilishi', 'src/features/ har modul o‘zining komponenti, testi va state’ini saqlaydi'],
          ['Nima qilmaslik kerak', 'Migratsiyasiz baza sxemasini o‘zgartirma, .env ga tegma'],
        ],
      },
      {
        type: 'code',
        lang: 'text',
        body: '# Loyiha qoidalari\n\n## Stack\nReact 19, TypeScript, Vite, CSS Modules\n\n## Buyruqlar\n- Test: npm test\n- Lint: npm run lint\n- Build: npm run build\n\n## Qat\'iy qoidalar\n- "any" tipidan foydalanma\n- Har yangi funksiya uchun test yoz\n- Komponent props’lari uchun TypeScript interfeys yoz\n\n## Qilmaslik kerak\n- .env fayliga tegma\n- Migratsiyasiz baza sxemasini o\'zgartirma\n- package.json ga so\'ralmagan kutubxona qo\'shma',
      },
      {
        type: 'callout',
        tone: 'success',
        title: 'Qisqa va aniq — uzun emas',
        body: 'Konfiguratsiya fayli har suhbatga kontekst sifatida yuklanadi. Juda uzun fayl context window’ni band qiladi — faqat haqiqatan takrorlanadigan qoidalarni yozing.',
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Vaqt o‘tishi bilan yangilang',
        body: 'Agent bir xil xatoni takrorlasa — bu ko‘pincha konfiguratsiyada shu qoida yo‘qligi belgisi. Xatoni tuzatgandan keyin qoidani faylga qo‘shing.',
      },
      {
        type: 'callout',
        tone: 'success',
        title: 'Level 4 tugadi',
        body: 'Endi Real Project Lab (/projects) da loyihalarni sinang yoki Level 5 — AI for Work ga o’ting.',
      },
    ],
    realWorld: [
      'Jamoa umumiy CLAUDE.md fayli bilan barcha a’zolar bir xil konvensiyada ishlaydi',
      'Yangi loyihaga qo‘shilgan dasturchi konfiguratsiya faylini o‘qib, qoidalarni tez o‘zlashtiradi',
      'Agent takroriy xato qilgan joyga qoida qo‘shilib, xato qaytmaydi',
    ],
    practice: {
      title: 'O‘z loyihangiz uchun konfiguratsiya yozing',
      task: 'Joriy (yoki xayoliy) loyihangiz uchun yuqoridagi shablon asosida konfiguratsiya fayli yozing: stack, buyruqlar, qat’iy qoidalar, qilmaslik kerak bo‘lganlar.',
      hint: 'Agent oxirgi safar takrorlagan xatoni eslang — shuni qoidaga aylantiring.',
      sample: 'Qoida qo‘shildi: "Har API chaqiruvida xato holatini try/catch bilan ishlash" — chunki agent buni ko‘p marta unutgan edi.',
    },
    keyTakeaways: [
      'Konfiguratsiya fayli — bir marta yozib, doim ishlaydigan kontekst',
      'Qisqa va aniq qoidalar uzun tushuntirishdan yaxshiroq ishlaydi',
      'Takroriy xato — konfiguratsiyani yangilash signalidir',
    ],
  },
]
