import GLightbox from "glightbox";

const initGallery = () => {
  const lightbox = GLightbox({
    selector: ".glightbox",
    touchNavigation: true,
    loop: true,
    zoomable: true,
  });

  console.log("glightbox");
};

export default initGallery;
