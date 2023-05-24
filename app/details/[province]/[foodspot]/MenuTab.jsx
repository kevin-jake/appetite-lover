import React from "react";

const MenuTab = () => {
  return (
    <section className="mt-4 bg-white">
      <div className="text-left">
        <h4 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          Menu
        </h4>
      </div>
      <div className="container w-full px-5 py-6 mx-auto">
        <div className="grid lg:grid-cols-4 gap-y-6">
          <div className="max-w-xs mx-4 mb-2 rounded-lg shadow-lg">
            <img
              className="w-full h-48"
              src="https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_960_720.jpg"
              alt="Image"
            />
            <div className="px-6 py-4">
              <div className="flex mb-2">
                <span className="px-4 py-0.5 text-sm bg-red-500 rounded-full text-red-50">
                  Seafood
                </span>
              </div>
              <h4 className="mb-3 text-xl font-semibold tracking-tight text-green-600 uppercase">
                salmon fish 1 seafood
              </h4>
              <p className="leading-normal text-gray-700">
                Lorem ipsum dolor, sit amet cons ectetur adipis icing elit.
              </p>
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="text-xl text-green-600">$40.12</span>
            </div>
          </div>
          <div className="max-w-xs mx-4 mb-2 rounded-lg shadow-lg">
            <img
              className="w-full h-48"
              src="https://cdn.pixabay.com/photo/2010/12/13/10/25/canape-2802_960_720.jpg"
              alt="Image"
            />
            <div className="px-6 py-4">
              <div className="flex mb-2">
                <span className="px-4 py-0.5 text-sm bg-pink-500 rounded-full text-pink-50">
                  Seafood
                </span>
              </div>
              <h4 className="mb-3 text-xl font-semibold tracking-tight text-green-600 uppercase">
                salmon fish 2 seafood
              </h4>
              <p className="leading-normal text-gray-700">
                Lorem ipsum dolor, sit amet cons ectetur adipis icing elit.
              </p>
            </div>
            <div className="flex items-center justify-between p-4">
              <button className="px-4 py-2 bg-green-600 text-green-50">
                Order Now
              </button>
              <span className="text-xl text-green-600">$40.12</span>
            </div>
          </div>

          <div className="max-w-xs mx-4 mb-2 rounded-lg shadow-lg">
            <img
              className="w-full h-48"
              src="https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_960_720.jpg"
              alt="Image"
            />
            <div className="px-6 py-4">
              <div className="flex mb-2">
                <span className="px-4 py-0.5 text-sm bg-red-500 rounded-full text-red-50">
                  Seafood
                </span>
              </div>
              <h4 className="mb-3 text-xl font-semibold tracking-tight text-green-600 uppercase">
                salmon fish 3 seafood
              </h4>
              <p className="leading-normal text-gray-700">
                Lorem ipsum dolor, sit amet cons ectetur adipis icing elit.
              </p>
            </div>
          </div>

          <div className="max-w-xs mx-4 mb-2 rounded-lg shadow-lg">
            <img
              className="w-full h-48"
              src="https://cdn.pixabay.com/photo/2015/10/02/15/59/olive-oil-968657_960_720.jpg"
              alt="Image"
            />
            <div className="px-6 py-4">
              <div className="flex mb-2">
                <span className="px-4 py-0.5 text-sm bg-pink-500 rounded-full text-pink-50">
                  Tea
                </span>
              </div>
              <h4 className="mb-3 text-xl font-semibold tracking-tight text-green-600 uppercase">
                Fresh Tea
              </h4>
              <p className="leading-normal text-gray-700">
                Lorem ipsum dolor, sit amet cons ectetur adipis icing elit.
              </p>
            </div>
            <div className="flex items-center justify-between p-4">
              <button className="px-4 py-2 bg-green-600 text-green-50">
                Order Now
              </button>
              <span className="text-xl text-green-600">$4.00</span>
            </div>
          </div>
          <div className="max-w-xs mx-4 mb-2 rounded-lg shadow-lg">
            <img
              className="w-full h-48"
              src="https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_960_720.jpg"
              alt="Image"
            />
            <div className="px-6 py-4">
              <div className="flex mb-2">
                <span className="px-4 py-0.5 text-sm bg-red-500 rounded-full text-red-50">
                  Seafood
                </span>
              </div>
              <h4 className="mb-3 text-xl font-semibold tracking-tight text-green-600 uppercase">
                salmon fish 3 seafood
              </h4>
              <p className="leading-normal text-gray-700">
                Lorem ipsum dolor, sit amet cons ectetur adipis icing elit.
              </p>
            </div>
            <div className="flex items-center justify-between p-4">
              <button className="px-4 py-2 bg-green-600 text-green-50">
                Order Now
              </button>
              <span className="text-xl text-green-600">$50.12</span>
            </div>
          </div>

          <div className="max-w-xs mx-4 mb-2 rounded-lg shadow-lg">
            <img
              className="w-full h-48"
              src="https://cdn.pixabay.com/photo/2015/10/02/15/59/olive-oil-968657_960_720.jpg"
              alt="Image"
            />
            <div className="px-6 py-4">
              <div className="flex mb-2">
                <span className="px-4 py-0.5 text-sm bg-pink-500 rounded-full text-pink-50">
                  Tea
                </span>
              </div>
              <h4 className="mb-3 text-xl font-semibold tracking-tight text-green-600 uppercase">
                Fresh Tea
              </h4>
              <p className="leading-normal text-gray-700">
                Lorem ipsum dolor, sit amet cons ectetur adipis icing elit.
              </p>
            </div>
            <div className="flex items-center justify-between p-4">
              <button className="px-4 py-2 bg-green-600 text-green-50">
                Order Now
              </button>
              <span className="text-xl text-green-600">$4.00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuTab;
