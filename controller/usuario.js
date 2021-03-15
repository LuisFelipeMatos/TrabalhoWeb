const database =  require('../models');
const controller = {};

controller.getUsuarios =  () => {
    return[
        {
           nome: 'Alan',
        },
        {
            nome: 'tião',
         },
    ];
};

module.exports = controller;