// controllers/projectController.js
const Project = require('../models/Project');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');
const { logAction } = require('../utils/auditLogger');

// Helper to parse stringified JSON fields from multipart form
const parseJsonField = (val) => { try { return typeof val === 'string' ? JSON.parse(val) : val; } catch { return val; } };

// GET /api/projects
exports.getProjects = asyncHandler(async (req, res) => {
  const page  = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 50;
  const skip  = (page - 1) * limit;

  const filter = {};
  if (req.query.search)     filter.title = { $regex: req.query.search, $options: 'i' };
  if (req.query.category)   filter.category = req.query.category;
  if (req.query.featured)   filter.featured = req.query.featured === 'true';
  if (req.query.status)     filter.status = req.query.status;
  // Public visitors only see published + public projects
  if (!req.admin) {
    filter.visibility = 'Public';
    filter.published = true;
  }

  const sortField = req.query.sort || '-createdAt';
  const total = await Project.countDocuments(filter);
  const projects = await Project.find(filter).populate('teamMembers', 'fullName profilePhoto').sort(sortField).skip(skip).limit(limit);

  res.json(new ApiResponse(200, { projects, pagination: { page, limit, total, pages: Math.ceil(total / limit) } }, 'Projects fetched'));
});

// GET /api/projects/:id
exports.getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate('teamMembers', 'fullName profilePhoto designation');
  if (!project) throw new ApiError(404, 'Project not found');
  res.json(new ApiResponse(200, project, 'Project fetched'));
});

// POST /api/projects (protected)
exports.createProject = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.files) {
    if (req.files.thumbnailImage) data.thumbnailImage = req.files.thumbnailImage[0].path;
    if (req.files.galleryImages)  data.galleryImages = req.files.galleryImages.map(f => f.path);
  }
  data.techStack      = parseJsonField(data.techStack);
  data.teamMembers    = parseJsonField(data.teamMembers);
  data.demoVideoLinks = parseJsonField(data.demoVideoLinks);

  const project = await Project.create(data);
  await logAction(req.admin._id, 'CREATE', 'Project', project._id, { title: project.title });
  res.status(201).json(new ApiResponse(201, project, 'Project created'));
});

// PUT /api/projects/:id (protected)
exports.updateProject = asyncHandler(async (req, res) => {
  let project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, 'Project not found');

  const data = { ...req.body };
  if (req.files) {
    if (req.files.thumbnailImage) data.thumbnailImage = req.files.thumbnailImage[0].path;
    if (req.files.galleryImages) {
      data.galleryImages = [...project.galleryImages, ...req.files.galleryImages.map(f => f.path)];
    }
  }
  data.techStack      = parseJsonField(data.techStack);
  data.teamMembers    = parseJsonField(data.teamMembers);
  data.demoVideoLinks = parseJsonField(data.demoVideoLinks);

  project = await Project.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  await logAction(req.admin._id, 'UPDATE', 'Project', project._id, { title: project.title });
  res.json(new ApiResponse(200, project, 'Project updated'));
});

// DELETE /api/projects/:id (protected)
exports.deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, 'Project not found');
  await project.deleteOne();
  await logAction(req.admin._id, 'DELETE', 'Project', project._id, { title: project.title });
  res.json(new ApiResponse(200, {}, 'Project deleted'));
});

// POST /api/projects/:id/duplicate (protected)
exports.duplicateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, 'Project not found');

  const dup = project.toObject();
  delete dup._id; delete dup.createdAt; delete dup.updatedAt;
  dup.title = `${dup.title} (Copy)`;
  dup.status = 'Planned';

  const newProject = await Project.create(dup);
  await logAction(req.admin._id, 'DUPLICATE', 'Project', newProject._id, { originalId: project._id });
  res.status(201).json(new ApiResponse(201, newProject, 'Project duplicated'));
});
