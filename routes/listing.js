const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validatelisting} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer = require('multer');
const {storage} = require("../CloudConfig.js");
const upload = multer({storage});

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post( isLoggedIn , upload.single('listing[image]'),validatelisting,wrapAsync(listingController.createListing));
 

//New route
router.get("/new", isLoggedIn, listingController.renderNewForm);


  router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(isLoggedIn,isOwner, upload.single('listing[image]'), validatelisting ,wrapAsync(listingController.updateListing))
  .delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));


//Index Route
// router.get("/",wrapAsync(listingController.index));

//New route
// router.get("/new", isLoggedIn, listingController.renderNewForm);
    // console.log(req.user);
    // if(!req.isAuthenticated()) {
    //     req.flash("error", "you must be logged in to created listings");
    //    return res.redirect("/login");
    // }





//Create Route
// router.post("/", isLoggedIn,validatelisting ,wrapAsync(listingController.createListing));

//Edit route
router.get("/:id/edit", isLoggedIn, isOwner,wrapAsync(listingController.renderEditForm));

//Update Route
// router.put("/:id",isLoggedIn,isOwner, validatelisting ,wrapAsync(listingController.updateListing));

//Delete Route
// router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));
module.exports = router;