const mongoose = require('mongoose');

especialidadSchema = new mongoose.Schema({

    especialidadNombre:{ 
        type: String,
        required: [true,'La especialidad es obligatoria'],
        unique: true,
        uppercase: true
       /*las tengo que llenar cuando se cargan y puede haber muchas mas que esa lista */ 
       // enum: {
       //     values: ['CARDIOLOGÍA', 'NEUROLOGÍA', 'PEDIATRÍA', 
       //            'TRAUMATOLOGÍA','ODONTOLOGÍA','OFTALMOLOGÍA'],
       //    message: '(VALUE) La especialidad no es válida' /*(VALUE) placeholder de Mongoose. */
       //
    }
},
{timesstamps: true},
);

especialidadSchema.set('toJSON', {
    transform: (documento, especialidadRetorno) => {
        especialidadRetorno.id = especialidadRetorno._id;
        delete especialidadRetorno._id;
        delete especialidadRetorno.__v;
        delete especialidadRetorno.createdAt; /*borra los campos agregados por el timestamps */
        delete especialidadRetorno.updatedAt;
    }
}
);

module.exports = mongoose.model("Especialidad", especialidadSchema)