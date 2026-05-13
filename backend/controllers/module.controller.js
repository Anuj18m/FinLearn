import asyncHandler from '../utils/asyncHandler.js';
import * as moduleService from '../services/module.service.js';
import ApiResponse from '../utils/ApiResponse.js';

/**
 * @desc    Get all modules
 * @route   GET /api/modules
 * @access  Public
 */
export const getAllModules = asyncHandler(async (req, res) => {
  const modules = await moduleService.getModules();
  res.json(new ApiResponse(200, modules, 'Modules retrieved successfully'));
});

/**
 * @desc    Get module by slug
 * @route   GET /api/modules/:slug
 * @access  Public
 */
export const getModuleBySlug = asyncHandler(async (req, res) => {
  const module = await moduleService.getModuleBySlug(req.params.slug);
  res.json(new ApiResponse(200, module, 'Module retrieved successfully'));
});

/**
 * @desc    Create a new module
 * @route   POST /api/modules
 * @access  Private/Admin
 */
export const createModule = asyncHandler(async (req, res) => {
  const module = await moduleService.createModule(req.body);
  res.status(201).json(new ApiResponse(201, module, 'Module created successfully'));
});

/**
 * @desc    Update a module
 * @route   PUT /api/modules/:id
 * @access  Private/Admin
 */
export const updateModule = asyncHandler(async (req, res) => {
  const module = await moduleService.updateModule(req.params.id, req.body);
  res.json(new ApiResponse(200, module, 'Module updated successfully'));
});

/**
 * @desc    Delete a module
 * @route   DELETE /api/modules/:id
 * @access  Private/Admin
 */
export const deleteModule = asyncHandler(async (req, res) => {
  await moduleService.deleteModule(req.params.id);
  res.json(new ApiResponse(200, null, 'Module deleted successfully'));
});
