const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const [data, status] = await getContactById(req.params.contactId);
    res.status(status).json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const [data, status] = await addContact(req.body);
    res.status(status).json(data);
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const [data, status] = await removeContact(req.params.contactId, req.body);
    res.status(status).json(data);
  } catch (err) {
    next(err);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const [data, status] = await updateContact(req.params.contactId, req.body);
    res.status(status).json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
