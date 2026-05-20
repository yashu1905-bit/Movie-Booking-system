const { successResponse } = require('../utils/responseFormatter');
const AppError = require('../errors/AppError');

class BaseController {
  constructor(service, modelName) {
    this.service = service;
    this.modelName = modelName;
  }

  createOne = async (req, res, next) => {
    try {
      const doc = await this.service.create(req.body);
      const NotificationService = require('../services/NotificationService');
      await NotificationService.notifyAdmins(
        `New ${this.modelName} Created`, 
        `A new ${this.modelName.toLowerCase()} identity has been freshly provisioned in the database.`, 
        'success'
      );
      return successResponse(res, doc, `${this.modelName} created successfully`, 201);
    } catch (error) { next(error); }
  };

  getAll = async (req, res, next) => {
    try {
      const filter = req.query || {};
      const docs = await this.service.getAll(filter);
      return successResponse(res, docs, `${this.modelName}s retrieved successfully`, 200);
    } catch (error) { next(error); }
  };

  getOne = async (req, res, next) => {
    try {
      const doc = await this.service.getById(req.params.id);
      if (!doc) return next(new AppError('No matching document found', 404));
      return successResponse(res, doc, `${this.modelName} retrieved successfully`, 200);
    } catch (error) { next(error); }
  };

  updateOne = async (req, res, next) => {
    try {
      const doc = await this.service.update(req.params.id, req.body);
      if (!doc) return next(new AppError('No matching document found to update', 404));
      const NotificationService = require('../services/NotificationService');
      await NotificationService.notifyAdmins(
        `${this.modelName} Updated`, 
        `A database modification was recently applied to a ${this.modelName.toLowerCase()} record.`, 
        'info'
      );
      return successResponse(res, doc, `${this.modelName} updated successfully`, 200);
    } catch (error) { next(error); }
  };

  deleteOne = async (req, res, next) => {
    try {
      const doc = await this.service.delete(req.params.id);
      if (!doc) return next(new AppError('No matching document found to delete', 404));
      const NotificationService = require('../services/NotificationService');
      await NotificationService.notifyAdmins(
        `${this.modelName} Deleted`, 
        `A massive entity deletion was just confirmed executing across the backend removing a ${this.modelName.toLowerCase()}.`, 
        'warning'
      );
      return successResponse(res, null, `${this.modelName} deleted successfully`, 200);
    } catch (error) { next(error); }
  };
}

module.exports = BaseController;
