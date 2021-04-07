const{Nota, Checklist, Tag} = require('../models');
const controller = {};

controller.getById = async (id) => {
    return await Nota.findOne({
        where: {
            id
        }
    })

}


controller.getByUsuario = async (usuarioId) => {};

module.exports = controller;