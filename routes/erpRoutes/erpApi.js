const express = require('express');
const multer = require('multer');
const fs = require('fs');
const nodemailer = require("nodemailer");

const path = require('path');
const setFilePathToBody = require('@/middlewares/setFilePathToBody');
const { catchErrors, sendMail } = require('@/handlers/errorHandlers');
const router = express.Router();
const adminController = require('@/controllers/erpControllers/adminController');
const roleController = require('@/controllers/erpControllers/roleController');
const clientController = require('@/controllers/erpControllers/clientController');
const productCategoriesController = require('@/controllers/erpControllers/productCategoriesController');
const customerReversationController = require('@/controllers/erpControllers/customerReversationController');
const logHistoryController = require('@/controllers/erpControllers/logHistoryController');
const productTypesController = require('@/controllers/erpControllers/productTypesController');
const reservationsController = require('@/controllers/erpControllers/reservationsController');
const paymentHistoryController = require('@/controllers/erpControllers/paymentHistoryController');
const companyListController = require('@/controllers/erpControllers/companyListController');
const checkoutProductListsController = require('@/controllers/erpControllers/checkoutProductListsController');
const systemInfoController = require('@/controllers/erpControllers/systemInfoController');
const paymentMethodController = require('@/controllers/erpControllers/paymentMethodController');
const baseFilePath = 'public/uploads/admin/'
// //_______________________________ Admin management_______________________________

var adminPhotoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/admin');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
var reservationStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/reservation');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
var document = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file, `1111`)
    cb(null, 'public/uploads/admin');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
router
  .route('/send-email')
  .post(async (req, res) => {
    const mailOptions = {
      from: "eli@mundoeli.com",
      to: req.body.to,
      subject: req.body.subject,
      html: req.body.text,
    };
    const transporter = nodemailer.createTransport({
      host: "server012.leo.com.pa",
      port: 587,
      auth: {
        user: "eli@mundoeli.com",
        pass: "Oes23w%56",
      },
    });
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send("Email sent");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    }
  });
const documentUpload = multer({ storage: document });
const adminPhotoUpload = multer({ storage: adminPhotoStorage });
const _upload = multer({ dest: 'public/uploads/user/' });
const reservationUpload = multer({ storage: reservationStorage });
router
  .route('/admin/create')
  .post([adminPhotoUpload.single('photo'), setFilePathToBody], catchErrors(adminController.create));
router.route('/admin/read/:id').get(catchErrors(adminController.read));
router.route('/admin/checkPass/:id').post(catchErrors(adminController.checkPass));
router.route("/admin/update/:id").patch(catchErrors(adminController.update));
router.route("/admin/delete/:id").delete(catchErrors(adminController.delete));
router.route('/admin/search').get(catchErrors(adminController.search));
router.route('/admin/list').get(catchErrors(adminController.list));
router.route('/admin/profile').get(catchErrors(adminController.profile));
router.route('/admin/status/:id').patch(catchErrors(adminController.status));
router
  .route("/admin/photo")
  .post(
    [adminPhotoUpload.single("photo"), setFilePathToBody],
    catchErrors(adminController.photo)
  );
router
  .route("/admin/password-update/:id")
  .patch(catchErrors(adminController.updatePassword));

// //____________________________ Role management_______________________________

router.route('/role/create').post(catchErrors(roleController.create));
router.route('/role/read/:id').get(catchErrors(roleController.read));
router.route('/role/update/:id').patch(catchErrors(roleController.update));
router.route('/role/delete/:id').delete(catchErrors(roleController.delete));
router.route('/role/search').get(catchErrors(roleController.search));
router.route('/role/list').get(catchErrors(roleController.list));
router.route('/role/filter').get(catchErrors(roleController.filter));

// //____________________________ companyList

router.route('/companyList/create').post(catchErrors(companyListController.create));
router.route('/companyList/read/:id').get(catchErrors(companyListController.read));
router.route('/companyList/update/:id').patch(catchErrors(companyListController.update));
router.route('/companyList/delete/:id').delete(catchErrors(companyListController.delete));
router.route('/companyList/search').get(catchErrors(companyListController.search));
router.route('/companyList/list').get(catchErrors(companyListController.list));
router.route('/companyList/filter').get(catchErrors(companyListController.filter));
router.route('/companyList/byParentId').post(catchErrors(companyListController.getByParentId));


// //_____________________________________ API for clients __________________________________________________
router.route('/client/create').post(catchErrors(clientController.create));
router.route('/client/read/:id').get(catchErrors(clientController.read));
router.route('/client/update/:id').patch(catchErrors(clientController.update));
router.route('/client/delete/:id').delete(catchErrors(clientController.delete));
router.route('/client/search').get(catchErrors(clientController.search));
router.route('/client/list').get(catchErrors(clientController.list));
router.route('/client/filter').get(catchErrors(clientController.filter));
router.route('/client/byParentId').post(catchErrors(clientController.getByParentId));
router.route('/client/upload').post(adminPhotoUpload.single('avatar'), catchErrors(clientController.upload))

// //_____________________________________ API for Product Categories __________________________________________________
router.route('/productCategories/create').post(catchErrors(productCategoriesController.create));
router.route('/productCategories/read/:id').get(catchErrors(productCategoriesController.read));
router.route('/productCategories/update/:id').patch(catchErrors(productCategoriesController.update));
router.route('/productCategories/delete/:id').delete(catchErrors(productCategoriesController.delete));
router.route('/productCategories/search').get(catchErrors(productCategoriesController.search));
router.route('/productCategories/list').get(catchErrors(productCategoriesController.list));
router.route('/productCategories/filter').get(catchErrors(productCategoriesController.filter));
router.route('/productCategories/byParentId').post(catchErrors(productCategoriesController.getByParentId));


// //_____________________________________ API for Product Categories __________________________________________________
router.route('/checkoutProductLists/create').post(catchErrors(checkoutProductListsController.create));
router.route('/checkoutProductLists/read/:id').get(catchErrors(checkoutProductListsController.read));
router.route('/checkoutProductLists/update/:id').patch(catchErrors(checkoutProductListsController.update));
router.route('/checkoutProductLists/delete/:id').delete(catchErrors(checkoutProductListsController.delete));
router.route('/checkoutProductLists/search').get(catchErrors(checkoutProductListsController.search));
router.route('/checkoutProductLists/list').get(catchErrors(checkoutProductListsController.list));
router.route('/checkoutProductLists/filter').get(catchErrors(checkoutProductListsController.filter));
router.route('/checkoutProductLists/byParentId').post(catchErrors(checkoutProductListsController.getByParentId));

// //_____________________________________ API for Product Categories __________________________________________________
router.route('/systemInfo/create').post(catchErrors(systemInfoController.create));
router.route('/systemInfo/read/:id').get(catchErrors(systemInfoController.read));
router.route('/systemInfo/update/:id').patch(catchErrors(systemInfoController.update));
router.route('/systemInfo/delete/:id').delete(catchErrors(systemInfoController.delete));
router.route('/systemInfo/search').get(catchErrors(systemInfoController.search));
router.route('/systemInfo/list').get(catchErrors(systemInfoController.list));
router.route('/systemInfo/filter').get(catchErrors(systemInfoController.filter));
router.route('/systemInfo/byParentId').post(catchErrors(systemInfoController.getByParentId));

// //_____________________________________ API for Product Categories __________________________________________________
router.route('/paymentMethod/create').post(catchErrors(paymentMethodController.create));
router.route('/paymentMethod/read/:id').get(catchErrors(paymentMethodController.read));
router.route('/paymentMethod/update/:id').patch(catchErrors(paymentMethodController.update));
router.route('/paymentMethod/delete/:id').delete(catchErrors(paymentMethodController.delete));
router.route('/paymentMethod/search').get(catchErrors(paymentMethodController.search));
router.route('/paymentMethod/list').get(catchErrors(paymentMethodController.list));
router.route('/paymentMethod/filter').get(catchErrors(paymentMethodController.filter));
router.route('/paymentMethod/byParentId').post(catchErrors(paymentMethodController.getByParentId));


// //_____________________________________ API for Product Types __________________________________________________
router.route('/productTypes/create').post(catchErrors(productTypesController.create));
router.route('/productTypes/read/:id').get(catchErrors(productTypesController.read));
router.route('/productTypes/update/:id').patch(catchErrors(productTypesController.update));
router.route('/productTypes/delete/:id').delete(catchErrors(productTypesController.delete));
router.route('/productTypes/search').get(catchErrors(productTypesController.search));
router.route('/productTypes/list').get(catchErrors(productTypesController.list));
router.route('/productTypes/filter').get(catchErrors(productTypesController.filter));
router.route('/productTypes/byParentId').post(catchErrors(productTypesController.getByParentId));
// //_____________________________________ API for reservations __________________________________________________
router.route('/reservations/create').post(catchErrors(reservationsController.multiCreate));
router.route('/reservations/read/:id').get(catchErrors(reservationsController.read));
router.route('/reservations/update/:id').patch(catchErrors(reservationsController.update));
router.route('/reservations/delete/:id').delete(catchErrors(reservationsController.delete));
router.route('/reservations/search').get(catchErrors(reservationsController.search));
router.route('/reservations/list').get(catchErrors(reservationsController.list));
router.route('/reservations/filter').get(catchErrors(reservationsController.filter));
router.route('/reservations/byParentId').post(catchErrors(reservationsController.getByParentId));

// //_____________________________________ API for Customer Reversation __________________________________________________
router.route('/customerReversation/create').post(catchErrors(customerReversationController.multiCreate));
router.route('/customerReversation/read/:id').get(catchErrors(customerReversationController.read));
router.route('/customerReversation/update/:id').patch(catchErrors(customerReversationController.update));
router.route('/customerReversation/delete/:id').delete(catchErrors(customerReversationController.delete));
router.route('/customerReversation/search').get(catchErrors(customerReversationController.search));
router.route('/customerReversation/list').get(catchErrors(customerReversationController.list));
router.route('/customerReversation/filter').get(catchErrors(customerReversationController.filter));
router.route('/customerReversation/byParentId').post(catchErrors(customerReversationController.getByParentId));
router.route('/customerReversation/upload').post(reservationUpload.single('_file'), catchErrors(customerReversationController.reservationUpload));
// //_____________________________________ API for Customer Payment __________________________________________________
router.route('/paymentHistory/create').post(catchErrors(paymentHistoryController.multiCreate));
router.route('/paymentHistory/read/:id').get(catchErrors(paymentHistoryController.read));
router.route('/paymentHistory/update/:id').patch(catchErrors(paymentHistoryController.update));
router.route('/paymentHistory/delete/:id').delete(catchErrors(paymentHistoryController.delete));
router.route('/paymentHistory/search').get(catchErrors(paymentHistoryController.search));
router.route('/paymentHistory/list').get(catchErrors(paymentHistoryController.list));
router.route('/paymentHistory/filter').get(catchErrors(paymentHistoryController.filter));
router.route('/paymentHistory/byParentId').post(catchErrors(paymentHistoryController.getByParentId));
router.route('/paymentHistory/upload').post(reservationUpload.single('_file'), catchErrors(paymentHistoryController.reservationUpload));

// //_____________________________________ API for Log History __________________________________________________
router.route('/logHistory/create').post(catchErrors(logHistoryController.create));
router.route('/logHistory/multiCreate').post(catchErrors(logHistoryController.multiCreate));
router.route('/logHistory/read/:id').get(catchErrors(logHistoryController.read));
router.route('/logHistory/update/:id').patch(catchErrors(logHistoryController.update));
router.route('/logHistory/delete/:id').delete(catchErrors(logHistoryController.delete));
router.route('/logHistory/search').get(catchErrors(logHistoryController.search));
router.route('/logHistory/list').get(catchErrors(logHistoryController.list));
router.route('/logHistory/filter').get(catchErrors(logHistoryController.filter));
router.route('/logHistory/byParentId').post(catchErrors(logHistoryController.getByParentId));






module.exports = router;
