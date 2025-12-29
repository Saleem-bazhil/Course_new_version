import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";

import { Payment } from "../modules/payment/payment.model.js";
import Pdf from "../modules/pdf/pdf.model.js";
import { User } from "../modules/users/user.model.js";

AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
  rootPath: "/admin",

  resources: [
    {
      resource: User,
      options: {
        navigation: "Course Management",
        label: "Users",
        listProperties: ["_id", "email", "createdAt"],
      },
    },
    {
      resource: Pdf,
      options: {
        navigation: "Course Management",
        label: "Guides / PDFs",
        listProperties: ["title", "price", "createdAt"],
      },
    },
    {
      resource: Payment,
      options: {
        navigation: "Payments",
        label: "Razorpay Payments",

        actions: {
          new: { isAccessible: false },
          edit: { isAccessible: false },
          delete: { isAccessible: false },
        },

        listProperties: [
          "razorpay_payment_id",
          "user",
          "pdf",
          "createdAt",
        ],

        showProperties: [
          "razorpay_payment_id",
          "razorpay_order_id",
          "razorpay_signature",
          "user",
          "pdf",
          "createdAt",
        ],
      },
    },
  ],

  branding: {
    companyName: "Course 3.0 Admin",
  },
});

const adminRouter = AdminJSExpress.buildRouter(adminJs);

export { adminJs, adminRouter };
