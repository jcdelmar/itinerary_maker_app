//Itinerary Queries
const getAllItinerary = "SELECT * FROM itinerary WHERE is_deleted = FALSE";

const getItinerary =
  "SELECT * FROM itinerary WHERE is_deleted = FALSE AND itinerary_id = $1";

const getLatestItinerary =
  "SELECT * FROM itinerary WHERE is_deleted = FALSE ORDER BY itinerary_id DESC LIMIT 1";

const addItinerary =
  "INSERT INTO itinerary (title, destination, departure, arrival, is_deleted, notes) VALUES ($1, $2, $3, $4, $5, $6)";

const deleteItinerary =
  "UPDATE itinerary SET is_deleted = TRUE WHERE itinerary_id = $1";

const updateItinerary =
  "UPDATE itinerary SET title = $1, destination = $2, departure = $3, arrival = $4, notes = $5 WHERE itinerary_id = $6";

//Itinerary Day Queries
const getAllItineraryDays =
  "SELECT * FROM itinerary_day WHERE is_deleted = FALSE AND itinerary_id = $1";

const getItineraryDay =
  "SELECT * FROM itinerary_day WHERE is_deleted = FALSE AND itinerary_day_id = $1";

const addItineraryDay = "INSERT INTO itinerary_day (itinerary_id) VALUES ($1)";

const updateItineraryDay =
  "UPDATE itinerary_day SET itinerary_id = $1 WHERE itinerary_day_id = $2";

const deleteItineraryDay =
  "UPDATE itinerary_day SET is_deleted = TRUE WHERE itinerary_day_id = $1";

//Todo Queries
const getAllItineraryTodos =
  "SELECT * FROM todos WHERE is_deleted = FALSE AND itinerary_day_id = $1";

const getTodo = "SELECT * FROM todos WHERE is_deleted = FALSE AND todo_id = $1";

const addTodo =
  "INSERT INTO todos (itinerary_day_id, todo_title, todo_location, todo_start, todo_end, todo_notes) VALUES ($1, $2, $3, $4, $5, $6)";

const updateTodo =
  " UPDATE todos SET itinerary_day_id = $1, todo_title = $2, todo_location = $3, todo_start = $4, todo_end = $5, todo_notes = $6 WHERE todo_id = $7";

const deleteTodo = "UPDATE todos SET is_deleted = TRUE WHERE todo_id = $1";

module.exports = {
  //itinerary exports
  getAllItinerary,
  getItinerary,
  getLatestItinerary,
  addItinerary,
  deleteItinerary,
  updateItinerary,
  //itinerary_day exports
  getAllItineraryDays,
  getItineraryDay,
  addItineraryDay,
  updateItineraryDay,
  deleteItineraryDay,
  //todos exports
  getAllItineraryTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
