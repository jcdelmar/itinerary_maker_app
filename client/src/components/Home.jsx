import React, { useEffect, useState } from "react";
import Modal from "react-overlays/Modal";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Home() {
  const [savedItinerary, setSavedItinerary] = useState([]);
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [notes, setNotes] = useState("");
  const [inputValidation, setInputValidation] = useState({
    title: false,
    destination: false,
    departure: false,
    arrival: false,
    notes: false,
    savedItinerary: false,
  });

  const [titleValidate, setTitleValidate] = useState(false);
  const [destinationValidate, setDestinationValidate] = useState(false);
  const [departureValidate, setDepartureValidate] = useState(false);
  const [arrivalValidate, setArrivalValidate] = useState(false);
  const [notesValidate, setNotesValidate] = useState(false);

  const [invalidClass, setInvalidClass] = useState(
    "bg-red-50 border border-red-500 text-red-900 placeholder-red-700"
  );
  //modal variables
  const [isViewing, setIsViewing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setTodos([]);
  };
  const renderBackdrop = (props) => <div className="backdrop" {...props} />;

  //todo variables
  const [startTime, setStartTime] = useState("12:00 am");
  const [endTime, setEndTime] = useState("12:00 am");
  const [todoTitle, setTodoTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [timeOptions, setTimeOptions] = useState([
    "12:00 am",
    "12:30 am",
    "1:00 am",
    "1:30 am",
    "2:00 am",
    "2:30 am",
    "3:00 am",
    "3:30 am",
    "4:00 am",
    "4:30 am",
    "5:00 am",
    "5:30 am",
    "6:00 am",
    "6:30 am",
    "7:00 am",
    "7:30 am",
    "8:00 am",
    "8:30 am",
    "9:00 am",
    "9:30 am",
    "10:00 am",
    "10:30 am",
    "11:00 am",
    "11:30 am",
    "12:00 am",
    "12:30 am",
    "12:00 pm",
    "12:30 pm",
    "1:00 pm",
    "1:30 pm",
    "2:00 pm",
    "2:30 pm",
    "3:00 pm",
    "3:30 pm",
    "4:00 pm",
    "4:30 pm",
    "5:00 pm",
    "5:30 pm",
    "6:00 pm",
    "6:30 pm",
    "7:00 pm",
    "7:30 pm",
    "8:00 pm",
    "8:30 pm",
    "9:00 pm",
    "9:30 pm",
    "10:00 pm",
    "10:30 pm",
    "11:00 pm",
    "11:30 pm",
  ]);

  const addTodo = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        todoStart: startTime,
        todoEnd: endTime,
        todoTitle: todoTitle,
      },
    ]);
  };

  const [dayData, setDayData] = useState([]);
  const [dayTodos, setDayTodos] = useState([]);

  const addDay = () => {
    console.log("adding day data");
    setDayTodos([...dayTodos, todos]);

    //clearing modal
    setTodos([]);

    handleClose();
  };

  const handleSave = (e) => {
    e.preventDefault();
    title == "" ? setTitleValidate(true) : setTitleValidate(false);
    destination == ""
      ? setDestinationValidate(true)
      : setDestinationValidate(false);
    departure == "" ? setDepartureValidate(true) : setDepartureValidate(false);
    arrival == "" ? setArrivalValidate(true) : setArrivalValidate(false);
    notes == "" ? setNotesValidate(true) : setNotesValidate(false);

    if (title == "" || destination == "" || departure == "" || arrival == "") {
      alert("Please input on all required fields.");
    } else {
      let insertURL = "http://localhost:3000/api/itinerary/";
      let data = {
        title: title,
        destination: destination,
        departure: departure,
        arrival: arrival,
        is_deleted: false,
        notes: notes,
      };
      const insertItinerary = axios
        .post(insertURL, data)
        .then((res) => {
          console.log("Itinerary inserted.");
          window.location.reload(false);
        })
        .catch((err) => {
          console.log("insert error");
          console.log(err);
        });
    }
  };

  const handleDelete = () => {
    console.log("del");
  };

  const handlePrint = () => {
    console.log("pr");
  };

  useEffect(() => {
    let itineraryURL = "http://localhost:3000/api/itinerary/";
    axios
      .get(itineraryURL)
      .then((res) => {
        setSavedItinerary(res.data);
        console.log("res");
        console.log(res);
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log("saved items");
    console.log(savedItinerary);
  }, [savedItinerary]);

  return (
    <div className="bg-primary h-screen">
      <header className="bg-primary p-5">
        <div className="bg-primary my-5 w-full flex flex-col justify-center  space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <main className=" flex flex-col  bg-primary md:w-1/4 lg:w-1/4 px-5 py-5  justify-center ">
            <div className="text-center ">
              <span className="text-9xl md:text-8xl autone  ">Suroy!</span>
            </div>
            <div className="text-center ">
              <span className=" text-1xl md:text-md font-mono text-center">
                Travel Itinerary
              </span>
            </div>
          </main>
          <aside className="bg-primary md:w-2/5 lg:w-2/4 px-5 py-5">
            <form className="">
              <div className="mt-2 sm:w-full md:w-2/3 md:ml-8">
                <label className="block mb-2 text-sm font-thin text-darkin">
                  * - required
                </label>
                <label className="block mb-2 text-sm font-medium text-darkin">
                  Saved Itineraries
                </label>
                <select
                  id="savedItineraries"
                  className="block w-full p-2 text-gray-900 border border-darkin rounded-lg bg-gray-50 text-sm "
                >
                  <option value="new" className="text-darkin text-md">
                    - New Itinerary -
                  </option>
                  {savedItinerary.map((row, index) => (
                    <option value={row.id} key={row.id}>
                      {row.itinerary_id + " - " + row.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-2 sm:w-full md:w-2/3 md:ml-8">
                <label className="block mb-2 text-sm font-medium text-darkin">
                  * Title
                </label>
                <input
                  type="text"
                  id="title"
                  className={
                    `block w-full p-2 text-gray-900 border border-darkin rounded-lg bg-gray-50 text-sm ` +
                    (titleValidate ? invalidClass : "")
                  }
                  required
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
              </div>
              <div className="mt-2 sm:w-full md:w-2/3 md:ml-8">
                <label className="block mb-2 text-sm font-medium text-darkin">
                  * Destination
                </label>
                <input
                  type="text"
                  id="destination"
                  className={
                    `block w-full p-2 text-gray-900 border border-darkin rounded-lg bg-gray-50 text-sm ` +
                    (destinationValidate ? invalidClass : "")
                  }
                  onChange={(event) => {
                    setDestination(event.target.value);
                  }}
                  required
                />
              </div>
              <div className="mt-2 sm:w-full md:w-2/3 md:ml-8">
                <label className="block mb-2 text-sm font-medium text-darkin">
                  * Arrival
                </label>
                <input
                  type="date"
                  id="arrival"
                  className={
                    `block w-full p-2 text-gray-900 border border-darkin rounded-lg bg-gray-50 text-sm ` +
                    (arrivalValidate ? invalidClass : "")
                  }
                  onChange={(event) => {
                    setArrival(event.target.value);
                  }}
                  required
                />
              </div>
              <div className="mt-2 sm:w-full md:w-2/3 md:ml-8">
                <label className="block mb-2 text-sm font-medium text-darkin">
                  * Departure
                </label>
                <input
                  type="date"
                  id="departure"
                  className={
                    `block w-full p-2 text-gray-900 border border-darkin rounded-lg bg-gray-50 text-sm ` +
                    (departureValidate ? invalidClass : "")
                  }
                  onChange={(event) => {
                    setDeparture(event.target.value);
                  }}
                  required
                />
              </div>
              <div className="mt-2 sm:w-full md:w-2/3 md:ml-8">
                <button
                  type="submit"
                  className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  onClick={handleSave}
                >
                  Save
                </button>

                <button
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={handlePrint}
                >
                  Print
                </button>
              </div>
            </form>
          </aside>
        </div>
      </header>

      {/*  ============================== */}

      <div className="flex flex-wrap bg-primary my-5 w-full sm:w-full  space-y-4 justify-center ">
        <main className="flex flex-wrap bg-primary sm:w-full md:w-3/5 lg:w-3/4  border-darkin justify-center">
          <div className="w-full bg-secondary">
            <h1 className="text-2xl md:text-4xl text-center font-mono text-darkin border border-darkin">
              Todos{" "}
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm text-center mr-2 mb-2 p-1 px-3"
              >
                +
              </button>
            </h1>
          </div>

          {dayTodos.map((day, ndx) => (
            <div className="flex flex-row flex-wrap sm:w-full md:w-1/2 lg:w-1/3  bg-primary border border-secondary mt-2 p-1">
              <div className="w-full py-3 align-middle ">
                <h1 className="text-2xl text-center font-bold font-mono">
                  DAY {ndx + 1}
                </h1>
              </div>
              {day.map((todos, todoNdx) => (
                <div className="flex flex-wrap w-full justify-center">
                  <p className="font-bold font-mono text-md px-2">
                    {todos.todoTitle} -
                  </p>
                  <p className="font-mono text-md px-1">{todos.todoStart}</p>
                  {"-"}
                  <p className="font-mono text-md px-1">{todos.todoEnd}</p>
                </div>
              ))}
            </div>
          ))}
        </main>
      </div>

      {/* ============================================= */}

      <div className="flex flex-row flex-wrap w-full bg-primary justify-center ">
        <div className="flex flex-wrap bg-secondary w-full md:w-3/5 lg:w-3/4 border border-darkin justify-center py-2">
          <h1 className="text-2xl md:text-4xl text-center font-mono text-darkin">
            Notes
          </h1>
        </div>
        <div className="flex flex-wrap y w-full md:w-3/5 lg:w-3/4   justify-center py-2 mb-20">
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Write your notes here..."
            onChange={(event) => {
              setNotes(event.target.value);
            }}
          ></textarea>
        </div>
      </div>

      <Modal
        className="modal w-2/3 h-full overflow-scroll"
        show={showModal}
        onHide={handleClose}
        renderBackdrop={renderBackdrop}
      >
        <div className="bg-primary">
          <div className="modal-header bg-secondary">
            <div className="modal-title font-mono text-2xl text-darkin">
              Add Day
            </div>
            <div></div>
          </div>
          <div className="modal-desc">
            <h1 className="mb-2 font-bold">Todos -</h1>
            <form>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Start Time
                  </label>
                  <select
                    id="start_time"
                    className="bg-gray-50 border border-gray-300 text-darkin text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                    onChange={(event) => setStartTime(event.target.value)}
                  >
                    {timeOptions.map((time, ndx) => {
                      return (
                        <option key={ndx} value={time}>
                          {time}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-darkin ">
                    End Time
                  </label>
                  <select
                    id="end_time"
                    className="bg-gray-50 border border-gray-300 text-darkin text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                    onChange={(event) => setEndTime(event.target.value)}
                  >
                    {timeOptions.map((time, ndx) => {
                      return (
                        <option key={ndx} value={time}>
                          {time}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="w-full ">
                <label className="block mb-2 text-sm font-medium text-darkin">
                  Todo title
                </label>
                <input
                  type="text"
                  id="todo_title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Todo Title"
                  required
                  onChange={(event) => setTodoTitle(event.target.value)}
                />
              </div>
              <button
                type="submit"
                className="mt-3 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-3 py-1.5 text-center mr-2 mb-2 "
                onClick={addTodo}
              >
                Add todo
              </button>
            </form>
          </div>
          <div className="relative overflow-scroll">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-secondary ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Todo Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Start Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    End Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo, ndx) => (
                  <tr className="bg-white border-b " key={ndx}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-darkin whitespace-nowrap "
                    >
                      {todo.todoTitle}
                    </th>
                    <td className="px-6 py-4">{todo.todoStart}</td>
                    <td className="px-6 py-4">{todo.todoEnd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button
              className="secondary-button p-2 bg-darkin rounded-3xl"
              onClick={handleClose}
            >
              Close
            </button>
            <button className="primary-button p-2 rounded-3xl" onClick={addDay}>
              Add Day
            </button>
          </div>
        </div>
      </Modal>

      <footer className="bg-secondary  py-4 ">
        <h1 className="text-md font-mono md:text-xl text-darkin">
          Tech Challenge Submission : John del Mar
        </h1>
      </footer>
    </div>
  );
}

export default Home;
