import { useState } from "react";
// import DiscountBanner from "../Home/DiscountBanner";

import Navbar from "./Navbar";

export default function Layout({ children, childrenClasses }) {
  const [drawer, setDrawer] = useState(false);

  return (
    <>
      <div className="w-full overflow-x-hidden">
        <Navbar drawerAction={() => setDrawer(!drawer)} />
        <div className={`w-full  ${childrenClasses || "pt-[30px] pb-[60px]"}`}>
          {children && children}
        </div>
      </div>
    </>
  );
}
