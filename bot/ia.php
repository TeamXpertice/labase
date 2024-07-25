<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat</title>
    <link rel="stylesheet" href="bot.css"> <!-- Mover estilos a un archivo CSS separado -->
</head>

<body>
    <!-- Usa una imagen GIF como icono de chat -->
    <img src="assets/images/base.gif" alt="Chat Icon" id="chat-icon" aria-label="Abrir chat">

    <div class="chat-window" id="chat-window" aria-hidden="true">
        <div class="chat-header">
            Base Talk
            <button class="close-btn" id="close-chat" aria-label="Cerrar chat">&times;</button>
        </div>
        <div class="chat-body" id="chat-body">
            <!-- Preguntas y respuestas predefinidas -->
            <div class="questions-container" id="questions-container">
                <div class="question-btn" data-question="¿Qué servicios ofrece el cowork?" role="button" tabindex="0">¿Qué servicios ofrece el cowork?</div>
                <div class="question-btn" data-question="¿Cuáles son las tarifas de coworking?" role="button" tabindex="0">¿Cuáles son las tarifas de coworking?</div>
                <div class="question-btn" data-question="¿Cómo reservar una sala de reuniones?" role="button" tabindex="0">¿Cómo reservar una sala de reuniones?</div>
            </div>
        </div>
        <div class="chat-input-container">
            <input type="text" class="chat-input" id="chat-input" placeholder="Escribe tu mensaje aquí..." aria-label="Campo de entrada para mensaje">
            <button class="send-btn" id="send-btn" aria-label="Enviar mensaje">&#9658;</button>
        </div>
    </div>

    <script src="bot.js"></script> <!-- Mover scripts a un archivo JS separado -->
</body>

</html>