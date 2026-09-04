/**
 * LEVEL 5 — AI for Work & Business (30 dars, 5 bo‘lim)
 * Har bir dars: real vazifa + tayyor prompt shabloni + amaliyot.
 */

const c = 'ai-work'

/** Qisqa dars yasovchi yordamchi — takrorlanuvchi strukturani bir joyda saqlaydi. */
const lesson = ({ id, order, slug, title, section, summary, why, prompt, tips, callout, practice, takeaways, extra = [] }) => ({
  id,
  courseId: c,
  order,
  slug,
  section,
  title,
  summary,
  duration: 7,
  xp: 50,
  objectives: takeaways,
  why,
  blocks: [
    { type: 'heading', body: 'Tayyor prompt shabloni' },
    { type: 'code', lang: 'text', body: prompt },
    { type: 'heading', body: 'Amaliy maslahatlar' },
    { type: 'list', items: tips },
    ...extra,
    ...(callout ? [{ type: 'callout', tone: callout.tone, title: callout.title, body: callout.body }] : []),
  ],
  realWorld: tips.slice(0, 3),
  practice,
  keyTakeaways: takeaways,
})

export const AI_WORK_LESSONS = [
  /* ============================ OFFICE ============================ */
  lesson({
    id: 'w-01', order: 1, slug: 'email-yozish', section: 'Office',
    title: 'Email yozish',
    summary: 'Maqsadli, qisqa va javob oladigan xat yozish.',
    why: 'Email — ish kunining eng ko’p takrorlanadigan yozma vazifasi. Uni 15 daqiqadan 2 daqiqaga tushirish mumkin.',
    prompt: `Sen ishbilarmon yozishmalar bo’yicha mutaxassissan.

KONTEKST
Kimga: {{qabul qiluvchi va uning roli}}
Munosabat: {{birinchi murojaat / doimiy hamkor}}
Vaziyat: {{nima sodir bo’ldi}}
Maqsad: {{o’qigach nima qilishini xohlaysiz}}

TALABLAR
- Maksimal 150 so’z
- Birinchi jumlada maqsad aytilsin
- Aniq harakatga chaqiriq (kim, nima, qachon)
- Ohang: {{rasmiy / do’stona-professional}}
- Ortiqcha uzr va kirish so’zlarisiz

NATIJA
Mavzu qatori + xat matni. 2 ta variant ber.`,
    tips: [
      'Mavzu qatorini alohida so’rang — u ochilish foizini belgilaydi',
      'Har doim aniq muddat va aniq harakat yozing',
      '«Qisqartir» buyrug’i bilan xatni ikki barobar kuchaytiring',
      'Yomon xabarni yumshatish uchun: «mas’uliyatli, ammo mudofaaga o’tmasdan»',
    ],
    callout: { tone: 'warn', title: 'Yubormasdan oldin', body: 'Ism, sana, summa va fayl ilovasini o’zingiz tekshiring. AI ularni «tabiiy» ko’rinadigan qilib xato yozishi mumkin.' },
    practice: {
      title: 'Uch versiya',
      task: 'Bugungi eng qiyin xatingizni 3 ohangda yozdiring va eng mosini tanlang.',
      hint: 'Rasmiy / neytral / do’stona.',
      sample: 'Tanlangan variantni shablon sifatida saqlang.',
    },
    takeaways: ['Maqsad birinchi jumlada', 'Aniq harakat va muddat', 'Faktlarni o’zingiz tekshiring'],
  }),

  lesson({
    id: 'w-02', order: 2, slug: 'report', section: 'Office',
    title: 'Report (hisobot) yozish',
    summary: 'Ma’lumotdan qaror qabul qilinadigan hisobotga.',
    why: 'Hisobot o’qilmasa — bekor yozilgan. Struktura o’qilishni ta’minlaydi.',
    prompt: `Sen biznes-analitiksan.

MA’LUMOT
{{raqamlar, faktlar, natijalar}}

AUDITORIYA
{{kim o’qiydi va qanday qaror qabul qiladi}}

FORMAT (aynan shu tartibda)
## Xulosa
[3 jumla — eng muhim narsa]

## Asosiy ko’rsatkichlar
| Ko’rsatkich | Joriy | Oldingi | O’zgarish |

## Nima yaxshi ketdi
- [fakt] → [sabab]

## Nima yomon ketdi
- [fakt] → [sabab]

## Tavsiyalar
1. [harakat] — [kutilgan natija] — [ustuvorlik]

QOIDA: faqat men bergan ma’lumotdan foydalan, raqam to’qima.`,
    tips: [
      'Xulosani boshiga qo’ying — rahbar faqat shuni o’qiydi',
      'Har bir raqamga «nima uchun» izohi qo’shing',
      'Tavsiyalarni ustuvorlik bo’yicha tartiblang',
      'Grafik kerak bo’lsa, qanday grafik mosligini ham so’rang',
    ],
    callout: { tone: 'danger', title: 'Raqamlar', body: '«Raqam to’qima» qoidasini har doim yozing. Aks holda model bo’shliqni «mantiqiy» raqam bilan to’ldiradi.' },
    practice: {
      title: 'Haftalik hisobot',
      task: 'O’z ma’lumotlaringiz bilan shablonni to’ldirib hisobot oling va raqamlarni tekshiring.',
      hint: 'Har bir raqamni manba bilan solishtiring.',
      sample: 'Shablonni haftalik ishlatadigan qilib saqlang.',
    },
    takeaways: ['Xulosa birinchi', 'Har raqamga sabab', 'Raqam to’qishni taqiqlang'],
  }),

  lesson({
    id: 'w-03', order: 3, slug: 'excel', section: 'Office',
    title: 'Excel va jadvallar',
    summary: 'Formula, tahlil va tozalash — AI bilan tez.',
    why: 'Excel formulalari va Pivot — ko’p vaqt oladigan, ammo naqshli ish. AI unda kuchli.',
    prompt: `Excel/Google Sheets bo’yicha yordam ber.

VAZIYAT
Ustunlar: {{A: sana, B: mahsulot, C: summa, ...}}
Qatorlar soni: {{taxminan}}
Nima kerak: {{natija}}

BER:
1. Formula (Excel va Google Sheets uchun alohida)
2. Formula nima qilishini qadamma-qadam tushuntir
3. Keng tarqalgan xato (masalan bo’sh katak, matn/son)
4. Muqobil usul (Pivot yoki Power Query)

QOIDA: formulani men tushunadigan qilib izohla.`,
    tips: [
      'Ustun nomlari va namuna qatorlarni bering — formulalar aniqroq bo’ladi',
      'Katta jadval tozalash uchun bosqichli reja so’rang',
      'Formula xato bersa: xato matnini to’liq yuboring',
      'Takrorlanuvchi ish uchun Apps Script/VBA so’rang',
    ],
    callout: { tone: 'info', title: 'Maxfiylik', body: 'Real mijoz ma’lumotlarini yuklamang. Ustun tuzilishi va 2–3 ta soxta qator yetarli.' },
    practice: {
      title: 'Formula so’rovi',
      task: 'Real jadvalingiz uchun formula so’rang va uni tushuntirishini o’qib chiqing.',
      hint: 'Tushunmasangiz — «oddiyroq tushuntir» deng.',
      sample: 'Formula ishlaganini kichik namunada tekshiring.',
    },
    takeaways: ['Ustun tuzilishini bering', 'Formulani tushuntirishni so’rang', 'Real ma’lumotni yuklamang'],
  }),

  lesson({
    id: 'w-04', order: 4, slug: 'presentation', section: 'Office',
    title: 'Presentation (taqdimot)',
    summary: 'Slaydlar emas, hikoya quring.',
    why: 'Taqdimot — matn emas, oqim. AI oqimni tez tuzadi.',
    prompt: `Sen taqdimot bo’yicha mutaxassissan.

MAVZU: {{mavzu}}
AUDITORIYA: {{kim}}
VAQT: {{necha daqiqa}}
MAQSAD: {{tinglovchi nima qilishi kerak}}

BER:
1. Hikoya oqimi (muammo → oqibat → yechim → dalil → harakat)
2. Har slayd uchun:
   - Sarlavha (6 so’zgacha)
   - 3 tadan ko’p bo’lmagan punkt
   - Vizual taklifi (grafik/rasm/diagramma)
   - Notiq uchun 2 jumlalik izoh
3. Ochilish jumlasi (diqqatni tortadigan)
4. Yakuniy harakatga chaqiriq

QOIDA: slaydda matn kam, notiq izohida ko’p.`,
    tips: [
      '10 daqiqa ≈ 8–10 slayd — vaqtni ayting',
      'Har slaydda bitta fikr qoidasi',
      'Ochilish va yakun eng muhim — ularga alohida vaqt ajrating',
      'Savol-javobga tayyorgarlik uchun «10 ta qiyin savol ber» deng',
    ],
    callout: { tone: 'success', title: 'Kuchli qo’shimcha', body: '«Auditoriya berishi mumkin bo’lgan 10 ta eng qiyin savolni va ularga javobni yoz» — bu taqdimotga ishonch beradi.' },
    practice: {
      title: 'Slayd rejasi',
      task: 'Yaqin taqdimotingiz uchun to’liq slayd rejasi va 10 ta qiyin savol oling.',
      hint: 'Notiq izohlarini o’zingiz sayqallang.',
      sample: 'Ochilish jumlasini 3 variantda so’rang.',
    },
    takeaways: ['Hikoya oqimi muhim', 'Bir slayd — bir fikr', 'Qiyin savollarga oldindan tayyorlaning'],
  }),

  lesson({
    id: 'w-05', order: 5, slug: 'meeting-notes', section: 'Office',
    title: 'Meeting notes',
    summary: 'Yozuvdan qaror va vazifalarga.',
    why: 'Uchrashuvning qiymati — undan chiqqan qarorlarda. Ular yozilmasa, uchrashuv bekor.',
    prompt: `Uchrashuv transkripsiyasi/yozuvimni qayta ishla.

YOZUV:
"""
{{matn}}
"""

BER:
## Qarorlar
- [qaror] (kim qabul qildi)

## Vazifalar
| Vazifa | Mas’ul | Muddat | Ustuvorlik |

## Ochiq savollar
- [savol] — kim javob beradi

## Kelishmovchiliklar
- [mavzu] — tomonlar pozitsiyasi

## Keyingi qadam
[bitta jumla]

QOIDA:
- Faqat yozuvda bor narsani yoz
- Mas’ul aytilmagan bo’lsa "aniqlanmagan" deb yoz
- Aytilmagan muddatni to’qima`,
    tips: [
      'Uchrashuvdan keyin 1 soat ichida yuboring — esda bo’lganda',
      'Vazifalarga mas’ul va muddat majburiy',
      'Kelishmovchiliklarni yozing — keyin ular qaytadi',
      'Xulosani ishtirokchilarga tasdiqlash uchun yuboring',
    ],
    callout: { tone: 'warn', title: 'Maxfiylik', body: 'Uchrashuv yozuvida shaxsiy va tijorat ma’lumotlari bo’ladi. Kompaniya siyosatini tekshiring va kerak bo’lsa anonimlashtiring.' },
    practice: {
      title: 'Uchrashuv xulosasi',
      task: 'Oxirgi uchrashuv yozuvingizdan qaror va vazifalar jadvalini chiqaring.',
      hint: '«To’qima» qoidasi eng muhim qism.',
      sample: 'Ishtirokchilarga tasdiq uchun yuboring.',
    },
    takeaways: ['Qaror + vazifa + mas’ul', 'To’qishni taqiqlang', '1 soat ichida yuboring'],
  }),

  lesson({
    id: 'w-06', order: 6, slug: 'document-summary', section: 'Office',
    title: 'Document summary',
    summary: 'Uzun hujjatdan kerakli narsani ajratish.',
    why: 'Har kuni o’qilishi kerak bo’lgan hujjatlar soni o’qish vaqtidan ko’p.',
    prompt: `Quyidagi hujjatni tahlil qil.

<document>
{{matn}}
</document>

MENING MAQSADIM: {{nima uchun o’qiyapman}}

BER:
1. 3 jumlalik xulosa
2. Menga aloqador 5 ta asosiy punkt (maqsadimga qarab)
3. Talab qilinadigan harakatlar (agar bor bo’lsa)
4. Xavfli/e’tibor talab qiladigan joylar
5. Hujjatda javob berilmagan muhim savollar

QOIDA:
- Faqat hujjatdagi ma’lumot
- Har punktda qaysi bo’limdan olganingni ko’rsat`,
    tips: [
      'Maqsadingizni ayting — xulosa maqsadga moslashadi',
      'Bir hujjatni turli maqsad uchun turlicha xulosalang',
      '«Hujjatda javob yo’q savollar» — eng qimmatli punkt',
      'Shartnomalarda: «menga noqulay bandlarni top» deng',
    ],
    callout: { tone: 'info', title: 'Uzun hujjat', body: 'Hujjat juda uzun bo’lsa, bo’limlarga bo’lib bering va oxirida umumiy sintez so’rang.' },
    practice: {
      title: 'Maqsadli xulosa',
      task: 'Bitta hujjatni 2 xil maqsad bilan xulosalang va farqni ko’ring.',
      hint: 'Masalan: «xavflarni topish» va «imkoniyatlarni topish».',
      sample: 'Xulosalar butunlay boshqacha chiqadi.',
    },
    takeaways: ['Maqsad xulosani belgilaydi', 'Manba ko’rsatishni talab qiling', 'Javobsiz savollar — qimmatli'],
  }),

  /* ============================ BUSINESS ============================ */
  lesson({
    id: 'w-07', order: 7, slug: 'business-idea', section: 'Business',
    title: 'Business idea',
    summary: 'G’oyani baholash — sevib qolishdan oldin.',
    why: 'Yomon g’oyaga ketgan 6 oy — eng qimmat xato. Baholash 1 kun oladi.',
    prompt: `Sen tanqidiy fikrlaydigan venture analitiksan.
Meni xursand qilishga urinma — zaif joylarni ko’rsat.

G’OYA: {{tavsif}}
BOZOR: {{qayerda}}
MENING RESURSIM: {{vaqt, pul, ko’nikma}}

BAHOLA:
1. Muammo real va og’riqlimi? (1-10 va sabab)
2. Kim to’laydi va qancha?
3. Mavjud alternativalar (shu jumladan "hech narsa qilmaslik")
4. Nima uchun aynan hozir?
5. Eng katta 3 ta xavf
6. Bu g’oya muvaffaqiyatsiz bo’lishining eng ehtimolli sababi
7. 2 hafta ichida qanday eng arzon tekshiruv qilish mumkin?

Yakunda: davom etish / o’zgartirish / to’xtatish tavsiyasi.`,
    tips: [
      '«Meni xursand qilma» iborasi — eng muhim qism',
      'Eng arzon tekshiruvni birinchi bajaring',
      '«Hech narsa qilmaslik» ham alternativa — uni hisobga oling',
      'G’oyani 3 xil model bo’yicha baholang',
    ],
    callout: { tone: 'success', title: 'Eng qimmatli savol', body: '«Bu g’oya muvaffaqiyatsiz bo’lishining eng ehtimolli sababi nima?» — bu savol ko’p pulni tejaydi.' },
    practice: {
      title: 'G’oyani sinang',
      task: 'G’oyangizni shablon bo’yicha baholang va 2 haftalik tekshiruv rejasini tuzing.',
      hint: 'Tekshiruv arzon va tez bo’lsin.',
      sample: 'Natijaga qarab: davom / pivot / to’xtat.',
    },
    takeaways: ['Tanqidiy baholashni talab qiling', 'Eng arzon tekshiruvdan boshlang', 'Muvaffaqiyatsizlik sababini oldindan toping'],
  }),

  lesson({
    id: 'w-08', order: 8, slug: 'market-research', section: 'Business',
    title: 'Market research',
    summary: 'Bozorni tuzilma bilan o’rganish.',
    why: 'Tuzilmasiz tadqiqot — ma’lumot to’plami. Tuzilmali tadqiqot — qaror asosi.',
    prompt: `Bozor tadqiqoti uchun tuzilma tayyorla.

BOZOR: {{soha}} / {{hudud}}
MAQSAD: {{kirish / kengaytirish / narx belgilash}}

BER:
1. Bozor segmentlari va ularning hajmi (qanday baholash mumkin)
2. Mijoz segmentlari: kim, qanday muammo, qancha to’laydi
3. Asosiy trendlar (va ular qaysi yo’nalishda)
4. Kirish to’siqlari
5. Narx diapazonlari
6. Qanday ma’lumot manbalarini tekshirish kerak (aniq nomlar)
7. Men o’zim javob berishim kerak bo’lgan 10 ta savol

QOIDA:
- Aniq raqam bermasang — "tekshirish kerak" deb belgila
- Taxminni fakt sifatida ko’rsatma`,
    tips: [
      'Mahalliy bozor haqida model kam biladi — manbani o’zingiz toping',
      'Research vositasidan (Perplexity) manbali ma’lumot oling',
      'Model bergan raqamlarni hech qachon to’g’ridan-to’g’ri ishlatmang',
      'Tuzilmani AI dan, mazmunni manbadan oling',
    ],
    callout: { tone: 'danger', title: 'Eng katta xato', body: 'AI bergan bozor hajmi raqamlarini hisobotga ko’chirish. Ular ko’pincha to’qilgan bo’ladi.' },
    practice: {
      title: 'Tadqiqot tuzilmasi',
      task: 'O’z bozoringiz uchun tuzilma va 10 ta savol oling, keyin 3 ta savolga real manbadan javob toping.',
      hint: 'Tuzilma — AI dan, raqam — manbadan.',
      sample: 'Har raqam yoniga manba havolasini yozing.',
    },
    takeaways: ['Tuzilmani AI dan oling', 'Raqamni manbadan oling', 'Taxminni belgilashni talab qiling'],
  }),

  lesson({
    id: 'w-09', order: 9, slug: 'competitor-analysis', section: 'Business',
    title: 'Competitor analysis',
    summary: 'Raqobatchidan o’rganish va farqlanish.',
    why: 'Raqobatchini bilmasdan pozitsiyalanish — ko’r-ko’rona harakat.',
    prompt: `Raqobat tahlili uchun tuzilma tayyorla.

BIZ: {{mahsulot, auditoriya, narx}}
RAQOBATCHILAR: {{ro’yxat}}

JADVAL: | Kompaniya | Auditoriya | Narx | Kuchli tomoni | Zaif tomoni | Xabar (messaging) |

KEYIN:
1. Bozorda to’ldirilmagan bo’shliqlar
2. Bizning real farqlanish nuqtamiz (3 ta)
3. Ular yaxshi qilayotgan, biz qilmayotgan 3 narsa
4. Biz qaysi jangda qatnashmasligimiz kerak
5. Har raqobatchi uchun: nimasini o’rganish arziydi

QOIDA: faqat men bergan yoki ochiq ma’lumotdan foydalan.`,
    tips: [
      'Raqobatchi saytlari matnini o’zingiz ko’chirib bering — aniqroq bo’ladi',
      '«Qaysi jangda qatnashmaslik kerak» — strategik savol',
      'Narxlarni o’zingiz tekshiring, model eskirgan ma’lumot berishi mumkin',
      'Tahlilni har chorakda yangilang',
    ],
    callout: { tone: 'info', title: 'Yaxshi manba', body: 'Raqobatchining sayti, narx sahifasi va mijoz sharhlari — eng ishonchli kirish ma’lumoti. Ularni promptga qo’shing.' },
    practice: {
      title: 'Raqobat jadvali',
      task: '3 ta raqobatchi ma’lumotini yig’ib, to’liq jadval va farqlanish nuqtalarini oling.',
      hint: 'Ularning narx sahifasini matn sifatida bering.',
      sample: 'Farqlanish nuqtalarini marketing matnida ishlating.',
    },
    takeaways: ['Ma’lumotni o’zingiz bering', 'Farqlanishni aniqlang', 'Qatnashmaydigan jangni ham tanlang'],
  }),

  lesson({
    id: 'w-10', order: 10, slug: 'marketing-plan', section: 'Business',
    title: 'Marketing plan',
    summary: 'Byudjet va kanalga mos aniq reja.',
    why: 'Umumiy marketing maslahati foydasiz. Sizning byudjetingiz va kanalingizga mos reja — foydali.',
    prompt: `Sen amaliy marketing strategsan.

BIZNES: {{nima sotasiz}}
AUDITORIYA: {{kim, qayerda}}
BYUDJET: {{aniq summa yoki 0}}
VAQT: {{necha oy}}
JAMOA: {{necha kishi, qanday ko’nikma}}
HOZIRGI HOLAT: {{followers, sotuv, trafik}}

BER:
1. 3 ta kanal (aynan shu byudjetga mos) va nega
2. Har kanal uchun oylik reja: nima, qancha, qanday o’lchanadi
3. Birinchi 30 kunlik aniq harakatlar ro’yxati
4. O’lchanadigan KPI lar
5. Nima QILMASLIK kerak (byudjet va vaqtni yeydigan narsalar)

QOIDA: byudjetdan oshadigan taklif berma.`,
    tips: [
      'Byudjetni aniq ayting — 0 bo’lsa ham',
      '«Nima qilmaslik kerak» — reja qadar muhim',
      'KPI o’lchanadigan bo’lsin: «brend tanilishi» emas, «haftalik yangi lid soni»',
      'Birinchi 30 kunga fokuslaning',
    ],
    callout: { tone: 'warn', title: 'Realistik bo’ling', body: 'AI ba’zan 5 kanalni bir vaqtda taklif qiladi. Kichik jamoa uchun 1–2 kanal yetarli — buni promptda cheklang.' },
    practice: {
      title: '30 kunlik reja',
      task: 'O’z biznesingiz uchun byudjetga mos 30 kunlik aniq harakatlar rejasini oling.',
      hint: 'Har harakat kim tomonidan va qachon bajarilishini yozing.',
      sample: 'Oy oxirida KPI larni tekshiring.',
    },
    takeaways: ['Byudjetni aniq ayting', 'Kanal sonini cheklang', 'O’lchanadigan KPI belgilang'],
  }),

  lesson({
    id: 'w-11', order: 11, slug: 'customer-analysis', section: 'Business',
    title: 'Customer analysis',
    summary: 'Mijozni tushunish: segment, ehtiyoj, e’tiroz.',
    why: 'Kimga sotayotganingizni bilmasangiz, xabaringiz hech kimga tegmaydi.',
    prompt: `Mijoz tahlili tayyorla.

MAHSULOT: {{nima}}
MENDAGI MA’LUMOT: {{sotuv, so’rovnoma, sharhlar}}

BER:
1. 3 ta mijoz segmenti, har biri uchun:
   - Kim (yosh, kasb, vaziyat)
   - Qanday muammo (o’z tili bilan)
   - Hozir buni qanday hal qilyapti
   - Nima uchun to’laydi
   - Qanday e’tiroz bildiradi
2. Har segment uchun asosiy xabar (1 jumla)
3. Har e’tiroz uchun javob
4. Ularni qayerda topish mumkin

QOIDA: mening ma’lumotimga tayan, umumiy shablon berma.`,
    tips: [
      'Real mijoz sharhlarini promptga qo’shing — sifat keskin oshadi',
      'Mijoz muammosini uning o’z so’zlari bilan yozing',
      'E’tirozlar ro’yxati — sotuv skripti uchun asos',
      'Segmentlarni haqiqiy mijozlar bilan tekshiring',
    ],
    callout: { tone: 'success', title: 'Kuchli kirish', body: 'Mijozlarning haqiqiy sharhlari, savollari va shikoyatlarini promptga qo’shsangiz — tahlil taxmindan faktga aylanadi.' },
    practice: {
      title: 'Segment kartasi',
      task: '10 ta real mijoz sharhi asosida segment kartalari va e’tiroz javoblarini oling.',
      hint: 'Sharhlarni o’zgartirmasdan ko’chiring.',
      sample: 'Har segment uchun bitta xabar yozing.',
    },
    takeaways: ['Real sharhlar — eng yaxshi kirish', 'Muammoni mijoz tili bilan yozing', 'E’tirozlarga oldindan javob'],
  }),

  lesson({
    id: 'w-12', order: 12, slug: 'business-plan', section: 'Business',
    title: 'Business plan',
    summary: 'Investorga emas, o’zingizga tushunarli reja.',
    why: 'Biznes-reja — bashorat emas, taxminlaringizni yozib qo’yish va tekshirish vositasi.',
    prompt: `Biznes-reja tuzilmasini tayyorla.

BIZNES: {{tavsif}}
MODEL: {{qanday pul ishlaydi}}
BOSHLANG’ICH RESURS: {{pul, vaqt, jamoa}}

BO’LIMLAR:
1. Muammo va yechim (har biri 3 jumla)
2. Mijoz segmentlari
3. Daromad modeli va narx mantiqi
4. Xarajatlar tuzilishi (doimiy / o’zgaruvchan)
5. Zararsizlik nuqtasi hisobi (formulasi bilan)
6. Birinchi 6 oy bosqichlari
7. Asosiy taxminlar ro’yxati — har biri qanday tekshiriladi
8. Top 5 xavf va yumshatish

QOIDA:
- Moliyaviy raqamlarni men beraman, sen formulani ber
- Har bo’limda taxminni aniq belgila`,
    tips: [
      'Taxminlar ro’yxati — rejaning eng qimmatli qismi',
      'Raqamlarni o’zingiz kiriting, AI faqat formulani bersin',
      'Rejani har oy yangilang',
      'Zararsizlik nuqtasini birinchi hisoblang',
    ],
    callout: { tone: 'warn', title: 'Moliyaviy prognoz', body: 'AI moliyaviy prognozni ishonchli ko’rinishda to’qiy oladi. Formulani undan, raqamni o’zingizdan oling.' },
    practice: {
      title: 'Taxminlar ro’yxati',
      task: 'Biznesingizning 10 ta asosiy taxminini yozing va har biri uchun tekshirish usulini belgilang.',
      hint: 'Eng xavfli taxminni birinchi tekshiring.',
      sample: '«Mijoz oyiga 100 ming so’m to’laydi» → 10 ta mijozdan so’rab tekshiring.',
    },
    takeaways: ['Reja = taxminlar to’plami', 'Formulani AI dan, raqamni o’zingizdan', 'Har oy yangilang'],
  }),

  /* ============================ MARKETING ============================ */
  lesson({
    id: 'w-13', order: 13, slug: 'social-media-post', section: 'Marketing',
    title: 'Social media post',
    summary: 'Platformaga mos, ohangi saqlangan post.',
    why: 'Bir xil post barcha platformada ishlamaydi. Moslashtirish — AI uchun ideal vazifa.',
    prompt: `Sen SMM mutaxassisisan.

MAVZU: {{nima haqida}}
PLATFORMA: {{Instagram / LinkedIn / Telegram / X}}
AUDITORIYA: {{kim}}
MAQSAD: {{qiziqish / sotuv / obuna}}
BREND OHANGI (namuna):
"""
{{sizning oldingi postingiz}}
"""

BER: 5 ta variant, har biri uchun
- Ilgak (birinchi qator — skroll to’xtatadigan)
- Asosiy matn (platformaga mos uzunlik)
- CTA
- Hashtag (agar platformaga mos bo’lsa)
- Vizual g’oya

QOIDA: klishe iboralar va emoji spam ishlatma.`,
    tips: [
      'Brend ohangi uchun eski postingizni namuna qiling',
      'Ilgakni alohida sayqallang — u eng muhim qator',
      'Har platformaga alohida uzunlik va uslub',
      '5 variantdan bittasini tanlab, uni yaxshilang',
    ],
    callout: { tone: 'info', title: 'Ohang namunasi', body: 'Eng yaxshi post ingizni namuna sifatida bering. «Professional yoz» dan ko’ra bu ancha aniq ishlaydi.' },
    practice: {
      title: '5 ilgak',
      task: 'Bitta mavzu uchun 10 ta ilgak variantini oling va eng kuchli 2 tasini tanlang.',
      hint: 'Ilgak savol, raqam yoki kutilmagan da’vo bo’lishi mumkin.',
      sample: 'Tanlangan ilgaklarni sinab, natijani o’lchang.',
    },
    takeaways: ['Ohangni namuna bilan bering', 'Ilgak — eng muhim qator', 'Platformaga moslang'],
  }),

  lesson({
    id: 'w-14', order: 14, slug: 'advertisement', section: 'Marketing',
    title: 'Advertisement (reklama)',
    summary: 'Qisqa joyda aniq va’da.',
    why: 'Reklamada har bir so’z pul turadi. Aniqlik — konversiya.',
    prompt: `Reklama matni yoz.

MAHSULOT: {{nima}}
ASOSIY FOYDA: {{mijoz nima yutadi}}
AUDITORIYA: {{kim}}
FORMAT: {{Instagram / Google / banner}}
CHEKLOV: sarlavha {{N}} belgi, matn {{M}} belgi

BER: 5 ta variant, har biri boshqa burchakdan:
1. Muammoga urg’u
2. Natijaga urg’u
3. Ijtimoiy isbot
4. Kutilmagan/qiziqarli
5. To’g’ridan-to’g’ri taklif

Har biri uchun: sarlavha + matn + CTA + kimga eng mos.

QOIDA: isbotlanmagan da’vo yozma ("eng yaxshi", "raqamli 1").`,
    tips: [
      'Belgi cheklovini aniq ayting',
      'Turli burchaklardan variantlar so’rang — A/B test uchun',
      'Isbotlanmagan da’volarni taqiqlang — huquqiy xavf',
      'Eng yaxshi variantni yana 5 ta variantga aylantiring',
    ],
    callout: { tone: 'danger', title: 'Huquqiy ogohlantirish', body: '«Eng yaxshi», «100% kafolat», «birinchi o’rin» kabi da’volar isbot talab qiladi. AI ularni bemalol yozadi — siz olib tashlashingiz kerak.' },
    practice: {
      title: 'A/B variantlar',
      task: '5 xil burchakdan reklama matni oling va 2 tasini sinovga qo’ying.',
      hint: 'Faqat bitta element (sarlavha) farq qilsin.',
      sample: 'Natijani o’lchab, yutgan variantni rivojlantiring.',
    },
    takeaways: ['Belgi cheklovini bering', 'Turli burchaklar — A/B uchun', 'Isbotlanmagan da’voni olib tashlang'],
  }),

  lesson({
    id: 'w-15', order: 15, slug: 'content-calendar', section: 'Marketing',
    title: 'Content calendar',
    summary: 'Tasodifiy postlardan tizimli rejaga.',
    why: 'Kontentda muvaffaqiyat — izchillikda. Reja izchillikni ta’minlaydi.',
    prompt: `1 oylik kontent kalendari tuz.

BIZNES: {{nima}}
PLATFORMA: {{qayerda}}
CHASTOTA: haftasiga {{N}} post
AUDITORIYA: {{kim}}
MAQSADLAR: {{tanilish / sotuv / ta’lim}}

TUZILMA:
1. 4 ta kontent ustuni (masalan: ta’lim, sahna orqasi, mijoz hikoyasi, taklif)
2. Kalendar jadvali: | Sana | Ustun | Mavzu | Format | CTA |
3. Har post uchun 1 jumlalik tavsif
4. Takrorlanadigan rubrikalar taklifi

QOIDA:
- Sotuv postlari 30% dan oshmasin
- Har hafta bitta ta’limiy post bo’lsin`,
    tips: [
      'Kontent ustunlarini avval belgilang — keyin mavzular oson topiladi',
      'Sotuv/qiymat nisbatini promptda cheklang',
      'Takrorlanadigan rubrikalar — obunachilar odatini shakllantiradi',
      'Oy oxirida qaysi post ishlaganini tahlil qildiring',
    ],
    callout: { tone: 'success', title: 'Bir marta yozing', body: 'Kalendar tayyor bo’lgach, har post uchun alohida prompt bilan matn yozdiring — bu ancha tez.' },
    practice: {
      title: 'Oylik kalendar',
      task: 'O’z biznesingiz uchun 4 ustunli 1 oylik kalendar tuzing.',
      hint: 'Sotuv postlarini 30% da ushlab turing.',
      sample: 'Kalendarni jadvalga ko’chiring va bajarilishini belgilang.',
    },
    takeaways: ['Kontent ustunlari — asos', 'Sotuv/qiymat nisbatini saqlang', 'Rubrikalar odat yaratadi'],
  }),

  lesson({
    id: 'w-16', order: 16, slug: 'seo', section: 'Marketing',
    title: 'SEO',
    summary: 'Kalit so’zdan mazmunli sahifagacha.',
    why: 'Organik trafik — eng arzon va uzoq muddatli kanal.',
    prompt: `SEO bo’yicha yordam ber.

SAHIFA MAQSADI: {{nima sotadi/beradi}}
ASOSIY KALIT SO’Z: {{so’z}}
AUDITORIYA: {{kim}}
HUDUD/TIL: {{qayerda}}

BER:
1. Qidiruv niyati tahlili (informational / commercial / transactional)
2. 15 ta bog’liq kalit so’z (uzun dumli variantlar bilan)
3. Sahifa tuzilmasi: H1, H2 lar, har bo’lim nima haqida
4. Meta title (60 belgi) va description (155 belgi) — 3 variant
5. Ichki havolalar g’oyasi
6. FAQ bo’limi uchun 5 ta real savol

QOIDA:
- Kalit so’zni sun’iy takrorlama
- Qidiruv hajmi raqamini to’qima — "tekshirish kerak" deb yoz`,
    tips: [
      'Qidiruv niyatini aniqlash — eng muhim qadam',
      'Hajm raqamlarini AI dan olmang, asboblardan oling',
      'FAQ bo’limi uzun dumli so’rovlarni qamrab oladi',
      'Kontent avvalo odam uchun, keyin qidiruv uchun',
    ],
    callout: { tone: 'warn', title: 'Raqamlar', body: 'AI qidiruv hajmi va raqobat darajasini bilmaydi. Bu raqamlarni maxsus asboblardan oling.' },
    practice: {
      title: 'Sahifa tuzilmasi',
      task: 'Bitta sahifangiz uchun to’liq SEO tuzilmasi va meta teglarni oling.',
      hint: 'Qidiruv niyatini birinchi aniqlang.',
      sample: 'FAQ savollarini real qidiruvlardan tekshiring.',
    },
    takeaways: ['Niyat — birinchi qadam', 'Hajm raqamini asbobdan oling', 'Odam uchun yozing'],
  }),

  lesson({
    id: 'w-17', order: 17, slug: 'copywriting', section: 'Marketing',
    title: 'Copywriting',
    summary: 'Xususiyat emas, foyda haqida yozish.',
    why: 'Mijoz mahsulotni emas, o’z muammosining yechimini sotib oladi.',
    prompt: `Sen tajribali kopiraytersan.

MAHSULOT: {{nima}}
XUSUSIYATLAR: {{ro’yxat}}
AUDITORIYA: {{kim, qanday muammo}}
FORMAT: {{landing / email / post}}

QIL:
1. Har xususiyatni foydaga aylantir (xususiyat → nima beradi → nega muhim)
2. Asosiy va’dani 1 jumlada yoz (3 variant)
3. Matn yoz: PAS tuzilmasi (Muammo → Kuchaytirish → Yechim)
4. 3 ta e’tirozni oldindan hal qil
5. CTA (3 variant)

QOIDA:
- "Innovatsion", "sifatli", "professional" kabi bo’sh sifatlarni ishlatma
- Har da’voni aniq qil`,
    tips: [
      'Xususiyat → foyda o’tkazish — asosiy ko’nikma',
      'Bo’sh sifatlarni taqiqlang',
      'E’tirozlarni matn ichida hal qiling',
      'Matnni ovoz chiqarib o’qing — tabiiy eshitiladimi?',
    ],
    callout: { tone: 'success', title: 'Test', body: 'Har jumladan keyin «bu mijozga nima beradi?» deb so’rang. Javob yo’q bo’lsa — jumla keraksiz.' },
    practice: {
      title: 'Foyda tarjimasi',
      task: 'Mahsulotingizning 5 ta xususiyatini foydaga aylantiring.',
      hint: 'Har birida «demak siz...» deb davom ettiring.',
      sample: '«12 soat batareya» → «Kun bo’yi zaryadlagichni o’ylamaysiz».',
    },
    takeaways: ['Xususiyat → foyda', 'Bo’sh sifatlardan qoching', 'E’tirozni matnda hal qiling'],
  }),

  lesson({
    id: 'w-18', order: 18, slug: 'product-description', section: 'Marketing',
    title: 'Product description',
    summary: 'Ko’plab mahsulot uchun tez va barqaror tavsif.',
    why: 'Katalogdagi 200 ta mahsulotni qo’lda yozish — haftalar. AI bilan — soatlar.',
    prompt: `Mahsulot tavsifi yoz.

MA’LUMOT:
Nomi: {{nom}}
Xususiyatlar: {{ro’yxat}}
Narx segmenti: {{arzon / o’rta / premium}}
Auditoriya: {{kim}}

FORMAT (aynan):
[Ilgak — 1 jumla, foydaga urg’u]

[Asosiy matn — 40-60 so’z]

Xususiyatlar:
• [xususiyat] — [foyda]
• ...

Kimga mos: [1 jumla]

QOIDA:
- Faqat berilgan xususiyatlardan foydalan
- Yo’q narsani qo’shma
- Har mahsulot uchun bir xil tuzilma`,
    tips: [
      'Bir xil shablon — katalog bir butun ko’rinadi',
      '«Yo’q narsani qo’shma» — muhim qoida',
      'Bir necha mahsulotni bir promptda bering — tez bo’ladi',
      'Premium va arzon segment uchun ohangni farqlang',
    ],
    callout: { tone: 'danger', title: 'To’qish xavfi', body: 'AI mahsulotga mavjud bo’lmagan xususiyat qo’shishi mumkin (masalan «suvga chidamli»). Bu — noto’g’ri reklama, huquqiy javobgarlik.' },
    practice: {
      title: 'Katalog partiyasi',
      task: '5 ta mahsulot ma’lumotini bir promptda berib, bir xil formatda tavsif oling.',
      hint: 'Har birida faqat berilgan xususiyatlar borligini tekshiring.',
      sample: 'Shablonni katalog standarti qiling.',
    },
    takeaways: ['Bir xil shablon — bir butun katalog', 'Yo’q xususiyatni qo’shishni taqiqlang', 'Partiya bo’lib ishlang'],
  }),

  /* ============================ EDUCATION ============================ */
  lesson({
    id: 'w-19', order: 19, slug: 'lesson-plan', section: 'Education',
    title: 'Lesson plan',
    summary: 'Maqsadli, faoliyatga asoslangan dars rejasi.',
    why: 'Yaxshi dars rejasi — o’qituvchi vaqtini tejaydi va o’quvchi natijasini oshiradi.',
    prompt: `Sen tajribali metodistsan.

MAVZU: {{mavzu}}
YOSH/DARAJA: {{kim}}
VAQT: {{necha daqiqa}}
RESURS: {{proyektor bor/yo’q, internet bor/yo’q}}

BER:
1. O’quv maqsadlari (o’lchanadigan: "o’quvchi ... qila oladi")
2. Dars bosqichlari vaqt taqsimoti bilan:
   - Kirish/qiziqtirish
   - Yangi material
   - Amaliy faoliyat
   - Mustahkamlash
   - Baholash
3. Har bosqich uchun aniq faoliyat (nazariya emas)
4. 5 ta tekshiruv savoli
5. Uy vazifasi
6. Qiynaladigan o’quvchilar uchun moslashtirish

QOIDA: har bosqichda o’quvchi nima QILADI — yozing.`,
    tips: [
      'O’quv maqsadi o’lchanadigan bo’lsin',
      'Nazariya emas, faoliyat so’rang',
      'Resurs cheklovini ayting — reja real bo’ladi',
      'Moslashtirish bo’limi — inklyuziya uchun',
    ],
    callout: { tone: 'info', title: 'Mahalliy kontekst', body: 'AI mahalliy o’quv dasturini bilmasligi mumkin. Standart talablarini promptga o’zingiz qo’shing.' },
    practice: {
      title: 'Dars rejasi',
      task: 'Keyingi darsingiz uchun to’liq reja va tekshiruv savollarini oling.',
      hint: 'Faoliyatlar vaqtga sig’adimi — tekshiring.',
      sample: 'Darsdan keyin rejani natijaga qarab sozlang.',
    },
    takeaways: ['O’lchanadigan maqsad', 'Faoliyat > nazariya', 'Resurs cheklovini ayting'],
  }),

  lesson({
    id: 'w-20', order: 20, slug: 'quiz-yaratish', section: 'Education',
    title: 'Quiz yaratish',
    summary: 'Tushunishni tekshiradigan savollar.',
    why: 'Yodlashni emas, tushunishni tekshiradigan savol yozish — alohida mahorat.',
    prompt: `Quyidagi mavzu bo’yicha quiz tuz.

MAVZU: {{mavzu}}
DARAJA: {{kim}}
SAVOLLAR SONI: {{N}}

TALABLAR:
- Turlar aralash: multiple choice, to’g’ri/noto’g’ri, ochiq savol
- Bloom taksonomiyasi bo’yicha: 30% bilish, 50% tushunish/qo’llash, 20% tahlil
- Multiple choice da chalg’ituvchi variantlar ishonchli bo’lsin
  (tipik xato tushunchalarga asoslangan)

HAR SAVOL UCHUN:
- Savol
- Variantlar (agar bor bo’lsa)
- To’g’ri javob
- Nima uchun to’g’ri (izoh)
- Nima uchun boshqalar noto’g’ri

QOIDA: "hammasi to’g’ri" tipidagi variantlardan foydalanma.`,
    tips: [
      'Chalg’ituvchi variantlar tipik xatolarga asoslansin',
      'Izoh berilishi — savolni o’quv vositasiga aylantiradi',
      'Bloom darajalarini aniq taqsimlang',
      'Savollarni o’zingiz o’qib chiqing — noaniqlik bormi?',
    ],
    callout: { tone: 'success', title: 'Kuchli texnika', body: '«O’quvchilarning bu mavzudagi eng keng tarqalgan 5 ta xato tushunchasi nima?» — keyin shu xatolarni chalg’ituvchi variant qiling.' },
    practice: {
      title: 'Quiz tuzing',
      task: 'O’z mavzuingiz bo’yicha 10 savolli quiz tuzing va chalg’ituvchi variantlarni tekshiring.',
      hint: 'Har savolda faqat bitta aniq to’g’ri javob bo’lsin.',
      sample: 'Quizni sinov guruhida tekshiring.',
    },
    takeaways: ['Chalg’ituvchilar — tipik xatolardan', 'Izoh o’rgatadi', 'Bloom darajalarini aralashtiring'],
  }),

  lesson({
    id: 'w-21', order: 21, slug: 'test-baholash', section: 'Education',
    title: 'Test va baholash',
    summary: 'Rubrika, teskari aloqa va adolatli baholash.',
    why: 'Baholash — o’qitishning eng ko’p vaqt oladigan qismi. Rubrika uni tezlashtiradi va adolatli qiladi.',
    prompt: `Baholash rubrikasi tuz.

TOPSHIRIQ: {{tavsif}}
DARAJA: {{kim}}
MAKSIMAL BALL: {{N}}

BER:
1. 4-5 ta baholash mezoni
2. Har mezon uchun 4 daraja tavsifi (a’lo / yaxshi / qoniqarli / yetarli emas)
   — har daraja aniq kuzatiladigan xatti-harakat bilan tavsiflansin
3. Ball taqsimoti
4. Har mezon uchun teskari aloqa shabloni

QOIDA:
- "yaxshi bajarilgan" kabi noaniq iboralar ishlatma
- Har daraja tavsifi tekshiriladigan bo’lsin`,
    tips: [
      'Rubrikani topshiriqdan OLDIN o’quvchilarga bering',
      'Teskari aloqa shabloni vaqtni ko’p tejaydi',
      'AI ga ishni baholatmang — rubrika tuzdiring',
      'Har daraja kuzatiladigan xatti-harakat bilan tavsiflansin',
    ],
    callout: { tone: 'warn', title: 'Muhim chegara', body: 'O’quvchi ishini AI ga baholatib, natijani tekshirmasdan qo’yish — adolatsiz. AI faqat qoralama teskari aloqa berishi mumkin.' },
    practice: {
      title: 'Rubrika',
      task: 'Bitta topshiriq uchun to’liq rubrika tuzing va uni o’quvchilarga oldindan bering.',
      hint: 'Har daraja tavsifini o’qib, «buni ko’ra olamanmi?» deb tekshiring.',
      sample: 'Rubrikani ishlatib, baholash vaqtini o’lchang.',
    },
    takeaways: ['Rubrika oldindan beriladi', 'Kuzatiladigan tavsiflar', 'Yakuniy baho — o’qituvchida'],
  }),

  lesson({
    id: 'w-22', order: 22, slug: 'research-talaba', section: 'Education',
    title: 'Research (tadqiqot ishi)',
    summary: 'Talaba va o’qituvchi uchun tadqiqot yordamchisi.',
    why: 'AI ni to’g’ri ishlatish — o’rganishni tezlashtiradi; noto’g’ri ishlatish — o’rganishni to’xtatadi.',
    prompt: `Tadqiqot ishimda yordam ber (yozib berma, yo’naltir).

MAVZU: {{mavzu}}
DARAJA: {{kurs ishi / diplom / maqola}}
HOZIRGI HOLAT: {{nima qildim}}

BER:
1. Tadqiqot savolini aniqlashtirish (3 variant, torroq)
2. Adabiyot qidirish uchun kalit so’zlar va qidiruv iboralari
3. Ishning tuzilmasi (bo’limlar va har biri nima haqida)
4. Qanday manba turlarini qidirishim kerak
5. Menga berilishi mumkin bo’lgan 10 ta himoya savoli

QOIDA:
- Matn yozib berma
- Manba nomlarini to’qima — qidirish yo’lini ko’rsat`,
    tips: [
      '«Yozib berma, yo’naltir» — akademik halollik uchun',
      'AI dan manba nomlarini so’ramang — u to’qiydi',
      'Tuzilma va savollar — eng foydali yordam',
      'Muassasangiz AI siyosatini o’qing',
    ],
    callout: { tone: 'danger', title: 'Akademik halollik', body: 'AI to’qib chiqargan manbalar va iqtiboslar — eng keng tarqalgan jiddiy xato. Har bir manbani real bazadan tekshiring.' },
    practice: {
      title: 'Tadqiqot savoli',
      task: 'Mavzuingizni 3 ta torroq tadqiqot savoliga aylantiring va bittasini tanlang.',
      hint: 'Tor savol — kuchli ish.',
      sample: 'Tanlangan savolga tuzilma va himoya savollarini oling.',
    },
    takeaways: ['Yo’naltirish so’rang, matn emas', 'Manbani AI dan so’ramang', 'Muassasa qoidasini biling'],
  }),

  lesson({
    id: 'w-23', order: 23, slug: 'study-plan', section: 'Education',
    title: 'Study plan',
    summary: 'Real vaqtga mos, tekshiriladigan o’quv reja.',
    why: 'Ko’pchilik o’rganishni boshlaydi, lekin reja bo’lmagani uchun tashlab yuboradi.',
    prompt: `Menga o’quv reja tuz.

MAQSAD: {{nimani o’rganmoqchiman}}
HOZIRGI DARAJA: {{nima bilaman}}
VAQT: kuniga {{N}} daqiqa, {{M}} hafta
O’RGANISH USULI: {{video / o’qish / amaliyot}}
MOTIVATSIYA: {{nima uchun kerak}}

BER:
1. Haftalik bosqichlar (har hafta: mavzu, natija, tekshiruv)
2. Har hafta uchun aniq amaliy vazifa
3. O’zimni tekshirish savollari
4. Qanday belgilar bo’yicha "o’rgandim" deb hisoblayman
5. Qiynalganda nima qilish

QOIDA:
- Kunlik vaqtimdan oshirma
- Har hafta amaliy natija bo’lsin`,
    tips: [
      'Kunlik vaqtni real ayting — 3 soat deb yozib, 20 daqiqa qilmang',
      'Har hafta amaliy natija bo’lsin — bilim emas, ish',
      'Tekshirish mezonini oldindan belgilang',
      'Rejani 2 haftada bir sozlang',
    ],
    callout: { tone: 'success', title: 'Amaliyot ustuvor', body: 'Reja «o’qish» emas, «qilish» ga qurilsin. 10 ta video ko’rish — 1 ta loyiha qurishdan foydasiz.' },
    practice: {
      title: 'O’z rejangiz',
      task: 'Ushbu platformani tugatish uchun real vaqtingizga mos reja tuzing.',
      hint: 'Kuniga 20 daqiqa ham yetarli — muhimi izchillik.',
      sample: 'Rejani Dashboard dagi streak bilan bog’lang.',
    },
    takeaways: ['Real vaqt bilan reja', 'Har hafta amaliy natija', 'Izchillik > intensivlik'],
  }),

  lesson({
    id: 'w-24', order: 24, slug: 'language-learning', section: 'Education',
    title: 'Language learning',
    summary: 'AI — cheksiz sabrli til hamsuhbati.',
    why: 'Tilni o’rganishda eng katta muammo — amaliyot yetishmasligi. AI buni hal qiladi.',
    prompt: `Sen mening ingliz tili o’qituvchimsan.

MENING DARAJAM: {{A2 / B1 / B2}}
MAQSAD: {{suhbat / ish / imtihon}}
MAVZU: {{bugungi mavzu}}

QOIDALAR:
1. Men bilan faqat ingliz tilida gaplash
2. Mening darajamga mos so’z va grammatika ishlat
3. Xato qilsam:
   - avval suhbatni davom ettir
   - keyin qavs ichida tuzatishni ko’rsat
   - nima uchun xato ekanini 1 jumlada tushuntir
4. Har 5 xabardan keyin 3 ta yangi so’z o’rgat
5. Meni gapirishga undab, savol berib tur

Boshla: {{vaziyat, masalan "kafeda buyurtma"}}`,
    tips: [
      'Rol o’ynash (roleplay) eng samarali usul',
      'Xatolarni darrov to’xtatib emas, suhbat oxirida tuzattiring',
      'Har kuni 10 daqiqa — haftada 1 soatdan yaxshi',
      'Ovozli rejim bo’lsa — talaffuz uchun ishlating',
    ],
    callout: { tone: 'info', title: 'Chegara', body: 'AI talaffuzni to’liq baholay olmaydi va jonli suhbat stressini bermaydi. U — mashq maydoni, real amaliyot o’rnini bosmaydi.' },
    practice: {
      title: 'Rol o’yin',
      task: 'Bir vaziyatni tanlab, 15 daqiqa faqat maqsad tilida suhbatlashing.',
      hint: 'Xatolardan qo’rqmang — ular tuzatiladi.',
      sample: 'Suhbat oxirida yangi so’zlar ro’yxatini so’rang.',
    },
    takeaways: ['Roleplay — eng samarali', 'Har kuni oz-ozdan', 'AI mashq maydoni, real emas'],
  }),

  /* ============================ FREELANCE ============================ */
  lesson({
    id: 'w-25', order: 25, slug: 'client-communication', section: 'Freelance',
    title: 'Client communication',
    summary: 'Aniq, professional va chegaralari bor muloqot.',
    why: 'Freelance da texnik mahoratdan ko’ra muloqot ko’proq loyiha yo’qotadi yoki yutadi.',
    prompt: `Mijozga xabar yozishda yordam ber.

VAZIYAT: {{nima sodir bo’ldi}}
MIJOZ: {{qanday odam, munosabat tarixi}}
MENING MAQSADIM: {{nimaga erishmoqchiman}}
QIYINCHILIK: {{nima noqulay — narx, muddat, qamrov o’zgarishi}}

TALABLAR:
- Professional, ammo qat’iy
- Kechirim so’rash bilan boshlanmasin
- Muammoni emas, yechimni taklif qil
- Aniq keyingi qadam bo’lsin
- 150 so’zgacha

2 ta variant ber: yumshoqroq va qat’iyroq.`,
    tips: [
      'Qamrov o’zgarishida: «bu qo’shimcha ish, mana narxi va muddati»',
      'Yomon xabarni tez yetkazing — kechiktirish yomonlashtiradi',
      'Har kelishuvni yozma tasdiqlang',
      'Muammo bilan birga yechim taklif qiling',
    ],
    callout: { tone: 'warn', title: 'Scope creep', body: 'Eng ko’p uchraydigan muammo — qamrovning sekin kengayishi. Har qo’shimcha so’rovga: «bu qo’shimcha ish» deb javob berish odatini shakllantiring.' },
    practice: {
      title: 'Qiyin xabar',
      task: 'Hozirgi eng noqulay mijoz suhbatingiz uchun 2 variant xabar oling.',
      hint: 'Yechim taklifi bilan yakunlang.',
      sample: 'Yumshoq va qat’iy variantlardan mosini tanlang.',
    },
    takeaways: ['Yechim bilan yozing', 'Qamrov o’zgarishini narxlang', 'Kelishuvni yozma tasdiqlang'],
  }),

  lesson({
    id: 'w-26', order: 26, slug: 'proposal', section: 'Freelance',
    title: 'Proposal (taklif)',
    summary: 'Mijoz muammosidan boshlanadigan taklif.',
    why: 'Ko’p takliflar o’zi haqida gapiradi. Yutadigan taklif mijoz haqida gapiradi.',
    prompt: `Loyiha taklifi yoz.

MIJOZ MUAMMOSI: {{o’z so’zlari bilan}}
MENING YECHIMIM: {{qanday hal qilaman}}
TAJRIBAM: {{tegishli ishlar}}
BYUDJET/MUDDAT: {{aniq}}

TUZILMA:
1. Muammoni qanday tushunganim (mijoz tili bilan)
2. Taklif etilayotgan yechim va nega aynan shunday
3. Bosqichlar va natijalar (har bosqichda mijoz nima oladi)
4. Muddat va narx
5. Nima kirmaydi (aniq chegara)
6. Nega men (qisqa, tegishli tajriba)
7. Keyingi qadam

QOIDA:
- Muammodan boshla, o’zimdan emas
- Texnik jargondan qoch
- "Nima kirmaydi" bo’limi majburiy`,
    tips: [
      'Mijoz muammosini uning so’zlari bilan takrorlang — ishonch beradi',
      '«Nima kirmaydi» bo’limi keyingi nizolarni oldini oladi',
      'Bosqichlar bo’yicha to’lov taklif qiling',
      'Taklifni qisqa qiling — 1-2 sahifa',
    ],
    callout: { tone: 'success', title: 'Yutuq formulasi', body: 'Muammoni mijozdan ham yaxshiroq ifodalasangiz — narx muhokamasi ancha oson kechadi.' },
    practice: {
      title: 'Taklif shabloni',
      task: 'Oxirgi so’rov uchun to’liq taklif yozing va «nima kirmaydi» bo’limini to’ldiring.',
      hint: 'Muammoni mijoz so’zlari bilan boshlang.',
      sample: 'Shablonni saqlab, har safar to’ldiring.',
    },
    takeaways: ['Muammodan boshlang', '«Nima kirmaydi» majburiy', 'Qisqa va aniq'],
  }),

  lesson({
    id: 'w-27', order: 27, slug: 'portfolio', section: 'Freelance',
    title: 'Portfolio',
    summary: 'Ish emas, natija ko’rsatiladigan portfolio.',
    why: 'Mijoz chiroyli rasmni emas, o’z muammosining yechilishini qidiradi.',
    prompt: `Portfolio keysi yozishda yordam ber.

LOYIHA: {{nima qildim}}
MIJOZ: {{qanday biznes}}
MUAMMO: {{nima muammo bor edi}}
YECHIM: {{nima qildim}}
NATIJA: {{raqamlar bo’lsa}}

FORMAT:
## [Sarlavha — natijaga urg’u]

**Mijoz:** [1 jumla]
**Muammo:** [2-3 jumla]
**Yechim:** [3-4 jumla — nima va nega]
**Natija:** [o’lchanadigan natija]
**Mening rolim:** [aniq nima qildim]

QOIDA:
- Texnologiya emas, natija haqida yoz
- Raqam bo’lmasa — sifat o’zgarishini tasvirla
- Mijoz maxfiyligini buzma`,
    tips: [
      '3-5 ta kuchli keys 20 ta o’rtachadan yaxshi',
      'Natijani raqamda ko’rsating',
      'Mijoz roziligini oling yoki nomni anonimlashtiring',
      'Har keysni bitta mijoz turiga qarating',
    ],
    callout: { tone: 'info', title: 'Raqam yo’q bo’lsa', body: '«Sotuv 30% oshdi» yozolmasangiz: «Buyurtma jarayoni 5 qadamdan 2 qadamga qisqardi» — bu ham o’lchanadigan natija.' },
    practice: {
      title: 'Bitta keys',
      task: 'Eng yaxshi loyihangizni keys formatida yozing.',
      hint: 'Muammo bo’limiga eng ko’p vaqt ajrating.',
      sample: 'Keysni portfolio saytingizga qo’ying.',
    },
    takeaways: ['Natija > texnologiya', '3-5 kuchli keys yetarli', 'Maxfiylikni saqlang'],
  }),

  lesson({
    id: 'w-28', order: 28, slug: 'project-estimation', section: 'Freelance',
    title: 'Project estimation',
    summary: 'Realistik baho — daromadingizni himoya qiladi.',
    why: 'Past baho — tunlab bepul ishlash degani. Baholash — biznes ko’nikmasi.',
    prompt: `Loyiha bahosini tuzishda yordam ber.

LOYIHA: {{tavsif}}
MENING TEZLIGIM: {{tajriba darajasi}}
NOMA’LUMLIKLAR: {{nima aniq emas}}

BER:
1. Vazifalar ro’yxati (hech narsani tashlab ketma):
   - Asosiy ish
   - Kommunikatsiya va uchrashuvlar
   - Tuzatishlar va iteratsiyalar
   - Testlash
   - Yetkazib berish va hujjat
2. Har vazifa uchun soat oralig’i (min–max)
3. Noma’lumlik koeffitsienti taklifi
4. Qanday savollarni mijozdan so’rashim kerak
5. Qaysi vazifalar odatda unutiladi

QOIDA: optimistik baho berma, real oraliq ber.`,
    tips: [
      'Kommunikatsiya va tuzatishlar odatda 30% vaqt oladi — hisobga oling',
      'AI bahosini 1.5–2x ga ko’paytiring',
      'Noma’lumlik ko’p bo’lsa — bosqichli shartnoma',
      'Har loyihadan keyin real vaqtni yozib boring',
    ],
    callout: { tone: 'warn', title: 'Unutilgan ishlar', body: 'Uchrashuvlar, tuzatishlar, fayl uzatish, hisob-faktura, mijozga tushuntirish — bular ham vaqt. Bahoga kiriting.' },
    practice: {
      title: 'Baho jadvali',
      task: 'Joriy loyihangizni vazifalarga bo’lib, min–max soat bilan baholang.',
      hint: 'Kommunikatsiyani alohida qator qiling.',
      sample: 'Loyiha tugagach real vaqt bilan solishtiring.',
    },
    takeaways: ['Barcha ishlarni hisoblang', 'Bahoni ko’paytiring', 'Real vaqtni yozib boring'],
  }),

  lesson({
    id: 'w-29', order: 29, slug: 'freelance-documentation', section: 'Freelance',
    title: 'Documentation (shartnoma va hujjatlar)',
    summary: 'Yozma kelishuv — eng arzon sug’urta.',
    why: 'Nizolarning aksariyati «biz shunday kelishmagan edik» dan boshlanadi.',
    prompt: `Freelance kelishuv hujjati uchun tuzilma tayyorla.

XIZMAT: {{nima}}
MIJOZ: {{kim}}
MUDDAT VA NARX: {{aniq}}

BO’LIMLAR:
1. Ish qamrovi (aniq nima kiradi)
2. Nima kirmaydi
3. Bosqichlar va natijalar
4. To’lov shartlari (bosqichlar bo’yicha)
5. Tuzatishlar soni va qo’shimcha ish narxi
6. Muddatlar va kechikish holati
7. Intellektual mulk kimga o’tadi va qachon
8. Bekor qilish sharti
9. Kommunikatsiya kanali va javob vaqti

QOIDA:
- Bu huquqiy maslahat emas, tuzilma
- Har band nima uchun kerakligini izohla`,
    tips: [
      'Har doim yozma kelishuv — hatto kichik loyihada ham',
      'Tuzatishlar sonini aniq belgilang',
      'To’lovni bosqichlarga bo’ling, oldindan avans oling',
      'Muhim shartnomani huquqshunosga ko’rsating',
    ],
    callout: { tone: 'danger', title: 'Huquqiy chegara', body: 'AI yozgan shartnoma — qoralama. Katta summali loyihalarda mutaxassis tekshiruvi shart. Mahalliy qonunchilikni AI bilmasligi mumkin.' },
    practice: {
      title: 'Kelishuv shabloni',
      task: 'O’z xizmatingiz uchun kelishuv tuzilmasini tayyorlang va tuzatishlar sonini belgilang.',
      hint: '«Nima kirmaydi» bo’limini batafsil yozing.',
      sample: 'Shablonni har mijoz uchun to’ldiring.',
    },
    takeaways: ['Yozma kelishuv majburiy', 'Tuzatishlar sonini cheklang', 'Katta shartnomani huquqshunosga'],
  }),

  lesson({
    id: 'w-30', order: 30, slug: 'freelance-workflow', section: 'Freelance',
    title: 'Freelance workflow tizimi',
    summary: 'Barcha bosqichlarni AI bilan bog’lash.',
    why: 'Alohida promptlar — alohida foyda. Bog’langan tizim — barqaror biznes.',
    prompt: `Freelance ish oqimimni tizimlashtirishda yordam ber.

XIZMATIM: {{nima}}
OYIGA LOYIHA: {{necha ta}}
ENG KO’P VAQT KETADIGAN JOY: {{nima}}

BER:
1. Mijoz yo’li bosqichlari (birinchi aloqadan yakunlashgacha)
2. Har bosqichda:
   - Qanday hujjat/xabar kerak
   - Qaysi qismini shablonlash mumkin
   - Qaysi qismida AI yordam beradi
3. Takrorlanuvchi ishlarning shablon ro’yxati
4. Qaysi bosqichda eng ko’p vaqt yo’qoladi va qanday tejash mumkin

QOIDA: amaliy va bugundan boshlab qo’llanadigan bo’lsin.`,
    tips: [
      'Har bosqich uchun bitta shablon yarating',
      'Shablonlarni Prompt Library ga saqlang',
      'Oyiga bir marta tizimni qayta ko’rib chiqing',
      'Eng ko’p vaqt yeydigan bosqichdan boshlang',
    ],
    callout: { tone: 'success', title: 'Level 5 tugadi', body: 'Endi Level 6 — Advanced AI ga o’ting yoki Projects bo’limida real loyiha quring.' },
    practice: {
      title: 'Tizim xaritasi',
      task: 'Mijoz yo’lingizni bosqichlarga bo’ling va har biriga shablon biriktiring.',
      hint: 'Kamida 5 ta shablon yarating.',
      sample: 'Shablonlarni Prompt Library ga qo’shing.',
    },
    takeaways: ['Har bosqichga shablon', 'Tizim > alohida promptlar', 'Eng og’riqli bosqichdan boshlang'],
  }),
]
