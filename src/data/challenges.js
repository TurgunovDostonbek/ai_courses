/**
 * Kunlik challenge lar va Prompt Practice mashqlari.
 */

export const CHALLENGES = [
  {
    id: 'ch-01',
    title: 'Ish kuningizni avtomatlashtiring',
    difficulty: 'beginner',
    xp: 80,
    estimate: 15,
    category: 'productivity',
    task: 'AI yordamida bugungi ish kuningiz uchun 5 ta vazifani avtomatlashtirish rejasini tuzing.',
    context:
      'Har bir vazifa uchun: hozir qancha vaqt ketadi, AI qanday yordam beradi, qanday prompt kerak va qancha vaqt tejaladi.',
    criteria: [
      '5 ta aniq vazifa yozilgan',
      'Har biriga hozirgi vaqt sarfi ko‘rsatilgan',
      'Har biriga tayyor prompt yozilgan',
      'Tejaladigan vaqt hisoblangan',
    ],
    hint: 'Takrorlanuvchi va matn bilan bog‘liq vazifalardan boshlang.',
  },
  {
    id: 'ch-02',
    title: 'Yomon promptni davolang',
    difficulty: 'beginner',
    xp: 80,
    estimate: 10,
    category: 'prompt',
    task: '«Menga marketing rejasi kerak» promptini professional darajaga ko‘taring.',
    context: 'Rol, kontekst, auditoriya, cheklovlar, format va misol elementlarini qo‘shing.',
    criteria: ['Barcha 6 element mavjud', 'Cheklovlar o‘lchanadigan', 'Format aniq belgilangan'],
    hint: 'Har element uchun alohida qator ajrating.',
  },
  {
    id: 'ch-03',
    title: 'Hallucination ovi',
    difficulty: 'intermediate',
    xp: 100,
    estimate: 20,
    category: 'verification',
    task: 'O‘zingiz yaxshi biladigan tor mavzuda AI dan 10 ta fakt so‘rang va har birini tekshiring.',
    context: 'Mahalliy yoki tor sohaviy mavzu tanlang — model bunday joyda ko‘proq xato qiladi.',
    criteria: ['10 ta fakt so‘ralgan', 'Har biri manbadan tekshirilgan', 'Xatolar soni yozilgan'],
    hint: 'Keyin grounding qo‘shib qayta so‘rang — xatolar kamayadimi?',
  },
  {
    id: 'ch-04',
    title: 'Ikki model duel',
    difficulty: 'beginner',
    xp: 80,
    estimate: 15,
    category: 'tools',
    task: 'Bitta murakkab savolni 2 xil AI vositasiga bering va javoblarni 3 mezon bo‘yicha baholang.',
    context: 'Mezonlar: aniqlik, foydalilik, struktura. Har biriga 1–5 ball qo‘ying.',
    criteria: ['2 ta vosita ishlatilgan', 'Bir xil prompt berilgan', 'Ballar va xulosa yozilgan'],
    hint: 'Farqlar — tekshirilishi kerak bo‘lgan joylarni ko‘rsatadi.',
  },
  {
    id: 'ch-05',
    title: 'Shablon kutubxonasini boshlang',
    difficulty: 'beginner',
    xp: 80,
    estimate: 25,
    category: 'prompt',
    task: 'Eng ko‘p takrorlanadigan 3 vazifangiz uchun prompt shabloni yozing va saqlang.',
    context: 'Har shablonda o‘zgarmas qism va {{o‘zgaruvchilar}} aniq ajratilsin.',
    criteria: ['3 ta shablon', 'O‘zgaruvchilar belgilangan', 'Har biri bir marta sinalgan'],
    hint: 'Prompt Lab da quring, Saqlangan promptlarga qo‘shing.',
  },
  {
    id: 'ch-06',
    title: 'Grounded assistant',
    difficulty: 'intermediate',
    xp: 100,
    estimate: 20,
    category: 'prompt',
    task: 'Bitta hujjat asosida faqat o‘sha hujjatdan javob beradigan prompt yozing va sinang.',
    context: 'Hujjatda yo‘q savol bering — model to‘g‘ri «topilmadi» deyishi kerak.',
    criteria: ['XML teglar ishlatilgan', 'Bilmaslikka ruxsat berilgan', 'Manba ko‘rsatish talab qilingan', 'Salbiy test o‘tkazilgan'],
    hint: 'Bu — RAG tizimining asosiy prompti.',
  },
  {
    id: 'ch-07',
    title: 'Zanjir quring',
    difficulty: 'intermediate',
    xp: 100,
    estimate: 25,
    category: 'prompt',
    task: 'Real vazifangizni 4 bosqichli prompt zanjiriga ajrating va bajaring.',
    context: 'Oxirgi bosqich tanqidchi bo‘lsin: natijani tanqid qilib, tuzatilgan versiyani bersin.',
    criteria: ['4 bosqich aniq', 'Har bosqichning kirish/chiqishi yozilgan', 'Tanqidchi bosqichi bor'],
    hint: 'Bitta katta prompt bilan solishtiring — farq sezilarli.',
  },
  {
    id: 'ch-08',
    title: 'Code review sinovi',
    difficulty: 'intermediate',
    xp: 100,
    estimate: 20,
    category: 'coding',
    task: 'Oxirgi PR ingizni AI review dan o‘tkazing va topilmalarni tasniflang.',
    context: 'Nechta haqiqiy muammo, nechta noto‘g‘ri signal? Prompt ni shunga qarab sozlang.',
    criteria: ['Review prompti yo‘nalishlar bilan yozilgan', 'Topilmalar tasniflangan', 'Prompt yaxshilangan'],
    hint: 'Uslub haqida yozishni taqiqlang — linter bor.',
  },
  {
    id: 'ch-09',
    title: 'Eval to‘plami',
    difficulty: 'advanced',
    xp: 120,
    estimate: 30,
    category: 'engineering',
    task: 'Doimiy ishlatadigan promptingiz uchun 20 holatdan iborat eval to‘plami tuzing.',
    context: 'Har holat: kirish + kutilgan natija yoki baholash mezoni. Chegaraviy holatlarni kiriting.',
    criteria: ['20 ta holat', 'Chegaraviy holatlar bor', 'Baholash mezoni aniq', 'Joriy prompt baholangan'],
    hint: 'Keyin promptni o‘zgartirib, ball qanday o‘zgarganini ko‘ring.',
  },
  {
    id: 'ch-10',
    title: 'Red team',
    difficulty: 'advanced',
    xp: 120,
    estimate: 30,
    category: 'security',
    task: 'O‘z AI funksiyangizni 10 xil usulda buzishga urinib ko‘ring.',
    context: 'Prompt injection, rol almashtirish, system prompt so‘rash, cheklovlarni chetlab o‘tish.',
    criteria: ['10 ta urinish', 'Muvaffaqiyatli hujumlar yozilgan', 'Himoya choralari qo‘shilgan'],
    hint: 'Kritik himoyani kod darajasida qo‘ying, promptda emas.',
  },
  {
    id: 'ch-11',
    title: 'Workflow xaritasi',
    difficulty: 'intermediate',
    xp: 100,
    estimate: 25,
    category: 'productivity',
    task: 'Takrorlanuvchi jarayoningizni 5–6 bosqichga bo‘lib, har biriga vosita va prompt biriktiring.',
    context: 'Bosqichlar orasidagi uzatish formatini ham belgilang.',
    criteria: ['Bosqichlar aniq', 'Har biriga vosita', 'Har biriga prompt shabloni', 'Uzatish formati yozilgan'],
    hint: 'Bu hujjat jamoangiz uchun eng qimmatli aktiv bo‘ladi.',
  },
  {
    id: 'ch-12',
    title: 'Anonimlashtirish mashqi',
    difficulty: 'beginner',
    xp: 80,
    estimate: 10,
    category: 'security',
    task: 'Real ish matningizdagi barcha maxfiy elementlarni placeholder bilan almashtiring.',
    context: 'Ism, telefon, email, summa, kompaniya nomi, ichki ID.',
    criteria: ['Barcha maxfiy elementlar topilgan', 'Placeholder tizimi izchil', 'Natija AI ga xavfsiz beriladigan'],
    hint: 'Natijadagi placeholder‘larni keyin o‘zingiz almashtirasiz.',
  },
  {
    id: 'ch-13',
    title: 'Kontekst kuchi',
    difficulty: 'beginner',
    xp: 80,
    estimate: 10,
    category: 'prompt',
    task: 'Bitta savolni kontekstsiz va to‘liq kontekst bilan bering, javoblarni solishtiring.',
    context: 'Kontekst: kim siz, maqsad, auditoriya, cheklovlar.',
    criteria: ['Ikkala javob saqlangan', 'Farqlar 3 punktda yozilgan'],
    hint: 'Bu mashq kontekstning qiymatini eng aniq ko‘rsatadi.',
  },
  {
    id: 'ch-14',
    title: 'JSON extractor',
    difficulty: 'intermediate',
    xp: 100,
    estimate: 20,
    category: 'engineering',
    task: 'Erkin matndan 5 maydonli JSON ajratadigan prompt yozing va 3 xil matnda sinang.',
    context: 'Sxema, «faqat JSON» qoidasi va bo‘sh maydon uchun qoida bo‘lsin.',
    criteria: ['Sxema aniq', 'Uch sinovda ham to‘g‘ri JSON', 'Bo‘sh maydon qoidasi ishlagan'],
    hint: 'Parse kodini try/catch bilan himoyalang.',
  },
];

/** Sana bo‘yicha barqaror kunlik challenge tanlaydi (har kuni bir xil bo‘ladi). */
export function getDailyChallenge(date = new Date()) {
  const dayIndex = Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000
  )
  return CHALLENGES[dayIndex % CHALLENGES.length]
}

export const getChallenge = (id) => CHALLENGES.find((c) => c.id === id) || null

/* ------------------------------------------------------------------ */
/* Prompt Practice mashqlari                                           */
/* ------------------------------------------------------------------ */

export const PRACTICE_TASKS = [
  {
    id: 'pt-01',
    badPrompt: 'Menga website yarat.',
    scenario: 'Siz kichik stomatologiya klinikasi uchun bir sahifali sayt yaratmoqchisiz.',
    difficulty: 'beginner',
    missing: ['context', 'goal', 'specificity', 'constraints', 'format'],
    idealPrompt: `Sen senior frontend dasturchisan.

KONTEKST
Kichik stomatologiya klinikasi uchun bir sahifali landing kerak.
Auditoriya: 25–50 yosh, Toshkent, telefondan kiradi.
Maqsad: qabulga yozilish uchun qo'ng'iroq qilish.

VAZIFA
Bir sahifali responsive landing yarat.
Bo'limlar: hero, xizmatlar, shifokorlar, narxlar, sharhlar, aloqa.

CHEKLOVLAR
- HTML + CSS (framework yo'q)
- Mobil-first
- Rang: oq + ko'k (#2563eb)
- Yuklanish tez bo'lsin, tashqi shrift yo'q

NATIJA
Bitta index.html fayl, CSS <style> ichida, izohlar bilan.`,
    feedback: {
      context: 'Qanday biznes, qayerda, kim uchun — hech narsa aytilmagan.',
      goal: 'Sayt qanday natijaga erishishi kerak — noma’lum.',
      specificity: 'Qaysi bo‘limlar, qanday sahifalar — aniq emas.',
      constraints: 'Texnologiya, rang, cheklovlar berilmagan.',
      format: 'Natija qanday ko‘rinishda bo‘lishi aytilmagan.',
      examples: 'Namuna yoki uslub misoli yo‘q.',
    },
  },
  {
    id: 'pt-02',
    badPrompt: 'Bu matnni yaxshila.',
    scenario: 'Mijozga yuboriladigan taklif matnini kuchaytirmoqchisiz.',
    difficulty: 'beginner',
    missing: ['context', 'goal', 'specificity', 'constraints'],
    idealPrompt: `Sen tajribali biznes-muharrirsan.

KONTEKST
Bu matn potensial mijozga yuboriladigan taklif xatining bir qismi.
Mijoz: o'rta biznes rahbari, texnik emas, vaqti kam.

VAZIFA
Matnni qayta yoz: ishonarli va o'qishga oson bo'lsin.

CHEKLOVLAR
- Maksimal 120 so'z
- Har jumla 20 so'zdan qisqa
- Faol nisbat
- Jargon va klishe iboralarsiz
- Aniq harakatga chaqiriq bilan tugasin

NATIJA
1) Nima o'zgartirganing — 3 punkt
2) Yangi matn

MATN:
"""..."""`,
    feedback: {
      context: 'Matn qayerda ishlatiladi, kim o‘qiydi — aytilmagan.',
      goal: '«Yaxshilash» nimani anglatadi: qisqartirishmi, ishonarli qilishmi?',
      specificity: 'Qaysi jihat yaxshilanishi kerakligi aniq emas.',
      constraints: 'Uzunlik, ohang va uslub cheklovlari yo‘q.',
    },
  },
  {
    id: 'pt-03',
    badPrompt: 'Kodimni tekshir.',
    scenario: 'React komponentingizni review qildirmoqchisiz.',
    difficulty: 'intermediate',
    missing: ['context', 'specificity', 'format', 'constraints'],
    idealPrompt: `Sen tajribali React code reviewersan.

KONTEKST
React 19, JavaScript (TypeScript yo'q), CSS Modules.
Bu komponent production'da ishlatiladi, kuniga ~10k ko'rish.

VAZIFA
Quyidagi komponentni review qil. Faqat shu yo'nalishlarda:
1. Correctness va chegaraviy holatlar
2. Keraksiz re-render
3. Accessibility
4. Xato va loading holatlari

FORMAT
Har topilma uchun:
- Qator raqami
- Muammo sababi
- Aniq tuzatish (kod)
- Jiddiylik: kritik / muhim / kichik

CHEKLOV
Uslub va formatlash haqida yozma — linter bor.
Muammo topmasang "topilmadi" deb yoz.

KOD:
...`,
    feedback: {
      context: 'Qaysi framework, versiya, qanday muhit — noma’lum.',
      specificity: 'Nimani tekshirish kerakligi aytilmagan.',
      format: 'Natija qanday ko‘rinishda bo‘lishi belgilanmagan.',
      constraints: 'Nimaga e’tibor bermaslik kerakligi aytilmagan.',
    },
  },
  {
    id: 'pt-04',
    badPrompt: 'Biznes rejasi yoz.',
    scenario: 'Kichik onlayn do‘kon ochmoqchisiz.',
    difficulty: 'intermediate',
    missing: ['context', 'goal', 'specificity', 'constraints', 'format'],
    idealPrompt: `Sen amaliy biznes-maslahatchisan.

KONTEKST
Toshkentda qo'lda yasalgan sovg'alar onlayn do'koni.
Boshlang'ich kapital: 15 mln so'm. Men yakka ishlayman.
Hozircha: Instagram sahifa, oyiga ~20 buyurtma.

VAZIFA
Birinchi 6 oy uchun amaliy biznes-reja tuz.

FORMAT
1. Muammo va yechim (3 jumla)
2. Mijoz segmentlari
3. Daromad modeli va narx mantiqi
4. Xarajatlar (doimiy / o'zgaruvchan)
5. Zararsizlik nuqtasi — formulasi bilan
6. Oylik bosqichlar
7. Asosiy taxminlar va ularni tekshirish usuli
8. Top 5 xavf

CHEKLOVLAR
- Byudjetdan oshadigan taklif berma
- Raqamlarni men beraman, sen formulani ber
- Har taxminni aniq belgila`,
    feedback: {
      context: 'Qanday biznes, qayerda, qanday resurs — hech narsa yo‘q.',
      goal: 'Reja kim uchun va nima uchun kerak — noma’lum.',
      specificity: 'Qaysi bo‘limlar kerakligi aytilmagan.',
      constraints: 'Byudjet va resurs cheklovi berilmagan.',
      format: 'Natija strukturasi belgilanmagan.',
    },
  },
  {
    id: 'pt-05',
    badPrompt: 'Ushbu hujjat haqida gapir.',
    scenario: '40 sahifali shartnomani tahlil qilmoqchisiz.',
    difficulty: 'intermediate',
    missing: ['goal', 'specificity', 'format', 'constraints'],
    idealPrompt: `<role>Sen shartnomalar bo'yicha tajribali tahlilchisan.</role>

<context>
Men xizmat ko'rsatuvchi tomonman. Shartnomani imzolashdan oldin
menga noqulay bo'lishi mumkin bo'lgan bandlarni topmoqchiman.
</context>

<document>
{{shartnoma}}
</document>

<task>
1. Menga noqulay 5 ta bandni top
2. Har biri uchun: band raqami, xavf sababi, taklif etilgan tahrir
3. Hujjatda yo'q, lekin bo'lishi kerak bo'lgan bandlarni ayt
</task>

<constraints>
- Faqat hujjatdagi matnga tayan
- Har da'voda band raqamini ko'rsat
- Bu huquqiy maslahat emasligini eslat
</constraints>

<output_format>
Markdown jadval: Band | Xavf | Jiddiylik | Taklif
</output_format>`,
    feedback: {
      goal: 'Hujjatdan nima kerakligi aytilmagan.',
      specificity: '«Gapir» — model nima qilishini bilmaydi.',
      format: 'Natija formati belgilanmagan.',
      constraints: 'Faqat hujjatga tayanish qoidasi yo‘q — hallucination xavfi.',
    },
  },
  {
    id: 'pt-06',
    badPrompt: 'Instagram uchun post yoz.',
    scenario: 'Qahvaxonangiz uchun yangi mavsumiy ichimlikni e’lon qilmoqchisiz.',
    difficulty: 'beginner',
    missing: ['context', 'goal', 'specificity', 'constraints', 'examples'],
    idealPrompt: `Sen SMM mutaxassisisan.

KONTEKST
Toshkentdagi kichik mustaqil qahvaxona.
Yangi mavsumiy ichimlik: "Asal-dolchin latte", narxi 32 000 so'm.
Auditoriya: 20–35 yosh, talabalar va ofis xodimlari, atrofdagi 2 km.

MAQSAD
Odamlar shu hafta kelib sinab ko'rishsin.

BREND OHANGI (namuna):
"""
Ertalab tirbandlikda turibsizmi? Bizda 3 daqiqada tayyor.
Kelib oling, iliq holida.
"""

VAZIFA
5 ta post varianti yoz.

FORMAT
Har biri: ilgak (1 qator) + matn (40 so'zgacha) + CTA + vizual g'oya

CHEKLOVLAR
- Klishe iboralar va emoji spam yo'q
- Narx aytilsin
- Mahalliy kontekst sezilsin`,
    feedback: {
      context: 'Qanday biznes, qanday mahsulot, kim uchun — yo‘q.',
      goal: 'Post nimaga erishishi kerak — aytilmagan.',
      specificity: 'Nechta variant, qanday uzunlik — noma’lum.',
      constraints: 'Ohang va cheklovlar berilmagan.',
      examples: 'Brend ohangi namunasi yo‘q.',
    },
  },
  {
    id: 'pt-07',
    badPrompt: 'Rezyumemni yaxshila.',
    scenario: 'IT sohasida ishga joylashish uchun rezyumeni professional darajaga olib chiqmoqchisiz.',
    difficulty: 'beginner',
    missing: ['context', 'goal', 'specificity', 'constraints', 'format'],
    idealPrompt: `Sen HR va rezyume mutaxassisisan.

KONTEKST
3 yillik frontend dasturchi tajribasi bor. React va TypeScript bilan ishlayman.
Maqsadli lavozim: Middle Frontend Developer, IT kompaniyasi.

MAQSAD
Rezyume HR skrining bosqichidan o'tib, intervyuga chaqirilishi kerak.

VAZIFA
Quyidagi tajriba tavsifini natijaga yo'naltirilgan 4 ta punktga aylantir:
{{tajriba matni}}

CHEKLOVLAR
- Har punkt harakat fe'li bilan boshlansin
- Iloji bo'lsa raqam qo'sh (masalan: "yuklanish vaqtini 40% qisqartirdim")
- Aslida bo'lmagan tajribani qo'shma

FORMAT
Markdown ro'yxat, har punkt bitta qator.`,
    feedback: {
      context: 'Qancha tajriba, qaysi lavozimga — aytilmagan.',
      goal: 'Rezyume nimaga xizmat qilishi (qaysi bosqichdan o‘tishi) noma’lum.',
      specificity: 'Nechta punkt, qanday chuqurlikda — belgilanmagan.',
      constraints: 'Uydirma tajriba qo‘shilmasligi haqida ko‘rsatma yo‘q.',
      format: 'Natija qanday ko‘rinishda kerakligi aytilmagan.',
    },
  },
  {
    id: 'pt-08',
    badPrompt: 'Dars rejasi tuz.',
    scenario: 'Maktabda 7-sinf o‘quvchilariga informatika darsi o‘tkazish uchun reja kerak.',
    difficulty: 'beginner',
    missing: ['context', 'goal', 'specificity', 'format'],
    idealPrompt: `Sen tajribali informatika o'qituvchisisan.

KONTEKST
7-sinf, 40 daqiqalik dars, mavzu — algoritmlar asoslari.
Sinfda 25 o'quvchi, proyektor mavjud.

MAQSAD
Dars oxirida o'quvchilar oddiy algoritmni aniq qadamlarga ajrata olishlari kerak.

VAZIFA
40 daqiqalik dars rejasini tuz: kirish, asosiy qism, amaliy mashq, yakun.

FORMAT
Jadval: vaqt, faoliyat, maqsad ustunlari bilan.

CHEKLOVLAR
Kamida bitta guruhli amaliy mashq bo'lsin.`,
    feedback: {
      context: 'Qaysi sinf, qancha vaqt, qanday sharoit — yo‘q.',
      goal: 'O‘quvchi dars oxirida nimaga erishishi kerakligi aytilmagan.',
      specificity: 'Dars qanday bosqichlardan iboratligi noaniq.',
      format: 'Reja qanday ko‘rinishda kerakligi ko‘rsatilmagan.',
    },
  },
  {
    id: 'pt-09',
    badPrompt: 'Hisobot yoz.',
    scenario: 'Haftalik jamoa hisobotini rahbaringizga yubormoqchisiz.',
    difficulty: 'beginner',
    missing: ['context', 'goal', 'specificity', 'constraints', 'format'],
    idealPrompt: `Sen jamoa boshlig'isan.

KONTEKST
5 kishilik marketing jamoasi. Shu hafta 3 ta loyiha ustida ishladik.
Xom ma'lumot: {{malumot}}

MAQSAD
Rahbar 2 daqiqada jamoaning holatini tushunishi kerak.

VAZIFA
Yuqoridagi ma'lumotdan haftalik hisobot yoz.

FORMAT
3 bo'lim: Bajarilgan, Davom etayotgan, Bloklar (to'siqlar).

CHEKLOVLAR
Umumiy hajm 150 so'zdan oshmasin.`,
    feedback: {
      context: 'Jamoa hajmi, qaysi loyihalar — aytilmagan.',
      goal: 'Hisobot kimga va nima uchun kerakligi noma’lum.',
      specificity: 'Qaysi ma’lumot kiritilishi kerakligi aniq emas.',
      constraints: 'Hajm chegarasi berilmagan — hisobot cho‘zilib ketishi mumkin.',
      format: 'Bo‘limlar tuzilmasi ko‘rsatilmagan.',
    },
  },
  {
    id: 'pt-10',
    badPrompt: 'Raqobatchilarni tahlil qil.',
    scenario: 'Yangi mobil ilova ishga tushirishdan oldin raqobat muhitini o‘rganmoqchisiz.',
    difficulty: 'intermediate',
    missing: ['context', 'goal', 'specificity', 'constraints', 'format'],
    idealPrompt: `Sen bozor tahlilchisisan.

KONTEKST
Toshkentda fitnes-trening mobil ilovasi ishga tushiramiz.
Asosiy raqobatchilar: {{raqobatchilar ro'yxati}}

MAQSAD
Bizning ilovamiz uchun aniq farqlanish nuqtasini topish.

VAZIFA
Har bir raqobatchi uchun kuchli/zaif tomonlarini va narx strategiyasini tahlil qil.

FORMAT
Jadval: Raqobatchi, Kuchli tomoni, Zaif tomoni, Narx strategiyasi.

CHEKLOVLAR
Faqat berilgan ma'lumotdan foydalan, bilmagan joyingni taxmin qilma — "ma'lumot yetarli emas" deb yoz.`,
    feedback: {
      context: 'Qaysi bozor, qaysi raqobatchilar — ko‘rsatilmagan.',
      goal: 'Tahlildan qanday xulosa kutilayotgani noaniq.',
      specificity: 'Qaysi mezonlar bo‘yicha taqqoslash kerakligi aytilmagan.',
      constraints: 'Taxmin qilmaslik haqida ko‘rsatma yo‘q — model o‘ylab topishi mumkin.',
      format: 'Natija qanday tuzilishda kerakligi noma’lum.',
    },
  },
  {
    id: 'pt-11',
    badPrompt: 'Dizaynga fikr bildir.',
    scenario: 'Yangi landing sahifa dizayni bo‘yicha professional fikr-mulohaza kerak.',
    difficulty: 'intermediate',
    missing: ['context', 'goal', 'specificity', 'format'],
    idealPrompt: `Sen UX dizayneri va konversiya mutaxassisisan.

KONTEKST
SaaS mahsulot uchun landing sahifa. Auditoriya — kichik biznes egalari.
Hozirgi konversiya darajasi: 2%.
Sahifa tavsifi: {{dizayn tavsifi yoki skrinshot}}

MAQSAD
Konversiyani oshiradigan aniq, amalga oshiriladigan tavsiyalar olish.

VAZIFA
Yuqoridagi sahifani tahlil qil. Har muammo uchun sababini va aniq yechimini ber.

FORMAT
Ustuvorlik bo'yicha ro'yxat: yuqori / o'rta / past ta'sirli o'zgarishlar.`,
    feedback: {
      context: 'Qanday mahsulot, kim uchun, hozirgi holat — aytilmagan.',
      goal: 'Fikr-mulohazadan nima kutilayotgani noaniq (estetikami, konversiyami?).',
      specificity: 'Qaysi ekran yoki elementga e’tibor qaratish aytilmagan.',
      format: 'Javob qanday tartibda kerakligi ko‘rsatilmagan.',
    },
  },
  {
    id: 'pt-12',
    badPrompt: 'Kodimni tuzat.',
    scenario: 'Ilovangizdagi funksiya kutilgandek ishlamayapti, sababi hali aniq emas.',
    difficulty: 'intermediate',
    missing: ['context', 'specificity', 'constraints', 'format'],
    idealPrompt: `Sen senior dasturchisan.

KUTILGAN XATTI-HARAKAT
{{nima bo'lishi kerak edi}}

HAQIQIY XATTI-HARAKAT
{{aslida nima bo'lyapti}}

MUHIT
{{til, framework, versiya}}

KOD
{{tegishli kod bo'lagi}}

VAZIFA
Darrov tuzatilgan kod yozish o'rniga, avval 3 ta eng ehtimolli sababni ustuvorlik bo'yicha ayt.

FORMAT
Har sabab uchun: nima uchun ehtimol, qanday tekshirish mumkin.

CHEKLOVLAR
Men aytmagan narsani (masalan kutubxona versiyasini) taxmin qilma — "tekshirish kerak" deb belgila.`,
    feedback: {
      context: 'Qaysi til, framework, qanday muhitda ishlayotgani noma’lum.',
      specificity: 'Kutilgan va haqiqiy natija aniq ta’riflanmagan.',
      constraints: 'Taxmin qilmaslik haqida ko‘rsatma yo‘q.',
      format: 'Javob qanday tuzilishda kerakligi aytilmagan.',
    },
  },
  {
    id: 'pt-13',
    badPrompt: 'Hikoya yoz.',
    scenario: 'Bolalar uchun tarbiyaviy ertak yozmoqchisiz.',
    difficulty: 'beginner',
    missing: ['context', 'goal', 'specificity', 'constraints', 'format', 'examples'],
    idealPrompt: `Sen bolalar yozuvchisisan.

KONTEKST
Auditoriya — 5-7 yoshli bolalar. Mavzu — do'stlik va yordam berish.

MAQSAD
Bola ertak oxirida aniq tarbiyaviy xulosa chiqarishi kerak.

VAZIFA
Bosh qahramoni kichik quyon bo'lgan 300 so'zlik ertak yoz.

CHEKLOVLAR
- Qo'rqinchli yoki zo'ravonlik elementi bo'lmasin
- Oddiy, bolalarga tushunarli so'zlar ishlat

FORMAT
Sarlavha + ertak matni + 1 jumlalik tarbiyaviy xulosa.

MISOL OHANG
"""
Kunlardan bir kun kichkina Quvonch ismli quyoncha o'rmonda sayr qilib yurardi...
"""`,
    feedback: {
      context: 'Qaysi yosh guruhi, qanday mavzu — aytilmagan.',
      goal: 'Ertakdan qanday xulosa chiqishi kerakligi noma’lum.',
      specificity: 'Uzunlik va bosh qahramon aniqlanmagan.',
      constraints: 'Nomaqbul kontent (qo‘rqinchli, zo‘ravon) haqida cheklov yo‘q.',
      format: 'Natija qanday qismlardan iboratligi ko‘rsatilmagan.',
      examples: 'Qanday ohangda yozish kerakligi haqida namuna yo‘q.',
    },
  },
  {
    id: 'pt-14',
    badPrompt: 'Taqdimot tayyorla.',
    scenario: 'Investorlar oldida startup g‘oyasini taqdim qilish uchun pitch matni kerak.',
    difficulty: 'advanced',
    missing: ['context', 'goal', 'specificity', 'constraints', 'format'],
    idealPrompt: `Sen startup maslahatchisisan.

KONTEKST
G'oya: {{startup g'oyasi}}
Bozor: {{maqsadli bozor}}
Jamoa: 3 kishi, texnik va marketing tajribasi bor.

MAQSAD
5 daqiqalik taqdimot bilan investorni keyingi uchrashuvga ko'ndirish.

VAZIFA
8 slaydli pitch deck matnini yoz: Muammo, Yechim, Bozor, Mahsulot, Biznes-model, Raqobat, Jamoa, So'rov (investitsiya miqdori).

FORMAT
Har slayd uchun: sarlavha + 3 ta qisqa punkt.

CHEKLOVLAR
Har slayd matni 40 so'zdan oshmasin. Isbotlanmagan raqam yozma — "[raqam]" deb belgila.`,
    feedback: {
      context: 'Qanday g‘oya, qaysi bozor, qanday jamoa — noma’lum.',
      goal: 'Taqdimotdan aniq nima kutilayotgani (nima uchun, kimga) aytilmagan.',
      specificity: 'Qaysi slaydlar bo‘lishi kerakligi belgilanmagan.',
      constraints: 'Hajm chegarasi va isbotlanmagan da’vo qoidasi yo‘q.',
      format: 'Slayd tuzilishi ko‘rsatilmagan.',
    },
  },
  {
    id: 'pt-15',
    badPrompt: 'Email marketing xati yoz.',
    scenario: 'Mavjud mijozlarga yangi mahsulot funksiyasi haqida email yubormoqchisiz.',
    difficulty: 'intermediate',
    missing: ['context', 'goal', 'specificity', 'constraints', 'format'],
    idealPrompt: `Sen email marketing mutaxassisisan.

KONTEKST
{{mahsulot}} uchun yangi funksiya chiqdi.
Auditoriya — mavjud mijozlar, ular mahsulotni allaqachon bilishadi.

MAQSAD
Mijozlar yangi funksiyani darhol sinab ko'rishlari kerak.

VAZIFA
Email matnini yoz.

FORMAT
Mavzu qatori + tana qismi (100 so'zgacha) + CTA tugma matni.

CHEKLOVLAR
- "BEPUL", "HOZIROQ" kabi katta harfli spam so'zlar ishlatilmasin
- Bitta aniq harakatga chaqiruv bo'lsin (bir nechta emas)`,
    feedback: {
      context: 'Qaysi mahsulot, kim uchun — aytilmagan.',
      goal: 'Email nimaga erishishi kerakligi noaniq.',
      specificity: 'Uzunlik va tarkib qismlari belgilanmagan.',
      constraints: 'Spam so‘zlar va CTA soni haqida cheklov yo‘q.',
      format: 'Email qanday qismlardan iboratligi ko‘rsatilmagan.',
    },
  },
]

export const getPracticeTask = (id) => PRACTICE_TASKS.find((t) => t.id === id) || null
