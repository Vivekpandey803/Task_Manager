import icons from "@/env/icons";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/global.scss";
import Link from "next/link";
import pageRoutes from "@/util/PageRoutes";
const Header = () => {
  return (
    <header className="row">
      <div class="col-md-8">
        {" "}
        <img src={icons.LOGO} alt="logo"  />
      </div>
      <div class="col-md-4 text-end mt-6">
      


        <Link href={pageRoutes.SIGN_IN_PAGE()}>
          <button className="btn btn-primary mt-3 m-2" type="submit">
            Login
          </button>
        </Link>

        <Link href="/SignUp">
          <button className="btn btn-success mt-3 m-2"  type="submit">
            Sign Up
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;