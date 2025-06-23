// React'tan gerekli hook'un import edilmesi
import { useState } from 'react';
// Özel CSS stillerinin import edilmesi
import './TodoItem.css';

// Tekil Todo Öğesi Bileşeni
const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  // STATE TANIMLAMALARI
  // Düzenleme modunun durumunu tutan state
  const [isEditing, setIsEditing] = useState(false);
  // Düzenleme sırasındaki metin içeriğini tutan state
  const [editText, setEditText] = useState(todo.text);

  // FORM İŞLEME
  // Düzenleme formunun gönderilmesini işleyen fonksiyon
  const handleSubmit = (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engeller
    if (editText.trim()) { // Boş metin kontrolü
      todo.text = editText; // Todo metnini günceller
      setIsEditing(false); // Düzenleme modundan çıkar
    }
  };

  // RENDER
  return (
    <li className={`${todo.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      {/* GÖRÜNÜM MODU */}
      <div className="view">
        {/* CHECKBOX WRAPPER */}
        <div className="checkbox-wrapper">
          {/* Tamamlandı durumu için checkbox */}
          <input
            type="checkbox"
            className="toggle"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          {/* Özel tasarlanmış checkbox görseli */}
          <div className="custom-checkbox" />
        </div>

        {/* Todo metni - çift tıklama ile düzenleme moduna geçer */}
        <label onDoubleClick={() => setIsEditing(true)}>
          {todo.text}
        </label>

        {/* Silme butonu */}
        <button className="destroy" onClick={() => deleteTodo(todo.id)} />
      </div>

      {/* DÜZENLEME MODU */}
      {isEditing && (
        <form onSubmit={handleSubmit}>
          <input
            className="edit"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSubmit} // Input'tan çıkıldığında formu gönder
            autoFocus // Düzenleme moduna girildiğinde otomatik fokus
          />
        </form>
      )}
    </li>
  );
};

export default TodoItem;