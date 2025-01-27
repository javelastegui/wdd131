const themeSelector = document.querySelector("#mode-select"); // replace with code to select dropdown element out of the HTML (Hint: document.querySelector)
function changeTheme() {
  const selectedTheme = themeSelector.value;
  const body = document.querySelector("body");
  const logo = document.querySelector(".logo");
  // check to see what the current value of our select is the current value is conveniently found in themeSelector.value!
  // if the value is dark then:
  if (selectedTheme == "dark") {
    body.classList.add("dark");
    logo.src = "byui-logo_white.png";
  } else {
    body.classList.remove("dark");
    logo.src = "byui-logo_blue.webp";
  }
  // add the dark class to the body
  // change the source of the logo img to point to the white logo.
  // otherwise
  // remove the dark class
  // make sure the logo src is the blue logo.
}

// add an event listener to the themeSelector element here.
// Use the changeTheme function as the event handler function.
themeSelector.addEventListener("change", changeTheme);
