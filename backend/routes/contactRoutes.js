const express = require('express');
const router=express.Router();
const {createContact,getAllContacts,getSingleContact,deleteContact}=require('../controller/contactController');
router.post("/create", createContact);
router.get("/all", getAllContacts);
router.get("/:id", getSingleContact);
router.delete("/:id", deleteContact);

module.exports = router;