document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.getElementById('picture-container');

    const imageContent = `
        <div class="image-container">
            <img src="./specific-components/picture-containet-for-front-page/background-picture.jpg" 
                 alt="Description of the image">
        </div>
    `;

    imageContainer.innerHTML = imageContent;
});
