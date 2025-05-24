export const NAVIGATION_ITEMS = [
  { name: 'Beranda', href: '/' },
  { name: 'Profil', href: '/profil' },
  { name: 'Publikasi', href: '/publikasi' },
  { name: 'Tim', href: '/tim' },
  { name: 'Peta', href: '/peta' },
  { name: 'Layanan Desa', href: '/layanan-desa' },
];

export const THEME_KKN = {
  title: 'KKN Tematik di Kawasan Transmigrasi',
  location: 'Desa Cahaya Baru dan Sampurna',
  areas: [
    'Akselerasi Pengembangan Desa melalui Inovasi Digital',
    'Sanitasi Lingkungan',
    'Kesehatan Komunitas', 
    'Pemberdayaan Sosio-ekonomi',
    'Ketahanan Agroekologi'
  ]
};

export const LOCATIONS = [
  {
    name: 'Cahaya Baru',
    type: 'desa' as const,
    description: 'Desa dengan potensi alam yang luar biasa',
    image: '/images/cahaya-baru.jpg'
  },
  {
    name: 'Sampurna', 
    type: 'desa' as const,
    description: 'Desa dengan sistem pertanian modern',
    image: '/images/sampurna.jpg'
  }
];

export const SOCIAL_MEDIA = {

}