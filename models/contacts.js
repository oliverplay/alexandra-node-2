const fs = require("fs").promises;
const path = require("path");
const contactPath = path.join(__dirname, "contacts.json");
const { v4 } = require("uuid");

const listContacts = async () => {
  let data = await fs.readFile(contactPath);
  data = JSON.parse(data);
  return data;
};

const getContactById = async (contactId) => {
  let data = await fs.readFile(contactPath);
  data = JSON.parse(data);
  const singleContact = data.filter((item) => item.id === contactId);
  console.log(singleContact);
  if (singleContact.length > 0) {
    return [singleContact, 200];
  } else {
    return [{ message: "Not found" }, 404];
  }
};

const removeContact = async (contactId) => {
  let data = await fs.readFile(contactPath);
  data = JSON.parse(data);

  const newData = data.filter((item) => item.id !== contactId);

  await fs.writeFile(contactPath, JSON.stringify(newData));

  return [{ message: "User was deleted" }, 200];
};

const addContact = async (body) => {
  if (!body.name || !body.phone || !body.email) {
    return Promise.resolve([{ message: "missing required name field" }, 400]);
  }
  const newContact = {
    name: body.name, // Changed from body.username
    email: body.email,
    phone: body.phone,
    id: v4(),
  };
  let data = await fs.readFile(contactPath);
  data = JSON.parse(data);
  data.push(newContact);
  console.log([newContact, 200]);
  return fs.writeFile(contactPath, JSON.stringify(data)).then(() => {
    return [newContact, 200];
  });
};

const updateContact = async (contactId, body) => {
  let data = await fs.readFile(contactPath);
  data = JSON.parse(data);
  const userIndex = data.findIndex((item) => item.id === contactId);
  if (userIndex === -1) {
    return [{ error: "ID doesn't exist" }, 404];
  }
  data[userIndex] = { ...data[userIndex], ...body };
  await fs.writeFile(contactPath, JSON.stringify(data));
  return [{ message: "User was updated" }, 200];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
