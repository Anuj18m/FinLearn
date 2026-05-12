import express from 'express';
import * as moduleController from '../controllers/module.controller.js';
import * as moduleValidation from '../validations/module.validation.js';
import validate from '../middleware/validate.js';
import { auth } from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';

const router = express.Router();

/**
 * @route   GET /api/modules
 * @desc    Get all modules
 * @access  Public
 */
router.get('/', moduleController.getAllModules);

/**
 * @route   GET /api/modules/:slug
 * @desc    Get module by slug
 * @access  Public
 */
router.get('/:slug', moduleController.getModuleBySlug);

/**
 * @route   POST /api/modules
 * @desc    Create a new module
 * @access  Private/Admin
 */
router.post(
  '/', 
  auth, 
  authorize('admin'), 
  validate(moduleValidation.createModule), 
  moduleController.createModule
);

/**
 * @route   PUT /api/modules/:id
 * @desc    Update a module
 * @access  Private/Admin
 */
router.put(
  '/:id', 
  auth, 
  authorize('admin'), 
  validate(moduleValidation.updateModule), 
  moduleController.updateModule
);

/**
 * @route   DELETE /api/modules/:id
 * @desc    Delete a module
 * @access  Private/Admin
 */
router.delete(
  '/:id', 
  auth, 
  authorize('admin'), 
  moduleController.deleteModule
);

export default router;
