import checkNumInputs from "./checkNumInputs.js";

const changeModalState = (state) => {
  const windowForm = document.querySelectorAll(".balcon_icons_img");
  const windowWidth = document.querySelectorAll("#width");
  const windowHeight = document.querySelectorAll("#height");
  const windowType = document.querySelectorAll("#view_type");
  const windowProfile = document.querySelectorAll(".checkbox");

  checkNumInputs("#width");
  checkNumInputs("#height");

  function bindActionsToElems(event, elem, prop) {
    elem.forEach((item, i) => {
      item.addEventListener(event, () => {
        switch (item.nodeName) {
          case "SPAN":
            state[prop] = i;
            break;
          case "INPUT":
            if (item.getAttribute("type") === "checkbox") {
              i === 0 ? (state[prop] = "Холодное") : (state[prop] = "Теплое");
              elem.forEach((box, j) => {
                box.checked = false;
                if (i == j) {
                  box.checked = true;
                }
              });
            }else{
               state[prop] = item.value
            }
            break;
          case "SELECT":
            state[prop] = item.value
            break;
        }
      });
    });
  }

  bindActionsToElems("click", windowForm, "form");
  bindActionsToElems("input", windowHeight, "height");
  bindActionsToElems("input", windowWidth, "width");
  bindActionsToElems("change", windowType, "type");
  bindActionsToElems("change", windowProfile, "profile");
};

export default changeModalState;
