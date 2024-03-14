const apiRest = require('./apiRest');
const mongoose = require('mongoose');
exports.createCRUDController = (modelName, filter = []) => {
  var Model = mongoose.model(modelName);
  let crudMethods = {};

  if (!filter.includes('create')) {
    crudMethods.create = async (req, res) => {
      const modelSchema = Model.schema;
      const { db_name } = req.session;
      if (db_name) {
        try {

          Model = mongoose.model(`${db_name}_${modelName}`, modelSchema);
        } catch (error) {
          Model = mongoose.model(`${db_name}_${modelName}`)
        }
      } else {
        try {
          Model = mongoose.model(modelName, modelSchema);
        } catch (error) {
          Model = mongoose.model(modelName)
        }
      }

      apiRest.create(Model, req, res);
    };
  }
  if (!filter.includes('read')) {
    crudMethods.read = async (req, res) => {
      const modelSchema = Model.schema;
      const { db_name } = req.session;
      if (db_name) {
        try {

          Model = mongoose.model(`${db_name}_${modelName}`, modelSchema);
        } catch (error) {
          Model = mongoose.model(`${db_name}_${modelName}`)
        }
      } else {
        try {
          Model = mongoose.model(modelName, modelSchema);
        } catch (error) {
          Model = mongoose.model(modelName)
        }
      }
      apiRest.read(Model, req, res);
    };
  }
  if (!filter.includes('multiCreate')) {
    crudMethods.multiCreate = async (req, res) => {
      apiRest.multiCreate(Model, req, res);
    };
  }
  if (!filter.includes('reservationUpload')) {
    crudMethods.reservationUpload = async (req, res) => {
      apiRest.reservationUpload(Model, req, res);
    };
  }
  if (!filter.includes('update')) {
    crudMethods.update = async (req, res) => {
      const modelSchema = Model.schema;
      const { db_name } = req.session;
      if (db_name) {
        try {

          Model = mongoose.model(`${db_name}_${modelName}`, modelSchema);
        } catch (error) {
          Model = mongoose.model(`${db_name}_${modelName}`)
        }
      } else {
        try {
          Model = mongoose.model(modelName, modelSchema);
        } catch (error) {
          Model = mongoose.model(modelName)
        }
      }
      apiRest.update(Model, req, res);
    };
  }
  if (!filter.includes('delete')) {
    crudMethods.delete = async (req, res) => {
      const modelSchema = Model.schema;
      const { db_name } = req.session;
      if (db_name) {
        try {
          Model = mongoose.model(`${db_name}_${modelName}`, modelSchema);
        } catch (error) {
          Model = mongoose.model(`${db_name}_${modelName}`)
        }
      } else {
        try {
          Model = mongoose.model(modelName, modelSchema);
        } catch (error) {
          Model = mongoose.model(modelName)
        }
      }
      apiRest.delete(Model, req, res);
    };
  }
  if (!filter.includes('list')) {

    crudMethods.list = async (req, res) => {


      const modelSchema = Model.schema;
      const { db_name } = req.session;
      if (!req.url.includes('company') && db_name) {
        try {

          Model = mongoose.model(`${db_name}_${modelName}`, modelSchema);
        } catch (error) {
          Model = mongoose.model(`${db_name}_${modelName}`)
        }
      } else {
        try {
          Model = mongoose.model(modelName, modelSchema);
        } catch (error) {
          Model = mongoose.model(modelName)
        }
      }
      apiRest.list(Model, req, res, modelName);
    };
  }
  if (!filter.includes('search')) {
    crudMethods.search = async (req, res) => {
      const modelSchema = Model.schema;
      const { db_name } = req.session;
      if (db_name) {
        try {

          Model = mongoose.model(`${db_name}_${modelName}`, modelSchema);
        } catch (error) {
          Model = mongoose.model(`${db_name}_${modelName}`)
        }
      } else {
        try {
          Model = mongoose.model(modelName, modelSchema);
        } catch (error) {
          Model = mongoose.model(modelName)
        }
      }
      apiRest.search(Model, req, res);
    };
  }
  if (!filter.includes('filter')) {
    crudMethods.filter = async (req, res) => {
      const modelSchema = Model.schema;
      const { db_name } = req.session;
      if (db_name) {
        try {

          Model = mongoose.model(`${db_name}_${modelName}`, modelSchema);
        } catch (error) {
          Model = mongoose.model(`${db_name}_${modelName}`)
        }
      } else {
        try {
          Model = mongoose.model(modelName, modelSchema);
        } catch (error) {
          Model = mongoose.model(modelName)
        }
      }
      apiRest.filter(Model, req, res);
    };
  }
  if (!filter.includes('status')) {
    crudMethods.status = async (req, res) => {
      const modelSchema = Model.schema;
      const { db_name } = req.session;
      if (db_name) {
        try {

          Model = mongoose.model(`${db_name}_${modelName}`, modelSchema);
        } catch (error) {
          Model = mongoose.model(`${db_name}_${modelName}`)
        }
      } else {
        try {
          Model = mongoose.model(modelName, modelSchema);
        } catch (error) {
          Model = mongoose.model(modelName)
        }
      }
      apiRest.status(Model, req, res);
    };
  }
  if (!filter.includes('getFilterbyDate')) {
    crudMethods.getFilterbyDate = async (req, res) => {
      const modelSchema = Model.schema;
      const { db_name } = req.session;
      if (db_name) {
        try {

          Model = mongoose.model(`${db_name}_${modelName}`, modelSchema);
        } catch (error) {
          Model = mongoose.model(`${db_name}_${modelName}`)
        }
      } else {
        try {
          Model = mongoose.model(modelName, modelSchema);
        } catch (error) {
          Model = mongoose.model(modelName)
        }
      }
      apiRest.getFilterbyDate(Model, req, res);
    };
  }
  if (!filter.includes('byParentId')) {
    crudMethods.getByParentId = async (req, res) => {
      const modelSchema = Model.schema;
      const { db_name } = req.session;
      if (db_name) {
        try {

          Model = mongoose.model(`${db_name}_${modelName}`, modelSchema);
        } catch (error) {
          Model = mongoose.model(`${db_name}_${modelName}`)
        }
      } else {
        try {
          Model = mongoose.model(modelName, modelSchema);
        } catch (error) {
          Model = mongoose.model(modelName)
        }
      }
      apiRest.getByParentId(Model, req, res);
    };
  }
  if (!filter.includes('upload')) {
    crudMethods.upload = async (req, res) => {
      const modelSchema = Model.schema;
      const { db_name } = req.session;
      if (db_name) {
        try {

          Model = mongoose.model(`${db_name}_${modelName}`, modelSchema);
        } catch (error) {
          Model = mongoose.model(`${db_name}_${modelName}`)
        }
      } else {
        try {
          Model = mongoose.model(modelName, modelSchema);
        } catch (error) {
          Model = mongoose.model(modelName)
        }
      }
      apiRest.upload(Model, req, res);
    };
  }
  if (!filter.includes('_upload')) {
    crudMethods._upload = async (req, res) => {
      const modelSchema = Model.schema;
      const { db_name } = req.session;
      if (db_name) {
        try {

          Model = mongoose.model(`${db_name}_${modelName}`, modelSchema);
        } catch (error) {
          Model = mongoose.model(`${db_name}_${modelName}`)
        }
      } else {
        try {
          Model = mongoose.model(modelName, modelSchema);
        } catch (error) {
          Model = mongoose.model(modelName)
        }
      }
      apiRest._upload(Model, req, res);
    };
  }
  return crudMethods;
};
