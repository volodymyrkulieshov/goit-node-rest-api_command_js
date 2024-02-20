const contactsService = require("../services/contactsServices.js");
const HttpError = require("../helpers/HttpError.js");

const getAllContacts = async (req, res, next) => {
  try {
    const contactsList = await contactsService.listContacts();
    res.json(contactsList);
  } catch (error) {
    next(error);
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const searchedContact = await contactsService.getContactById(id);
    if (!searchedContact) {
      throw HttpError(404);
    }
    res.json(searchedContact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedContact = await contactsService.removeContact(id);
    if (!removedContact) {
      throw HttpError(404);
    }
    res.json(removedContact);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res) => {
  const newContact = await contactsService.addContact(req.body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }
    const { id } = req.params;
    const updatedContact = await contactsService.updateContact(id, req.body);
    if (!updatedContact) {
      throw HttpError(404);
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
