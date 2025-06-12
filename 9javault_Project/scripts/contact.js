document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("user-email").value.trim();
    const messageBox = document.getElementById("confirmation-message");

    messageBox.textContent = `Thank you! We will get back to you via ${email}.`;
    
    // Optionally, reset the form
    this.reset();
});

