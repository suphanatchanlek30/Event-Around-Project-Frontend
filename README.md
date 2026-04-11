# Even Around Frontend

โปรเจกต์ Frontend สำหรับแอปพลิเคชัน Even Around ใช้ **Next.js App Router** และ **Tailwind CSS** เป็นหลัก โครงสร้างโค้ดถูกแยกตามหน้าที่เพื่อให้ง่ายต่อการพัฒนา ดูแล และขยายต่อในทีม

---

## เริ่มต้นอย่างรวดเร็ว

### ติดตั้ง Dependencies
```bash
npm install
```

### รัน Development Server
```bash
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000) ในเบราว์เซอร์เพื่อดูผลลัพธ์

---

## ภาพรวมโครงสร้างโปรเจกต์

### `app/`
เก็บหน้าเว็บทั้งหมดตามแนวคิดของ Next.js App Router

```
app/
├── layout.tsx              // layout หลักของทั้งแอป
├── globals.css             // global styles และตัวแปรสีร่วมของโปรเจกต์
├── page.tsx                // หน้าเริ่มต้นของโปรเจกต์
├── (admin)/                // กลุ่มหน้าที่เกี่ยวกับฝั่ง Admin
│   ├── layout.tsx
│   └── admin.txt
├── (auth)/                 // กลุ่มหน้า Authentication
│   ├── layout.tsx
│   ├── types.ts
│   ├── login/
│   │   ├── page.config.ts
│   │   └── page.tsx
│   └── register/
│       ├── page.config.ts
│       └── page.tsx
├── (organizer)/            // กลุ่มหน้าที่เกี่ยวกับฝั่ง Organizer
│   └── organizer.txt
└── (public)/               // กลุ่มหน้าที่เปิดให้ผู้ใช้ทั่วไป
    └── page.tsx
```

### `components/`
เก็บ UI ที่นำกลับมาใช้ซ้ำได้ แยกตามโดเมนของระบบ

```
components/
├── admin-section/          // component ของฝั่ง Admin
├── auth-section/           // component ของฝั่ง Auth
│   ├── auth-field.tsx
│   ├── auth-shell.tsx
│   ├── index.ts
│   ├── types.ts
│   ├── auth-form/
│   │   ├── auth-form-header.tsx
│   │   ├── auth-form-submit-button.tsx
│   │   ├── auth-form-support-row.tsx
│   │   ├── auth-form-switch-row.tsx
│   │   ├── auth-form.tsx
│   │   └── types.ts
│   └── constants/
│       ├── auth-config.ts
│       ├── auth-ui.ts
│       └── ...
├── organizer-section/      // component ของฝั่ง Organizer
└── public-section/         // component ของฝั่ง Public
```

**หลักการแบ่งส่วน component:**
- `*-card.tsx` → การ์ด (Card component)
- `*-form.tsx` → ฟอร์ม (Form component)
- `*-header.tsx` → ส่วนหัว (Header section)
- `*-section.tsx` → ส่วนใหญ่ (Section component)
- `types.ts` → interface/type ของโมดูล
- `index.ts` → barrel export สำหรับ import จากจุดเดียว

### `public/`
เก็บไฟล์ static ที่เรียกใช้ตรงได้ เช่น รูปภาพ ไอคอน และไฟล์สื่ออื่น ๆ

```
public/
├── admin-section/          // รูปภาพที่ใช้กับหน้า Admin
├── auth-section/           // รูปภาพที่ใช้กับหน้า Auth
├── organizer-section/      // รูปภาพที่ใช้กับหน้า Organizer
└── public-section/         // รูปภาพที่ใช้กับหน้า Public
```

---

## แนวทางการเพิ่มไฟล์ใหม่

### เพิ่มหน้าเว็บใหม่
ให้เพิ่มใน `app/` ตาม route ที่ต้องการ
```
หน้า Admin ใหม่        → app/(admin)/[feature]/page.tsx
หน้า Auth ใหม่         → app/(auth)/[feature]/page.tsx
หน้า Organizer ใหม่   → app/(organizer)/[feature]/page.tsx
หน้า Public ใหม่      → app/(public)/[feature]/page.tsx
```

### เพิ่ม Component ใหม่
ให้ใส่ใน `components/` ตามกลุ่มงานที่เกี่ยวข้อง
```
ฝั่ง Admin      → components/admin-section/
ฝั่ง Auth       → components/auth-section/
ฝั่ง Organizer  → components/organizer-section/
ฝั่ง Public     → components/public-section/
```

### เพิ่มรูปหรือ Asset
ให้วางใน `public/` แล้วอ้างอิงด้วย path
```typescript
<img src="/auth-section/login-banner.png" alt="Login" />
```

---

## กติกาการเขียนโค้ด

### 1. แยกหน้าที่ของไฟล์ให้ชัดเจน
- ไม่ควรใหญ่เกินไป (ควรประมาณ 100-300 บรรทัด)
- หากไฟล์ใหญ่เกินไป ให้แยกเป็นไฟล์ย่อย

### 2. ใช้ `index.ts` สำหรับ Barrel Export
```typescript
// components/auth-section/index.ts
export { AuthField } from './auth-field';
export { AuthShell } from './auth-shell';
export { AuthForm } from './auth-form/auth-form';
export * from './types';
```

### 3. ใช้ Constants สำหรับค่าที่ใช้ซ้ำ
- ข้อความ, ป้ายชื่อ, path รูปภาพ → `components/[section]/constants/`
- เลขพิเศษ, timeout → `lib/constants/`

### 4. ใช้ Tailwind สำหรับ Styling หลัก
```typescript
// ✅ ถูกต้อง
<div className="flex items-center gap-4 px-6 py-3">
  <p className="text-lg font-semibold text-gray-900">Hello</p>
</div>

// ❌ หลีกเลี่ยง
<div style={{ display: 'flex', gap: '1rem' }}>
  ...
</div>
```

### 5. ใช้ `globals.css` สำหรับตัวแปรสีและ Style กลาง
```css
/* app/globals.css */
:root {
  --primary: #6366f1;
  --secondary: #ec4899;
  --success: #10b981;
}

.btn-primary {
  @apply px-4 py-2 bg-[var(--primary)] text-white rounded-lg;
}
```

### 6. ตั้งชื่อไฟล์ให้สื่อความหมาย
```
✅ auth-form.tsx
✅ auth-form-header.tsx
✅ login-page.tsx

❌ form.tsx
❌ header.tsx
❌ page1.tsx
```

---

## คำสั่ง NPM ที่สำคัญ

| คำสั่ง | คำอธิบาย |
|--------|---------|
| `npm run dev` | รัน development server บน localhost:3000 |
| `npm run build` | สร้าง production build (ต้องรันก่อนส่ง PR) |
| `npm run lint` | เช็คโค้ดด้วย ESLint |
| `npm run type-check` | เช็ค TypeScript types |

---

## Git Workflow

### ดูสถานะ
```bash
git status
```

### ดึงโค้ดล่าสุด
```bash
# ดึงจาก main
git checkout main
git pull origin main

# ดึงจาก dev
git checkout dev
git pull origin dev
```

### สร้าง Branch งานใหม่
```bash
git checkout dev
git checkout -b feat/[feature-name]

# ตัวอย่าง
git checkout -b feat/auth-login-page
git checkout -b fix/button-styling
```

### บันทึกการเปลี่ยนแปลง
```bash
git add .
git commit -m "feat: add login page layout"
```

### ส่ง Branch ขึ้น Remote
```bash
git push -u origin feat/[feature-name]
```

### เช็กก่อนเปิด PR
```bash
npm install
npm run build
npm run lint
```

---

## Flow การทำงาน (Recommended)

```
1. ดึงโค้ดล่าสุด
   git checkout dev && git pull origin dev

2. สร้าง branch งานใหม่
   git checkout -b feat/[feature-name]

3. พัฒนา feature บน branch นั้น

4. รัน build ให้ผ่าน
   npm run build

5. Push branch ขึ้น remote
   git push -u origin feat/[feature-name]

6. เปิด Pull Request จาก feat/* ไป dev

7. รอ review จากทีม

8. Merge เข้า dev เมื่อ approve

9. Merge dev เข้า main เมื่อพร้อม release
```

---

## Commit Message Convention

```
feat: บรรยายฟีเจอร์ใหม่
fix: แก้บั้ก
refactor: ปรับโครงสร้างโค้ด
style: เปลี่ยน styling
docs: อัปเดต documentation
test: เพิ่ม test

ตัวอย่าง:
✅ feat: add user authentication modal
✅ fix: resolve button click handler
✅ refactor: split auth form into sub-components
```

---

## หมายเหตุสำคัญ

**อย่าแก้ UI โดยกระจายในหลายไฟล์**
- ถ้า Logic หรือ UI ใช้ซ้ำหลายจุด ให้ย้ายออกเป็น component หรือ constant

**เช็ก Build ก่อนเสมอ**
```bash
npm run build
```

**อ่าน AGENTS.md และ CLAUDE.md**
- ศึกษา Next.js breaking changes ใน node_modules
- ทำความเข้าใจ project rules ก่อนเขียนโค้ด

---

## ทรัพยากรเพิ่มเติม

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Happy Coding!**
