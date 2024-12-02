import React, { useState } from 'react';
import Login from './components/Login';
import ConversorTextoAVoz from './components/ConversorTextoAVoz';
import ConversorVozATexto from './components/ConversorVozATexto';

function App() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [logueado, setLogueado] = useState(false);
  const [textoAVoz, setTextoAVoz] = useState('');
  const [vozATexto, setVozATexto] = useState('');

  const cambiarUsuario = (evento) => setUsuario(evento.target.value);
  const cambiarClave = (evento) => setClave(evento.target.value);

  const Ingresar = () => {
    if (usuario === 'admin' && clave === 'admin') {
      alert('Ingresaste');
      setLogueado(true);
    } else {
      alert('Usuario o clave incorrectos');
    }
  };

  const cambiarTexto = (evento) => setTextoAVoz(evento.target.value);
  const convertirTextoAVoz = () => {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(textoAVoz);
    synth.speak(utterThis);
  };

  const grabarVozATexto = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.start();
    recognition.onresult = (event) => setVozATexto(event.results[0][0].transcript);
  };

  return (
    <div className="container">
      {logueado ? (
        <>
          <h1>Conversor TTS y STT</h1>
          <ConversorTextoAVoz
            textoAVoz={textoAVoz}
            cambiarTexto={cambiarTexto}
            convertirTextoAVoz={convertirTextoAVoz}
          />
          <ConversorVozATexto
            vozATexto={vozATexto}
            grabarVozATexto={grabarVozATexto}
          />
        </>
      ) : (
        <Login
          usuario={usuario}
          clave={clave}
          cambiarUsuario={cambiarUsuario}
          cambiarClave={cambiarClave}
          Ingresar={Ingresar}
        />
      )}
    </div>
  );
}

export default App;




