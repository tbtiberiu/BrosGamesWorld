let navUl = document.querySelector(".nav-ul");
changeNavStatus = () => {
  if (navUl.id === "active-ul") {
    navUl.id = "";
  } else {
    navUl.id = "active-ul";
  }
};
