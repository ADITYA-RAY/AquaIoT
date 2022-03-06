/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

import CityMap from "../components/CityMap";
import Graph from "../components/Graph";

import axios from "axios";
import api from "../api";

const cities = [
  {
    id: 1,
    name: "Raipur",
  },
  {
    id: 2,
    name: "Bhilai",
  },
  {
    id: 3,
    name: "Prayagraj",
  },
  {
    id: 4,
    name: "Hyderabad",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Map() {
  const [selected, setSelected] = useState(cities[0]);
  const [cityInfo, setCityInfo] = useState(null);
  const [sensorObj, setSensorObj] = useState(null);
  const [graphData, setGraphData] = useState(null);

  const handleClick = () => {
    //latitude longitude
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${selected.name}&limit=1&appid=61de9771b304e9d9cc581202de657234`
      )
      .then((res) => setCityInfo(res.data[0]))
      .catch((err) => console.log(err.response));

    //sensor data
    api
      .get(`sensors/getsensordata/?city=${selected.name}`)
      .then((res) => {
        console.log(res.data);
        if (!("status" in res.data)) setSensorObj(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="relative bg-gradient-to-r from-[#0f172a] to-[#112a64] overflow-hidden">
        <div>
          <div>
            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <>
                  <div className="grid grid-cols-1 gap-0  sm:grid-cols-4">
                    <div className="col-span-4 md:col-span-1 bg-[#0f172a] px-4 py-5">
                      {" "}
                      <Listbox.Label className="block text-sm font-medium text-white">
                        Select City
                      </Listbox.Label>
                      <div className="mt-1 relative">
                        <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <span className="flex items-center">
                            <span className="ml-3 block truncate">
                              {selected.name}
                            </span>
                          </span>
                          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <SelectorIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                            {cities.map((person) => (
                              <Listbox.Option
                                key={person.id}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "text-white bg-indigo-600"
                                      : "text-gray-900",
                                    "cursor-default select-none relative py-2 pl-3 pr-9"
                                  )
                                }
                                value={person}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <div className="flex items-center">
                                      <span
                                        className={classNames(
                                          selected
                                            ? "font-semibold"
                                            : "font-normal",
                                          "ml-3 block truncate"
                                        )}
                                      >
                                        {person.name}
                                      </span>
                                    </div>

                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? "text-white"
                                            : "text-indigo-600",
                                          "absolute inset-y-0 right-0 flex items-center pr-4"
                                        )}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                      <div className="pt-10 pb-10">
                        <button
                          onClick={handleClick}
                          className="inline-block text-center bg-indigo-600 border border-transparent rounded-md py-2 px-5 font-light text-white hover:bg-indigo-700 float-right"
                        >
                          fetch sensors
                        </button>
                      </div>
                      <br />
                      <p className="text-white font-medium text-[1.5rem]">
                        Index
                      </p>
                      <br />
                      <table className="table-auto text-white">
                        <tbody>
                          <tr>
                            <td style={{ width: "50px" }}>
                              <div
                                className="rounded-full"
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  backgroundColor: "red",
                                }}
                              ></div>
                            </td>
                            <td>
                              <strong>Poor</strong>, hazardous for marine life
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div
                                className="rounded-full"
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  backgroundColor: "yellow",
                                }}
                              ></div>
                            </td>
                            <td>
                              <strong>Satisfactory</strong>, needs to be checked
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div
                                className="rounded-full"
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  backgroundColor: "green",
                                }}
                              ></div>
                            </td>
                            <td>
                              <td>
                                <strong>Good</strong>, safe for marine life
                              </td>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-span-4 md:col-span-3">
                      <div className="pt-0 pb-0" style={{ height: "100vh" }}>
                        {cityInfo && (
                          <CityMap
                            latitude={cityInfo.lat}
                            longitude={cityInfo.lon}
                            sensorObj={sensorObj}
                            graphData={graphData}
                            setGraphData={setGraphData}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Listbox>
          </div>
        </div>
        {graphData && <Graph graphData={graphData} />}
      </div>
    </>
  );
}
