import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import mongoose from "mongoose"; 

import session from "express-session";
import MongoStore from "connect-mongo";

import { authenticateAdmin } from "./auth.js";

import { Payment } from "../modules/payment/payment.model.js";
import Pdf from "../modules/pdf/pdf.model.js";
import { User } from "../modules/users/user.model.js";

// Register the Mongoose adapter
AdminJS.registerAdapter(AdminJSMongoose);

// Define a proxy schema for Courses to handle the chapters array safely
// This allows us to edit chapters as JSON without validation errors
const courseProxySchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    rating: { type: Number },
    hours: { type: Number },
    image: { type: String },
    price: { type: Number },
    
    // Set chapters to Mixed type to allow raw JSON editing
    chapters: { type: mongoose.Schema.Types.Mixed },
    
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  {
    // Point this model to the existing 'courses' collection
    collection: "courses", 
    timestamps: true 
  }
);

// Create the model (prevents overwriting if it already exists)
const CourseProxy = mongoose.models.CourseAdminFixed || mongoose.model("CourseAdminFixed", courseProxySchema);

// AdminJS Configuration
const adminJs = new AdminJS({
  rootPath: "/admin",

  resources: [
    // User Management
    {
      resource: User,
      options: {
        navigation: "User Management",
        listProperties: ["_id", "email", "createdAt"],
      },
    },

    // PDF Management
    {
      resource: Pdf,
      options: {
        navigation: "Content Management",
        label: "Guides / PDFs",
        listProperties: ["title", "price"],
      },
    },

    // Course Management
    {
      resource: CourseProxy, 
      options: {
        // Set the resource ID to 'Course' so the URL remains clean
        id: 'Course',
        
        navigation: "Content Management",
        label: "Courses",

        listProperties: ["title", "price", "rating", "createdAt"],

        showProperties: [
          "title", "description", "price", "rating", 
          "hours", "image", "chapters", "createdAt", "updatedAt"
        ],

        editProperties: [
          "title", "description", "price", "rating", 
          "hours", "image", "chapters"
        ],

        properties: {
          chapters: {
            // Enable the JSON editor for this field
            type: 'mixed',
            isVisible: { list: false, show: true, edit: true, filter: false },
          },
          description: { type: 'textarea' },
          _id: { isVisible: { list: false, edit: false, filter: true, show: true } },
        },
      },
    },

    // Payment Management
    {
      resource: Payment,
      options: {
        navigation: "Finance",
        actions: { new: { isAccessible: false }, edit: { isAccessible: false }, delete: { isAccessible: false } },
        listProperties: ["razorpay_payment_id", "user", "pdf", "createdAt"],
      },
    },
  ],

  branding: {
    companyName: "Course 3.0 Admin",
  },
});

// Session Configuration
const sessionOptions = {
  secret: "adminjs-secret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { httpOnly: true, secure: false },
};

// Auth Router Configuration
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: authenticateAdmin,
    cookieName: "adminjs",
    cookiePassword: "adminjs-secret",
  },
  null,
  sessionOptions
);

export { adminJs, adminRouter };