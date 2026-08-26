// Data berita untuk halaman detail.
// Isi artikel mengikuti informasi yang sudah tercantum pada halaman Berita Desa Buah Berak.
const beritaData = {
  "hut-ri": {
    category: "Pengumuman",
    categoryClass: "badge-pengumuman",
    date: "15 Agustus 2026",
    title: "Peringatan HUT RI ke-81 Tingkat Desa Buah Berak",
    image: "img/hut-ri.jpeg",
    alt: "Peringatan HUT RI ke-81",
    paragraphs: [
      "Pemerintah Desa Buah Berak mengundang seluruh warga untuk hadir dan berpartisipasi dalam rangkaian kegiatan peringatan Hari Ulang Tahun Republik Indonesia ke-81 tingkat Desa Buah Berak.",
      "Peringatan Hari Kemerdekaan menjadi kesempatan bagi masyarakat desa untuk mempererat kebersamaan sekaligus mengenang semangat perjuangan dalam mempertahankan kemerdekaan Indonesia.",
      "Selain upacara bendera, warga juga diharapkan dapat mengikuti rangkaian kegiatan peringatan yang diselenggarakan di tingkat desa. Partisipasi masyarakat menjadi bagian penting agar suasana peringatan kemerdekaan dapat berlangsung meriah, tertib, dan penuh kebersamaan.",
      "Mari bersama-sama menyemarakkan HUT RI ke-81 dengan semangat persatuan, gotong royong, dan kebersamaan sebagai bagian dari kehidupan masyarakat Desa Buah Berak."
    ]
  },

  "bina-desa": {
    category: "Kegiatan",
    categoryClass: "badge-kegiatan",
    date: "27 Agustus 2026",
    title: "Kegiatan Bina Desa Mahasiswa Sistem Informasi Universitas Teknokrat Indonesia",
    image: "img/tekno.jpg",
    alt: "Kegiatan Bina Desa",
    paragraphs: [
      "Beberapa mahasiswa dari Program Studi Sistem Informasi Universitas Teknokrat Indonesia melaksanakan kegiatan bina desa di wilayah Desa Buah Berak.",
      "Kegiatan ini menjadi bagian dari keterlibatan mahasiswa dalam lingkungan masyarakat desa. Melalui kegiatan bina desa, mahasiswa dapat berinteraksi secara langsung dengan masyarakat sekaligus memahami kondisi dan kebutuhan di lingkungan desa.",
      "Kehadiran mahasiswa juga menjadi ruang untuk membangun komunikasi dan kolaborasi antara perguruan tinggi dengan Pemerintah Desa Buah Berak serta masyarakat.",
      "Kegiatan bina desa diharapkan dapat memberikan pengalaman bagi mahasiswa dan menjadi bagian dari hubungan baik antara Universitas Teknokrat Indonesia dengan masyarakat Desa Buah Berak."
    ]
  },

  "jalan-rabat": {
    category: "Infrastruktur",
    categoryClass: "badge-infrastruktur",
    date: "3 Agustus 2026",
    title: "Pembangunan Jalan Rabat Beton RW 04 Telah Selesai",
    image: "img/jalan.jpeg",
    alt: "Pembangunan Jalan Rabat Beton",
    paragraphs: [
      "Pembangunan jalan rabat beton di wilayah RW 04 Desa Buah Berak telah selesai dilaksanakan. Jalan yang dibangun memiliki panjang 420 meter dan kini siap dimanfaatkan oleh masyarakat.",
      "Penyelesaian pembangunan jalan ini menjadi bagian dari upaya peningkatan infrastruktur desa agar akses masyarakat di wilayah RW 04 dapat digunakan dengan lebih baik.",
      "Dengan selesainya pembangunan tersebut, masyarakat diharapkan dapat memanfaatkan akses jalan secara optimal dalam menjalankan aktivitas sehari-hari.",
      "Pembangunan infrastruktur desa merupakan salah satu bagian penting dalam mendukung kenyamanan dan aktivitas masyarakat serta menunjang perkembangan wilayah Desa Buah Berak."
    ]
  }
};

function renderBeritaDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "hut-ri";
  const berita = beritaData[id] || beritaData["hut-ri"];

  const image = document.getElementById("detailImage");
  const category = document.getElementById("detailCategory");
  const date = document.getElementById("detailDate");
  const title = document.getElementById("detailTitle");
  const body = document.getElementById("detailBody");

  image.src = berita.image;
  image.alt = berita.alt;
  category.textContent = berita.category;
  category.className = `berita-detail-badge ${berita.categoryClass}`;
  date.textContent = berita.date;
  title.textContent = berita.title;

  body.innerHTML = berita.paragraphs
    .map(paragraph => `<p>${paragraph}</p>`)
    .join("");

  document.title = `${berita.title} — Desa Buah Berak`;
}

document.addEventListener("DOMContentLoaded", renderBeritaDetail);
