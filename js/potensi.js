// Interaksi khusus halaman UMKM & Wisata
(() => {
  const filters = document.querySelectorAll('#umkmFilters .category-pill');
  const cards = document.querySelectorAll('#umkmGrid .umkm-card');
  const empty = document.getElementById('umkmEmpty');

  if (!filters.length || !cards.length) return;

  filters.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filters.forEach(item => {
        item.classList.toggle('active', item === button);
      });

      let visible = 0;
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.hidden = !show;
        if (show) visible += 1;
      });

      if (empty) empty.hidden = visible !== 0;
    });
  });
})();
