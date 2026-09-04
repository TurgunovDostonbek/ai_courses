# AI Mastery

AI va Prompt Engineering bo‘yicha o‘zbek tilidagi o‘quv platformasi: 6 daraja, 112 dars,
interaktiv demolar, Prompt Lab, prompt baholash, AI vositalari katalogi, challenge lar,
loyihalar, analitika, nishonlar va sertifikat.

Backend yo‘q — butun progress foydalanuvchi brauzerida (`localStorage`) saqlanadi.

## Ishga tushirish

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
npm run preview
npm run lint
```

## Arxitektura

```
src/
  data/           Kontent qatlami (kurslar, darslar, quizlar, vositalar,
                  promptlar, challenge lar, loyihalar, gamifikatsiya).
                  Backend ulanganda faqat shu qatlam almashadi.
  context/        Global holat: Theme, I18n, Toast, Auth, Progress
  components/
    common/       Dizayn tizimi (Button, Card, Modal, Field, States, Misc…)
    layout/       AppLayout, PublicLayout, Sidebar, Topbar, BottomNav, CommandPalette
    course/       Kurs kartasi, dars qatori, dars blok renderi, interaktiv demolar
    quiz/         Savol kartasi (6 tur) va natija ekrani
    prompt/       Prompt kartasi, shablon oynasi, baho paneli
    ai-tools/     Vosita kartasi
    challenge/    Challenge kartasi va batafsil ko‘rinishi
    dashboard/    Tavsiya, faoliyat tarixi, seriya kalendari, tezkor havolalar
  pages/          20 ta sahifa — har biri `index.jsx` + CSS module
  routes/         Marshrutlar (barcha sahifalar lazy yuklanadi)
  hooks/          useLocalStorage, useDebounce, useCopy, useHotkey, useMediaQuery…
  services/       aiService — mock rejim, real API ga ulanishga tayyor
  utils/          format, storage, promptBuilder, promptScore, quiz
  styles/         tokens.css (dizayn tokenlari) + base.css + utilities.css
  i18n/           uz / en / ru tarjimalari
```

### Asosiy qarorlar

- **Yagona haqiqat manbai — `ProgressContext`.** XP, seriya, darslar, testlar,
  challenge lar, loyihalar, nishonlar va sertifikat shu yerda hisoblanadi va
  `localStorage` ga yoziladi.
- **Kontent — ma’lumot, kod emas.** Yangi dars, vosita yoki prompt qo‘shish uchun
  `src/data/` dagi massivga obyekt qo‘shish kifoya; filtrlar, qidiruv (Ctrl+K),
  statistika va marshrutlar avtomatik ishlaydi.
- **Uslublar — CSS Modules + tokenlar.** Ranglar `styles/tokens.css` dagi
  o‘zgaruvchilardan olinadi, shuning uchun yorug‘/tungi mavzu bir joydan boshqariladi.
- **AI qatlami almashtiriladigan.** `services/aiService.js` hozir `MODE = 'mock'`.
  Real API uchun: backend proxy yozing (kalit hech qachon frontendda bo‘lmasin),
  `AI_ENDPOINT` ni o‘zgartiring va `MODE` ni `'live'` qiling — qolgan kod tegilmaydi.

### Marshrutlar

| Yo‘l | Sahifa |
|---|---|
| `/` | Landing (PublicLayout) |
| `/dashboard` | Dashboard |
| `/courses`, `/courses/:courseId`, `/courses/:courseId/quiz` | Kurslar, kurs sahifasi, yakuniy test |
| `/lessons/:lessonId` | Dars |
| `/prompt-lab`, `/prompt-practice`, `/prompt-library` | Prompt vositalari |
| `/ai-tools`, `/ai-tools/:toolId` | AI vositalari katalogi |
| `/challenges`, `/daily-challenge`, `/projects` | Amaliyot |
| `/analytics`, `/badges`, `/certificate` | Natijalar |
| `/profile`, `/settings` | Foydalanuvchi |

### Klaviatura

- `Ctrl/Cmd + K` — global qidiruv (kurs, dars, vosita, prompt, challenge, loyiha)

## Ma’lumotlar

Sozlamalar sahifasida progressni JSON sifatida eksport/import qilish va to‘liq
tozalash mumkin. Barcha kalitlar `ai-mastery:` prefiksi bilan saqlanadi
(`utils/storage.js`).

## Ma’lum cheklovlar

- Boshlang‘ich JS to‘plami ~318 kB (gzip): `ProgressContext` barcha dars kontentini
  import qiladi. Kerak bo‘lsa dars **metadatasi**ni dars **kontenti**dan ajratib,
  kontentni lazy yuklash mumkin.
- AI javoblari demo rejimda lokal generatsiya qilinadi.
