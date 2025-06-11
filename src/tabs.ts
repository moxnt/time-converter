let controls = document.querySelectorAll("[data-controls-id]");
controls.forEach((element) => {
  element.addEventListener("click", () => {
    let previous = document.getElementsByClassName("active");
    let previousControl = document.getElementsByClassName("selected");
    let next = document.getElementById(
      element.getAttribute("data-controls-id") ?? "tab1",
    );

    previous.item(0)?.classList.remove("active");
    previousControl.item(0)?.classList.remove("selected");

    next?.classList.add("active");
    element.classList.add("selected");
  });
});
