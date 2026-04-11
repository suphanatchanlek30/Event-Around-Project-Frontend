// components/public-section/home/hero-banner/constants.ts

export const HERO_BANNER = {
  title: 'สวัสดี, นักสำรวจ!',
  subtitle: 'ค้นพบกิจกรรมที่กำลังเกิดขึ้นรอบตัวคุณ',
  description:
    'พบกับอีเวนท์อัน การแนะนำคำแนะนำและงานแสดงสิ่งของคุณเริ่มตั้นแต่นี้',
  buttons: [
    {
      label: 'หาสถานที่ใกล้ฉัน',
      href: '/events',
      variant: 'primary' as const,
      icon: 'find',
    },
    {
      label: 'สำรวจแผนที่',
      href: '/map',
      variant: 'secondary' as const,
      icon: 'map',
    },
  ],
};
