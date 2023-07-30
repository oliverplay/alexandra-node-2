const fs = require("fs").promises; // Import the fs module to handle file operations
const path = require("path"); // Import the path module to work with file paths
const contactPath = path.join(__dirname, "contacts.json"); // Define the path to the contacts.json file
const { v4 } = require("uuid"); // Import the uuid module to generate unique IDs

// Function to list all contacts
const listContacts = async () => {
  let data = await fs.readFile(contactPath); // Read the contacts.json file
  data = JSON.parse(data); // Parse the JSON data into a JavaScript object
  return data; // Return the parsed data (list of contacts)
};

// Function to get a contact by its ID
const getContactById = async (contactId) => {
  let data = await fs.readFile(contactPath); // Read the contacts.json file
  data = JSON.parse(data); // Parse the JSON data into a JavaScript object
  const singleContact = data.filter((item) => item.id === contactId); // Find the contact with the given ID
  console.log(singleContact); // Output the found contact to the console (for debugging purposes)
  if (singleContact.length > 0) {
    return [singleContact, 200]; // Return the found contact and the status code 200 (OK)
  } else {
    return [{ message: "Not found" }, 404]; // Return a message and the status code 404 (Not Found)
  }
};

// Function to remove a contact by its ID
const removeContact = async (contactId) => {
  let data = await fs.readFile(contactPath); // Read the contacts.json file
  data = JSON.parse(data); // Parse the JSON data into a JavaScript object

  // Filter out the contact with the given ID and create a new array (newData) without it
  const newData = data.filter((item) => item.id !== contactId);

  await fs.writeFile(contactPath, JSON.stringify(newData)); // Write the new data back to the contacts.json file

  return [{ message: "User was deleted" }, 200]; // Return a message and the status code 200 (OK)
};

// Function to add a new contact
const addContact = async (body) => {
  if (!body.name || !body.phone || !body.email) {
    return Promise.resolve([{ message: "missing required name field" }, 400]); // If required fields are missing, return an error with the status code 400 (Bad Request)
  }
  const newContact = {
    name: body.name, // Changed from body.username
    email: body.email,
    phone: body.phone,
    id: v4(), // Generate a new unique ID using uuid
  };
  let data = await fs.readFile(contactPath); // Read the contacts.json file
  data = JSON.parse(data); // Parse the JSON data into a JavaScript object
  data.push(newContact); // Add the new contact to the existing data array
  console.log([newContact, 200]); // Output the newly added contact and the status code 200 (OK) to the console (for debugging purposes)

  // Write the updated data back to the contacts.json file and return the new contact along with the status code 200 (OK)
  return fs.writeFile(contactPath, JSON.stringify(data)).then(() => {
    return [newContact, 200];
  });
};

// Function to update an existing contact by its ID
const updateContact = async (contactId, body) => {
  let data = await fs.readFile(contactPath); // Read the contacts.json file
  data = JSON.parse(data); // Parse the JSON data into a JavaScript object
  const userIndex = data.findIndex((item) => item.id === contactId); // Find the index of the contact with the given ID in the array
  if (userIndex === -1) {
    return [{ error: "ID doesn't exist" }, 404]; // If contact not found, return an error with the status code 404 (Not Found)
  }
  data[userIndex] = { ...data[userIndex], ...body }; // Merge the existing contact with the updated properties from the request body
  await fs.writeFile(contactPath, JSON.stringify(data)); // Write the updated data back to the contacts.json file
  return [{ message: "User was updated" }, 200]; // Return a message and the status code 200 (OK)
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
