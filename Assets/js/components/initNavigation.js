const initNavigation = () => {
  const menuOpen = document.querySelector(".menuOpen");
  const menuClose = document.querySelector(".menuClose");
  const mobileMenu = document.querySelector(".mobileMenu");

  if (menuOpen && menuClose && mobileMenu) {
    menuOpen.addEventListener("click", function () {
      mobileMenu.classList.add("open");
      menuOpen.style.display = "none";
      menuClose.style.display = "flex";
    });

    menuClose.addEventListener("click", function () {
      mobileMenu.classList.remove("open");
      menuOpen.style.display = "flex";
      menuClose.style.display = "none";
    });
  }
};

export default initNavigation;
