
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
               <a href="#" id="shopOwnerBtn" class="popup-btn shop-owner">Shop Owner</a>
<a href="#" id="customerBtn" class="popup-btn customer">Customer</a>

            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', popupHTML);
// Function to handle dynamic redirects that work on both localhost and GitHub Pages
function redirectTo(subPath) {
  const basePath = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '');
  window.location.href = `${basePath}/${subPath}`;
}

// Add event listeners for both buttons
document.getElementById("shopOwnerBtn").addEventListener("click", () => {
  redirectTo("owner/owner.html");
});

document.getElementById("customerBtn").addEventListener("click", () => {
  redirectTo("customer/index.html");
});

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
