import axios from "axios";

const screenWidth = () => {
  var screenWidthValue =
    typeof window !== "undefined" ? window.innerWidth : null;

  return screenWidthValue;
};

export { screenWidth };

const isInView = (element) => {
  var elementTop = element.offset().top;
  var elementBottom = elementTop + element.outerHeight();

  var viewportTop = $(window).scrollTop() - 100;
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

export { isInView };

const leadingZero = (number, max) => {
  number = number.toString();
  return number.length < max ? leadingZero("0" + number, max) : number;
};

export { leadingZero };

const getUrlParameter = (param) => {
  var pageUrl = window.location.search.substring(1),
    urlVariables = pageUrl.split("&"),
    parameterName,
    i;

  for (i = 0; i < urlVariables.length; i++) {
    parameterName = urlVariables[i].split("=");

    if (parameterName[0] === param) {
      return parameterName[1] === undefined
        ? true
        : decodeURIComponent(parameterName[1]);
    }
  }
  return false;
};

export { getUrlParameter };

const dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export { dataURLtoFile };

const addHttp = (url) => {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = "http://" + url;
  }

  return url;
};

export { addHttp };

const dateFormatter = (date) => {
  var dateChange = new Date(date);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var day = ("0" + dateChange.getDate()).slice(-2);
  var month = monthNames[dateChange.getMonth()];
  var newDate = day + " " + month + " " + dateChange.getFullYear();

  return newDate;
};

export { dateFormatter };

// ---
// Sticky sidebar for the Legal Documents pages
// ---

const updateStickyPosition = (stickyElem, currStickyPos, endPoint, containerTop) => {
  if (window.pageYOffset > currStickyPos && window.pageYOffset < endPoint) {
    stickyElem.style.position = "fixed";
    stickyElem.style.top = "0px";
  } else {
    stickyElem.style.position = "absolute";
    stickyElem.style.top = (window.pageYOffset > endPoint) ? Math.round(endPoint) + "px" : containerTop + "px";
  }
};

const calculateDimensions = (stickyElem) => {
  const legalPage = document.querySelector(".legal-page");
  const legalStickyCol = document.querySelector(".legal-sticky-col");

  return {
    endPoint: legalPage.offsetTop + legalPage.offsetHeight - stickyElem.offsetHeight - 60,
    containerTop: legalStickyCol.offsetTop - 3,
    containerWidth: legalStickyCol.offsetWidth - 24
  };
};

const makeStickyLegalPageMenu = () => {
  const stickyElem = document.querySelector(".sticky");
  const currStickyPos = stickyElem.getBoundingClientRect().top + window.pageYOffset;

  const updateDimensions = () => {
    const { endPoint, containerTop, containerWidth } = calculateDimensions(stickyElem);
    stickyElem.style.width = containerWidth + "px";
    updateStickyPosition(stickyElem, currStickyPos, endPoint, containerTop);
  };

  window.onscroll = updateDimensions;
  window.onresize = updateDimensions;
  updateDimensions(); // Initial call to set everything correctly
};


export { makeStickyLegalPageMenu };
