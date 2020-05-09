import React from "react";
interface RefresherProps {
    secret: string;
    children?: any;
    store: any;
}
declare const Refresher: React.FunctionComponent<RefresherProps>;
export default Refresher;
