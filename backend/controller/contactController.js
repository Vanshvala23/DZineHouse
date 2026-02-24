const Contact=require('../models/Contacts');
// ===============================
// ➜ Create Contact (Form Submit)
// ===============================
exports.createContact = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      companyName,
      email,
      phoneNumber,
      selectService,
      how,
      message,
    } = req.body;

    // basic validation
    if (
      !firstName ||
      !lastName ||
      !companyName ||
      !email ||
      !phoneNumber ||
      !selectService ||
      !how ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check duplicate email
    const existing = await Contact.findOne({ email });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Contact with this email already exists",
      });
    }

    // create
    const contact = await Contact.create({
      firstName,
      lastName,
      companyName,
      email,
      phoneNumber,
      selectService,
      how,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Create Contact Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===============================
// ➜ Get All Contacts (Admin)
// ===============================
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error("Get Contacts Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===============================
// ➜ Get Single Contact
// ===============================
exports.getSingleContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error("Get Single Contact Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===============================
// ➜ Delete Contact (Admin)
// ===============================
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Delete Contact Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};