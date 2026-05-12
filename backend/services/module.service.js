import Module from '../models/Module.js';
import ApiError from '../utils/ApiError.js';

/**
 * Fetch all modules, sorted by their display order
 */
export const getModules = async () => {
  return await Module.find().sort({ order: 1 });
};

/**
 * Fetch a single module by its URL slug
 */
export const getModuleBySlug = async (slug) => {
  const module = await Module.findOne({ slug });
  if (!module) {
    throw new ApiError(404, `Learning module with slug '${slug}' not found`);
  }
  return module;
};

/**
 * Create a new module
 */
export const createModule = async (moduleData) => {
  const existingModule = await Module.findOne({ slug: moduleData.slug });
  if (existingModule) {
    throw new ApiError(400, 'A module with this slug already exists');
  }

  return await Module.create(moduleData);
};

/**
 * Update an existing module
 */
export const updateModule = async (id, updateData) => {
  const module = await Module.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true }
  );

  if (!module) {
    throw new ApiError(404, 'Module not found');
  }

  return module;
};

/**
 * Delete a module
 */
export const deleteModule = async (id) => {
  const module = await Module.findByIdAndDelete(id);
  if (!module) {
    throw new ApiError(404, 'Module not found');
  }
  return module;
};
