document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.layanan-card[data-service]');
  if (!cards.length) return;

  const data = {
    domisili: {
      title: 'Surat Keterangan Domisili',
      requirements: [
        'Surat pengantar dari RT/RW.',
        'Fotokopi KTP yang masih berlaku.',
        'Fotokopi Kartu Keluarga (KK).',
        'Pas foto ukuran 3×4 sebanyak 1 lembar.',
        'Bukti/tanda lunas PBB tahun terakhir.'
      ]
    },
    ktpkk: {
      title: 'Surat Pengantar KTP / KK',
      requirements: [
        'Surat pengantar dari RT/RW sesuai keperluan.',
        'Fotokopi Kartu Keluarga (KK).',
        'KTP-el lama jika pengurusan karena perubahan data, rusak, atau penggantian.',
        'Surat kehilangan dari kepolisian jika KTP hilang.',
        'Dokumen pendukung perubahan data jika ada.',
        'Formulir pelayanan yang diberikan/diisi sesuai arahan petugas desa.'
      ]
    },
    sktm: {
      title: 'Surat Keterangan Tidak Mampu',
      requirements: [
        'Surat pengantar dari RT/RW.',
        'Fotokopi KTP pemohon.',
        'Fotokopi Kartu Keluarga (KK).',
        'Dokumen pendukung sesuai keperluan, misalnya surat dari sekolah, fasilitas kesehatan, atau instansi terkait jika diperlukan.',
        'Dokumen tambahan lain apabila diminta petugas berdasarkan tujuan pengurusan.'
      ]
    },
    usaha: {
      title: 'Surat Keterangan Usaha',
      requirements: [
        'Surat pengantar dari RT/RW.',
        'Fotokopi KTP pemilik usaha.',
        'Fotokopi Kartu Keluarga (KK).',
        'Data usaha: nama usaha, jenis usaha, dan alamat/lokasi usaha.',
        'Dokumen usaha yang sudah dimiliki, seperti NIB atau NPWP, jika ada.'
      ]
    },
    waris: {
      title: 'Surat Keterangan Waris',
      requirements: [
        'Surat pengantar dari RT/RW.',
        'Fotokopi KTP ahli waris.',
        'Fotokopi Kartu Keluarga (KK) yang berkaitan.',
        'Surat keterangan/akta kematian pewaris.',
        'Dokumen yang menerangkan hubungan keluarga apabila diperlukan.',
        'Kehadiran saksi/ahli waris sesuai arahan petugas desa.'
      ]
    },
    rekomendasi: {
      title: 'Surat Rekomendasi',
      requirements: [
        'Surat pengantar dari RT/RW.',
        'Fotokopi KTP pemohon.',
        'Fotokopi Kartu Keluarga (KK).',
        'Surat atau dokumen dari instansi/tujuan yang membutuhkan rekomendasi.',
        'Dokumen pendukung lain sesuai jenis rekomendasi yang dimohonkan.'
      ]
    }
  };

  const modal = document.createElement('div');
  modal.className = 'layanan-modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="layanan-modal-card" role="dialog" aria-modal="true" aria-labelledby="layananModalTitle">
      <div class="layanan-modal-head">
        <span class="layanan-modal-kicker">Persyaratan Pelayanan</span>
        <h3 id="layananModalTitle">-</h3>
        <button class="layanan-modal-close" type="button" aria-label="Tutup">&times;</button>
      </div>
      <div class="layanan-modal-body">
        <ul class="layanan-requirements" id="layananRequirements"></ul>
        <div class="layanan-modal-note">Bawa dokumen sesuai persyaratan dan siapkan dokumen asli apabila diperlukan untuk verifikasi petugas. Persyaratan dapat menyesuaikan jenis/keperluan layanan.</div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const title = modal.querySelector('#layananModalTitle');
  const list = modal.querySelector('#layananRequirements');
  const close = modal.querySelector('.layanan-modal-close');

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  function openModal(key) {
    const service = data[key];
    if (!service) return;
    title.textContent = service.title;
    list.innerHTML = service.requirements.map(item => `<li>${item}</li>`).join('');
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    close.focus();
  }

  cards.forEach(card => {
    const open = () => openModal(card.dataset.service);
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
    });
  });

  close.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
});
