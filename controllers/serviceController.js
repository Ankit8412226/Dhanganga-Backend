import { Associate, Service, SubService, Type } from "../models/index.js";
import catchAsync from "../utils/catchAsync.js";

// ------------------- SERVICES -------------------
export const createService = catchAsync(async (req, res) => {
  const data = {
    serviceName: req.body.serviceName,
    details: req.body.details,
    image: req.file ? req.file.path : undefined
  };
  const service = await Service.create(data);
  res.status(201).json(service);
});

export const getServices = catchAsync(async (req, res) => {
  const services = await Service.find();

  res.status(200).json({
    success: true,
    count: services.length,
    data: services,
  });
});


export const getServiceById = catchAsync(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) return res.status(404).json({ message: "Service not found" });
  res.json(service);
});

export const updateService = catchAsync(async (req, res) => {
  const data = {
    serviceName: req.body.serviceName,
    details: req.body.details,
  };
  if (req.file) {
    data.image = req.file.path;
  }
  const service = await Service.findByIdAndUpdate(req.params.id, data, { new: true });
  if (!service) return res.status(404).json({ message: "Service not found" });
  res.json(service);
});

export const deleteService = catchAsync(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) return res.status(404).json({ message: "Service deleted" });
  res.json({ message: "Service deleted" });
});

// ------------------- SUBSERVICES -------------------
export const createSubService = catchAsync(async (req, res) => {
  const data = {
    service: req.body.service,
    fee: req.body.fee,
    time: req.body.time,
    doc: req.file ? req.file.path : undefined
  };
  const subService = await SubService.create(data);
  res.status(201).json(subService);
});

export const getSubServices = catchAsync(async (req, res) => {
  const subServices = await SubService.find().populate("service");
  res.json(subServices);
});

export const getSubServiceById = catchAsync(async (req, res) => {
  const subService = await SubService.findById(req.params.id).populate("service");
  if (!subService) return res.status(404).json({ message: "SubService not found" });
  res.json(subService);
});

export const updateSubService = catchAsync(async (req, res) => {
  const data = {
    service: req.body.service,
    fee: req.body.fee,
    time: req.body.time,
  };
  if (req.file) {
    data.doc = req.file.path;
  }
  const subService = await SubService.findByIdAndUpdate(req.params.id, data, { new: true }).populate("service");
  if (!subService) return res.status(404).json({ message: "SubService not found" });
  res.json(subService);
});

export const deleteSubService = catchAsync(async (req, res) => {
  const subService = await SubService.findByIdAndDelete(req.params.id);
  if (!subService) return res.status(404).json({ message: "SubService deleted" });
  res.json({ message: "SubService deleted" });
});

// ------------------- TYPES -------------------
export const createType = catchAsync(async (req, res) => {
  const data = {
    service: req.body.service,
    subService: req.body.subService,
    type: req.body.type,
    associateName: req.body.associateName,
    amount: req.body.amount,
    bio: req.body.bio,
    time: req.body.time,
    file: req.file ? req.file.path : undefined
  };
  const type = await Type.create(data);
  res.status(201).json(type);
});

export const getTypes = catchAsync(async (req, res) => {
  const types = await Type.find().populate("service subService");
  res.json(types);
});

export const getTypeById = catchAsync(async (req, res) => {
  const type = await Type.findById(req.params.id).populate("service subService");
  if (!type) return res.status(404).json({ message: "Type not found" });
  res.json(type);
});

export const updateType = catchAsync(async (req, res) => {
  const data = {
    service: req.body.service,
    subService: req.body.subService,
    type: req.body.type,
    associateName: req.body.associateName,
    amount: req.body.amount,
    bio: req.body.bio,
    time: req.body.time,
  };
  if (req.file) {
    data.file = req.file.path;
  }
  const type = await Type.findByIdAndUpdate(req.params.id, data, { new: true }).populate("service subService");
  if (!type) return res.status(404).json({ message: "Type not found" });
  res.json(type);
});

export const deleteType = catchAsync(async (req, res) => {
  const type = await Type.findByIdAndDelete(req.params.id);
  if (!type) return res.status(404).json({ message: "Type deleted" });
  res.json({ message: "Type deleted" });
});

// ------------------- ASSOCIATES -------------------
export const createAssociate = catchAsync(async (req, res) => {
  const data = {
    name: req.body.name,
    service: req.body.service,
    subService: req.body.subService,
    type: req.body.type,
    bio: req.body.bio,
    amount: req.body.amount,
    time: req.body.time,
    file: req.file ? req.file.path : undefined
  };
  const associate = await Associate.create(data);
  res.status(201).json(associate);
});

export const getAssociates = catchAsync(async (req, res) => {
  const associates = await Associate.find().populate("service subService type");
  res.json(associates);
});

export const getAssociateById = catchAsync(async (req, res) => {
  const associate = await Associate.findById(req.params.id).populate("service subService type");
  if (!associate) return res.status(404).json({ message: "Associate not found" });
  res.json(associate);
});

export const updateAssociate = catchAsync(async (req, res) => {
  const data = {
    name: req.body.name,
    service: req.body.service,
    subService: req.body.subService,
    type: req.body.type,
    bio: req.body.bio,
    amount: req.body.amount,
    time: req.body.time,
  };
  if (req.file) {
    data.file = req.file.path;
  }
  const associate = await Associate.findByIdAndUpdate(req.params.id, data, { new: true }).populate("service subService type");
  if (!associate) return res.status(404).json({ message: "Associate not found" });
  res.json(associate);
});

export const deleteAssociate = catchAsync(async (req, res) => {
  const associate = await Associate.findByIdAndDelete(req.params.id);
  if (!associate) return res.status(404).json({ message: "Associate deleted" });
  res.json({ message: "Associate deleted" });
});
