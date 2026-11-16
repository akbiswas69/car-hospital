document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. BULLETPROOF NAVIGATION & MENU CLOSER
    // ==========================================
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarContent');
    const navLinks = document.querySelectorAll('.nav-link, .navbar-brand, .btn-brand-outline, .stretched-link, .btn-link, .btn-brand'); 
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Only run if it's an anchor link (starts with #)
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault(); 

                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open by simulating a click on the toggler
                    if (navbarCollapse.classList.contains('show')) {
                        navbarToggler.click(); 
                    }

                    // Calculate Offset (Header Height)
                    const headerOffset = 80; 
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    // Smooth Scroll
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // ==========================================
    // 2. PHONE INPUT VALIDATION (NEW)
    // ==========================================
    const phoneInput = document.getElementById('floatPhone');
    
    if (phoneInput) {
        // A. Real-time Input Masking (Prevent letters)
        phoneInput.addEventListener('input', function(e) {
            // Replace any character that is NOT a digit (0-9) with an empty string
            this.value = this.value.replace(/\D/g, '');
        });

        // B. Optional: Prevent pasting invalid content
        phoneInput.addEventListener('paste', function(e) {
            // Get pasted data via clipboard API
            let pastedData = (e.clipboardData || window.clipboardData).getData('text');
            // If pasted data contains non-digits, prevent paste or clean it
            if (/\D/.test(pastedData)) {
                e.preventDefault();
                this.value = pastedData.replace(/\D/g, '');
            }
        });
    }

    // ==========================================
    // 3. FORM SUBMISSION (VISUAL FEEDBACK)
    // ==========================================
    const form = document.getElementById('bookingForm');
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate Phone Length before submitting
            const phoneVal = phoneInput ? phoneInput.value : '';
            if (phoneVal.length < 10) {
                alert("Please enter a valid phone number (at least 10 digits).");
                phoneInput.focus();
                return; // Stop execution
            }

            const btn = this.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;

            btn.disabled = true;
            btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> Submitting...`;
            
            setTimeout(() => {
                btn.innerHTML = `<i class="fa-solid fa-check me-2"></i> Request Sent!`;
                btn.classList.remove('btn-brand');
                btn.classList.add('btn-success');
                btn.style.backgroundColor = "#10b981"; // Green success
                btn.style.borderColor = "#10b981";
                
                setTimeout(() => {
                    this.reset();
                    btn.disabled = false;
                    btn.innerHTML = originalHTML;
                    btn.classList.remove('btn-success');
                    btn.classList.add('btn-brand');
                    btn.removeAttribute('style'); // Remove inline styles
                }, 3000);
            }, 1500);
        });
    }

    // ==========================================
    // 4. NAVBAR SHADOW ON SCROLL
    // ==========================================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-sm');
        } else {
            navbar.classList.remove('shadow-sm');
        }
    });

});