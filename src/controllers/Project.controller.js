const Joi = require('joi');
const httpStatus = require('http-status-codes');
const ProjectModel = require('../models/Project.model');

const projectSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  imageUrl: Joi.string().required(),
  repositoryUrl: Joi.string().required(),
  projectUrl: Joi.string().required(),
  tags: Joi.array().items(Joi.string())
});

const projectSchemaUpdate = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  imageUrl: Joi.string(),
  repositoryUrl: Joi.string(),
  projectUrl: Joi.string(),
  tags: Joi.array().items(Joi.string())
});

const findAll = async (_, res) => {
  try {
    const allProjects = await ProjectModel.findAll();
    return res.status(httpStatus.OK).json(allProjects);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Ocorreu um erro interno no servidor.' });
  };
};

const create = async (req, res) => {
  const { error, value } = projectSchema.validate(req.body);
  if (error) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: error.details[0].message });
  }
  try {
    const createdProject = await ProjectModel.create(value);
    return res.status(httpStatus.CREATED).json(createdProject);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Ocorreu um erro interno no servidor.' });
  }
};

const update = async (req, res) => {
  try {
    const project = await ProjectModel.findOne({ where: { id: req.params.id } });

    if (!project) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "Projeto não encontrado." });
    }

    const { error, value } = projectSchemaUpdate.validate(req.body);

    if (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: error.details[0].message });
    }

    const updatedProject = await project.update(value);
    return res.status(httpStatus.OK).json(updatedProject);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Ocorreu um erro interno no servidor.' });
  }
};

const remove = async (req, res) => {
  try {
    const project = await ProjectModel.findOne({ where: { id: req.params.id } });

    if (!project) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "Projeto não encontrado." });
    }

    await project.destroy();
    return res.status(httpStatus.OK).json({ message: "Projeto excluído com sucesso!" });

  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Ocorreu um erro interno no servidor.' });
  };
};

module.exports = {
  findAll,
  create,
  update,
  remove
};