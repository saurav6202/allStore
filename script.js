
// Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const screenContents = document.querySelectorAll('.screen-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show active content
            screenContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}-tab`) {
                    content.classList.add('active');
                }
            });
        });
    });

// Popup functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create popup HTML
    const popupHTML = `
        <div class="popup-overlay" id="popupOverlay">
            <div class="popup">
                <h2>Welcome to Alls Store</h2>
                <a href="owner/login.html" class="popup-btn shop-owner">Shop Owner</a>
                <a href="customer/index.html" class="popup-btn customer">Customer</a>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', popupHTML);

    const popupOverlay = document.getElementById('popupOverlay');
    popupOverlay.classList.add('active');

    // Button click actions
    popupOverlay.querySelector('.shop-owner').addEventListener('click', () => {
        popupOverlay.classList.remove('active');
        // alert('Redirecting to Shop Owner section...');
        // window.location.href = "#screens"; // optionally redirect
    });

    popupOverlay.querySelector('.customer').addEventListener('click', () => {
        popupOverlay.classList.remove('active');
        // alert('Redirecting to Customer section...');
        // window.location.href = "#home"; // optionally redirect
    });

    // Close popup on overlay click
    popupOverlay.addEventListener('click', (e) => {
        if(e.target === popupOverlay) {
            popupOverlay.classList.remove('active');
        }
    });
});
