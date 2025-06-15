// Upload form enhancements
document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.querySelector('input[type="file"]');
    const uploadArea = document.querySelector('.upload-area');

    if (fileInput && uploadArea) {
        // Make upload area clickable
        uploadArea.addEventListener('click', function () {
            fileInput.click();
        });

        // Drag and drop functionality
        uploadArea.addEventListener('dragover', function (e) {
            e.preventDefault();
            uploadArea.style.backgroundColor = '#e6e9ff';
            uploadArea.style.borderColor = '#5a67d8';
        });

        uploadArea.addEventListener('dragleave', function (e) {
            e.preventDefault();
            uploadArea.style.backgroundColor = '#f8f9ff';
            uploadArea.style.borderColor = '#667eea';
        });

        uploadArea.addEventListener('drop', function (e) {
            e.preventDefault();
            uploadArea.style.backgroundColor = '#f8f9ff';
            uploadArea.style.borderColor = '#667eea';

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                fileInput.files = files;
                updateUploadArea(files[0]);
            }
        });

        // File input change handler
        fileInput.addEventListener('change', function (e) {
            if (e.target.files.length > 0) {
                updateUploadArea(e.target.files[0]);
            }
        });

        function updateUploadArea(file) {
            const icon = uploadArea.querySelector('i');
            const title = uploadArea.querySelector('h3');
            const description = uploadArea.querySelector('p');

            icon.className = 'fas fa-check-circle';
            icon.style.color = '#28a745';
            title.textContent = 'File Selected!';
            description.textContent = file.name;
        }
    }

    // Gallery image lightbox effect
    const galleryImages = document.querySelectorAll('.photo img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function () {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${this.src}" alt="${this.alt}">
                    <div class="lightbox-caption">${this.alt}</div>
                </div>
            `;

            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            // Close lightbox
            const closeBtn = lightbox.querySelector('.lightbox-close');
            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function (e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });

            function closeLightbox() {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            }
        });
    });
});
