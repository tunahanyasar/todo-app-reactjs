// React'tan gerekli hook'ların import edilmesi
// useState: Durum yönetimi için
// useEffect: Yan etkileri (localStorage işlemleri) yönetmek için
import { useState, useEffect } from 'react';
// Alt bileşenlerin import edilmesi
import TodoList from './TodoList';    // .todos listesini render eden bileşen
import TodoForm from './TodoForm';    // Yeni todo ekleme formunu içeren bileşen
import TodoFilter from './TodoFilter'; // Filtreleme seçeneklerini içeren bileşen

// Ana Todo Uygulaması Bileşeni
const TodoApp = () => {
  // STATE TANIMLAMALARI
  // .todos state'i: Tüm todo öğelerini tutan ana state
  // localStorage'dan veriyi alır, yoksa varsayılan todoları kullanır
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos'); // localStorage'dan verileri al
    return savedTodos ? JSON.parse(savedTodos) : [    // Veri varsa parse et, yoksa varsayılan değerleri kullan
      // Aktif (tamamlanmamış) todolar
      { id: 1, text: 'Todo - 1', completed: false },
      { id: 2, text: 'Todo - 2', completed: false },
      { id: 3, text: 'Todo - 3', completed: false },

      // Tamamlanmış todolar
      { id: 6, text: 'Todo Completed - 1', completed: true },
      { id: 7, text: 'Todo Completed - 2', completed: true },
      { id: 8, text: 'Todo Completed - 3', completed: true },
    ];
  });

  // Filtreleme durumunu tutan state (all, active, completed)
  const [filter, setFilter] = useState('all');

  // EFFECT HOOKS
  // .todos state'i her değiştiğinde localStorage'ı güncelle
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // .todo İŞLEMLERİ
  // Yeni todo ekleme fonksiyonu
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),          // Benzersiz id için timestamp kullan
      text,                    // .todo metni
      completed: false         // Yeni todo varsayılan olarak tamamlanmamış
    };
    setTodos([...todos, newTodo]); // Yeni todoyu listeye ekle
  };

  // .todo durumunu değiştirme fonksiyonu
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id                              // İlgili todo'yu bul
        ? { ...todo, completed: !todo.completed } // Durumunu tersine çevir
        : todo                                    // Diğer todoları değiştirme
    ));
  };

  // .todo silme fonksiyonu
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id)); // İlgili todo'yu filtrele (sil)
  };

  // Tamamlanmış todoları temizleme fonksiyonu
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed)); // Sadece tamamlanmamışları tut
  };

  // FİLTRELEME İŞLEMLERİ
  // Aktif filtreye göre todoları filtrele
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;    // Sadece aktif olanları göster
    if (filter === 'completed') return todo.completed;  // Sadece tamamlanmışları göster
    return true;                                        // 'all' filtresi için hepsini göster
  });

  // Aktif (tamamlanmamış) todo sayısını hesapla
  const activeTodoCount = todos.filter(todo => !todo.completed).length;

  // RENDER
  return (
    <div className="todoapp">
      {/* BAŞLIK VE YENİ TODO EKLEME FORMU */}
      <header className="header">
        <h1>todos</h1>
        <TodoForm addTodo={addTodo} />
      </header>

      {/* ANA İÇERİK - TODO LİSTESİ */}
      <section className="main">
        {/* Tümünü tamamla/tamamlanmadı yapma toggle'ı */}
        <input
          className="toggle-all"
          type="checkbox"
          checked={activeTodoCount === 0}                    // Tüm todolar tamamlandıysa checked
          onChange={() => setTodos(todos.map(todo =>         // Tüm todoların durumunu değiştir
            ({ ...todo, completed: activeTodoCount !== 0 })) // Hepsi tamamsa tamamlanmadı yap, değilse tamamla
          )}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        {/* Todo listesi bileşeni */}
        <TodoList
          todos={filteredTodos}      // Filtrelenmiş todo listesi
          toggleTodo={toggleTodo}     // .todo durumu değiştirme fonksiyonu
          deleteTodo={deleteTodo}     // .todo silme fonksiyonu
        />
      </section>

      {/* ALT BİLGİ ÇUBUĞU */}
      <footer className="footer">
        {/* Kalan todo sayısı */}
        <span className="todo-count">
          <strong>{activeTodoCount}</strong> {/* Tamamlanmamış todo sayısı */}
          {' '}{activeTodoCount === 1 ? 'item' : 'items'} left {/* Tekil/çoğul kontrolü */}
        </span>

        {/* Filtreleme seçenekleri */}
        <TodoFilter 
          filter={filter}         // Aktif filtre
          setFilter={setFilter}   // Filtre değiştirme fonksiyonu
        />

        {/* Tamamlananları temizle butonu - sadece tamamlanmış todo varsa göster */}
        {todos.some(todo => todo.completed) && (
          <button className="clear-completed" onClick={clearCompleted}>
            Clear completed
          </button>
        )}
      </footer>
    </div>
  );
};

export default TodoApp;