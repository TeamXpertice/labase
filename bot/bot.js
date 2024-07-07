// JavaScript para manejar la apertura y cierre de la ventana de chat
document.getElementById('chat-icon').onclick = function() {
    document.getElementById('chat-window').style.display = 'flex';
    document.getElementById('chat-window').setAttribute('aria-hidden', 'false');
    document.getElementById('chat-icon').style.display = 'none';
};

document.getElementById('close-chat').onclick = function() {
    document.getElementById('chat-window').style.display = 'none';
    document.getElementById('chat-window').setAttribute('aria-hidden', 'true');
    document.getElementById('chat-icon').style.display = 'block';
};

// Manejar el clic en las preguntas predefinidas
function setQuestionHandlers() {
    var questionBtns = document.querySelectorAll('.question-btn');
    questionBtns.forEach(function(btn) {
        btn.onclick = function() {
            var question = btn.getAttribute('data-question');
            sendMessage(question, 'user');
            updateQuestions(btn);
        };
    });
}

setQuestionHandlers();

// Función para enviar el mensaje al chat
function sendMessage(message, sender) {
    if (message.trim() === '') return; // Evitar mensajes vacíos

    // Agregar el mensaje del usuario al chat
    var chatBody = document.getElementById('chat-body');
    var messageClass = sender === 'user' ? 'user-message' : 'bot-message';
    var senderName = sender === 'user' ? 'Tú' : 'Base Talk';
    var userMessage = '<div class="message ' + messageClass + '"><strong>' + senderName + ':</strong> ' + message + '</div>';
    chatBody.innerHTML = userMessage + chatBody.innerHTML;

    // Scroll hacia abajo para mostrar el nuevo mensaje
    chatBody.scrollTop = chatBody.scrollHeight;

    if (sender === 'user') {
        // Mostrar el indicador de "Escribiendo..."
        var typingIndicator = '<div class="message typing-indicator" id="typing-indicator">Base Talk está escribiendo...</div>';
        chatBody.innerHTML = typingIndicator + chatBody.innerHTML;

        // Simular respuesta del servidor (esto puede ser reemplazado por una llamada real al servidor)
        var response = getResponse(message);

        // Mostrar la respuesta en el chat después de un tiempo
        setTimeout(function() {
            // Eliminar el indicador de "Escribiendo..."
            var typingElem = document.getElementById('typing-indicator');
            if (typingElem) {
                typingElem.parentNode.removeChild(typingElem);
            }
            sendMessage(response, 'bot');
        }, 2000); // Esperar 2 segundos antes de mostrar la respuesta
    }
}

// Función para actualizar las preguntas después de enviar una pregunta
function updateQuestions(selectedBtn) {
    // Ocultar todas las preguntas actuales
    var questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = ''; // Limpiar preguntas anteriores

    // Crear nuevas preguntas y respuestas basadas en la pregunta seleccionada
    switch (selectedBtn.getAttribute('data-question')) {
        case '¿Qué servicios ofrece el cowork?':
            questionsContainer.innerHTML += '<div class="question-btn" data-question="¿Cuántas personas pueden trabajar en el coworking?" role="button" tabindex="0">¿Cuántas personas pueden trabajar en el coworking?</div>';
            questionsContainer.innerHTML += '<div class="question-btn" data-question="¿Hay espacios de coworking personalizados?" role="button" tabindex="0">¿Hay espacios de coworking personalizados?</div>';
            break;
        case '¿Cuáles son las tarifas de coworking?':
            questionsContainer.innerHTML += '<div class="question-btn" data-question="¿Hay descuentos para miembros a largo plazo?" role="button" tabindex="0">¿Hay descuentos para miembros a largo plazo?</div>';
            questionsContainer.innerHTML += '<div class="question-btn" data-question="¿Cuáles son los horarios de acceso al coworking?" role="button" tabindex="0">¿Cuáles son los horarios de acceso al coworking?</div>';
            break;
        case '¿Cómo reservar una sala de reuniones?':
            questionsContainer.innerHTML += '<div class="question-btn" data-question="¿Qué tecnología está disponible en las salas de reuniones?" role="button" tabindex="0">¿Qué tecnología está disponible en las salas de reuniones?</div>';
            questionsContainer.innerHTML += '<div class="question-btn" data-question="¿Es posible cancelar una reserva de sala?" role="button" tabindex="0">¿Es posible cancelar una reserva de sala?</div>';
            break;
        default:
            break;
    }

    // Volver a asignar manejadores de clic a las nuevas preguntas
    setQuestionHandlers();
}

// Función para obtener la respuesta del servidor (simulado para este ejemplo)
function getResponse(message) {
    switch (message) {
        case '¿Qué servicios ofrece el cowork?':
            return 'Ofrecemos espacios de trabajo compartido, salas de reuniones equipadas, conexión a internet de alta velocidad, etc.';
        case '¿Cuáles son las tarifas de coworking?':
            return 'Las tarifas varían según la duración y el tipo de espacio. Puedes encontrar más detalles en nuestra página web o contactando directamente.';
        case '¿Cómo reservar una sala de reuniones?':
            return 'Puedes reservar una sala de reuniones a través de nuestro sitio web o contactando con nuestro equipo. Asegúrate de verificar la disponibilidad.';
        case '¿Cuántas personas pueden trabajar en el coworking?':
            return 'Nuestros espacios están diseñados para acoger a equipos de diversas tamaños, desde freelancers hasta pequeñas empresas.';
        case '¿Hay espacios de coworking personalizados?':
            return 'Sí, ofrecemos opciones personalizadas para satisfacer las necesidades específicas de tu equipo.';
        case '¿Hay descuentos para miembros a largo plazo?':
            return 'Sí, ofrecemos descuentos especiales para miembros que elijan planes a largo plazo.';
        case '¿Cuáles son los horarios de acceso al coworking?':
            return 'El coworking está disponible las 24 horas, los 7 días de la semana, para nuestros miembros premium.';
        case '¿Qué tecnología está disponible en las salas de reuniones?':
            return 'Nuestras salas de reuniones están equipadas con proyectores, pizarras digitales y conexión a internet de alta velocidad.';
        case '¿Es posible cancelar una reserva de sala?':
            return 'Sí, puedes cancelar una reserva de sala con un aviso previo. Ponte en contacto con nuestro equipo para más detalles.';
        default:
            return 'Lo siento, no entendí la pregunta. Por favor, reformula tu pregunta.';
    }
}

// Manejar el envío de mensajes al presionar Enter en el campo de entrada
document.getElementById('chat-input').onkeypress = function(event) {
    if (event.keyCode == 13) { // Enter key
        var input = document.getElementById('chat-input');
        var message = input.value;
        input.value = '';

        sendMessage(message, 'user');
    }
};

document.getElementById('send-btn').onclick = function() {
    var input = document.getElementById('chat-input');
    var message = input.value;
    input.value = '';

    sendMessage(message, 'user');
};
