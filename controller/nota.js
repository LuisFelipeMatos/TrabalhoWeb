const{Nota, Checklist, Tag, sequelize} = require('../models');
const controller = {};

controller.getById = async (id) => {
    return await Nota.findOne({
        where: {
            id,
        },
        include:[
            {
                model: Checklist,
                as:'checklists',
            },
            {
                model: Tag,
                as: 'tags',
            },
        ]
    });

};


controller.getByUsuarioId = async (usuarioId , tagName = null) => {
    const where = null;

if(tagName){
    where = { nome: tagName }
}

    return await Nota.findAll({
        where: {
            usuarioId
        },
        include: [
            {
                model: Checklist,
                as:'checklists',
            },
            {
                model: Tag,
                as: 'tags',
               where,
                required: true,
            },
        ]
    })
};

controller.save = async ({ usuarioId, titulo = null, descricao = null, checklists = [], tags = [] }) => {
    const transaction = await sequelize.transaction();


    try{
        let {dataValeus} = await Nota.create({
            usuarioId, titulo, descricao,
        },
        {
            transaction,
        }
        
        );

        let notaSalva = dataValeus;

        let checklistsSalvos = [];

    if(checklists.length > 0){
        for(let checklist of checklists){
            checklist = {...checklist, notaId: notaSalva.id};


            const checklistSalvo = await Checklist.create(checklist, {
                transaction,
            });

            checklistsSalvos.push(checklistSalvo);

        }
    }

        let tagsSalvas = [];

        if(tags.length > 0){
        for (let tag of tags) {
            tag = {...tag, notaId: notaSalva.id};
            const tagSalva = await Tag.create(tag,{
                transaction,
            });

            tagsSalvas = [...tagsSalvas, tagSalva];

        }
    }

    notaSalva = {...notaSalva, checklists: checklistsSalvos, tags: tagsSalvas};

        await transaction.commit();
        
        notaSalva = {...notaSalva, checklists: checklistsSalvos, tags: tagsSalvas };
        
        return notaSalva;

    } catch(error) {
        console.log(error);
        await transaction.rollback();

    }


};

controller.edit = async ({ usuarioId, titulo = null, descricao = null, checklists = [], tags = [] }) => {
    const transaction = await sequelize.transaction();


    try{
        let {dataValeus} = await Nota.update({
            usuarioId, titulo, descricao,
        },
        {
            transaction,
        }
        
        );

        let notaEdit = dataValeus;

        let checklistsEdits = [];

    if(checklists.length > 0){
        for(let checklist of checklists){
            checklist = {...checklist, notaId: notaEdit.id};


            const checklistEdit = await Checklist.update(checklist, {
                transaction,
            });

            checklistsEdits.push(checklistEdit);

        }
    }

        let tagsEdits = [];

        if(tags.length > 0){
        for (let tag of tags) {
            tag = {...tag, notaId: notaSalva.id};
            const tagEdit = await Tag.update(tag,{
                transaction,
            });

            tagsEdits = [...tagsEdits, tagEdit];

        }
    }

    notaEdit = {...notaEdit, checklists: checklistsEdits, tags: tagsEdits};

        await transaction.commit();
        
        notaEdit = {...notaEdit, checklists: checklistsEdits, tags: tagsEdits };
        
        return notaSalva;

    } catch(error) {
        console.log(error);
        await transaction.rollback();

    }


};

module.exports = controller;