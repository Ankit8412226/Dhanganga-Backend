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
  res.status(201).json({
    success: true,
    message: "Service created successfully",
    data: service
  });
});

export const getServices = catchAsync(async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: services.length,
    data: services,
  });
});

export const getServiceById = catchAsync(async (req, res) => {
  const serviceId = req.params.id;
  const service = await Service.findById(serviceId);
  if (!service) {
    return res.status(404).json({
      success: false,
      message: "Service not found"
    });
  }

  const [subServices, types, associates] = await Promise.all([
    SubService.find({ service: serviceId }).sort({ createdAt: -1 }),
    Type.find({ service: serviceId })
      .populate("subService", "fee time")
      .sort({ createdAt: -1 }),
    Associate.find({ service: serviceId })
      .populate("subService", "fee time")
      .populate("type", "type")
      .sort({ createdAt: -1 })
  ]);

  res.status(200).json({
    success: true,
    data: {
      service,
      subServices,
      types,
      associates
    }
  });
});

export const updateService = catchAsync(async (req, res) => {
  const data = {
    serviceName: req.body.serviceName,
    details: req.body.details,
  };
  if (req.file) {
    data.image = req.file.path;
  }
  const service = await Service.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true
  });
  if (!service) {
    return res.status(404).json({
      success: false,
      message: "Service not found"
    });
  }
  res.status(200).json({
    success: true,
    message: "Service updated successfully",
    data: service
  });
});

export const deleteService = catchAsync(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) {
    return res.status(404).json({
      success: false,
      message: "Service not found"
    });
  }
  res.status(200).json({
    success: true,
    message: "Service deleted successfully"
  });
});

// ------------------- SUBSERVICES -------------------
export const createSubService = catchAsync(async (req, res) => {
  const data = {
    service: req.body.service,
    subServiceName: req.body.subServiceName,
    details: req.body.details,
    fee: req.body.fee,
    time: req.body.time,
    image: req.file ? req.file.path : undefined
  };
  const subService = await SubService.create(data);
  res.status(201).json({
    success: true,
    message: "SubService created successfully",
    data: subService
  });
});

export const getSubServices = catchAsync(async (req, res) => {
  const { service } = req.query; // Optional filter by service

  const filter = {};
  if (service) filter.service = service;

  const subServices = await SubService.find(filter)
    .populate("service", "serviceName")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: subServices.length,
    data: subServices
  });
});

export const getSubServiceById = catchAsync(async (req, res) => {
  const subService = await SubService.findById(req.params.id).populate("service");
  if (!subService) {
    return res.status(404).json({
      success: false,
      message: "SubService not found"
    });
  }
  res.status(200).json({
    success: true,
    data: subService
  });
});

export const updateSubService = catchAsync(async (req, res) => {
  const data = {
    service: req.body.service,
    subServiceName: req.body.subServiceName,
    details: req.body.details,
    fee: req.body.fee,
    time: req.body.time,
  };
  if (req.file) {
    data.image = req.file.path;
  }
  const subService = await SubService.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true
  }).populate("service");
  if (!subService) {
    return res.status(404).json({
      success: false,
      message: "SubService not found"
    });
  }
  res.status(200).json({
    success: true,
    message: "SubService updated successfully",
    data: subService
  });
});

export const deleteSubService = catchAsync(async (req, res) => {
  const subService = await SubService.findByIdAndDelete(req.params.id);
  if (!subService) {
    return res.status(404).json({
      success: false,
      message: "SubService not found"
    });
  }
  res.status(200).json({
    success: true,
    message: "SubService deleted successfully"
  });
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
    file: req.file ? req.file.path : undefined,
    documents: Array.isArray(req.body.documents)
      ? req.body.documents
      : typeof req.body.documents === "string" && req.body.documents.length
      ? req.body.documents.split(",").map((d) => d.trim()).filter(Boolean)
      : undefined,
  };
  const type = await Type.create(data);
  res.status(201).json({
    success: true,
    message: "Type created successfully",
    data: type
  });
});

export const getTypes = catchAsync(async (req, res) => {
  const { service, subService } = req.query; // Optional filters

  const filter = {};
  if (service) filter.service = service;
  if (subService) filter.subService = subService;

  const types = await Type.find(filter)
    .populate("service", "serviceName")
    .populate("subService", "fee time")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: types.length,
    data: types
  });
});

export const getTypeById = catchAsync(async (req, res) => {
  const type = await Type.findById(req.params.id)
    .populate("service")
    .populate("subService");
  if (!type) {
    return res.status(404).json({
      success: false,
      message: "Type not found"
    });
  }
  res.status(200).json({
    success: true,
    data: type
  });
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
    documents: Array.isArray(req.body.documents)
      ? req.body.documents
      : typeof req.body.documents === "string" && req.body.documents.length
      ? req.body.documents.split(",").map((d) => d.trim()).filter(Boolean)
      : undefined,
  };
  if (req.file) {
    data.file = req.file.path;
  }
  const type = await Type.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true
  }).populate("service subService");
  if (!type) {
    return res.status(404).json({
      success: false,
      message: "Type not found"
    });
  }
  res.status(200).json({
    success: true,
    message: "Type updated successfully",
    data: type
  });
});

export const deleteType = catchAsync(async (req, res) => {
  const type = await Type.findByIdAndDelete(req.params.id);
  if (!type) {
    return res.status(404).json({
      success: false,
      message: "Type not found"
    });
  }
  res.status(200).json({
    success: true,
    message: "Type deleted successfully"
  });
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
  res.status(201).json({
    success: true,
    message: "Associate created successfully",
    data: associate
  });
});

export const getAssociates = catchAsync(async (req, res) => {
  const { service, subService, type } = req.query; // Optional filters

  const filter = {};
  if (service) filter.service = service;
  if (subService) filter.subService = subService;
  if (type) filter.type = type;

  const associates = await Associate.find(filter)
    .populate("service", "serviceName")
    .populate("subService", "fee time")
    .populate("type", "type")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: associates.length,
    data: associates
  });
});

export const getAssociateById = catchAsync(async (req, res) => {
  const associate = await Associate.findById(req.params.id)
    .populate("service")
    .populate("subService")
    .populate("type");
  if (!associate) {
    return res.status(404).json({
      success: false,
      message: "Associate not found"
    });
  }
  res.status(200).json({
    success: true,
    data: associate
  });
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
  const associate = await Associate.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true
  }).populate("service subService type");
  if (!associate) {
    return res.status(404).json({
      success: false,
      message: "Associate not found"
    });
  }
  res.status(200).json({
    success: true,
    message: "Associate updated successfully",
    data: associate
  });
});

export const deleteAssociate = catchAsync(async (req, res) => {
  const associate = await Associate.findByIdAndDelete(req.params.id);
  if (!associate) {
    return res.status(404).json({
      success: false,
      message: "Associate not found"
    });
  }
  res.status(200).json({
    success: true,
    message: "Associate deleted successfully"
  });
});
