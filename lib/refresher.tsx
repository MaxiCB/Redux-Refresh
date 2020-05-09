import React from "react";
import { initRefresh } from "../dist/index";
import { Provider } from "react-redux";

interface RefresherProps {
  secret: string;
  children?: any;
  store: any;
}

const Refresher: React.FunctionComponent<RefresherProps> = ({
  secret,
  children,
  store,
}) => {
  const refresh = initRefresh(secret);

  let init = store();

  let res = <Provider store={init}>{children}</Provider>;
  let test: any;

  window.addEventListener("unload", () => {
    init = store();
    test = init.getState();
    const state = init.getState();
    console.log("Unload State: ", state);
    const enc = refresh.encrypt(state);
    console.log("Encrypt: ", enc);
    window.localStorage.setItem("redux-refresh", enc);
  });
  window.addEventListener("load", () => {
    const enc = window.localStorage.getItem("redux-refresh")!;
    console.log("Test: ", test);
    console.log("Enc: ", enc);
    const dec = refresh.decrypt(enc);
    console.log("Decrypt: ", dec);
    const decrypt = store(dec);
    console.log("Decrypt State: ", decrypt.getState());
    res = <Provider store={decrypt}>{children}</Provider>;
    // window.localStorage.removeItem("redux-refresh");
  });

  return res;
};

export default Refresher;
