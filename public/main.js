const sidebarToggle = document.querySelector(".sidebar-toggle");
const sidebar = document.querySelector("aside");
const closeBtn = document.querySelector(".close-btn");

sidebarToggle.addEventListener("click", function () {
  console.log("haha");
  sidebar.classList.toggle("show-sidebar");
  console.log(sidebar.classList.contains("show-sidebar"));
});
closeBtn.addEventListener("click", function () {
  sidebar.classList.toggle("show-sidebar");
});

// ------------------------ button switch and night mode ---------------------------
const switchButton = document.querySelector(".switch-btn");
const inputs = document.querySelectorAll(".input");
const boxes = document.querySelectorAll(".services .box");
const slider = document.querySelector(".sidebar");
const socialIcons = document.querySelector(".social-icons");
const profileImg = document.querySelector(".me img");
const header = document.querySelector("header");
const footer = document.querySelector("footer");

var r = document.querySelector(":root");
function myFunction_get() {
  // Get the styles (properties and values) for the root
  var rs = getComputedStyle(r);
  // Alert the value of the --blue variable
  console.log(
    "The value of --theme-color is: " + rs.getPropertyValue("--theme-color")
  );
}
// Create a function for setting a variable value
function myFunction_set(color) {
  // Set the value of variable --blue to another value (in this case "lightblue")
  r.style.setProperty("--theme-color", color);
}

switchButton.addEventListener("click", function () {
  if (switchButton.classList.contains("slide")) {
    // make it light
    switchButton.classList.remove("slide");
    document.body.classList.remove("night-body");
    document.body.classList.remove("night-text");
    inputs.forEach(function (input) {
      input.classList.remove("night-input");
    });
    boxes.forEach(function (box) {
      box.classList.remove("night-card");
    });
    slider.classList.remove("night-card");
    slider.classList.remove("night-shadow-sidebar");
    socialIcons.classList.remove("night-card");
    profileImg.classList.remove("night-shadow");
    header.classList.remove("night-header");
    footer.classList.remove("night-footer");

    myFunction_set("white");
    myFunction_get();
  } else {
    // make it night
    switchButton.classList.add("slide");
    document.body.classList.add("night-body");
    document.body.classList.add("night-text");
    inputs.forEach(function (input) {
      input.classList.add("night-input");
    });
    boxes.forEach(function (box) {
      box.classList.add("night-card");
    });
    slider.classList.add("night-card");
    slider.classList.add("night-shadow-sidebar");
    socialIcons.classList.add("night-card");
    profileImg.classList.add("night-shadow");
    header.classList.add("night-header");
    footer.classList.add("night-footer");
    myFunction_set("black");
    myFunction_get();
  }
});

const nameError = document.querySelector("#name ~ div");
const emailError = document.querySelector("#email ~ div");
const phoneError = document.querySelector("#phone ~ div");
const messageError = document.querySelector("#message ~ div");
const sumbit = document.getElementById("submit");
sumbit.addEventListener("click", validate);

// --------------- form validation ----------------
function validate() {
  console.log("submit");
  event.preventDefault();
  // ----------------------- name validation -----------------------
  const name = document.getElementById("name").value;
  if ((name.length < 3 && name.length > 0) || name.length > 10) {
    showMessage(
      nameError,
      "Your name must be more than 3 charachters and more less 10",
      "invalid"
    );
  } else if (name.length == 0) {
    showMessage(nameError, "Name is required", "invalid");
  } else {
    showMessage(nameError, "valid", "valid");
  }

  // ----------------------- email validation -----------------------
  const email = document.getElementById("email").value;
  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (email.match(pattern) && email.length != 0)
    showMessage(emailError, "valid", "valid");
  else {
    showMessage(emailError, "email is not valid", "invalid");
  }

  // --------------------- phone validation -----------------------
  const phone = document.getElementById("phone").value;
  if (phone.length == 0) {
    showMessage(phoneError, "Phone number is required", "invalid");
  } else if (!phone.startsWith("777") || phone.length != 9) {
    showMessage(
      phoneError,
      "Phone number must start with 777 and be 9 numbers long",
      "invalid"
    );
  } else {
    showMessage(phoneError, "valid", "valid");
  }

  // ----------------------- message validation -----------------------
  const messageLength = document.getElementById("message").value.length;
  console.log(messageLength);
  if (messageLength == 0) {
    showMessage(messageError, "The message is neccessary", "invalid");
  } else if (messageLength < 20 && messageLength > 0) {
    showMessage(
      messageError,
      "The message must be more than 20 charachters",
      "invalid"
    );
    messageError.innerText = "The message must be more than 20 charachters";
  } else {
    showMessage(messageError, "valid", "valid");
  }
}

function showMessage(element, message, state) {
  element.innerText = message;
  element.classList.add(state);
}

// ---------------- image effect ------------------
const images = document.querySelectorAll(".card");
console.log(images);
images.forEach(function (image) {
  image.addEventListener("mouseenter", function () {
    image.classList.add("card-hover");
  });
  image.addEventListener("mouseleave", function () {
    image.classList.remove("card-hover");
  });
});
document.addEventListener("mouseleave");
