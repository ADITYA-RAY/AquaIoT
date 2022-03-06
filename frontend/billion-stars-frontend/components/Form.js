import React from "react";
import api from "../api";
const Form = ({ data, setData }) => {
  const handleClick = () => {
    setData({ city: "", location: "" });
    console.log(data);
    data["email"] = sessionStorage.getItem("email");

    const JWT = sessionStorage.getItem("JWT");

    api
      .post("sensors/registersensor/", data, {
        headers: { Authorization: "Bearer " + JWT },
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          alert("Sensor added sucessfully");
        }
      })
      .catch((err) => console.log(err.response));
  };
  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      <p
        className="font-bold text-gray text-[1.6rem] py-2 px-2 mb-5"
        style={{ borderLeft: "4px solid purple" }}
      >
        Fill Sensor Information
      </p>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              {/* <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="SensorId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sensor Id
                </label>
                <input
                  type="text"
                  name="SensorId"
                  value={data.id}
                  onChange={(e) => setData({ ...data, id: e.target.value })}
                  id="SensorId"
                  autoComplete="off"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  htmlFor="Installation-date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Installation Date
                </label>
                <input
                  type="date"
                  name="Installation-date"
                  value={data.installationDate}
                  onChange={(e) =>
                    setData({ ...data, installationDate: e.target.value })
                  }
                  id="Installation-date"
                  autoComplete="off"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div> */}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City name
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={data.city}
                  onChange={(e) => setData({ ...data, city: e.target.value })}
                  autoComplete="off"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={data.location}
                  onChange={(e) =>
                    setData({ ...data, location: e.target.value })
                  }
                  id="location"
                  autoComplete="off"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              onClick={handleClick}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
