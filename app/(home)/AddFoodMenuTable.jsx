"use client";
import React, { useState, useEffect } from "react";

const AddFoodMenuTable = () => {
  const [itemState, setItemState] = useState([
    {
      foodName: "",
      price: "",
      description: "",
    },
  ]);

  const handleClick = () => {
    itemState.items.push({
      foodName: "",
      price: "",
      description: "",
    });
    setItemState({
      items: itemState.items,
    });
  };

  const handleItemDeleted = (i) => {
    itemState.items.splice(i, 1);
    setItemState({
      items: itemState.items,
    });

    computeTotals();
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate">
              Food Menu
            </h5>
            <table className="min-w-full my-5">
              <thead className="bg-white border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm  text-gray-900 px-6 py-4 text-left"
                  >
                    Food Name
                  </th>
                  <th
                    scope="col"
                    className="text-sm  text-gray-900 px-6 py-4 text-left"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="text-sm  text-gray-900 px-6 py-4 text-left"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="text-sm  text-gray-900 px-6 py-4 text-left"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {itemState.map((o, i) => {
                  return (
                    <tr key={"item-" + i} className="bg-white border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900">
                        <input
                          id="loadname"
                          type="text"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                          value={o.loadname}
                          onChange={(e) => handleItemChanged(e, i, "loadname")}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900">
                        <input
                          id="userqty"
                          type="number"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                          value={o.userqty}
                          onChange={(e) => handleItemChanged(e, i, "userqty")}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900">
                        <input
                          id="wattage"
                          type="number"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                          value={o.wattage}
                          onChange={(e) => handleItemChanged(e, i, "wattage")}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900">
                        <button
                          onClick={(index) => handleItemDeleted(i)}
                          className={
                            i === 0
                              ? "block px-5 py-2 mt-4  leading-5 text-center text-white capitalize rounded-lg bg-gray-200 lg:mt-0 lg:w-auto"
                              : "block px-5 py-2 mt-4  leading-5 text-center text-white capitalize rounded-lg lg:mt-0 lg:w-auto bg-blue-600 hover:bg-blue-500"
                          }
                          disabled={i === 0}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-end">
              <button
                type="button"
                className="text-white bg-emerald-700 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                onClick={handleClick}
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFoodMenuTable;
