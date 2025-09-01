import ContactUs from "../models/ContactUs.js";
import DhangangaEmployee from "../models/dhangangaEmployeeSchema.js";
import catchAsync from "../utils/catchAsync.js";

// Create contact (Public endpoint)
export const createContact = catchAsync(async (req, res) => {
  const { name, email, phone, subject, message, category, priority } = req.body;

  const contact = await ContactUs.create({
    name,
    email,
    phone,
    subject,
    message,
    category,
    priority,
    source: "Website"
  });

  res.status(201).json({
    success: true,
    message: "Your message has been submitted successfully. We will get back to you soon!",
    data: contact,
  });
});

// Get all contacts (Admin/Employee access)
export const getContacts = catchAsync(async (req, res) => {
  const { status, category, priority, page = 1, limit = 10 } = req.query;

  // Build filter object
  const filter = {};
  if (status) filter.status = status;
  if (category) filter.category = category;
  if (priority) filter.priority = priority;

  // Pagination
  const skip = (page - 1) * limit;

  const contacts = await ContactUs.find(filter)
    .populate("assignedTo", "name email designation")
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip(skip);

  const total = await ContactUs.countDocuments(filter);

  res.status(200).json({
    success: true,
    count: contacts.length,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    data: contacts,
  });
});

// Get contact by ID
export const getContactById = catchAsync(async (req, res) => {
  const contact = await ContactUs.findById(req.params.id)
    .populate("assignedTo", "name email designation");

  if (!contact) {
    return res.status(404).json({
      success: false,
      message: "Contact not found",
    });
  }

  // Mark as read if not already read
  if (!contact.isRead) {
    contact.isRead = true;
    await contact.save();
  }

  res.status(200).json({
    success: true,
    data: contact,
  });
});

// Update contact status/response (Admin/Employee access)
export const updateContact = catchAsync(async (req, res) => {
  const { status, response, priority, assignedTo } = req.body;

  const updateData = {};
  if (status) updateData.status = status;
  if (response) {
    updateData.response = response;
    updateData.responseDate = new Date();
  }
  if (priority) updateData.priority = priority;
  if (assignedTo) updateData.assignedTo = assignedTo;

  const contact = await ContactUs.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true, runValidators: true }
  ).populate("assignedTo", "name email designation");

  if (!contact) {
    return res.status(404).json({
      success: false,
      message: "Contact not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Contact updated successfully",
    data: contact,
  });
});

// Delete contact (Admin only)
export const deleteContact = catchAsync(async (req, res) => {
  const contact = await ContactUs.findByIdAndDelete(req.params.id);

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
});

// Assign contact to employee (Admin/Manager access)
export const assignContact = catchAsync(async (req, res) => {
  const { employeeId } = req.body;

  // Check if employee exists
  const employee = await DhangangaEmployee.findById(employeeId);
  if (!employee) {
    return res.status(404).json({
      success: false,
      message: "Employee not found",
    });
  }

  const contact = await ContactUs.findByIdAndUpdate(
    req.params.id,
    {
      assignedTo: employeeId,
      status: "In Progress"
    },
    { new: true }
  ).populate("assignedTo", "name email designation");

  if (!contact) {
    return res.status(404).json({
      success: false,
      message: "Contact not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Contact assigned successfully",
    data: contact,
  });
});

// Get contacts assigned to current employee
export const getMyContacts = catchAsync(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;

  const filter = { assignedTo: req.user.id };
  if (status) filter.status = status;

  const skip = (page - 1) * limit;

  const contacts = await ContactUs.find(filter)
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip(skip);

  const total = await ContactUs.countDocuments(filter);

  res.status(200).json({
    success: true,
    count: contacts.length,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    data: contacts,
  });
});

// Get contact statistics (Admin/Manager access)
export const getContactStats = catchAsync(async (req, res) => {
  const stats = await ContactUs.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 }
      }
    }
  ]);

  const categoryStats = await ContactUs.aggregate([
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 }
      }
    }
  ]);

  const priorityStats = await ContactUs.aggregate([
    {
      $group: {
        _id: "$priority",
        count: { $sum: 1 }
      }
    }
  ]);

  const totalContacts = await ContactUs.countDocuments();
  const pendingContacts = await ContactUs.countDocuments({ status: "Pending" });
  const resolvedContacts = await ContactUs.countDocuments({ status: "Resolved" });

  res.status(200).json({
    success: true,
    data: {
      totalContacts,
      pendingContacts,
      resolvedContacts,
      statusStats: stats,
      categoryStats,
      priorityStats,
    },
  });
});
