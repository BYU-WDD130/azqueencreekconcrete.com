document.addEventListener('DOMContentLoaded', function() {
    const leadForm = document.getElementById('leadForm');

    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent page reload

            // Capture form values
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;

            // Simple validation
            if (name === '' || phone === '') {
                alert('Please fill out all required fields.');
                return;
            }

            // Log submission for testing
            console.log('Queen Creek Lead Captured:', { name, phone, service });

            // Show success confirmation card
            const formCard = document.querySelector('.hero-form-card');
            formCard.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <i class="fa-solid fa-circle-check" style="font-size: 3rem; color: #10b981; margin-bottom: 15px;"></i>
                    <h3 style="color: #0f172a; margin-bottom: 10px;">Request Received!</h3>
                    <p style="color: #4b5563; font-size: 0.95rem;">Thank you <strong>${name}</strong>. A local Queen Creek concrete expert will contact you at <strong>${phone}</strong> within 10 minutes.</p>
                </div>
            `;
            
            // Note: You can easily route this form data via Webhook to Make.com or Zapier for SMS/WhatsApp lead alerts.
        });
    }
});