import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Suspense } from "react";
import HomeFooter from "./HomeFooter";
import NavbarHeader from "./NavbarHeader";
import HomeHeader from "./HomeHeader";
//header snd footer

export default function Layout() {
  return (
    <>
      <NavbarHeader />
      <main style={{ height: "100vh" }}>
        <Suspense fallback={<div>Loading..</div>}>
          <Outlet />
        </Suspense>
      </main>
      {/*<HomeFooter />*/}
    </>
  );
}
