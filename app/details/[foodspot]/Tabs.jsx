import React from "react";

const Tabs = () => {
  return (
    <>
      <div className="mt-2 bg-white rounded-lg shadow dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="mr-2" role="presentation">
            <button
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              id="profile-tab-example"
              type="button"
              role="tab"
              aria-controls="profile-example"
              aria-selected="false"
            >
              Profile
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              id="dashboard-tab-example"
              type="button"
              role="tab"
              aria-controls="dashboard-example"
              aria-selected="false"
            >
              Dashboard
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              id="settings-tab-example"
              type="button"
              role="tab"
              aria-controls="settings-example"
              aria-selected="false"
            >
              Settings
            </button>
          </li>
          <li role="presentation">
            <button
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              id="contacts-tab-example"
              type="button"
              role="tab"
              aria-controls="contacts-example"
              aria-selected="false"
            >
              Contacts
            </button>
          </li>
        </ul>

        <div className="m-2" id="tabContentExample">
          <div
            className=" p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
            id="profile-example"
            role="tabpanel"
            aria-labelledby="profile-tab-example"
          >
            <p className="pb-6">
              Advantage old had otherwise sincerity dependent additions. It in
              adapted natural hastily is justice. Six draw you him full not mean
              evil. Prepare garrets it expense windows shewing do an. She
              projection advantages resolution son indulgence. Part sure on no
              long life am at ever. In songs above he as drawn to. Gay was
              outlived peculiar rendered led six.
            </p>
          </div>
          <div
            className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
            id="dashboard-example"
            role="tabpanel"
            aria-labelledby="dashboard-tab-example"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is some placeholder content the{" "}
              <strong className="font-medium text-gray-800 dark:text-white">
                Dashboard tab's associated content
              </strong>
              . Clicking another tab will toggle the visibility of this one for
              the next. The tab JavaScript swaps classes to control the content
              visibility and styling.
            </p>
          </div>
          <div
            className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
            id="settings-example"
            role="tabpanel"
            aria-labelledby="settings-tab-example"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is some placeholder content the{" "}
              <strong className="font-medium text-gray-800 dark:text-white">
                Settings tab's associated content
              </strong>
              . Clicking another tab will toggle the visibility of this one for
              the next. The tab JavaScript swaps classes to control the content
              visibility and styling.
            </p>
          </div>
          <div
            className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
            id="contacts-example"
            role="tabpanel"
            aria-labelledby="contacts-tab-example"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This is some placeholder content the{" "}
              <strong className="font-medium text-gray-800 dark:text-white">
                Contacts tab's associated content
              </strong>
              . Clicking another tab will toggle the visibility of this one for
              the next. The tab JavaScript swaps classes to control the content
              visibility and styling.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
