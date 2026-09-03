export default Document.prototype.ready = (fn) => {
  if (fn && typeof fn === "function") {
    document.addEventListener("DOMContentLoaded", () => {
      if (
        document.readyState === "interactive" ||
        document.readyState === "complete"
      ) {
        return fn();
      }
    });
  }
};
