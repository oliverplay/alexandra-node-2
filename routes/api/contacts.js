const express = require("express"); // Import the Express framework
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts"); // Import the contact handling functions from the contacts module
const router = express.Router(); // Create an instance of Express Router

// Route: GET / - List all contacts
router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts(); // Call the listContacts function to retrieve all contacts
    res.json(data); // Respond with the list of contacts in JSON format
  } catch (err) {
    next(err); // Pass any encountered errors to the error handling middleware
  }
});

// Route: GET /:contactId - Get a specific contact by ID
router.get("/:contactId", async (req, res, next) => {
  try {
    const [data, status] = await getContactById(req.params.contactId); // Call the getContactById function to retrieve a contact by its ID
    res.status(status).json(data); // Respond with the contact data along with the corresponding status code (e.g., 200 for success, 404 for not found)
  } catch (err) {
    next(err); // Pass any encountered errors to the error handling middleware
  }
});

// Route: POST / - Add a new contact
router.post("/", async (req, res, next) => {
  try {
    const [data, status] = await addContact(req.body); // Call the addContact function to add a new contact with the provided data in the request body
    res.status(status).json(data); // Respond with the new contact data along with the corresponding status code (e.g., 200 for success, 400 for bad request)
  } catch (err) {
    next(err); // Pass any encountered errors to the error handling middleware
  }
});

// Route: DELETE /:contactId - Remove a contact by ID
router.delete("/:contactId", async (req, res, next) => {
  try {
    const [data, status] = await removeContact(req.params.contactId, req.body); // Call the removeContact function to delete a contact by its ID
    res.status(status).json(data); // Respond with a message indicating the success of the deletion along with the corresponding status code (e.g., 200 for success, 404 for not found)
  } catch (err) {
    next(err); // Pass any encountered errors to the error handling middleware
  }
});

// Route: PUT /:contactId - Update an existing contact by ID
router.put("/:contactId", async (req, res, next) => {
  try {
    const [data, status] = await updateContact(req.params.contactId, req.body); // Call the updateContact function to update a contact by its ID with the provided data in the request body
    res.status(status).json(data); // Respond with a message indicating the success of the update along with the corresponding status code (e.g., 200 for success, 404 for not found)
  } catch (err) {
    next(err); // Pass any encountered errors to the error handling middleware
  }
});

module.exports = router; // Export the router to be used in the main app file
