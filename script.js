const colorButton = document.getElementById('colorButton');

colorButton.addEventListener('mouseenter', () => {
    // Change the button's text color when the mouse hovers over it
    colorButton.style.color = '#3498db';
});

colorButton.addEventListener('mouseleave', () => {
    // Restore the button's text color when the mouse leaves
    colorButton.style.color = '#ffffff';
});

const myForm = document.getElementById('myForm');
const modal = document.getElementById('myModal');
const closeModal = document.querySelector('.close');

myForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // Show the modal
    modal.style.display = 'block';
});

closeModal.addEventListener('click', function () {
    // Close the modal
    modal.style.display = 'none';
});
