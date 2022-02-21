const navUl = document.querySelector(".nav-ul");

changeNavStatus = () => {
  if (navUl.id === "active-ul") {
    navUl.id = "";
  } else {
    navUl.id = "active-ul";
  }
};

window.addEventListener(
  "keydown",
  function (e) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  },
  false
);
