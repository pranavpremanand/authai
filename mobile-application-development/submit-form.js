// Function to handle form submission
function handleSubmitForm(event) {
  event.preventDefault(); // Prevent default form submission

  // Get form values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (
    name.trim() === "" ||
    email.trim() === "" ||
    phone.trim() === "" ||
    message.trim() === "" ||
    subject.trim() === ""
  ) {
    return;
  }

  const btn = document.getElementById("submit-btn");
  const successMessage = document.getElementById("success-message");
  const errorMessage = document.getElementById("error-message");

  btn.innerText = "Submitting";

  // If all validations pass, create the request body
  var emailBody = "Name: " + name + "\n\n";
  emailBody += "Phone Number: " + phone + "\n\n";
  emailBody += "Email: " + email + "\n\n";
  emailBody += "Message:\n" + message;
  // Construct the request payload
  var payload = {
    to: "authaisolutions@gmail.com",
    subject,
    body: emailBody,
  };

  // If you're actually calling an API, uncomment the following code
  // Use Fetch API to send the request to your API
  fetch("https://smtp-api-tawny.vercel.app/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        errorMessage.innerText = error;
        errorMessage.classList.remove("d-none");
        setTimeout(() => {
          errorMessage.classList.add("d-none");
        }, 2000);
      } else {
        successMessage.innerText = "Email sent successfully!";
        successMessage.classList.remove("d-none");
        setTimeout(() => {
          successMessage.classList.add("d-none");
        }, 2000);
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("subject").value = "";
      }
    })
    .catch((error) => {
      errorMessage.innerText = "Something went wrong. Please try again.";
      errorMessage.classList.remove("d-none");
      setTimeout(() => {
        errorMessage.classList.add("d-none");
      }, 2000);
    })
    .finally(() => {
      btn.innerText = "Submit";
    });
}
