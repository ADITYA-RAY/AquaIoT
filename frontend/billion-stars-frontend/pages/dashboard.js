import { useState, useEffect } from "react";
import Form from "../components/Form";
import api from "../api";

export default function Dashboard() {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    const JWT = sessionStorage.getItem("JWT");
    const email = sessionStorage.getItem("email");
    var temp = [];
    api
      .get(
        `sensors/getsensormaintainer/?email=${email}`,

        {
          headers: { Authorization: "Bearer " + JWT },
        }
      )
      .then((res) => {
        for (var id in res.data) {
          temp.push({
            id: id,
            city: res.data[id].city,
            location: res.data[id].location,
            installationDate: "23 March 2022",
          });
        }
        setSensors(temp);
      })
      .catch((err) => console.log(err.response));
  }, []);
  const [toggleForm, setToggleForm] = useState(false);
  const [newSensorData, setNewSensorData] = useState({
    id: "",
    city: "",
    location: "",
    installationDate: "",
  });
  const handleClick = () => setToggleForm(!toggleForm);
  return (
    <div className="flex flex-col shadow-lg mx-5 my-5 px-3 py-3">
      <div className="flex flex-row">
        <img
          src="https://www.w3schools.com/w3images/avatar6.png"
          alt="avatar"
          width={50}
          height={40}
          className="rounded-full mx-1"
        />
        <p className="font-bold text-gray-900 text-[2rem]">
          Welcome to Dashboard
        </p>
      </div>
      {/* <p
        className="font-bold text-gray text-[1.6rem] py-2 px-2 mb-5"
        style={{ borderLeft: "4px solid purple" }}
      >
        Your Sensors
      </p> */}
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 my-5">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Sensor Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    City
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    installation Date
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sensors.map((sensor) => (
                  <tr key={sensor.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {sensor.id}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{sensor.city}</div>
                      <div className="text-sm text-gray-500">
                        {sensor.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sensor.installationDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="p-10">
        <button
          onClick={handleClick}
          className="inline-block text-center bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700 float-right"
        >
          {toggleForm ? "Close" : "Add New Sensor"}
        </button>
      </div>
      <div className="px-5 mx-5 my-5 ">
        {toggleForm && <Form setData={setNewSensorData} data={newSensorData} />}
      </div>
    </div>
  );
}
