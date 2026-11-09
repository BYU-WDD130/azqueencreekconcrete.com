document.addEventListener('DOMContentLoaded', function() {
    // -------------------------------------------------------------
    // 1. Manejo del Formulario de Prospectos (Formspree AJAX)
    // -------------------------------------------------------------
    const leadForm = document.getElementById('leadForm');

    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita recargar la página

            const form = e.target;
            const nameInput = document.getElementById('name');
            const phoneInput = document.getElementById('phone');
            
            const name = nameInput ? nameInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';

            if (name === '' || phone === '') {
                alert('Please fill out all required fields.');
                return;
            }

            const submitBtn = form.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerText = 'Sending...';
            }

            // Envío por AJAX a Formspree
            fetch(form.action, {
                method: form.method || 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok || response.status === 200) {
                    // Reemplazo visual de la tarjeta por el mensaje de éxito
                    const formCard = document.querySelector('.form-card') || document.getElementById('quote-form-container') || document.querySelector('.hero-form-card');
                    if (formCard) {
                        formCard.innerHTML = `
                            <div style="text-align: center; padding: 35px 25px; background: #ffffff; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
                            <i class="fa-solid fa-circle-check" style="font-size: 3.5rem; color: #10b981; margin-bottom: 15px;"></i>
                            <h3 style="color: #1e3a8a; margin-bottom: 10px; font-size: 1.4rem;">Request Received!</h3>
                            <p style="color: #4b5563; font-size: 0.95rem; line-height: 1.5;">Thank you <strong>${name}</strong>. A local specialist will reach out to you at <strong>${phone}</strong> within 10 minutes to discuss your estimate.</p>
                            </div>
                        `;
                    }
                } else {
                    return response.json().then(data => {
                        throw new Error(data.error || 'Form submission failed');
                    });
                }
            })
            .catch(error => {
                console.error('Formspree Error:', error);
                alert('There was a problem sending your request. Please check that your Formspree Endpoint URL is correct.');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerText = 'Get Quote Now';
                }
            });
        });
    }

    // -------------------------------------------------------------
    // 2. Funcionalidad de Modal / Lightbox para las Imágenes
    // -------------------------------------------------------------
    const imageWrappers = document.querySelectorAll('.card-image-wrapper');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('imgExpanded');
    const closeModalBtn = document.querySelector('.close-modal');

    if (modal && modalImg) {
        imageWrappers.forEach(wrapper => {
            wrapper.addEventListener('click', function() {
                const img = this.querySelector('img');
                if (img) {
                    modal.style.display = 'block';
                    modalImg.src = img.src;
                    modalImg.alt = img.alt || 'Expanded view';
                }
            });
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
});

// -------------------------------------------------------------
// 3. Registro del Service Worker
// -------------------------------------------------------------
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker registrado con éxito:', reg.scope))
            .catch(err => console.log('Error al registrar el Service Worker:', err));
    });
}