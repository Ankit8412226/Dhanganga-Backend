import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Service from "../models/Service.js";
import SubService from "../models/SubService.js";
import Type from "../models/Type.js";
import Associate from "../models/Associate.js";

dotenv.config();

const log = (...args) => console.log("[seed]", ...args);

async function seed() {
  try {
    await connectDB();

    // Clean existing data for a predictable state
    await Promise.all([
      Associate.deleteMany({}),
      Type.deleteMany({}),
      SubService.deleteMany({}),
      Service.deleteMany({}),
    ]);
    log("Cleared existing Service/SubService/Type/Associate data");

    // Create base services (6)
    const services = await Service.insertMany([
      { serviceName: "DhanGanga online public kendra", details: "Government and public services handling" },
      { serviceName: "DhanGanga Association", details: "Membership and association services" },
      { serviceName: "DhanGanga Hire Service", details: "Hire skilled professionals for daily work" },
      { serviceName: "DhanGanga Store", details: "Retail and product services" },
      { serviceName: "DhanGanga Real Estate", details: "Property and land services" },
      { serviceName: "DhanGanga Netralay", details: "Eye care services" },
    ]);
    log(`Inserted ${services.length} services`);

    const [svcPublic, svcAssociation, svcHire, svcStore, svcRealEstate, svcNetralay] = [
      "DhanGanga online public kendra",
      "DhanGanga Association",
      "DhanGanga Hire Service",
      "DhanGanga Store",
      "DhanGanga Real Estate",
      "DhanGanga Netralay",
    ].map((name) => services.find((s) => s.serviceName === name));

    // Create subservices tied to each service (>= 20)
    const subServices = await SubService.insertMany([
      // Public Kendra (8)
      { service: svcPublic._id, subServiceName: "PAN CARD", details: "PAN application", fee: 130, time: "Max 2 days", doc: "Photo, Aadhar Card" },
      { service: svcPublic._id, subServiceName: "NEW G.S.T", details: "GST registration", fee: 725, time: "Max 12 days", doc: "Aadhar, Photo, Bank Passbook, Business Address Proof" },
      { service: svcPublic._id, subServiceName: "G.S.T FILING", details: "GST return filing", fee: 350, time: "Max 3 days", doc: "Bills, ID & Password" },
      { service: svcPublic._id, subServiceName: "MARRIAGE CERTIFICATE", details: "Marriage certificate processing", fee: 2700, time: "Max 3 days", doc: "Age Proof, Address Proof, Joint Photo" },
      { service: svcPublic._id, subServiceName: "BIRTH CERTIFICATE", details: "Birth certificate", fee: 550, time: "Min 7 days", doc: "Full details form" },
      { service: svcPublic._id, subServiceName: "ELECTRICITY BILL", details: "Electricity bill payment", fee: 1, time: "Max 1 day", doc: "Customer ID" },
      { service: svcPublic._id, subServiceName: "INCOME CERTIFICATE", details: "Income certificate online", fee: 50, time: "Max 1 day", doc: "Self Attested Photo, ID" },
      { service: svcPublic._id, subServiceName: "RESIDENTIAL CERTIFICATE", details: "Residential certificate online", fee: 50, time: "Max 1 day", doc: "Self Attested Photo, ID" },

      // Association (3)
      { service: svcAssociation._id, subServiceName: "JOIN MEMBERSHIP", details: "Join DhanGanga Association", fee: 99, time: "Instant", doc: "Basic details for membership" },
      { service: svcAssociation._id, subServiceName: "MEMBER LOGIN", details: "Member login", fee: 0, time: "Instant", doc: "Login details" },
      { service: svcAssociation._id, subServiceName: "RENEW MEMBERSHIP", details: "Renew membership", fee: 49, time: "Instant", doc: "Membership ID" },

      // Hire Service (4)
      { service: svcHire._id, subServiceName: "PLUMBER", details: "Hire a plumber", fee: 500, time: "Per visit", doc: "Requirement details" },
      { service: svcHire._id, subServiceName: "CARPENTER", details: "Hire a carpenter", fee: 700, time: "Per visit", doc: "Requirement details" },
      { service: svcHire._id, subServiceName: "ELECTRICIAN", details: "Hire an electrician", fee: 600, time: "Per visit", doc: "Requirement details" },
      { service: svcHire._id, subServiceName: "HOUSE PAINTER", details: "Hire a painter", fee: 800, time: "Per visit", doc: "Requirement details" },

      // Store (2)
      { service: svcStore._id, subServiceName: "GROCERY DELIVERY", details: "Order grocery", fee: 30, time: "Same day", doc: "Address details" },
      { service: svcStore._id, subServiceName: "MEDICINE DELIVERY", details: "Order medicine", fee: 40, time: "Same day", doc: "Prescription (if required)" },

      // Real Estate (2)
      { service: svcRealEstate._id, subServiceName: "LAND MUTATION", details: "Mutation apply", fee: 100, time: "Min 1 day", doc: "Relevant documents" },
      { service: svcRealEstate._id, subServiceName: "LAND CORRECTION", details: "Correction of land", fee: 70, time: "Min 1 day", doc: "Rent receipt / Proof" },

      // Netralay (3)
      { service: svcNetralay._id, subServiceName: "EYE CHECKUP", details: "Standard eye check", fee: 200, time: "30 min", doc: "NA" },
      { service: svcNetralay._id, subServiceName: "CONTACT LENS FITTING", details: "Lens fitting", fee: 400, time: "60 min", doc: "NA" },
      { service: svcNetralay._id, subServiceName: "CATARACT CONSULTATION", details: "Consultation", fee: 600, time: "45 min", doc: "Reports if any" },
    ]);
    log(`Inserted ${subServices.length} subservices`);

    // Create types for a couple of subservices to test cascade (12)
    const types = await Type.insertMany([
      { service: svcPublic._id, subService: subServices[0]._id, type: "Standard", associateName: "Amit Kumar", amount: 130, bio: "Standard PAN", time: "2 days" },
      { service: svcPublic._id, subService: subServices[0]._id, type: "Express", associateName: "Neha Sharma", amount: 200, bio: "Express PAN", time: "1 day" },
      { service: svcPublic._id, subService: subServices[1]._id, type: "Standard GST", associateName: "Ravi Kumar", amount: 725, bio: "GST registration", time: "12 days" },
      { service: svcPublic._id, subService: subServices[2]._id, type: "Monthly Filing", associateName: "Priya Singh", amount: 350, bio: "GST filing", time: "3 days" },
      { service: svcHire._id, subService: subServices[12]._id, type: "Hourly", associateName: "Plumber Team A", amount: 500, bio: "General plumbing", time: "1 visit" },
      { service: svcHire._id, subService: subServices[13]._id, type: "Hourly", associateName: "Carpenter Team A", amount: 700, bio: "Woodwork", time: "1 visit" },
      { service: svcHire._id, subService: subServices[14]._id, type: "Hourly", associateName: "Electric Team A", amount: 600, bio: "Electrical", time: "1 visit" },
      { service: svcHire._id, subService: subServices[15]._id, type: "Hourly", associateName: "Painter Team A", amount: 800, bio: "Painting", time: "1 visit" },
      { service: svcNetralay._id, subService: subServices[20]?._id || subServices[subServices.length-3]._id, type: "Basic", associateName: "Dr. Mehta", amount: 200, bio: "Eye check", time: "30 min" },
      { service: svcNetralay._id, subService: subServices[21]?._id || subServices[subServices.length-2]._id, type: "Fitting", associateName: "Optometrist", amount: 400, bio: "Lens", time: "60 min" },
      { service: svcNetralay._id, subService: subServices[22]?._id || subServices[subServices.length-1]._id, type: "Consultation", associateName: "Surgeon", amount: 600, bio: "Cataract", time: "45 min" },
      { service: svcAssociation._id, subService: subServices[8]._id, type: "Annual", associateName: "Admin Team", amount: 99, bio: "Membership", time: "Instant" },
    ]);
    log(`Inserted ${types.length} types`);

    // Create associates bound to some types (10)
    const associates = await Associate.insertMany([
      { name: "Rajeev", service: svcPublic._id, subService: subServices[0]._id, type: types[0]._id, bio: "PAN processing", amount: 130, time: "2 days" },
      { name: "Khushi", service: svcPublic._id, subService: subServices[0]._id, type: types[1]._id, bio: "Fast PAN", amount: 200, time: "1 day" },
      { name: "Ravi", service: svcPublic._id, subService: subServices[1]._id, type: types[2]._id, bio: "GST agent", amount: 725, time: "12 days" },
      { name: "Priya", service: svcPublic._id, subService: subServices[2]._id, type: types[3]._id, bio: "GST filing", amount: 350, time: "3 days" },
      { name: "Team Plumber", service: svcHire._id, subService: subServices[12]._id, type: types[4]._id, bio: "Plumbing", amount: 500, time: "1 visit" },
      { name: "Team Carpenter", service: svcHire._id, subService: subServices[13]._id, type: types[5]._id, bio: "Carpentry", amount: 700, time: "1 visit" },
      { name: "Team Electric", service: svcHire._id, subService: subServices[14]._id, type: types[6]._id, bio: "Electrical", amount: 600, time: "1 visit" },
      { name: "Team Painter", service: svcHire._id, subService: subServices[15]._id, type: types[7]._id, bio: "Painting", amount: 800, time: "1 visit" },
      { name: "Optometrist", service: svcNetralay._id, subService: subServices[20]?._id || subServices[subServices.length-3]._id, type: types[8]._id, bio: "Eye check", amount: 200, time: "30 min" },
      { name: "Surgeon", service: svcNetralay._id, subService: subServices[22]?._id || subServices[subServices.length-1]._id, type: types[10]._id, bio: "Cataract", amount: 600, time: "45 min" },
    ]);
    log(`Inserted ${associates.length} associates`);

    const counts = {
      services: await Service.countDocuments(),
      subServices: await SubService.countDocuments(),
      types: await Type.countDocuments(),
      associates: await Associate.countDocuments(),
    };
    log("Final counts:", counts);

    await mongoose.connection.close();
    log("Disconnected from DB");
    process.exit(0);
  } catch (err) {
    console.error("[seed] Error:", err);
    process.exit(1);
  }
}

seed();