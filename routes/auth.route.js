const express = require('express');
const passport = require('passport');
const authController = require('../controllers/auth.controller.');
const {authenticateJWT} = require("../middlewares/auth.middleware");

const router = express.Router();

// Signup and login routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), authController.googleLoginCallback);

// Other user actions
router.post('/logout', authenticateJWT, authController.logout);

module.exports = router;
