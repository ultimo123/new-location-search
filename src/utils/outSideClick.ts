import React from "react";

export const clickOutside = (onclickIn: () => void, ref: any) => {
  const eventListener = (event: any) => {
    var myBox = ref;

    if (event.target.contains(myBox.target) && event.target !== myBox.target) {
      onclickIn();
      removeOnclick();
    } else {
    }
  };

  const addOnclick = () => {
    document.addEventListener("click", eventListener);
  };
  const removeOnclick = () => {
    document.removeEventListener("click", eventListener);
  };
  return {
    addOnclick,
    removeOnclick,
  };
};
