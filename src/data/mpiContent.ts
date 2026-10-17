import { Technique, QuizQuestion, Badge } from '../types';

export const MPI_META = {
  title: 'ART-EXPLORER: Petualangan Menjelajah 7 Teknik Menggambar',
  shortTitle: 'ART-EXPLORER SMP',
  subject: 'Seni Rupa',
  grade: 'SMP Kelas VII / Semester 1',
  topic: 'Menggambar',
  subtopic: 'Teknik Dasar Menggambar',
  timeAllocation: '3 JP x 40 Menit (120 Menit)',
  learningMode: 'Blended Learning (Tatap Muka & Asinkron)',
  targetScore: 80,
  mentorName: 'Maestro Seno',
  mentorRole: 'Pelukis Pemandu & Kurator Cilik'
};

export const LEARNING_OBJECTIVES = {
  cp: 'Pada akhir Fase D (Kelas VII), peserta didik mampu merealisasikan ide/gagasan ke dalam bentuk gambar dua dimensi dengan mengaplikasikan beragam teknik dasar menggambar, memahami prinsip gelap-terang, proporsi, dan tekstur rupa.',
  tp: [
    'Peserta didik mampu mengidentifikasi karakteristik 7 teknik dasar menggambar (arsir, dussel, pointilis, aquarel, plakat, blok, dan linear).',
    'Peserta didik mampu menganalisis hubungan antara tekanan goresan/kerapatan medium terhadap efek volume 3D dan gelap-terang objek.',
    'Peserta didik mampu mempraktikkan simulasi teknik dasar menggambar pada kanvas virtual sesuai karakteristik alat dan bahan.',
    'Peserta didik mampu menyelesaikan tantangan studi kasus berkarya menggambar dengan nilai ketuntasan minimal 80.'
  ],
  iktp: [
    'Menjelaskan perbedaan mendasar antara teknik kering (arsir, dussel, pointilis) dan teknik basah (aquarel, plakat).',
    'Menghasilkan gradasi gelap-terang pada objek geometris sederhana (bola/silinder) menggunakan minimal satu teknik dasar.',
    'Memilih teknik yang tepat berdasarkan karakteristik objek yang akan digambar.',
    'Mencapai skor asesmen sumatif minimal 80 poin pada kuis terpadu.'
  ],
  profilPancasila: [
    { title: 'Kreatif', desc: 'Mampu memodifikasi dan menghasilkan karya orisinal melalui eksplorasi berbagai teknik rupa.' },
    { title: 'Bernalar Kritis', desc: 'Mampu menganalisis pengaruh pencahayaan, bayangan, dan kerapatan goresan terhadap ilusi volume.' },
    { title: 'Mandiri', desc: 'Mampu mengelola proses belajarnya sendiri melalui modul dan simulasi laboratorium virtual.' }
  ]
};

export const APERCEPTION_DATA = {
  title: 'Mengapa Gambar Bisa Terlihat Hidup & Nyata?',
  hook: 'Halo calon seniman muda! Pernahkah kamu menggambar sebuah lingkaran di kertas, lalu lingkaran itu terlihat datar seperti keping koin koin biasa? Bandingkan dengan bola sepak asli yang bulat montok dan memiliki volume!',
  problemStatement: 'Rahasia di balik benda 2D yang tampak seperti benda 3D nyata adalah "Pencahayaan & Teknik Menggambar". Dengan memberikan efek gelap-terang menggunakan teknik yang tepat, mata kita tertipu melihat ilusi kedalaman (depth & volume).',
  comparison: {
    flat: {
      title: 'Hanya Garis Kontur (2D Datar)',
      desc: 'Hanya memiliki batas tepi (garis luar). Otak kita melihatnya sebagai bidang datar tanpa ketebalan atau ruang.',
    },
    shaded: {
      title: 'Diberi Teknik Gelap-Terang (3D Berdimensi)',
      desc: 'Memiliki zona terang (highlight), bayangan inti (core shadow), dan bayangan jatuh (cast shadow) yang diciptakan oleh teknik arsir atau dussel.',
    }
  },
  lightZones: [
    { name: 'Highlight (Sorot Cahaya)', desc: 'Titik paling terang tempat cahaya langsung jatuh. Biasanya dibiarkan putih atau sangat tipis.' },
    { name: 'Midtone (Nada Tengah)', desc: 'Warna asli objek yang menerima cahaya sedang.' },
    { name: 'Core Shadow (Bayangan Inti)', desc: 'Bagian objek yang tidak terkena cahaya sama sekali, paling gelap pada permukaan objek.' },
    { name: 'Reflected Light (Pantulan Cahaya)', desc: 'Cahaya lembut yang memantul dari permukaan meja/tanah kembali ke sisi bawah objek.' },
    { name: 'Cast Shadow (Bayangan Jatuh)', desc: 'Bayangan yang dilemparkan objek ke lantai atau permukaan sekitarnya.' }
  ]
};

export const TECHNIQUES_DATA: Technique[] = [
  {
    id: 'arsir',
    name: 'Teknik Arsir',
    alias: 'Hatching & Cross-Hatching',
    icon: 'PenTool',
    color: '#3B82F6',
    tagline: 'Membuat ilusi gelap-terang lewat goresan garis berulang',
    description: 'Teknik arsir adalah teknik menggambar dengan menarik garis-garis sejajar atau bersilangan secara berulang-ulang. Tingkat kegelapan (value) ditentukan oleh seberapa rapat dan tebal garis-garis yang kamu buat.',
    characteristic: [
      'Goresan garis tegas dan jelas terlihat secara visual',
      'Kerapatan garis menentukan tingkat kegelapan bayangan',
      'Dapat berupa arsir searah (hatching), silang (cross-hatching), melingkar (contour), atau acak (scumbling)',
      'Sangat cocok untuk media kering seperti pensil grafik, drawing pen, dan pulpen'
    ],
    tools: ['Pensil 2B, 4B, 6B', 'Drawing Pen (0.1 - 0.5)', 'Kertas Gambar', 'Penghapus Presisi'],
    steps: [
      'Tentukan arah datangnya sumber cahaya pada objek.',
      'Mulai dengan arsir tipis pada bagian nada tengah (midtone).',
      'Tumpuk garis arsir menyilang pada area yang lebih gelap (core shadow).',
      'Rapatkan goresan pada area bayangan jatuh (cast shadow).'
    ],
    bestUsedFor: 'Menggambar benda mati (still life), arsitektur, anatomi makhluk hidup, dan sketsa cepat dengan pensil/pena.',
    difficulty: 'Mudah',
    visualType: 'hatching',
    tipMaestro: 'Jangan tekan pensil terlalu kuat di awal! Bangun kepekatan bayangan lapis demi lapis agar gradasinya halus dan tidak merusak permukaan kertas.',
    sampleWorks: {
      title: 'Sketsa Buah Apel Bervolume',
      caption: 'Apel tampak bulat pejal karena perpaduan arsir searah dan silang yang mengikuti kelengkungan kulit apel.'
    }
  },
  {
    id: 'dussel',
    name: 'Teknik Dussel',
    alias: 'Smudge / Blending Technique',
    icon: 'Feather',
    color: '#8B5CF6',
    tagline: 'Menggosok goresan pensil hingga menciptakan gradasi ultra-halus',
    description: 'Teknik dussel (atau gosok) adalah teknik menggambar dengan cara menggosok goresan pensil yang dimiringkan menggunakan jari, kapas, kuas kering, atau dusel (paper stump) sehingga menghasilkan transisi gelap-terang yang sangat lembut tanpa terlihat patahan garis.',
    characteristic: [
      'Transisi warna dan bayangan sangat lembut (sfumato)',
      'Garis-garis kasar menghilang menjadi asap bayangan lembut',
      'Pensil biasanya digoreskan dalam posisi rebah/miring',
      'Membutuhkan alat bantu gosok seperti dusel gulungan kertas (tortillon) atau kapas'
    ],
    tools: ['Pensil Lunak (4B - 8B, Charcoal)', 'Dusel Kertas (Paper Stump)', 'Kapas / Tisu Halus', 'Penghapus Uli (Kneaded Eraser)'],
    steps: [
      'Arsir secara tipis dan rebahkan pensil di atas kertas.',
      'Gunakan dusel atau tisu untuk menggosok goresan dari arah terang menuju gelap.',
      'Tambahkan bubuk grafit atau pensil pekat pada sudut terdalam.',
      'Gunakan penghapus uli untuk memunculkan kembali titik cahaya (highlight).'
    ],
    bestUsedFor: 'Menggambar potret wajah manusia (kulit halus), asap, awan, kabut, dan benda berefleksi lembut.',
    difficulty: 'Sedang',
    visualType: 'smudge',
    tipMaestro: 'Hindari menggosok langsung dengan jari tangan yang berkeringat atau berminyak, karena minyak alami jari dapat meninggalkan noda permanen pada kertas gambar!',
    sampleWorks: {
      title: 'Potret Bayangan Cangkir Keramik',
      caption: 'Gradasi bayangan pada lekukan cangkir tampak menyatu mulus berkat teknik gosok dussel.'
    }
  },
  {
    id: 'pointilis',
    name: 'Teknik Pointilis',
    alias: 'Stippling / Dot Art',
    icon: 'CircleDot',
    color: '#EC4899',
    tagline: 'Membangun objek utuh dari jutaan titik-titik kecil yang sabar',
    description: 'Teknik pointilis adalah teknik menggambar menggunakan titik-titik kecil yang disusun berulang-ulang untuk membentuk wujud objek dan efek gelap-terang. Semakin rapat titik-titik diletakkan, semakin gelap bayangan yang dihasilkan.',
    characteristic: [
      'Gambar tersusun murni dari kumpulan titik (dot)',
      'Efek optik pencampuran warna di mata pengamat',
      'Membutuhkan ketelitian, ritme tangan, dan kesabaran tinggi',
      'Tekstur permukaan tampak khas seperti pasir halus (granular)'
    ],
    tools: ['Drawing Pen tinta pekat (0.1 - 0.3)', 'Spidol Fine Tip', 'Kertas Tebal (Drawing Paper 150-200 gsm)'],
    steps: [
      'Buat sketsa bentuk dasar secara sangat tipis sebagai panduan batas.',
      'Mulai sebar titik secara renggang di seluruh area objek.',
      'Rapatkan sebaran titik pada area bayangan sedang.',
      'Buat titik-titik super rapat dan tumpang tindih pada sudut bayangan paling gelap.'
    ],
    bestUsedFor: 'Karya seni rupa dekoratif, ilustrasi botani (bunga & daun), serta potret bergaya vintage engraving.',
    difficulty: 'Tantangan',
    visualType: 'stippling',
    tipMaestro: 'Pegang drawing pen tegak lurus 90 derajat terhadap kertas agar ujung pena tidak cepat rusak dan titik yang dihasilkan berbentuk bundar sempurna, bukan seperti ekor komet!',
    sampleWorks: {
      title: 'Ilustrasi Jamur Hutan & Daun',
      caption: 'Tekstur payung jamur terlihat alami berkat kepadatan sebaran titik pointilis yang bervariasi.'
    }
  },
  {
    id: 'aquarel',
    name: 'Teknik Aquarel',
    alias: 'Transparent Water Wash',
    icon: 'Droplet',
    color: '#06B6D4',
    tagline: 'Sapuan kuas cat air transparan yang segar dan tembus pandang',
    description: 'Teknik aquarel adalah teknik menggambar atau melukis menggunakan media basah (terutama cat air/watercolor) dengan sapuan kuas yang tipis dan encer sehingga lapisan warna di bawahnya tetap terlihat tembus cahaya (transparan).',
    characteristic: [
      'Sifat warna transparan dan tembus pandang',
      'Warna putih didapat dari warna asli kertas (bukan cat putih)',
      'Menggunakan prinsip "wet-on-wet" (basah di atas basah) atau "wet-on-dry"',
      'Membutuhkan kertas khusus cat air yang menyerap cairan tanpa melengkung rusak'
    ],
    tools: ['Cat Air (Watercolor Cake / Tube)', 'Kuas Bulu Halus (Round Brush)', 'Palet Campur & Air Bersih', 'Kertas Cat Air (Cold Pressed 300 gsm)'],
    steps: [
      'Basahi kertas secara merata dengan kuas bersih (wash).',
      'Larutkan cat dengan perbandingan air yang banyak agar transparan.',
      'Sapukan kuas secara lebar dari atas ke bawah mengikuti alur warna.',
      'Biarkan mengering sebelum menimpa lapisan warna berikutnya (glazing).'
    ],
    bestUsedFor: 'Pemandangan alam (lanskap), langit senja, cipratan air, bunga-bungaan basah, dan suasana puitis.',
    difficulty: 'Sedang',
    visualType: 'wash',
    tipMaestro: 'Ingat aturan emas cat air: selalu mulai dari warna yang paling terang menuju warna yang paling gelap! Sekali warna gelap tertumpah, sulit untuk dibuat terang kembali.',
    sampleWorks: {
      title: 'Pemandangan Senja di Tepi Danau',
      caption: 'Gradasi langit jingga ke biru danau berbaur alami karena efek rembesan air pada teknik aquarel.'
    }
  },
  {
    id: 'plakat',
    name: 'Teknik Plakat',
    alias: 'Opaque & Gouache Layering',
    icon: 'Palette',
    color: '#F59E0B',
    tagline: 'Sapuan cat tebal dan pekat yang mampu menutup bidang sempurna',
    description: 'Teknik plakat adalah teknik melukis atau menggambar dengan sapuan warna yang tebal, pekat, dan menutup (opaque). Berbeda dengan aquarel, teknik plakat menggunakan sedikit air sehingga warna tampak solid, cerah, dan lapisan warna baru dapat menutupi warna lama di bawahnya.',
    characteristic: [
      'Sifat warna pekat, padat, dan tidak tembus cahaya (menutup sempurna)',
      'Sapuan kuas berbobot dan tegas',
      'Cat putih dapat digunakan untuk memberi highlight di atas warna gelap',
      'Biasa memakai cat poster (poster color), gouache, atau cat akrilik'
    ],
    tools: ['Cat Poster / Gouache / Cat Akrilik', 'Kuas Flat / Bulu Kaku', 'Palet Datar', 'Kertas Gambar Tebal atau Kanvas'],
    steps: [
      'Campur cat dengan sedikit sekali air hingga teksturnya kental seperti pasta gigi.',
      'Pulas bidang gambar dengan sapuan kuas searah yang rata dan tebal.',
      'Jika ada kesalahan, tunggu kering lalu timpa dengan warna baru di atasnya.',
      'Tambahkan detail garis tepi tegas untuk memperjelas batas bentuk objek.'
    ],
    bestUsedFor: 'Poster kampanye, desain grafis manual, ilustrasi pop art, komik cover, dan lukisan dekoratif bergaya modern.',
    difficulty: 'Mudah',
    visualType: 'opaque',
    tipMaestro: 'Gunakan cat poster berkualitas dengan kekentalan yang pas. Jika terlalu encer akan bergaris transparan, jika terlalu kental bisa retak saat mengering di atas kertas!',
    sampleWorks: {
      title: 'Poster Budaya Nusantara Pop Art',
      caption: 'Warna merah, kuning, dan hijau tampak sangat cerah menyala dan tidak tembus pandang berkat teknik plakat.'
    }
  },
  {
    id: 'blok',
    name: 'Teknik Blok (Siluet)',
    alias: 'Silhouette / Flat Fill',
    icon: 'Layers',
    color: '#10B981',
    tagline: 'Menutup wujud objek dengan satu warna pekat hingga membentuk bayangan',
    description: 'Teknik blok (sering disebut teknik siluet) adalah teknik menggambar dengan cara menutup seluruh bidang objek gambar menggunakan satu warna penuh secara rata, sehingga yang terlihat hanyalah bentuk global (kontur siluet) objek tersebut.',
    characteristic: [
      'Hanya menampilkan outline atau bentuk luar objek (kontur global)',
      'Detail bagian dalam dihilangkan sama sekali',
      'Bisa berupa siluet positif (objeknya yang dihitamkan) atau siluet negatif (latar belakang yang dihitamkan)',
      'Menghasilkan kesan misterius, dramatis, dan sangat kuat secara visual'
    ],
    tools: ['Tinta Bak / Tinta Cina', 'Spidol Hitam Tebal', 'Kuas Tinta / Kuas Flat', 'Kertas Gambar'],
    steps: [
      'Tentukan pose atau bentuk luar objek yang paling khas (misal: tampak samping).',
      'Gambar garis kontur tepi luar objek dengan sangat teliti.',
      'Penuhi seluruh bagian dalam bentuk tersebut dengan warna hitam pekat secara merata.',
      'Periksa apakah bentuk siluet sudah langsung dapat dikenali wujud aslinya.'
    ],
    bestUsedFor: 'Gambar wayang kulit, pemandangan pohon saat matahari terbenam (sunset silhouette), ikon logo, dan bayangan siluet manusia.',
    difficulty: 'Mudah',
    visualType: 'silhouette',
    tipMaestro: 'Kunci teknik siluet ada pada profil samping! Objek seperti manusia atau hewan paling mudah dikenali bentuk hidung, telinga, atau posturnya jika digambar dari sudut samping (profil).',
    sampleWorks: {
      title: 'Pohon Randu di Waktu Senja',
      caption: 'Cabang dan ranting pohon tampak hitam legap kontras dengan latar belakang langit jingga terang.'
    }
  },
  {
    id: 'linear',
    name: 'Teknik Linear',
    alias: 'Contour Line Art',
    icon: 'Activity',
    color: '#6366F1',
    tagline: 'Menyusun keindahan wujud hanya dengan ketegasan garis kontur',
    description: 'Teknik linear adalah teknik menggambar objek gambar dengan pola garis sebagai unsur yang paling menentukan, baik garis lurus, lengkung, patah-patah, tebal maupun tipis, tanpa memberi bayangan gelap-terang yang pekat.',
    characteristic: [
      'Mengandalkan kekuatan dan kelenturan garis (line art)',
      'Tanpa arsiran atau sapuan warna pekat di dalamnya',
      'Ketebalan garis (line weight) digunakan untuk membedakan kedekatan objek ke mata',
      'Sangat bersih, geometris, dan elegan'
    ],
    tools: ['Pena Kaligrafi / G-Pen', 'Drawing Pen (0.2, 0.5, 0.8)', 'Pensil Keras (2H - HB)', 'Penggaris / Mal Lengkung'],
    steps: [
      'Latih kelenturan pergelangan tangan agar goresan garis tidak ragu-ragu atau bergelombang.',
      'Gunakan garis tebal untuk bagian objek yang dekat dengan mata penonton.',
      'Gunakan garis tipis untuk objek latar belakang atau detail-detail kecil.',
      'Pastikan setiap garis bertemu secara presisi di setiap sudut sambungan.'
    ],
    bestUsedFor: 'Gambar arsitektur teknis, diagram botani ilmiah, komik manga/webtoon, dan kaligrafi visual.',
    difficulty: 'Sedang',
    visualType: 'line',
    tipMaestro: 'Lakukan tarikan garis dengan satu napas percaya diri dari pangkal siku/bahu, bukan hanya mengandalkan jari tangan yang kaku!',
    sampleWorks: {
      title: 'Gedung Sekolah Kolonial Klasik',
      caption: 'Setiap lekuk jendela, pilar, dan atap genteng terbentuk presisi hanya dari garis kontur yang berirama.'
    }
  }
];

export const HISTORY_TIMELINE = [
  {
    era: '40.000 SM (Zaman Prasejarah)',
    title: 'Lukisan Cap Tangan & Babirusa (Gua Leang-Leang, Maros)',
    desc: 'Nenek moyang manusia purba di Sulawesi menggunakan teknik semprot/tiup (aerosol purba) dengan oker merah untuk membuat cetakan tangan negatif (teknik siluet terbalik).',
    badge: 'Awal Mula Rupa'
  },
  {
    era: 'Abad ke-15 (Masa Renaissance)',
    title: 'Arsir Leonardo da Vinci & Sfumato Gosok',
    desc: 'Leonardo da Vinci mengembangkan arsir silang sejajar anatomis dan teknik sfumato (cikal bakal teknik dussel) yang mengaburkan batas garis untuk menciptakan efek 3D realistis.',
    badge: 'Revolusi Anatomi'
  },
  {
    era: 'Tahun 1886 (Era Neo-Impresionisme)',
    title: 'Georges Seurat & Lahirnya Pointilis',
    desc: 'Georges Seurat melukis "A Sunday on La Grande Jatte" murni menggunakan jutaan titik warna murni tanpa dicampur di palet, memanfaatkan ilusi optik mata manusia.',
    badge: 'Kelahiran Pointilis'
  },
  {
    era: 'Abad ke-19 (Nusantara - Raden Saleh)',
    title: 'Ketelitian Sketsa & Cat Plakat Raden Saleh',
    desc: 'Perintis seni lukis modern Indonesia, Raden Saleh Sjarif Boestaman, memadukan ketajaman garis arsir pensil grafit dengan kekuatan sapuan cat tebal dalam melukis satwa liar dan sejarah.',
    badge: 'Legenda Nusantara'
  },
  {
    era: 'Abad ke-21 (Era Digital Modern)',
    title: 'Virtual Art & Simulasi Stylus Digital',
    desc: 'Semua 7 teknik konvensional kini disimulasikan ke dalam kuas digital pada tablet dan komputer interaktif tanpa kehilangan esensi prinsip rupa dasarnya.',
    badge: 'Era Digital'
  }
];

export const CONCEPT_MAP = {
  title: 'Peta Konsep Hubungan Teknik Menggambar',
  categories: [
    {
      category: 'Teknik Media Kering (Dry Medium)',
      desc: 'Menggunakan alat gambar tanpa medium air atau pengencer cair.',
      techniques: [
        { name: 'Teknik Arsir', focus: 'Kerapatan & arah garis silang', medium: 'Pensil / Drawing Pen' },
        { name: 'Teknik Dussel', focus: 'Kelembutan gradasi gosokan', medium: 'Pensil Lunak / Dusel Kertas' },
        { name: 'Teknik Pointilis', focus: 'Kepadatan susunan titik-titik', medium: 'Drawing Pen / Spidol' },
        { name: 'Teknik Linear', focus: 'Ketegasan kontur garis bentuk', medium: 'Pena / Pensil Keras' }
      ]
    },
    {
      category: 'Teknik Media Basah (Wet Medium)',
      desc: 'Menggunakan bahan pewarna yang dilarutkan dengan air atau medium cair.',
      techniques: [
        { name: 'Teknik Aquarel', focus: 'Ketipisan sapuan transparan tembus pandang', medium: 'Cat Air (Watercolor)' },
        { name: 'Teknik Plakat', focus: 'Kepekatan sapuan tebal menutup rapat', medium: 'Cat Poster / Akrilik / Gouache' }
      ]
    },
    {
      category: 'Teknik Karakter Bentuk Khusus',
      desc: 'Berfokus pada wujud global bidang objek.',
      techniques: [
        { name: 'Teknik Blok (Siluet)', focus: 'Pemberian satu warna penuh kontur global', medium: 'Tinta Bak / Spidol Tebal' }
      ]
    }
  ]
};

export const MINI_GAMES_DATA = {
  dragDropGame: {
    title: 'Misi 1: Pasangkan Karya Seni dengan Tekniknya!',
    instruction: 'Tarik kartu nama teknik di sebelah kiri dan pasangkan ke kotak karya seni yang sesuai di sebelah kanan!',
    cards: [
      { id: 'c1', name: 'Teknik Arsir', targetId: 't1' },
      { id: 'c2', name: 'Teknik Pointilis', targetId: 't2' },
      { id: 'c3', name: 'Teknik Aquarel', targetId: 't3' },
      { id: 'c4', name: 'Teknik Blok', targetId: 't4' },
      { id: 'c5', name: 'Teknik Dussel', targetId: 't5' }
    ],
    targets: [
      { id: 't1', title: 'Apel dengan Garis-Garis Silang Berulang', hint: 'Tampak jalinan garis tebal-tipis searah dan menyilang pada sisi gelap buah.' },
      { id: 't2', title: 'Bunga Terbentuk dari Kumpulan Jutaan Titik', hint: 'Seluruh bayangan kelopak tersusun dari bintik-bintik tinta rapat.' },
      { id: 't3', title: 'Lukisan Danau Bening Tembus Pandang', hint: 'Warna air dan langit transparan dan saling berbaur basah.' },
      { id: 't4', title: 'Siluet Hitam Pohon di Latar Senja', hint: 'Hanya wujud luar batang dan ranting yang dihitamkan pekat rata.' },
      { id: 't5', title: 'Wajah dengan Bayangan Pipi Sangat Halus', hint: 'Goresan pensil digosok rapi menggunakan tisu/dusel tanpa ada garis kasar.' }
    ]
  },
  detectiveGame: {
    title: 'Misi 2: Detektif Goresan Rupa',
    instruction: 'Pilihlah teknik terbaik yang harus dipakai oleh seniman berdasarkan studi kasus berikut!',
    cases: [
      {
        id: 1,
        situation: 'Rani ingin membuat poster kampanye "Hemat Energi" di kertas karton manila. Tulisannya harus sangat mencolok, warna kuning dan merahnya harus menutup rata dan tidak boleh tembus pandang.',
        options: [
          { text: 'Teknik Aquarel dengan cat air encer', correct: false, reason: 'Aquarel transparan dan kurang mencolok untuk poster grafis luar ruangan.' },
          { text: 'Teknik Plakat dengan cat poster tebal', correct: true, reason: 'Tepat sekali! Cat poster tebal pada teknik plakat berkarakter pekat dan menutup sempurna, sangat ideal untuk poster.' },
          { text: 'Teknik Pointilis dengan pulpen hitam', correct: false, reason: 'Pointilis membutuhkan waktu sangat lama dan kurang tepat untuk bidang poster luas berwarna menyala.' }
        ]
      },
      {
        id: 2,
        situation: 'Budi sedang menggambar guci kuno dengan pensil 6B. Di bagian lekukan bawah, arsiran pensilnya terlihat terlalu kasar berpatah-patah. Alat apa dan teknik apa yang sebaiknya Budi gunakan untuk melembutkan transisinya?',
        options: [
          { text: 'Menimpa dengan spidol hitam pekat (Teknik Blok)', correct: false, reason: 'Teknik blok akan menghilangkan efek 3D guci menjadi datar seperti guntingan kertas.' },
          { text: 'Menggosoknya dengan dusel kertas atau tisu (Teknik Dussel)', correct: true, reason: 'Hebat! Teknik dussel menggunakan dusel gulungan kertas akan membaurkan partikel grafit pensil menjadi bayangan halus berkilau.' },
          { text: 'Meneteskan air di atas kertas', correct: false, reason: 'Pensil grafit standar tidak larut air dan kertas gambar akan bergelombang rusak.' }
        ]
      },
      {
        id: 3,
        situation: 'Dewi ingin menggambar wayang kulit yang sedang dimainkan di balik kain kelir dengan lampu blencong dari belakang. Penonton hanya melihat bayangan hitam legap bentuk tokoh wayang.',
        options: [
          { text: 'Teknik Blok / Siluet', correct: true, reason: 'Tepat sekali! Menghitamkan seluruh wujud luar figur wayang menghasilkan efek siluet bayangan kelir yang dramatis.' },
          { text: 'Teknik Linear tanpa isi', correct: false, reason: 'Teknik linear hanya memberi garis kawat tepi tanpa menghitamkan bidang wayang.' },
          { text: 'Teknik Aquarel transparan', correct: false, reason: 'Bayangan wayang di balik kelir bersifat legap pekat, bukan transparan tembus pandang.' }
        ]
      }
    ]
  },
  stageSortingGame: {
    title: 'Misi 3: Susun Urutan 4 Langkah Menggambar yang Benar!',
    instruction: 'Urutkan 4 tahapan berkarya menggambar berikut dari tahap awal (1) sampai sentuhan akhir (4)!',
    steps: [
      { id: 's1', rank: 1, text: '1. Membuat Sketsa Proporsi Bentuk Dasar (Garis Tipis Penolong)' },
      { id: 's2', rank: 2, text: '2. Menentukan Sumber Arah Cahaya & Pembagian Zona Terang-Gelap' },
      { id: 's3', rank: 3, text: '3. Menerapkan Teknik Goresan (Arsir/Dussel/Pointilis/Sapuan Cat)' },
      { id: 's4', rank: 4, text: '4. Finishing / Sentuhan Akhir (Highlight, Cast Shadow, Pembersihan Bidang)' }
    ]
  }
};

export const SUMMATIVE_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    type: 'multiple-choice',
    question: 'Dalam sebuah pameran seni rupa sekolah, siswa mengamati lukisan potret yang transisi gelap-terangnya sangat lembut menyerupai kabut tanpa terlihat jejak goresan garis pensil. Teknik menggambar apa yang paling dominan diterapkan pada karya tersebut, dan bagaimana prinsip kerjanya?',
    options: [
      { id: 'A', text: 'Teknik Arsir; dengan menyilangkan garis pensil berulang kali secara rapat' },
      { id: 'B', text: 'Teknik Dussel; dengan menggosok goresan pensil menggunakan dusel/tisu sehingga partikel grafit membaur halus' },
      { id: 'C', text: 'Teknik Pointilis; dengan menitikkan tinta secara acak dalam jumlah sedikit' },
      { id: 'D', text: 'Teknik Plakat; dengan memulaskan cat air encer tipis-tipis' }
    ],
    correctAnswer: 'B',
    explanation: 'Teknik Dussel (gosok) menggunakan alat bantu seperti dusel kertas (tortillon) atau tisu untuk membaurkan goresan pensil lunak sehingga garis kasar melebur menjadi gradasi asap (sfumato) yang sangat lembut.',
    pedagogicalReason: 'Mengukur pemahaman analitis murid dalam membedakan ciri visual teknik kering bergradasi halus vs teknik garis.'
  },
  {
    id: 2,
    type: 'multiple-choice',
    question: 'Dua orang siswa kelas VII sedang mendiskusikan perbedaan teknik pewarnaan basah. Andi memilih cat air dengan sapuan encer transparan tembus pandang, sedangkan Bima memilih cat poster yang disapukan tebal dan pekat hingga menutup lapisan di bawahnya. Pasangan teknik yang digunakan Andi dan Bima secara berurutan adalah...',
    options: [
      { id: 'A', text: 'Aquarel dan Plakat' },
      { id: 'B', text: 'Plakat dan Aquarel' },
      { id: 'C', text: 'Linear dan Siluet' },
      { id: 'D', text: 'Pointilis dan Dussel' }
    ],
    correctAnswer: 'A',
    explanation: 'Andi menggunakan teknik Aquarel yang berkarakter transparan (sapuan tipis tembus cahaya), sedangkan Bima menggunakan teknik Plakat yang berkarakter opaque (sapuan tebal menutup rapat).',
    pedagogicalReason: 'Mendorong daya kritis membedakan sifat medium basah transparan vs pekat menutup.'
  },
  {
    id: 3,
    type: 'multiple-choice',
    question: 'Perhatikan hubungan sebab-akibat berikut: "Semakin rapat susunan titik-titik yang dibuat dengan pena pada suatu bagian gambar pointilis, maka efek visual yang ditangkap oleh mata pengamat adalah..."',
    options: [
      { id: 'A', text: 'Bagian tersebut akan terlihat semakin terang dan menonjol ke depan' },
      { id: 'B', text: 'Bagian tersebut akan tampak semakin gelap dan menciptakan ilusi bayangan kedalaman (core shadow)' },
      { id: 'C', text: 'Bagian tersebut akan berubah warna menjadi transparan seperti air' },
      { id: 'D', text: 'Kertas gambar akan otomatis berlubang dan kehilangan tekstur' }
    ],
    correctAnswer: 'B',
    explanation: 'Pada teknik pointilis, kerapatan titik berbanding lurus dengan nilai kegelapan (value). Semakin padat titik-titik bertumpuk, semakin sedikit cahaya kertas putih yang terpantul ke mata, sehingga otak menangkapnya sebagai bayangan gelap pekat.',
    pedagogicalReason: 'Menguji pemahaman relasi sebab-akibat antara densitas titik dan ilusi optik gelap-terang.'
  },
  {
    id: 4,
    type: 'multiple-choice',
    question: 'Seorang siswa ingin menggambar pemandangan pepohonan di waktu senja dengan latar belakang matahari terbenam merah membara. Ia menginginkan bentuk pohon terlihat kontras berupa siluet hitam utuh tanpa detail daun satu per satu. Teknik yang paling tepat dan efisien adalah...',
    options: [
      { id: 'A', text: 'Teknik Linear' },
      { id: 'B', text: 'Teknik Blok (Siluet)' },
      { id: 'C', text: 'Teknik Aquarel' },
      { id: 'D', text: 'Teknik Pointilis' }
    ],
    correctAnswer: 'B',
    explanation: 'Teknik Blok (Siluet) dilakukan dengan menutup seluruh wujud bidang pohon dengan satu warna hitam legap, sehingga langsung memunculkan karakter dramatis kontur pohon di hadapan sinar senja.',
    pedagogicalReason: 'Melatih kemampuan memilih teknik sesuai pesan visual dan efisiensi waktu berkarya.'
  },
  {
    id: 5,
    type: 'multiple-choice',
    question: 'Mengapa ketika membuat teknik arsir (hatching/cross-hatching) pada benda berbentuk bola atau silinder, tarikan garis arsir sebaiknya dibuat sedikit melengkung mengikuti kontur benda, dan bukan sekadar garis lurus kaku?',
    options: [
      { id: 'A', text: 'Agar tangan tidak cepat lelah saat memegang pensil gambar' },
      { id: 'B', text: 'Karena garis lengkung yang mengikuti kontur akan memperkuat ilusi kelengkungan volume 3D benda bundar' },
      { id: 'C', text: 'Agar pensil tidak mudah patah terkena gesekan kertas gambar' },
      { id: 'D', text: 'Karena penggaris tidak diperbolehkan sama sekali dalam ruang seni rupa' }
    ],
    correctAnswer: 'B',
    explanation: 'Arsir kontur (contour hatching) melengkung mengikuti arah kurva permukaan objek bola, sehingga selain memberikan gelap-terang, garis tersebut juga memandu mata merasakan permukaan cembung 3D benda nyata.',
    pedagogicalReason: 'Menganalisis prinsip ilusi ruang tiga dimensi pada media gambar dua dimensi.'
  }
];

export const BADGES_LIST: Badge[] = [
  {
    id: 'b1',
    title: 'Penjelajah 7 Teknik',
    description: 'Telah membaca dan mempelajari seluruh 7 materi teknik dasar menggambar.',
    icon: 'Compass',
    color: 'from-amber-400 to-orange-500',
    criteria: 'Buka semua tab teknik menggambar',
    unlocked: false
  },
  {
    id: 'b2',
    title: 'Laboran Virtual Seni',
    description: 'Telah mencoba minimal 3 kuas simulasi di Virtual Lab Menggambar.',
    icon: 'Brush',
    color: 'from-blue-400 to-indigo-600',
    criteria: 'Coret kanvas virtual lab dengan 3 teknik',
    unlocked: false
  },
  {
    id: 'b3',
    title: 'Master Detektif Rupa',
    description: 'Menyelesaikan semua mini game latihan studi kasus dengan benar.',
    icon: 'ShieldCheck',
    color: 'from-emerald-400 to-teal-600',
    criteria: 'Selesaikan 3 mini games latihan',
    unlocked: false
  },
  {
    id: 'b4',
    title: 'Ahli Gambar SMP (Cumlaude)',
    description: 'Meraih skor minimal 80 pada Asesmen Akhir Sumatif.',
    icon: 'Award',
    color: 'from-purple-400 to-pink-600',
    criteria: 'Skor Kuis >= 80',
    unlocked: false
  }
];

export const GLOSSARY = [
  { term: 'Hatching', def: 'Teknik arsir berupa tarikan garis-garis sejajar satu arah untuk menghasilkan bayangan gelap-terang.' },
  { term: 'Cross-Hatching', def: 'Teknik arsir berupa garis silang bersilangan yang saling menumpuk untuk menciptakan bayangan lebih pekat.' },
  { term: 'Sfumato', def: 'Teknik lukis klasik melembutkan transisi antar warna/nada gelap-terang seperti kabut berasap (dasar teknik dussel).' },
  { term: 'Tortillon / Dusel', def: 'Gulungan kertas padat berbentuk silinder berujung runcing yang dipakai khusus untuk menggosok goresan pensil grafit/arang.' },
  { term: 'Stippling', def: 'Proses membuat gambar atau bayangan hanya dengan menyusun titik-titik kecil menggunakan pena gambar (pointilis).' },
  { term: 'Aquarel', def: 'Teknik melukis dengan sapuan cat air transparan yang membiarkan cahaya kertas putih tetap memancar tembus.' },
  { term: 'Opaque / Plakat', def: 'Karakteristik cat tebal yang kedap cahaya dan menutup penuh lapisan di bawahnya tanpa tembus pandang.' },
  { term: 'Core Shadow', def: 'Zona bayangan paling gelap pada permukaan benda yang sama sekali tidak menerima cahaya langsung.' },
  { term: 'Highlight', def: 'Area pantulan cahaya paling terang pada benda mengkilap atau berpermukaan mulus.' }
];

export const REFERENCES = [
  {
    title: 'Buku Panduan Guru Seni Rupa SMP Kelas VII',
    author: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI (Kurikulum Merdeka)',
    year: '2021',
    publisher: 'Pusat Kurikulum dan Perbukuan, Balitbang Kemendikbudristek'
  },
  {
    title: 'Seni Budaya untuk SMP/MTs Kelas VII',
    author: 'Eko Purnomo dkk.',
    year: '2017',
    publisher: 'Kementerian Pendidikan dan Kebudayaan RI, Jakarta'
  },
  {
    title: 'Drawing on the Right Side of the Brain: The Definitive, 4th Edition',
    author: 'Betty Edwards',
    year: '2012',
    publisher: 'TarcherPerigee, New York'
  },
  {
    title: 'The Art of Drawing: Basic Drawing Techniques and Shading Fundamentals',
    author: 'Giovanni Civardi',
    year: '2015',
    publisher: 'Search Press'
  }
];

/**
 * 23-Point Complete Instructional Design Blueprint Document
 * (Rancangan Konsep MPI lengkap sesuai standar instruksional yang diminta prompt)
 */
export const PEDAGOGICAL_BLUEPRINT = `
# DOKUMEN RANCANGAN LENGKAP MULTIMEDIA PEMBELAJARAN INTERAKTIF (MPI)
## MATA PELAJARAN SENI RUPA - SMP KELAS VII SEMESTER 1
### TOPIK: MENGGAMBAR | SUBTOPIK: TEKNIK MENGGAMBAR

---

### 1. Judul Multimedia Pembelajaran Interaktif
**"ART-EXPLORER: Petualangan Menjelajah 7 Teknik Menggambar untuk Seniman Muda SMP"**

### 2. Deskripsi Singkat MPI
ART-EXPLORER adalah Multimedia Pembelajaran Interaktif (MPI) berbasis web yang dirancang khusus untuk peserta didik SMP Kelas VII (usia 12-13 tahun) menggunakan pendekatan Game-Based Learning. Aplikasi ini memadukan materi terstruktur, simulasi virtual lab menggambar dengan kuas bertekstur nyata (arsir, dussel, pointilis, aquarel, plakat, blok, linear), perbandingan interaktif gelap-terang, mini game studi kasus, kuis formatif & sumatif berbobot analitis, narasi audio ramah anak (Voice TTS), sertifikat digital terverifikasi, dan integrasi pemicu Fullscreen API otomatis sejak tombol pertama diklik.

### 3. Sasaran Pengguna
- **Peserta Didik:** Kelas VII SMP / Fase D, rentang usia 12-13 tahun.
- **Karakteristik:** Digital natives, menyukai visual dinamis bergaya kartun edukatif cerah, menyukai kebebasan bereksplorasi (open-ended), menyukai tantangan berbasis poin dan reward (badge/level), serta membutuhkan asistensi audio untuk diferensiasi gaya belajar auditori.
- **Guru Seni Rupa:** Sebagai media blended learning di kelas laboratorium komputer, chromebook, maupun kelas interaktif smart TV.

### 4. Tujuan Pembelajaran
- **Capaian Pembelajaran (Fase D):** Murid mampu merealisasikan ide/gagasan ke dalam bentuk gambar dua dimensi dengan mengaplikasikan beragam teknik dasar menggambar, memahami prinsip gelap-terang, proporsi, dan tekstur rupa.
- **Tujuan Pembelajaran Spesifik:** Murid mampu memahami karakteristik 7 teknik dasar menggambar (arsir, dussel, pointilis, aquarel, plakat, blok, linear) dan menerapkannya dalam simulasi berkarya menggambar.
- **Indikator Keberhasilan:** Murid mampu membedakan karakteristik teknik basah vs kering, menghasilkan gradasi gelap-terang pada kanvas simulasi, dan meraih nilai minimal 80 pada asesmen sumatif.

### 5. Rasional Desain Pembelajaran
- **Pendekatan Pedagogis:** Game-Based Learning (GBL) yang dipadukan dengan Teori Kognitif Multimedia Mayer (Dual Coding: audio + visual simultan tanpa beban kognitif berlebih).
- **Konstruktivisme & Eksplorasi:** Murid tidak sekadar menghafal definisi teknik, melainkan mempraktikkan langsung interaksi partikel kuas pada kanvas virtual (Experiential Learning).
- **Scaffolding:** Dimulai dari apersepsi pemantik (2D vs 3D), pemahaman konsep, komparasi visual, eksplorasi kanvas bebas, pemecahan mini game kasus, hingga evaluasi sumatif mandiri.

### 6. Alur Pembelajaran (Learning Path)
1. *Trigger Layar Pembuka:* Pengenalan Maestro Seno & aktivasi Fullscreen API via klik tombol START.
2. *Pusat Komando (Menu Utama):* Pemilihan misi petualangan rupa dan pemantauan perolehan XP.
3. *Apersepsi:* Menemukan rahasia ilusi 3D (cahaya, bayangan, highlight, dan core shadow).
4. *Tujuan & Kontrak Belajar:* Pemahaman target kompetensi dan passing grade minimal 80.
5. *Materi Inti (7 Teknik):* Eksplorasi interaktif karakteristik, alat, langkah, dan tips ahli.
6. *Peta Konsep & Garis Waktu:* Menghubungkan teknik media basah vs kering serta sejarah teknik dari gua prasejarah hingga era digital.
7. *Virtual Lab Simulasi:* Praktik langsung mencoret, mengarsir, menggosok, dan mewarnai di kanvas interaktif dengan template apel 3D.
8. *Latihan Mini Games:* Game drag-and-drop teknik ke karya, game detektif goresan, dan game urutan tahapan menggambar.
9. *Asesmen Sumatif:* Kuis pilihan ganda analitis & drag-drop dengan skor otomatis.
10. *Refleksi & Rangkuman:* Mengisi jurnal 3-2-1 dan memilih mood emotikon belajar.
11. *Sertifikasi:* Penerbitan e-Sertifikat "Seniman Muda Kelas VII" berpredikat kelulusan.

### 7. Flowchart Navigasi (Teks)
\`\`\`
[Layar Pembuka (Tombol START)]
       │ (Memicu document.documentElement.requestFullscreen())
       ▼
[Menu Utama (Pusat Petualangan)]
   ├──> [Tujuan Pembelajaran] ────────┐
   ├──> [Apersepsi 2D vs 3D] ─────────┤
   ├──> [Materi 7 Teknik Menggambar] ─┤
   ├──> [Eksplorasi (Peta & Sejarah)] ┤
   ├──> [Virtual Lab Menggambar] ─────┼──> [Kembali ke Menu / Lanjut Misi]
   ├──> [Latihan (3 Mini Games)] ─────┤
   ├──> [Asesmen Akhir Sumatif] ──────┤ (Jika Skor >= 80 -> Buka Sertifikat)
   ├──> [Rangkuman & Refleksi 3-2-1] ─┤
   ├──> [Sertifikat & Badges] ────────┤
   └──> [Panduan Guru & Glosarium] ───┘
\`\`\`

### 8. Struktur Halaman MPI (Termasuk Tombol Trigger START Fullscreen)
- **Halaman 1: Hero Splash Screen (Wajib Tombol START Fullscreen):**
  - Terdapat judul besar yang atraktif, avatar Maestro Seno, input nama murid, dan tombol utama **"MULAI PETUALANGAN (START FULLSCREEN)"** beranimasi denyut (pulse).
  - Saat tombol diklik: Memanggil fungsi JavaScript \`requestAppFullscreen()\` yang mengeksekusi \`document.documentElement.requestFullscreen()\` dan langsung beralih ke Menu Utama secara mulus.
- **Halaman 2: Menu Utama (Art World Map):** Menampilkan 10 modul pembelajaran dalam bentuk kartu petualangan berstatus (Selesai/Belum), status poin XP, dan koleksi 4 lencana seniman.
- **Halaman 3: Tujuan Pembelajaran:** Menampilkan CP, TP, IKTP, dan 3 nilai Profil Pelajar Pancasila (Kreatif, Bernalar Kritis, Mandiri).
- **Halaman 4: Apersepsi:** Demonstrasi interaktif mengapa gambar lingkaran 2D bisa berubah menjadi bola 3D bervolume saat diberi gelap-terang.
- **Halaman 5: Materi 7 Teknik Menggambar:** Tab interaktif untuk Arsir, Dussel, Pointilis, Aquarel, Plakat, Blok, dan Linear lengkap dengan perbandingan visual dan audio narasi.
- **Halaman 6: Eksplorasi (Peta Konsep & Sejarah):** Visualisasi relasi media kering vs basah dan lini masa sejarah dari Gua Leang-Leang hingga Era Modern.
- **Halaman 7: Virtual Lab Menggambar (Simulasi):** Kanvas interaktif HTML5 dengan 7 pilihan kuas khusus (hatching brush, smudge dussel brush, stippling dot generator, watercolor glaze, opaque poster paint, silhouette block, linear pen), palet warna, pengatur ukuran kuas, template objek (Apel 3D, Guci, Bola), fitur undo/redo, serta unduh gambar (.png).
- **Halaman 8: Latihan Interaktif (3 Mini Games):**
  1. Game Pasang Kartu Teknik ke Contoh Gambar (Drag & Drop).
  2. Game Detektif Goresan (Studi Kasus Kebutuhan Karya).
  3. Game Susun 4 Urutan Menggambar.
- **Halaman 9: Asesmen Sumatif:** 5 soal analitis berbobot HOTS dengan sistem koreksi instan setelah seluruh soal terjawab dan passing grade minimal 80.
- **Halaman 10: Rangkuman & Refleksi:** Ringkasan tabel karakteristik 7 teknik dan lembar refleksi 3-2-1.
- **Halaman 11: Sertifikat Prestasi & Lencana:** Generator e-Sertifikat resmi berlatar piagam seni dengan nama murid, tanggal real-time, skor akhir, dan tombol cetak/simpan PDF.
- **Halaman 12: Panduan Guru & Glosarium:** Panduan pedagogis 23 butir lengkap bagi guru penguji/fasilitator.

### 9. Storyboard Lengkap Setiap Halaman
- **Layar Pembuka:** Latar belakang gradasi biru-indigo langit malam berbintang dengan percikan cat warna-warni kartun. Di tengah berdiri Maestro Seno memegang kuas dan palet. Kotak input nama siswa dan tombol besar warna amber bertuliskan "MULAI PETUALANGAN (START)". Di bawah tombol terdapat keterangan: "Klik untuk membuka layar penuh (Fullscreen) otomatis".
- **Layar Menu Utama:** Layout grid kartu bertingkat menyerupai peta level game rupa. Setiap kartu modul memiliki ikon khas, deskripsi singkat, dan indikator progres hijau saat selesai. Header atas menampilkan info siswa, XP total, toggle Fullscreen, toggle suara SFX, toggle narasi suara AI, dan pengatur ukuran huruf.
- **Layar Materi 7 Teknik:** Sisi kiri berupa daftar navigasi tab 7 teknik dengan kode warna berbeda. Sisi kanan menampilkan kartu visual interaktif: pengertian, karakteristik kunci, alat bahan yang digunakan, 4 tahapan berkarya, tips Maestro Seno, dan tombol "Dengarkan Narasi Audio".
- **Layar Virtual Lab Menggambar:** Kanvas putih bersih diapit oleh bilah alat di sebelah kiri (kuas, penghapus, ukuran, transparansi, warna) dan panduan bayangan di sebelah kanan (highlight, core shadow, reflected light). Siswa dapat memilih template buah apel dengan garis panduan zona arsir.
- **Layar Mini Games:** Panel game interaktif bergaya game show edukatif dengan audio umpan balik kuis (suara benar chime / salah lembut).
- **Layar Asesmen:** Soal ditampilkan satu per satu secara elegan dengan progress bar. Tombol navigasi soal dan tombol submit akhir yang memicu evaluasi menyeluruh.
- **Layar Sertifikat:** Piagam penghargaan berbingkai ornamen emas artistik, stempel resmi kurikulum, nama siswa yang dicetak tebal kaligrafis, nilai akhir, serta tanda tangan digital Maestro Seno.

### 10. Rancangan Aktivitas Interaktif
- **Aktivitas 1 (Simulasi Goresan Nyata):** Siswa menggunakan kursor mouse atau layar sentuh untuk merasakan perbedaan saat kuas dussel melunakkan garis vs kuas pointilis yang menitikkan noktah-noktah padat.
- **Aktivitas 2 (Interactive Drag & Drop):** Menghubungkan kartu nama teknik ke kotak karya seni misteri.
- **Aktivitas 3 (Interactive Shading Slider):** Menggeser slider pencahayaan pada bola untuk melihat bagaimana posisi highlight dan bayangan jatuh bergeser secara dinamis.
- **Aktivitas 4 (Jurnal Refleksi Mandiri):** Mengetikkan 3 hal baru yang dipelajari dan memilih emotikon kepuasan belajar.

### 11. Rancangan Konten Materi
- **Materi 1:** Pengertian dasar menggambar dan fungsi gelap-terang dalam menciptakan ilusi ruang tiga dimensi pada bidang dua dimensi.
- **Materi 2-8:** Pembahasan tuntas 7 teknik menggambar:
  1. *Teknik Arsir (Hatching/Cross-Hatching):* Pola garis sejajar dan silang, variasi kerapatan, media pensil 2B-6B / pena gambar.
  2. *Teknik Dussel (Smudge):* Menggosok goresan pensil rebah menggunakan dusel kertas/tisu untuk efek gradasi lembut seperti kabut (sfumato).
  3. *Teknik Pointilis (Stippling):* Kerapatan jutaan titik untuk menciptakan value gelap-terang tanpa tarikan garis.
  4. *Teknik Aquarel (Water Wash):* Sapuan cat air transparan tembus cahaya dengan kertas cat air berdaya serap tinggi.
  5. *Teknik Plakat (Opaque):* Sapuan cat poster/gouache tebal pekat menutup bidang secara rata tanpa tembus pandang.
  6. *Teknik Blok (Siluet):* Menutup seluruh wujud objek dengan satu warna hitam legap untuk memunculkan garis luar (kontur siluet).
  7. *Teknik Linear (Line Art):* Ketegasan garis kontur murni tanpa bayangan pekat untuk menekankan proporsi dan karakter wujud.

### 12. Rancangan Media Visual
- **Gaya Desain:** Kartun edukatif modern (clean, friendly, high visual contrast) dengan aksen warna primer rupa (merah, biru, kuning) dipadukan dengan latar belakang slate/indigo gelap yang nyaman untuk mata anak (anti-fatigue).
- **Aset Ilustrasi:** Representasi SVG murni beresolusi tinggi tanpa dependensi eksternal: bola 3D berarsir, tabung dussel, pola titik stippling, sapuan cat air mengalir, kuas plakat tebal, siluet pohon senja, dan karakter maskot Maestro Seno.

### 13. Rancangan Audio atau Narasi
- **Web Speech API Narasi Bahasa Indonesia:** Sintesis suara ramah anak yang membacakan instruksi dan materi penting secara jernih, dapat di-pause, diulang, atau dimatikan oleh siswa kapan saja.
- **Web Audio API Procedural Synthesizer:** Efek suara klik tombol pop (480-720 Hz), suara benar chime tangga nada C-E-G-C, suara salah lembut, suara coretan pensil di kertas kanvas (white noise bandpass filter), dan suara terompet kemenangan (fanfare) saat meraih sertifikat kelulusan.

### 14. Rancangan Animasi atau Simulasi
- **Simulasi Kanvas Virtual:** Engine rendering 2D Canvas berkecepatan 60 FPS yang merespons tekanan, gerakan mouse/touch, dan menghasilkan goresan khas sesuai teknik yang dipilih (garis silang arsir otomatis, sebaran titik acak berdensitas pada pointilis, efek gosok membaur pada dussel, dan sapuan transparan bercampur pada aquarel).
- **Animasi UI:** Transisi mulus berbasis CSS3 dan Framer Motion: fade-in halaman, denyut tombol aksi pemicu, kartu melayang perlahan (float), dan ledakan konfeti partikel saat tuntas.

### 15. Rancangan Kuis dan Asesmen
- **Bentuk Asesmen:** Formatif (mini games diagnostik) dan Sumatif (5 soal evaluasi analitis HOTS).
- **Tingkat Kesukaran:** Berjenjang dari C2 (Pemahaman), C4 (Analisis Kasus), hingga C5 (Evaluasi Solusi Teknik).
- **Sistem Penilaian:** Skor 0 - 100 dengan bobot 20 poin per soal sumatif.
- **Passing Grade:** Minimal 80 poin untuk membuka Sertifikat Kelulusan Seniman Muda.

### 16. Umpan Balik (Feedback)
- **Karakter Umpan Balik:** Muncul setelah seluruh soal selesai dikerjakan untuk menghindari bias contekan, menyajikan:
  - Pembahasan mendalam mengapa opsi tersebut benar/salah.
  - Alasan pedagogis di balik setiap konsep rupa.
  - Rekomendasi materi mana yang harus dipelajari ulang jika nilai masih di bawah 80.
  - Tombol "Coba Kuis Lagi" untuk perbaikan nilai (remedial interaktif).

### 17. Rubrik Penilaian
- **Skor 80 - 100:** Sangat Mahir (Predikat Sangat Memuaskan / Cumlaude Seniman Muda, berhak mengunduh Sertifikat Emas).
- **Skor 60 - 79:** Berkembang (Cukup Memahami, disarankan mengulang kembali latihan mini games dan membaca tips Maestro Seno).
- **Skor < 60:** Perlu Bimbingan (Dianjurkan melakukan praktik ulang di Virtual Lab bersama pendampingan guru).

### 18. Catatan Diferensiasi Pembelajaran
- **Diferensiasi Konten:** Siswa dapat memilih belajar melalui teks ringkas, audio narasi suara, atau diagram komparasi visual.
- **Diferensiasi Proses:** Siswa bebas menentukan urutan modul yang ingin dijelajahi terlebih dahulu sesuai minat dan rasa ingin tahu.
- **Diferensiasi Produk:** Di Virtual Lab, siswa dapat memilih menggambar bebas dari nol (eksplorasi mandiri) atau mengikuti template berpemandu apel 3D (scaffolded guidance).

### 19. Catatan Aksesibilitas (WCAG 2.1 AA)
- Kontras warna teks memenuhi rasio minimal 4.5:1 terhadap latar belakang.
- Disediakan tombol pembesar ukuran font teks (A+ / A-).
- Disediakan kontrol suara penuh (Mute SFX & Mute Voice Narator).
- Target sentuh tombol dirancang minimal 48x48 piksel dengan label teks yang eksplisit.
- Navigasi ramah keyboard dan kontrol responsif pada smartphone, tablet, laptop, dan smart TV.

### 20. Spesifikasi Teknis HTML/CSS/JavaScript
- **Kerangka Kerja:** React 19 SPA + Vite + TypeScript.
- **Tata Letak & Gaya:** Tailwind CSS v4 dengan palet kontras ramah edukasi.
- **Fullscreen API:** Implementasi fungsi programmatic \`requestFullscreen()\` pada elemen dokumen utama dengan penanganan cross-browser (WebKit, Mozilla, MS) dan fallback indikator status.
- **Simulasi Kanvas:** HTML5 Canvas API 2D Context dengan algoritma kustom kuas tekstur.
- **Audio Engine:** HTML5 Web Audio API AudioContext + Web Speech API SpeechSynthesis.

### 21. Prompt Tambahan untuk Membuat Aset Gambar (AI Image Gen)
- *Prompt 1 (Karakter Maskot Maestro Seno):*
  \`"Cute 2D cartoon Indonesian male art teacher wearing an artist beret and blue apron, holding a wooden painter palette and paintbrush, friendly smile, educational children book illustration style, solid vibrant colors, clean white background, vector style, 4k"\`
- *Prompt 2 (Komparasi Apel 2D vs 3D):*
  \`"Side by side educational illustration of an apple: on the left a flat 2D line outline drawing, on the right a realistic 3D volumetric apple shaded with classic pencil cross-hatching showing highlight and core shadow, instructional textbook art, crisp clean detail"\`
- *Prompt 3 (7 Sampel Karya Teknik Seni):*
  \`"Set of seven square artistic swatches demonstrating drawing techniques: pencil hatching, smudged dussel, stippling dot art, transparent watercolor wash, opaque gouache poster paint, black silhouette block, and clean contour line art, labeled educational infographic style"\`

### 22. Prompt Tambahan untuk Membuat Video Pembelajaran
- *Prompt Storyboard Video (AI Video Generator / Sora / Runway):*
  \`"Close-up high definition time-lapse video of an artist's hand using a 4B graphite pencil to sketch a round sphere on textured drawing paper. First drawing light guidelines, then adding parallel curved hatching lines, followed by a paper stump blending tool smoothing the shadow into a soft dussel gradient, studio lighting, peaceful educational atmosphere, 60fps, 4k"\`

### 23. Rekomendasi Pengembangan Lanjutan
1. Integrasi kamera perangkat untuk fitur "Augmented Reality (AR) Scanner" yang memproyeksikan objek 3D ke atas meja siswa sebagai model gambar langsung.
2. Integrasi Google Gemini Vision API untuk memberikan analisis koreksi goresan otomatis terhadap foto hasil gambar manual siswa di kertas fisik.
3. Fitur pameran galeri virtual bersama (Virtual Art Exhibition) tempat seluruh siswa sekelas dapat saling mengapresiasi dan memberikan bintang pada karya teman.
`;
