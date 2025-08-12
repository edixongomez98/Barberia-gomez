import React, { useState } from 'react';
import './App.css';

function App() {
  // Estado para saber qué modal de precios está abierto (corte, afeitado, barba)
  const [modalType, setModalType] = useState(null);

  // Estado para mostrar o no el modal de agendar cita
  const [showAgendar, setShowAgendar] = useState(false);

  // Estados para el formulario de agendar cita
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [servicio, setServicio] = useState('Corte de cabello');
  const [confirmacion, setConfirmacion] = useState('');

  // Información de los precios de cada servicio
  const modalContent = {
    corte: {
      title: "Precios Corte de Cabello",
      items: [
        "Adulto: $15.000",
        "Niño: $10.000",
      ]
    },
    afeitado: {
      title: "Precios Afeitado",
      items: [
        "Clásico: $6.000",
        "Barba completa: $8.000",
        "Diseño especial: $10.000"
      ]
    },
    barba: {
      title: "Precios Diseño de Barba",
      items: [
        "Diseño básico: $9.000",
        "Diseño avanzado: $12.000"
      ]
    }
  };

  // Abrir modal de precios según el tipo
  const handleOpenModal = (type) => setModalType(type);

  // Cerrar modal de precios
  const handleCloseModal = () => setModalType(null);

  // Abrir modal para agendar cita
  const handleOpenAgendar = () => setShowAgendar(true);

  // Cerrar modal de agendar y limpiar datos
  const handleCloseAgendar = () => {
    setShowAgendar(false);
    setConfirmacion('');
    setNombre('');
    setFecha('');
    setHora('');
    setServicio('Corte de cabello');
  };

  // Enviar datos de la cita por WhatsApp
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita recargar la página

    // Crear mensaje para WhatsApp
    const mensaje = `¡Hola! Quiero agendar una cita:\nNombre: ${nombre}\nFecha: ${fecha}\nHora: ${hora}\nServicio: ${servicio}`;
    
    // Número de WhatsApp (cambiar por tu número real con código de país)
    const telefono = '3122284474';
    
    // URL para abrir WhatsApp con el mensaje
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    
    // Abrir WhatsApp en nueva pestaña
    window.open(url, '_blank');

    // Mostrar mensaje de confirmación
    setConfirmacion('¡SU CITA SE AGENDÓ EXITOSAMENTE, RECUERDA LLEGAR A TIEMPO!');
  };

  return (
    <div className="App">
      {/* Encabezado con logo, nombre y opciones */}
      <header className="App-header">
        <img src={`${process.env.PUBLIC_URL}/logo.jpg`} alt="Logo Barbería" className="App-logo" />
        <h1>Barbería Gomez</h1>
        <p>Bienvenido a tu barbería de confianza.</p>

        {/* Lista de servicios que abren el modal de precios */}
        <ul>
          <li style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => handleOpenModal('corte')}>
            Corte de cabello
          </li>
          <li style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => handleOpenModal('afeitado')}>
            Afeitado
          </li>
          <li style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => handleOpenModal('barba')}>
            Diseño de barba
          </li>
        </ul>

        {/* Información de contacto */}
        <p>Horario: Lunes a Sábado, 8am - 6pm</p>
        <p>Contacto: 3122284474</p>

        {/* Botón para abrir modal de agendar */}
        <button className="App-link" style={{ marginTop: 20, padding: '10px 24px' }} onClick={handleOpenAgendar}>
          Agendar cita
        </button>
      </header>

      {/* Modal de precios */}
      {modalType && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>{modalContent[modalType].title}</h2>
            <ul>
              {modalContent[modalType].items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <button onClick={handleCloseModal}>Cerrar</button>
          </div>
        </div>
      )}

      {/* Modal para agendar cita */}
      {showAgendar && (
        <div className="modal-overlay" onClick={handleCloseAgendar}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Agendar Cita</h2>
            
            {/* Formulario para agendar cita */}
            <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                required
                style={{ marginBottom: 12, width: '100%', padding: 8 }}
              />
              <input
                type="date"
                value={fecha}
                onChange={e => setFecha(e.target.value)}
                required
                style={{ marginBottom: 12, width: '100%', padding: 8 }}
              />
              <input
                type="time"
                value={hora}
                onChange={e => setHora(e.target.value)}
                required
                style={{ marginBottom: 12, width: '100%', padding: 8 }}
              />
              <select
                value={servicio}
                onChange={e => setServicio(e.target.value)}
                style={{ marginBottom: 12, width: '100%', padding: 8 }}
              >
                <option>Corte de cabello</option>
                <option>Afeitado</option>
                <option>Diseño de barba</option>
              </select>
              <button type="submit" className="App-link" style={{ width: '100%', padding: 10 }}>
                Agendar
              </button>
            </form>

            {/* Mensaje de confirmación */}
            {confirmacion && <p style={{ marginTop: 20, color: '#6d06a4ff' }}>{confirmacion}</p>}
            
            {/* Botón para cerrar modal */}
            <button onClick={handleCloseAgendar} style={{ marginTop: 10 }}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
