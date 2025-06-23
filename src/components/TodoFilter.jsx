// Todo Filtreleme Bileşeni
const TodoFilter = ({ filter, setFilter }) => {
  // FİLTRE SEÇENEKLERİ
  // Kullanılabilir tüm filtre seçeneklerinin tanımı
  const filters = [
    { value: 'all', label: 'All' },         // Tüm todoları göster
    { value: 'active', label: 'Active' },    // Sadece tamamlanmamışları göster
    { value: 'completed', label: 'Completed' } // Sadece tamamlanmışları göster
  ];

  // RENDER
  return (
    <ul className="filters">
      {/* Her bir filtre seçeneği için link oluşturma */}
      {filters.map(({ value, label }) => (
        <li key={value}>
          <a
            className={filter === value ? 'selected' : ''} // Aktif filtre için özel stil
            onClick={() => setFilter(value)} // Tıklandığında filtreyi değiştir
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default TodoFilter; 