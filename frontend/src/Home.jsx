import React from "react";

function Home() {
  return (
    <>
      Medical Info App
      <div className="hidden lg:flex lg:flex-1 lg">
        <a
          href="/login"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Log in <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </>
  );
}

export default Home;
