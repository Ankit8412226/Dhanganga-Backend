import { Associate, Service, SubService, Type } from "../models/index.js";
import catchAsync from "../utils/catchAsync.js";

// ------------------- SERVICES -------------------
export const createService = catchAsync(async (req, res) => {
  const data = { ...req.body, image: req.file ? req.file.path : undefined };
  const service = await Service.create(data);
  res.status(201).json(service);
});

export const getServices = catchAsync(async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

export const updateService = catchAsync(async (req, res) => {
  const data = { ...req.body, image: req.file ? req.file.path : undefined };
  const service = await Service.findByIdAndUpdate(req.params.id, data, { new: true });
  res.json(service);
});

export const deleteService = catchAsync(async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Service deleted" });
});

// ------------------- SUBSERVICES -------------------
export const createSubService = catchAsync(async (req, res) => {
  const data = { ...req.body, doc: req.file ? req.file.path : undefined };
  const subService = await SubService.create(data);
  res.status(201).json(subService);
});

export const getSubServices = catchAsync(async (req, res) => {
  const subServices = await SubService.find().populate("service");
  res.json(subServices);
});

export const updateSubService = catchAsync(async (req, res) => {
  const data = { ...req.body, doc: req.file ? req.file.path : undefined };
  const subService = await SubService.findByIdAndUpdate(req.params.id, data, { new: true });
  res.json(subService);
});

export const deleteSubService = catchAsync(async (req, res) => {
  await SubService.findByIdAndDelete(req.params.id);
  res.json({ message: "SubService deleted" });
});

// ------------------- TYPES -------------------
export const createType = catchAsync(async (req, res) => {
  const data = { ...req.body, file: req.file ? req.file.path : undefined };
  const type = await Type.create(data);
  res.status(201).json(type);
});

export const getTypes = catchAsync(async (req, res) => {
  const types = await Type.find().populate("service subService");
  res.json(types);
});

export const updateType = catchAsync(async (req, res) => {
  const data = { ...req.body, file: req.file ? req.file.path : undefined };
  const type = await Type.findByIdAndUpdate(req.params.id, data, { new: true });
  res.json(type);
});

export const deleteType = catchAsync(async (req, res) => {
  await Type.findByIdAndDelete(req.params.id);
  res.json({ message: "Type deleted" });
});

// ------------------- ASSOCIATES -------------------
export const createAssociate = catchAsync(async (req, res) => {
  const data = { ...req.body, file: req.file ? req.file.path : undefined };
  const associate = await Associate.create(data);
  res.status(201).json(associate);
});

export const getAssociates = catchAsync(async (req, res) => {
  const associates = await Associate.find().populate("service subService type");
  res.json(associates);
});

export const updateAssociate = catchAsync(async (req, res) => {
  const data = { ...req.body, file: req.file ? req.file.path : undefined };
  const associate = await Associate.findByIdAndUpdate(req.params.id, data, { new: true });
  res.json(associate);
});

export const deleteAssociate = catchAsync(async (req, res) => {
  await Associate.findByIdAndDelete(req.params.id);
  res.json({ message: "Associate deleted" });
});
