import { getUrlParameter } from "../helpers";

const initFormHandler = () => {
  // Standard form handler
  var formButton = document.querySelector(".submitFormButton");

  if (formButton) {
    formButton.removeAttribute("disabled");
    formButton.classList.remove("disabled");
  }

  const forms = Array.prototype.slice.call(
    document.querySelectorAll(".validation form"),
  );

  forms.forEach((form) => {
    form.setAttribute("novalidate", true);
    form.addEventListener("submit", function (event) {
      if (form.checkValidity() === false) {
        form.classList.add("not-valid");

        event.preventDefault();
        event.stopPropagation();
      }
    });
  });
};

export default initFormHandler;
