document.addEventListener('DOMContentLoaded', function() {
    // -------------------------------------------------------------
    // 1. Manejo del Formulario de Prospectos (Lead Form)
    // -------------------------------------------------------------
    const leadForm = document.getElementById('leadForm');

    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;

            if (name === '' || phone === '') {
                alert('Please fill out all required fields.');
                return;
            }

            console.log('Lead Captured:', { name, phone, service });

            const formCard = document.querySelector('.hero-form-card');
            if (formCard) {
                formCard.innerHTML = `
                    <div style="text-align: center; padding: 20px;">
                        <i class="fa-solid fa-circle-check" style="font-size: 3rem; color: #10b981; margin-bottom: 15px;"></i>
                        <h3 style="color: #1e3a8a; margin-bottom: 10px;">Request Received!</h3>
                        <p style="color: #4b5563; font-size: 0.95rem;">Thank you <strong>${name}</strong>. A local specialist will reach out to you at <strong>${phone}</strong> within 10 minutes to discuss your estimate.</p>
                    </div>
                `;
            }
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