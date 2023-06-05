import Link from "next/link";
import React from "react";

const PageNotFound = () => {
  return (
    <section className="flex items-start h-100vh p-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-green-700">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">Page not found.</p>
          <Link href="/">
            <p className="px-8 py-3 font-semibold rounded dark:bg-green-400 dark:text-gray-900">
              Back to homepage
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
