const pool = require("../../db");
const queries = require("./queries");

//itinerary functions
const getAllItinerary = (req, res) => {
  pool.query(queries.getAllItinerary, (err, result) => {
    if (err) throw err;
    res.status(200).send(result.rows);
  });
};

const getItinerary = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getItinerary, [id], (err, result) => {
    if (err) throw err;
    res.status(200).send(result.rows);
  });
};

const getLatestItinerary = (req, res) => {
  pool.query(queries.getLatestItinerary, (err, result) => {
    if (err) throw err;
    res.status(200).send(result.rows);
  });
};

const addItinerary = (req, res) => {
  const { title, destination, departure, arrival, is_deleted, notes } =
    req.body;

  const ret = pool.query(
    queries.addItinerary,
    [title, destination, departure, arrival, is_deleted, notes],
    (err, result) => {
      if (err) throw err;
      res.status(201).send(result);
    }
  );
};

const updateItinerary = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, destination, departure, arrival, is_deleted, notes } =
    req.body;
  pool.query(
    queries.updateItinerary,
    [title, destination, departure, arrival, notes, id],
    (err, result) => {
      if (err) throw err;
      res.status(200).send("Itinerary Updated Successfully.");
    }
  );
};

const deleteItinerary = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.deleteItinerary, [id], (err, result) => {
    if (err) throw err;
    res.status(200).send("Itinerary Deleted Successfully.");
  });
};

//itinerary item functions

const getAllItineraryDays = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getAllItineraryDays, [id], (err, result) => {
    if (err) throw err;
    res.status(200).send(result.rows);
  });
};

const getItineraryDay = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getItineraryDay, [id], (err, result) => {
    if (err) throw err;
    res.status(200).send(result.rows);
  });
};

const addItineraryDay = (req, res) => {
  const { itinerary_id } = req.body;

  pool.query(queries.addItineraryDay, [itinerary_id], (err, result) => {
    if (err) throw err;
    res.status(201).send("Itinerary Day Created.");
  });
};

const updateItineraryDay = (req, res) => {
  const id = parseInt(req.params.id);
  const { itinerary_id } = req.body;
  pool.query(queries.updateItineraryDay, [itinerary_id, id], (err, result) => {
    if (err) throw err;
    res.status(200).send("Itinerary Day Updated.");
  });
};

const deleteItineraryDay = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.deleteItineraryDay, [id], (err, result) => {
    if (err) throw err;
    res.status(200).send("Itinerary Day Deleted.");
  });
};

//todo functions

const getItineraryTodos = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getAllItineraryTodos, [id], (err, result) => {
    if (err) throw err;
    res.status(200).send(result.rows);
  });
};

const getTodo = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getTodo, [id], (err, result) => {
    if (err) throw err;
    res.status(200).send(result.rows);
  });
};

const addTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const {
    itinerary_day_id,
    todo_title,
    todo_location,
    todo_start,
    todo_end,
    todo_notes,
  } = req.body;
  pool.query(
    queries.addTodo,
    [
      itinerary_day_id,
      todo_title,
      todo_location,
      todo_start,
      todo_end,
      todo_notes,
    ],
    (err, result) => {
      if (err) throw err;
      res.status(201).send("Todo Created.");
    }
  );
};

const updateTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const {
    itinerary_day_id,
    todo_title,
    todo_location,
    todo_start,
    todo_end,
    todo_notes,
  } = req.body;

  pool.query(
    queries.updateTodo,
    [
      itinerary_day_id,
      todo_title,
      todo_location,
      todo_start,
      todo_end,
      todo_notes,
      id,
    ],
    (err, result) => {
      if (err) throw err;
      res.status(200).send(result.rows);
    }
  );
};

const deleteTodo = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.deleteTodo, [id], (err, result) => {
    if (err) throw err;
    res.status(200).send("Todo deleted.");
  });
};

module.exports = {
  //itinerary exports
  getAllItinerary,
  getItinerary,
  getLatestItinerary,
  addItinerary,
  deleteItinerary,
  updateItinerary,
  //itinerary day exports
  getAllItineraryDays,
  getItineraryDay,
  addItineraryDay,
  updateItineraryDay,
  deleteItineraryDay,
  //todos exports
  getItineraryTodos,
  addTodo,
  getTodo,
  updateTodo,
  deleteTodo,
};
