const mongoose = require('mongoose');
especialidadSchema = new mongoose.Schema({

    especialidadNombre:{ 
        type: String,
        required: [true,'La especialidad es obligatoria'],
        enum: {
            values: ['CARDIOLOGÍA', 'NEUROLOGÍA', 'PEDIATRÍA', 
                    'TRAUMATOLOGÍA','ODONTOLOGÍA','OFTALMOLOGÍA'],
            message: '(VALUE) La especialidad no es válida' /*(VALUE) placeholder de Mongoose. */
        }
    }
},
{timesstamps: true},
);

especialidadNombreSchema.set('toJSON', {
    transform: (documento, especialidadRetorno) => {
        especialidadRetorno.id = especialidadRetorno._id;
        delete especialidadRetorno._id;
        delete especialidadRetorno.__v;
        delete especialidadRetorno.createdAt; /*borra los campos agregados por el timestamps */
        delete especialidadRetorno.updatedAt;
    }
}
);

module.exports = mongoose.model("Especilidad", pacienteSchema)