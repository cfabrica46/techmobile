document.addEventListener('DOMContentLoaded', function() {
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');

    const initialOptions = [
        { text: 'Consultar Inventario', response: 'inventario' },
        { text: 'Información de Contacto', response: 'contacto' },
        { text: 'Soporte Técnico', response: 'soporte' },
        { text: 'Promociones y Ofertas', response: 'promociones' },
        { text: 'Otras Consultas', response: 'otros' }
    ];

    // Renderizar las opciones iniciales
    renderOptions(initialOptions);

    function renderOptions(options) {
        chatbotInput.innerHTML = '';
        options.forEach(option => {
            const button = document.createElement('button');
            button.classList.add('chatbot-option');
            button.textContent = option.text;
            button.setAttribute('data-response', option.response);
            button.addEventListener('click', handleOptionClick);
            chatbotInput.appendChild(button);
        });

        // Añadir opción de cancelar si no estamos en la pantalla inicial
        if (options !== initialOptions) {
            const cancelButton = document.createElement('button');
            cancelButton.classList.add('chatbot-option');
            cancelButton.textContent = 'Cancelar';
            cancelButton.addEventListener('click', () => renderOptions(initialOptions));
            chatbotInput.appendChild(cancelButton);
        }
    }

    function handleOptionClick() {
        const userMessage = this.textContent;
        const responseType = this.getAttribute('data-response');
        appendMessage('user', userMessage);

        // Simula una respuesta del chatbot
        setTimeout(function() {
            const botResponse = getResponse(responseType);
            appendMessage('bot', botResponse.text);
            if (botResponse.options) {
                renderOptions(botResponse.options);
            } else {
                renderOptions(initialOptions);
            }
        }, 1000);
    }

    function appendMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chatbot-message', sender);
        messageElement.innerHTML = message; // Permitir HTML en los mensajes
        chatbotMessages.appendChild(messageElement);
        scrollToBottom();
    }

    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function getResponse(responseType) {
        switch (responseType) {
            case 'inventario':
                return {
                    text: 'Tenemos una amplia gama de productos. ¿Qué tipo de producto te interesa?',
                    options: [
                        { text: 'Smartphones', response: 'smartphones' },
                        { text: 'Accesorios', response: 'accesorios' },
                        { text: 'Dispositivos Inteligentes', response: 'dispositivos' }
                    ]
                };
            case 'contacto':
                return {
                    text: 'Puedes contactarnos en techmobile@company.pe o llamarnos al +51 938 536 234. ¿Cómo más podemos ayudarte?',
                    options: [
                        { text: 'Horarios de Atención', response: 'horarios' },
                        { text: 'Ubicación', response: 'ubicacion' },
                        { text: 'Otros', response: 'otros_contacto' }
                    ]
                };
            case 'soporte':
                return {
                    text: 'Ofrecemos soporte técnico. ¿Qué tipo de soporte necesitas?',
                    options: [
                        { text: 'Problemas con el dispositivo', response: 'problemas_dispositivo' },
                        { text: 'Actualizaciones de software', response: 'actualizaciones_software' },
                        { text: 'Otros', response: 'otros_soporte' }
                    ]
                };
            case 'promociones':
                return {
                    text: 'Actualmente tenemos varias promociones. ¿Qué tipo de oferta te interesa?',
                    options: [
                        { text: 'Descuentos en smartphones', response: 'descuentos_smartphones' },
                        { text: 'Ofertas en accesorios', response: 'ofertas_accesorios' },
                        { text: 'Paquetes especiales', response: 'paquetes_especiales' }
                    ]
                };
            case 'otros':
                return {
                    text: 'Estoy aquí para ayudarte con tus consultas. ¿En qué puedo asistirte hoy?',
                    options: [
                        { text: 'Consultas sobre productos', response: 'consultas_productos' },
                        { text: 'Información de la empresa', response: 'informacion_empresa' },
                        { text: 'Otros', response: 'otros_otros' }
                    ]
                };
            case 'smartphones':
                return { text: 'Puedes ver nuestra selección de smartphones aquí: <a href="/products.html#smartphones">Smartphones</a>.', options: null };
            case 'accesorios':
                return { text: 'Tenemos una variedad de accesorios disponibles aquí: <a href="/products.html#accesorios">Accesorios</a>.', options: null };
            case 'dispositivos':
                return { text: 'Descubre nuestros dispositivos inteligentes aquí: <a href="/products.html#dispositivos-inteligentes">Dispositivos Inteligentes</a>.', options: null };
            case 'horarios':
                return { text: 'Nuestro horario de atención es de Lunes a Viernes de 9:00 AM a 6:00 PM.', options: null };
            case 'ubicacion':
                return { text: 'Estamos ubicados en 123 Av San Luis, Lima, Perú.', options: null };
            case 'otros_contacto':
                return { text: 'Puedes enviarnos un correo a techmobile@company.pe para consultas adicionales.', options: null };
            case 'problemas_dispositivo':
                return { text: 'Por favor, describe el problema con tu dispositivo y te ayudaremos a solucionarlo.', options: null };
            case 'actualizaciones_software':
                return { text: 'Puedes ver las últimas actualizaciones de software en nuestra página de soporte.', options: null };
            case 'otros_soporte':
                return { text: 'Describe el tipo de soporte que necesitas y te ayudaremos a resolverlo.', options: null };
            case 'descuentos_smartphones':
                return { text: 'Tenemos descuentos en varios modelos de smartphones. Visita nuestra página de <a href="/products.html#promociones">promociones</a>.', options: null };
            case 'ofertas_accesorios':
                return { text: 'Encuentra ofertas especiales en accesorios en nuestra tienda.', options: null };
            case 'paquetes_especiales':
                return { text: 'Descubre nuestros paquetes especiales aquí: <a href="/products.html#paquetes-especiales">Paquetes Especiales</a>.', options: null };
            case 'consultas_productos':
                return { text: 'Puedes hacer consultas sobre nuestros productos aquí: <a href="/contact-us.html#consultas-productos">Consultas sobre Productos</a>.', options: null };
            case 'informacion_empresa':
                return { text: 'Encuentra más información sobre nuestra empresa en nuestra página de <a href="/about-us.html">Sobre Nosotros</a>.', options: null };
            case 'otros_otros':
                return { text: 'Por favor, describe tu consulta y te ayudaremos a resolverla.', options: null };
            default:
                return { text: 'Lo siento, no entiendo esa solicitud.', options: null };
        }
    }
});
