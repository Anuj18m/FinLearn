import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchModulesStart, fetchModulesSuccess, fetchModulesFailure } from '../store/moduleSlice';
import { moduleService } from '../services/apiService';
import ModuleModal from '../components/ModuleModal';

const Admin = () => {
  const { user } = useSelector((state) => state.auth);
  const { modules, loading } = useSelector((state) => state.modules);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      dispatch(fetchModulesStart());
      const data = await moduleService.getAllModules();
      dispatch(fetchModulesSuccess(data));
    } catch (error) {
      dispatch(fetchModulesFailure(error.message));
    }
  };

  const handleAddModule = () => {
    setSelectedModule(null);
    setIsModalOpen(true);
  };

  const handleEditModule = (module) => {
    setSelectedModule(module);
    setIsModalOpen(true);
  };

  const handleSaveModule = async (formData) => {
    try {
      setIsSaving(true);
      if (selectedModule) {
        // Update existing module
        await moduleService.updateModule(selectedModule._id, formData);
        alert('✅ Module updated successfully!');
      } else {
        // Create new module
        await moduleService.createModule(formData);
        alert('✅ Module created successfully!');
      }
      setIsModalOpen(false);
      fetchModules(); // Refresh list
    } catch (error) {
      alert('❌ Error saving module: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteModule = async (moduleId, title) => {
    if (confirm(`⚠️ Are you sure you want to delete "${title}"?`)) {
      try {
        await moduleService.deleteModule(moduleId);
        alert('✅ Module deleted successfully!');
        fetchModules(); // Refresh list
      } catch (error) {
        alert('❌ Error deleting module: ' + error.message);
      }
    }
  };

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Panel</h1>
        
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="text-3xl font-bold text-primary mb-2">{modules.length}</div>
            <div className="text-gray-600">Total Modules</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="text-3xl font-bold text-primary mb-2">50</div>
            <div className="text-gray-600">Total Quiz Questions</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="text-3xl font-bold text-accent mb-2">2</div>
            <div className="text-gray-600">Active Users</div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Manage Modules */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 Manage Modules</h2>
            <p className="text-gray-600 mb-6">
              Add, edit, or delete learning modules and update course content.
            </p>
            <button 
              onClick={handleAddModule}
              className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition font-semibold cursor-pointer"
            >
              ➕ Add New Module
            </button>
          </div>

          {/* Info Box */}
          <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-cyan-900 mb-4">💡 Quick Guide</h3>
            <ul className="text-cyan-800 space-y-2 text-sm">
              <li>✅ Click "Add New Module" to create a module</li>
              <li>✅ Click "Edit" next to a module to update it</li>
              <li>✅ Click "Delete" to remove a module</li>
              <li>⚠️ Deleted modules cannot be recovered</li>
            </ul>
          </div>
        </div>

        {/* Modules List */}
        {modules.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">📋 Available Modules ({modules.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-cyan-50 to-transparent border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Title</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Duration</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Slug</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {modules.map((module) => (
                    <tr key={module._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-semibold text-gray-800">{module.title}</td>
                      <td className="px-6 py-4 text-gray-600">{module.duration}</td>
                      <td className="px-6 py-4 text-gray-600 text-xs font-mono bg-gray-50 px-3 py-1 rounded">
                        {module.slug}
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        <button
                          onClick={() => handleEditModule(module)}
                          className="px-3 py-1 bg-primary text-white rounded hover:bg-secondary transition text-sm cursor-pointer"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDeleteModule(module._id, module.title)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm cursor-pointer"
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center mb-8">
            <p className="text-gray-600 text-lg">No modules found. Click "Add New Module" to create one.</p>
          </div>
        )}

        {/* Admin Info */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white">
          <h3 className="font-bold text-lg mb-2">🔒 Admin Privileges</h3>
          <p>
            You have full access to manage all modules. Changes will be reflected immediately to all users.
          </p>
        </div>
      </div>

      {/* Module Modal */}
      <ModuleModal
        isOpen={isModalOpen}
        module={selectedModule}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveModule}
        isLoading={isSaving}
      />
    </div>
  );
};

export default Admin;
