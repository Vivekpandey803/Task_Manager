import icons from "@/env/icons";
import React from "react";
import Link from "next/link";

import "@/styles/header.styles.scss";
const Header = () => {
  return (
    <header className="row m-0 p-0">
      <div class="col-md-8">
        {" "}
        <img src={icons.LOGO} alt="logo" />
      </div>
      <div class="col-md-4 text-end d-flex">
        <div className="profile-container p2   ">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6069/6069202.png"
            className="profile-photo mx-3"
          />

          <Link href="/">
            <button className="btn btn-success " type="submit"  >
              Logout
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
