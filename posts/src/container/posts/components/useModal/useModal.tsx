import { useState } from "react";

const useModal = () => {
  //make useModal custom component

  const [isShowing, seIsShowig] = useState<any>(false);

  function toggle() {
    seIsShowig(!isShowing);
  }
  return {
    isShowing,
    toggle,
  };
};
export default useModal;
