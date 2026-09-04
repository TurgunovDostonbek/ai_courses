/**
 * Prompt Library — tayyor, sinalgan prompt shablonlari.
 * O‘zgaruvchilar {{qavs}} ichida yoziladi va Prompt Lab da to‘ldiriladi.
 */

export const PROMPT_CATEGORIES = [
  { id: 'coding', label: 'Coding', icon: 'Code2', color: '#22c55e' },
  { id: 'business', label: 'Business', icon: 'Briefcase', color: '#f59e0b' },
  { id: 'education', label: 'Education', icon: 'GraduationCap', color: '#14b8a6' },
  { id: 'marketing', label: 'Marketing', icon: 'Megaphone', color: '#f43f5e' },
  { id: 'writing', label: 'Writing', icon: 'PenLine', color: '#a855f7' },
  { id: 'research', label: 'Research', icon: 'Search', color: '#0ea5e9' },
  { id: 'productivity', label: 'Productivity', icon: 'Zap', color: '#eab308' },
  { id: 'career', label: 'Career', icon: 'UserRound', color: '#6366f1' },
  { id: 'design', label: 'Design', icon: 'Palette', color: '#ec4899' },
]

export const DIFFICULTIES = {
  beginner: 'Boshlang‘ich',
  intermediate: 'O‘rta',
  advanced: 'Yuqori',
}

export const PROMPTS = [
  /* ---------------- CODING ---------------- */
  {
    id: 'pr-code-review',
    title: 'Code review — tuzilgan tekshiruv',
    category: 'coding',
    difficulty: 'intermediate',
    tags: ['review', 'sifat', 'xavfsizlik'],
    description: 'Diff ni aniq yo‘nalishlar bo‘yicha review qiladi va jiddiylik darajasini belgilaydi.',
    body: `Sen tajribali code reviewersan.

Quyidagi diff'ni review qil. Faqat quyidagilarga e'tibor ber:
1. Correctness — mantiqiy xatolar, chegaraviy holatlar
2. Xavfsizlik — injection, XSS, ochiq sirlar
3. Performance — keraksiz render, N+1 so'rovlar
4. Xato ishlash — try/catch, loading va empty holatlar

Har bir topilma uchun:
- Fayl:qator
- Nima uchun muammo
- Aniq tuzatish (kod bilan)
- Jiddiylik: kritik / muhim / kichik

Uslub va formatlash haqida yozma — linter bor.
Muammo topmasang "topilmadi" deb yoz.

DIFF:
{{diff}}`,
    variables: ['diff'],
  },
  {
    id: 'pr-debug',
    title: 'Debug — gipoteza asosida',
    category: 'coding',
    difficulty: 'intermediate',
    tags: ['debug', 'diagnostika'],
    description: 'Darrov kod yozish o‘rniga sabablarni ustuvorlik bilan taklif qiladi.',
    body: `# Kutilgan xatti-harakat
{{kutilgan}}

# Haqiqiy xatti-harakat
{{haqiqiy}}

# Xato xabari
{{xato}}

# Minimal kod
{{kod}}

# Muhit
{{muhit}}

# Nima sinadim
{{urinishlar}}

# So'rov
3 ta eng ehtimolli sababni ustuvorlik bo'yicha ayt.
Har biri uchun qanday tekshirishni yoz.
HOZIRCHA KOD YOZMA — avval diagnostika.`,
    variables: ['kutilgan', 'haqiqiy', 'xato', 'kod', 'muhit', 'urinishlar'],
  },
  {
    id: 'pr-refactor',
    title: 'Xavfsiz refactoring',
    category: 'coding',
    difficulty: 'advanced',
    tags: ['refactor', 'sifat'],
    description: 'Xatti-harakatni saqlagan holda strukturani yaxshilaydi.',
    body: `Vazifa: {{fayl}} ni refactor qil.

Maqsad:
{{maqsad}}

QAT'IY QOIDALAR:
- Public API va props o'zgarmasin
- Xatti-harakat 1:1 saqlansin
- Mavjud testlar o'zgarmasin va o'tsin
- Yangi kutubxona qo'shma

Avval rejani ayt (qaysi fayllar, qanday o'zgarish).
Men tasdiqlaganimdan keyin kod yoz.

KOD:
{{kod}}`,
    variables: ['fayl', 'maqsad', 'kod'],
  },
  {
    id: 'pr-tests',
    title: 'Test generatsiyasi',
    category: 'coding',
    difficulty: 'intermediate',
    tags: ['test', 'sifat'],
    description: 'Chegaraviy holatlarni qamrab oluvchi testlar yozadi.',
    body: `Quyidagi funksiya uchun {{framework}} testlari yoz.

Qamrov:
- Happy path (2 ta)
- Chegaraviy holatlar: bo'sh, null, undefined, juda katta qiymat
- Xato holatlari
- Har bir shart tarmog'i

Qoidalar:
- describe/it strukturasi
- Test nomlari xatti-harakatni tasvirlasin
- Implementatsiya tafsilotini emas, natijani tekshir
- Mock'ni faqat zarur bo'lganda ishlat

Avval qamrab olinadigan holatlar ro'yxatini ber, keyin kodni.

KOD:
{{kod}}`,
    variables: ['framework', 'kod'],
  },
  {
    id: 'pr-component',
    title: 'React komponent spetsifikatsiyasi',
    category: 'coding',
    difficulty: 'intermediate',
    tags: ['react', 'frontend'],
    description: 'To‘liq talablar bilan komponent so‘rovi.',
    body: `React {{versiya}} komponenti yoz: <{{nom}} />

Props:
{{props}}

Talablar:
{{talablar}}

Cheklovlar:
- Styling: {{styling}}
- TypeScript ishlatma, JSDoc yoz
- Yangi kutubxona qo'shma
- Accessible: klaviatura navigatsiyasi va aria atributlari

Holatlar: loading (skeleton), empty state, error state.

Avval komponent tuzilmasini qisqa tushuntir, keyin kodni ber.`,
    variables: ['versiya', 'nom', 'props', 'talablar', 'styling'],
  },
  {
    id: 'pr-commit',
    title: 'Commit xabari (Conventional)',
    category: 'coding',
    difficulty: 'beginner',
    tags: ['git', 'hujjat'],
    description: 'Diff dan standart formatda commit xabari.',
    body: `Quyidagi diff uchun Conventional Commits formatida xabar yoz.

Format:
type(scope): qisqa tavsif (maks 72 belgi)

[bo'sh qator]
Nima uchun bu o'zgarish kerak edi (2-3 qator)

Turlar: feat, fix, refactor, docs, test, chore, perf

DIFF:
{{diff}}`,
    variables: ['diff'],
  },

  /* ---------------- BUSINESS ---------------- */
  {
    id: 'pr-idea-check',
    title: 'Biznes g‘oyani tanqidiy baholash',
    category: 'business',
    difficulty: 'intermediate',
    tags: ['startap', 'validatsiya'],
    description: 'Xushomad emas — zaif joylarni ko‘rsatadi.',
    body: `Sen tanqidiy fikrlaydigan venture analitiksan.
Meni xursand qilishga urinma — zaif joylarni ko'rsat.

G'OYA: {{goya}}
BOZOR: {{bozor}}
RESURSIM: {{resurs}}

Bahola:
1. Muammo real va og'riqlimi? (1-10 va sabab)
2. Kim to'laydi va qancha?
3. Mavjud alternativalar (shu jumladan "hech narsa qilmaslik")
4. Nima uchun aynan hozir?
5. Eng katta 3 ta xavf
6. Bu g'oya muvaffaqiyatsiz bo'lishining eng ehtimolli sababi
7. 2 hafta ichida qanday eng arzon tekshiruv qilish mumkin?

Yakunda: davom etish / o'zgartirish / to'xtatish tavsiyasi.`,
    variables: ['goya', 'bozor', 'resurs'],
  },
  {
    id: 'pr-competitor',
    title: 'Raqobat tahlili jadvali',
    category: 'business',
    difficulty: 'intermediate',
    tags: ['strategiya', 'bozor'],
    description: 'Raqobatchilarni solishtiradi va farqlanish nuqtalarini topadi.',
    body: `Raqobat tahlilini tayyorla.

BIZ: {{biz}}
RAQOBATCHILAR MA'LUMOTI:
{{malumot}}

Jadval: | Kompaniya | Auditoriya | Narx | Kuchli tomoni | Zaif tomoni | Asosiy xabar |

Keyin:
1. Bozorda to'ldirilmagan bo'shliqlar
2. Bizning real farqlanish nuqtamiz (3 ta)
3. Ular yaxshi qilayotgan, biz qilmayotgan 3 narsa
4. Biz qaysi jangda qatnashmasligimiz kerak

QOIDA: faqat men bergan ma'lumotdan foydalan, taxmin qilma.`,
    variables: ['biz', 'malumot'],
  },
  {
    id: 'pr-report',
    title: 'Biznes hisobot',
    category: 'business',
    difficulty: 'beginner',
    tags: ['hisobot', 'tahlil'],
    description: 'Ma’lumotdan qaror qabul qilinadigan hisobot.',
    body: `Sen biznes-analitiksan.

MA'LUMOT:
{{malumot}}

AUDITORIYA: {{auditoriya}}

FORMAT (aynan shu tartibda):
## Xulosa
[3 jumla — eng muhim narsa]

## Asosiy ko'rsatkichlar
| Ko'rsatkich | Joriy | Oldingi | O'zgarish |

## Nima yaxshi ketdi
- [fakt] → [sabab]

## Nima yomon ketdi
- [fakt] → [sabab]

## Tavsiyalar
1. [harakat] — [kutilgan natija] — [ustuvorlik]

QOIDA: faqat berilgan ma'lumotdan foydalan, raqam to'qima.`,
    variables: ['malumot', 'auditoriya'],
  },
  {
    id: 'pr-meeting',
    title: 'Uchrashuv xulosasi',
    category: 'productivity',
    difficulty: 'beginner',
    tags: ['uchrashuv', 'vazifalar'],
    description: 'Yozuvdan qaror va vazifalar jadvali.',
    body: `Uchrashuv yozuvini qayta ishla.

YOZUV:
"""
{{yozuv}}
"""

Ber:
## Qarorlar
- [qaror] (kim qabul qildi)

## Vazifalar
| Vazifa | Mas'ul | Muddat | Ustuvorlik |

## Ochiq savollar
- [savol] — kim javob beradi

## Keyingi qadam
[bitta jumla]

QOIDALAR:
- Faqat yozuvda bor narsani yoz
- Mas'ul aytilmagan bo'lsa "aniqlanmagan" deb yoz
- Aytilmagan muddatni to'qima`,
    variables: ['yozuv'],
  },

  /* ---------------- WRITING ---------------- */
  {
    id: 'pr-email',
    title: 'Ishbilarmon email',
    category: 'writing',
    difficulty: 'beginner',
    tags: ['email', 'muloqot'],
    description: 'Maqsadli, qisqa va javob oladigan xat.',
    body: `Sen ishbilarmon yozishmalar bo'yicha mutaxassissan.

Kimga: {{kimga}}
Vaziyat: {{vaziyat}}
Maqsad: {{maqsad}}

Talablar:
- Maksimal 150 so'z
- Birinchi jumlada maqsad aytilsin
- Aniq harakatga chaqiriq (kim, nima, qachon)
- Ohang: {{ohang}}
- Ortiqcha uzr va kirish so'zlarisiz

Natija: mavzu qatori + xat matni. 2 ta variant ber.`,
    variables: ['kimga', 'vaziyat', 'maqsad', 'ohang'],
  },
  {
    id: 'pr-rewrite',
    title: 'Matnni qayta yozish',
    category: 'writing',
    difficulty: 'beginner',
    tags: ['tahrir', 'uslub'],
    description: 'Ma’noni saqlab, uslub va uzunlikni o‘zgartiradi.',
    body: `Quyidagi matnni qayta yoz.

MAQSAD: {{maqsad}}
AUDITORIYA: {{auditoriya}}
UZUNLIK: {{uzunlik}}
OHANG: {{ohang}}

Qoidalar:
- Ma'no o'zgarmasin
- Har jumla 20 so'zdan qisqa
- Faol nisbat
- Klishe iboralarsiz

Avval nima o'zgartirganingni 3 punktda ayt, keyin matnni ber.

MATN:
"""
{{matn}}
"""`,
    variables: ['maqsad', 'auditoriya', 'uzunlik', 'ohang', 'matn'],
  },
  {
    id: 'pr-summary',
    title: 'Maqsadli xulosa',
    category: 'writing',
    difficulty: 'beginner',
    tags: ['xulosa', 'tahlil'],
    description: 'Hujjatni sizning maqsadingizga qarab xulosalaydi.',
    body: `<document>
{{matn}}
</document>

MENING MAQSADIM: {{maqsad}}

Ber:
1. 3 jumlalik xulosa
2. Maqsadimga aloqador 5 ta asosiy punkt
3. Talab qilinadigan harakatlar (agar bor bo'lsa)
4. E'tibor talab qiladigan joylar
5. Hujjatda javob berilmagan muhim savollar

QOIDA: faqat hujjatdagi ma'lumot; har punktda qaysi bo'limdan olganingni ko'rsat.`,
    variables: ['matn', 'maqsad'],
  },

  /* ---------------- MARKETING ---------------- */
  {
    id: 'pr-social',
    title: 'Ijtimoiy tarmoq posti',
    category: 'marketing',
    difficulty: 'beginner',
    tags: ['smm', 'kontent'],
    description: 'Brend ohangi saqlangan, platformaga mos postlar.',
    body: `Sen SMM mutaxassisisan.

MAVZU: {{mavzu}}
PLATFORMA: {{platforma}}
AUDITORIYA: {{auditoriya}}
MAQSAD: {{maqsad}}

BREND OHANGI (namuna):
"""
{{namuna}}
"""

Ber: 5 ta variant, har biri uchun
- Ilgak (birinchi qator)
- Asosiy matn
- CTA
- Vizual g'oya

QOIDA: klishe iboralar va emoji spam ishlatma.`,
    variables: ['mavzu', 'platforma', 'auditoriya', 'maqsad', 'namuna'],
  },
  {
    id: 'pr-ad',
    title: 'Reklama matni (5 burchak)',
    category: 'marketing',
    difficulty: 'intermediate',
    tags: ['reklama', 'konversiya'],
    description: 'A/B test uchun turli burchaklardan variantlar.',
    body: `Reklama matni yoz.

MAHSULOT: {{mahsulot}}
ASOSIY FOYDA: {{foyda}}
AUDITORIYA: {{auditoriya}}
CHEKLOV: sarlavha {{sarlavha_limit}} belgi, matn {{matn_limit}} belgi

Ber: 5 ta variant, har biri boshqa burchakdan:
1. Muammoga urg'u
2. Natijaga urg'u
3. Ijtimoiy isbot
4. Kutilmagan/qiziqarli
5. To'g'ridan-to'g'ri taklif

Har biri: sarlavha + matn + CTA + kimga eng mos.

QOIDA: isbotlanmagan da'vo yozma ("eng yaxshi", "raqamli 1").`,
    variables: ['mahsulot', 'foyda', 'auditoriya', 'sarlavha_limit', 'matn_limit'],
  },
  {
    id: 'pr-seo',
    title: 'SEO sahifa tuzilmasi',
    category: 'marketing',
    difficulty: 'intermediate',
    tags: ['seo', 'kontent'],
    description: 'Qidiruv niyatidan sahifa strukturasigacha.',
    body: `SEO bo'yicha yordam ber.

SAHIFA MAQSADI: {{maqsad}}
ASOSIY KALIT SO'Z: {{kalit}}
AUDITORIYA: {{auditoriya}}
HUDUD/TIL: {{hudud}}

Ber:
1. Qidiruv niyati tahlili
2. 15 ta bog'liq kalit so'z (uzun dumli variantlar bilan)
3. Sahifa tuzilmasi: H1, H2 lar va har bo'lim mazmuni
4. Meta title (60 belgi) va description (155 belgi) — 3 variant
5. FAQ uchun 5 ta real savol

QOIDA: qidiruv hajmi raqamini to'qima — "tekshirish kerak" deb yoz.`,
    variables: ['maqsad', 'kalit', 'auditoriya', 'hudud'],
  },
  {
    id: 'pr-product-desc',
    title: 'Mahsulot tavsifi',
    category: 'marketing',
    difficulty: 'beginner',
    tags: ['ecommerce', 'kontent'],
    description: 'Katalog uchun bir xil formatdagi tavsiflar.',
    body: `Mahsulot tavsifi yoz.

Nomi: {{nom}}
Xususiyatlar: {{xususiyatlar}}
Narx segmenti: {{segment}}
Auditoriya: {{auditoriya}}

FORMAT (aynan):
[Ilgak — 1 jumla, foydaga urg'u]

[Asosiy matn — 40-60 so'z]

Xususiyatlar:
• [xususiyat] — [foyda]

Kimga mos: [1 jumla]

QOIDA: faqat berilgan xususiyatlardan foydalan, yo'q narsani qo'shma.`,
    variables: ['nom', 'xususiyatlar', 'segment', 'auditoriya'],
  },

  /* ---------------- EDUCATION ---------------- */
  {
    id: 'pr-explain',
    title: 'Mavzuni tushuntirish (darajaga mos)',
    category: 'education',
    difficulty: 'beginner',
    tags: ['o‘rganish', 'tushuntirish'],
    description: 'Murakkab mavzuni sizning darajangizga moslab tushuntiradi.',
    body: `{{mavzu}} ni menga tushuntir.

Mening darajam: {{daraja}}
Nima uchun o'rganyapman: {{maqsad}}

Tuzilma:
1. Intuitiv misol (kundalik hayotdan)
2. Asosiy g'oya — 3 jumla
3. Qanday ishlaydi — qadamma-qadam
4. Qayerda ishlatiladi — 3 real misol
5. Keng tarqalgan noto'g'ri tushuncha
6. Tushunganimni tekshiruvchi 3 savol

QOIDA: har yangi atamani birinchi ishlatganda izohla.`,
    variables: ['mavzu', 'daraja', 'maqsad'],
  },
  {
    id: 'pr-lesson-plan',
    title: 'Dars rejasi',
    category: 'education',
    difficulty: 'intermediate',
    tags: ['o‘qituvchi', 'metodika'],
    description: 'Faoliyatga asoslangan, vaqtga bo‘lingan dars rejasi.',
    body: `Sen tajribali metodistsan.

MAVZU: {{mavzu}}
DARAJA: {{daraja}}
VAQT: {{vaqt}} daqiqa
RESURS: {{resurs}}

Ber:
1. O'quv maqsadlari ("o'quvchi ... qila oladi" shaklida)
2. Dars bosqichlari vaqt taqsimoti bilan
3. Har bosqich uchun aniq faoliyat (nazariya emas)
4. 5 ta tekshiruv savoli
5. Uy vazifasi
6. Qiynaladigan o'quvchilar uchun moslashtirish

QOIDA: har bosqichda o'quvchi nima QILADI — yozing.`,
    variables: ['mavzu', 'daraja', 'vaqt', 'resurs'],
  },
  {
    id: 'pr-quiz',
    title: 'Quiz generatori',
    category: 'education',
    difficulty: 'intermediate',
    tags: ['test', 'baholash'],
    description: 'Tushunishni tekshiradigan savollar va izohlar.',
    body: `{{mavzu}} bo'yicha quiz tuz.

Daraja: {{daraja}}
Savollar soni: {{soni}}

Talablar:
- Turlar aralash: multiple choice, to'g'ri/noto'g'ri, ochiq savol
- 30% bilish, 50% tushunish/qo'llash, 20% tahlil
- Chalg'ituvchi variantlar tipik xato tushunchalarga asoslansin

Har savol uchun:
- Savol
- Variantlar
- To'g'ri javob
- Nima uchun to'g'ri
- Nima uchun boshqalar noto'g'ri

QOIDA: "hammasi to'g'ri" tipidagi variantlardan foydalanma.`,
    variables: ['mavzu', 'daraja', 'soni'],
  },
  {
    id: 'pr-language',
    title: 'Til o‘rganish hamsuhbati',
    category: 'education',
    difficulty: 'beginner',
    tags: ['til', 'amaliyot'],
    description: 'Darajaga moslashgan roleplay hamsuhbat.',
    body: `Sen mening {{til}} tili o'qituvchimsan.

Mening darajam: {{daraja}}
Maqsad: {{maqsad}}

QOIDALAR:
1. Men bilan faqat {{til}} tilida gaplash
2. Mening darajamga mos so'z va grammatika ishlat
3. Xato qilsam: avval suhbatni davom ettir, keyin qavs ichida tuzatishni va sababini yoz
4. Har 5 xabardan keyin 3 ta yangi so'z o'rgat
5. Meni gapirishga undab, savol berib tur

Boshla: {{vaziyat}}`,
    variables: ['til', 'daraja', 'maqsad', 'vaziyat'],
  },

  /* ---------------- RESEARCH ---------------- */
  {
    id: 'pr-grounded-qa',
    title: 'Grounded savol-javob',
    category: 'research',
    difficulty: 'advanced',
    tags: ['rag', 'aniqlik'],
    description: 'Model faqat berilgan manbadan javob beradi.',
    body: `<source>
{{manba}}
</source>

QOIDALAR:
1. Faqat <source> dagi ma'lumotdan foydalan
2. Manbada javob bo'lmasa: "Manbada bu ma'lumot yo'q" deb yoz
3. Har da'vodan keyin [paragraf N] ko'rsat
4. O'z bilimingdan qo'shma, taxmin qilma

SAVOL: {{savol}}`,
    variables: ['manba', 'savol'],
  },
  {
    id: 'pr-research-structure',
    title: 'Tadqiqot tuzilmasi',
    category: 'research',
    difficulty: 'intermediate',
    tags: ['tadqiqot', 'reja'],
    description: 'Mavzuni tekshiriladigan tadqiqot rejasiga aylantiradi.',
    body: `Tadqiqot ishimda yordam ber (yozib berma, yo'naltir).

MAVZU: {{mavzu}}
DARAJA: {{daraja}}
HOZIRGI HOLAT: {{holat}}

Ber:
1. Tadqiqot savolini aniqlashtirish (3 ta torroq variant)
2. Adabiyot qidirish uchun kalit so'zlar
3. Ishning tuzilmasi va har bo'lim mazmuni
4. Qanday manba turlarini qidirish kerak
5. Menga berilishi mumkin bo'lgan 10 ta himoya savoli

QOIDA: matn yozib berma; manba nomlarini to'qima — qidirish yo'lini ko'rsat.`,
    variables: ['mavzu', 'daraja', 'holat'],
  },
  {
    id: 'pr-fact-check',
    title: 'Javobni fakt-tekshirish',
    category: 'research',
    difficulty: 'beginner',
    tags: ['tekshiruv', 'sifat'],
    description: 'AI javobidagi tekshirilishi shart da’volarni ajratadi.',
    body: `Quyidagi javobni tahlil qil.

JAVOB:
"""
{{javob}}
"""

Ber:
1. Tekshirilishi SHART bo'lgan faktik da'volar ro'yxati
2. Har biri uchun: qanday tekshirish mumkin (aniq usul)
3. Qaysi qismlar fikr/talqin, qaysilari fakt
4. Ishonch darajasi past bo'lgan joylar
5. Javobga qarshi eng kuchli e'tiroz

QOIDA: da'volarni o'zgartirmasdan aynan ko'chir.`,
    variables: ['javob'],
  },

  /* ---------------- CAREER ---------------- */
  {
    id: 'pr-resume',
    title: 'Rezyume bo‘limini kuchaytirish',
    category: 'career',
    difficulty: 'beginner',
    tags: ['rezyume', 'karyera'],
    description: 'Vazifalar ro‘yxatini natijaga aylantiradi.',
    body: `Rezyumemdagi tajriba bo'limini kuchaytir.

LAVOZIM: {{lavozim}}
HOZIRGI MATN:
"""
{{matn}}
"""

MAQSADLI VAKANSIYA:
{{vakansiya}}

Qoidalar:
- Har punkt harakat fe'li bilan boshlansin
- Vazifa emas, NATIJA yozilsin (imkon bo'lsa raqam bilan)
- Vakansiya talablariga mos kalit so'zlar ishlatilsin
- Har punkt 2 qatordan oshmasin
- Menda bo'lmagan tajribani qo'shma

Ber: 5-6 punkt + nima o'zgartirganingning izohi.`,
    variables: ['lavozim', 'matn', 'vakansiya'],
  },
  {
    id: 'pr-interview',
    title: 'Intervyuga tayyorgarlik',
    category: 'career',
    difficulty: 'intermediate',
    tags: ['intervyu', 'karyera'],
    description: 'Vakansiyaga mos savollar va javob strukturasi.',
    body: `Meni intervyuga tayyorla.

VAKANSIYA:
{{vakansiya}}

MENING TAJRIBAM:
{{tajriba}}

Ber:
1. 10 ta ehtimolli savol (5 texnik, 3 xatti-harakat, 2 qiyin)
2. Har savol uchun javob strukturasi (STAR formatida)
3. Mening tajribamdagi qaysi misol qaysi savolga mos
4. Mening zaif joylarim va ularni qanday ochiq aytish
5. Men beradigan 5 ta savol

QOIDA: tayyor javob yozma — struktura va yo'nalish ber.`,
    variables: ['vakansiya', 'tajriba'],
  },
  {
    id: 'pr-proposal',
    title: 'Freelance taklif (proposal)',
    category: 'career',
    difficulty: 'intermediate',
    tags: ['freelance', 'sotuv'],
    description: 'Mijoz muammosidan boshlanadigan taklif.',
    body: `Loyiha taklifi yoz.

MIJOZ MUAMMOSI (uning so'zlari bilan): {{muammo}}
MENING YECHIMIM: {{yechim}}
TAJRIBAM: {{tajriba}}
BYUDJET/MUDDAT: {{shartlar}}

Tuzilma:
1. Muammoni qanday tushunganim
2. Taklif etilayotgan yechim va nega aynan shunday
3. Bosqichlar va natijalar
4. Muddat va narx
5. Nima KIRMAYDI (aniq chegara)
6. Nega men (qisqa)
7. Keyingi qadam

QOIDA: muammodan boshla, o'zimdan emas. Jargondan qoch.`,
    variables: ['muammo', 'yechim', 'tajriba', 'shartlar'],
  },

  /* ---------------- DESIGN / PRODUCTIVITY ---------------- */
  {
    id: 'pr-image-prompt',
    title: 'Rasm prompti quruvchi',
    category: 'design',
    difficulty: 'beginner',
    tags: ['image', 'dizayn'],
    description: 'G‘oyadan to‘liq strukturalangan rasm promptiga.',
    body: `Quyidagi g'oyadan professional rasm prompti tuz.

G'OYA: {{goya}}
MAQSAD: {{maqsad}}
USLUB: {{uslub}}
NISBAT: {{nisbat}}

Struktura: [Sub'yekt] + [Harakat/holat] + [Muhit] + [Yorug'lik] + [Uslub] + [Kompozitsiya] + [Texnik parametrlar]

Ber:
1. Asosiy prompt (ingliz tilida)
2. 3 ta uslub varianti
3. Nima qo'shilmasligi kerak (negative prompt)`,
    variables: ['goya', 'maqsad', 'uslub', 'nisbat'],
  },
  {
    id: 'pr-decompose',
    title: 'Vazifani dekompozitsiya qilish',
    category: 'productivity',
    difficulty: 'intermediate',
    tags: ['reja', 'boshqaruv'],
    description: 'Katta vazifani bajariladigan qadamlarga bo‘ladi.',
    body: `Vazifa: {{vazifa}}

HOZIRCHA BAJARMA. Avval:
1. Vazifani 5-7 mustaqil bosqichga bo'l
2. Har bosqich uchun: kirish, chiqish, muvaffaqiyat mezoni
3. Bog'liqliklarni ko'rsat
4. Eng xavfli/noaniq bosqichni belgila
5. Menga aniqlashtirish uchun 5 ta savol ber

Men rejani tasdiqlagach, 1-bosqichdan boshlaymiz.`,
    variables: ['vazifa'],
  },
  {
    id: 'pr-improve-prompt',
    title: 'Meta-prompt: promptni yaxshilash',
    category: 'productivity',
    difficulty: 'advanced',
    tags: ['prompt', 'meta'],
    description: 'Mavjud promptni diagnostika qilib, yaxshilangan versiyasini beradi.',
    body: `Sen prompt engineering bo'yicha mutaxassissan.

MENING PROMPTIM:
"""
{{prompt}}
"""

MAQSADIM: {{maqsad}}

Qil:
1. Yetishmayotgan elementlarni ro'yxatla (rol, kontekst, vazifa, cheklov, format, misol)
2. Har bir kamchilik natijaga qanday ta'sir qilishini yoz
3. Yaxshilangan promptni to'liq ber
4. Nimani o'zgartirganingni qisqa izohla`,
    variables: ['prompt', 'maqsad'],
  },
  {
    id: 'pr-critic',
    title: 'Tanqidchi bosqichi',
    category: 'productivity',
    difficulty: 'beginner',
    tags: ['sifat', 'iteratsiya'],
    description: 'Har qanday natijani bir bosqichda yaxshilaydi.',
    body: `Quyidagi natijaga tanqidiy qara.

NATIJA:
"""
{{natija}}
"""

MEZONLAR: {{mezonlar}}

Qil:
1. 3 ta eng zaif joyni top va nima uchun zaif ekanini ayt
2. Qanday muhim jihat tushib qolgan
3. Qanday noto'g'ri taxminlar bor
4. Tuzatilgan to'liq versiyani ber

QOIDA: xushomad qilma, aniq kamchiliklarni ayt.`,
    variables: ['natija', 'mezonlar'],
  },
]

export const PROMPT_BY_ID = Object.fromEntries(PROMPTS.map((p) => [p.id, p]))

export const getPrompt = (id) => PROMPT_BY_ID[id] || null
