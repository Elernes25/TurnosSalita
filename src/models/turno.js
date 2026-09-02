const mongoose = require('mongoose');
const type = require('mongoose/lib/schema/operators/type');
turnoSchema = new mongoose.Schema({
    
   /* especialidad:{
        type: String,
        required: [true,'La especialidad es obligatoria'],
        enum: {
            values: ['Cardiología', 'Neurología', 'Pediatría', 'Traumatología','Odontología','Oftalmología'],
            message: '(VALUE) La especialidad no es válida' 
        }
        },
    */
    especialidad:{
        type: mongoose.Schema.Types.ObjectId,   // referencia a un ID de Mongo
        ref: "Especialidad",                        // nombre del modelo relacionado
        required: [true,'La especialidad es obligatoria']
    },

    fechaTurno: {
        type: Date,
        required: [true, 'La fecha del turno es obligatoria'],
        validate: {
            validator: function(value) {            /*validación personalizada en Mongoose */
                return value >= new Date();         /*validate:{ valida}*/
            },
            message: 'La fecha del turno debe ser una fecha futura'
        }
    },
    estado: {
        type: String,
        enum:{ 
            values:['pendiente', 'atendido', 'cancelado'],
            default: 'pendiente',   //opcional
            message: '{VALUE} El estado del turno no es válido' /*{VALUE} o (VALUE) son equivalentes */
        }
    },
    
    observaciones: {
        type: String,
    },

    activo: {
        type: Boolean,
        default: true,
        select: false /*para que no se muestre en las consultas por defecto, pero si se puede consultar explícitamente */
    },
    paciente: {
	    type: mongoose.Schema.Types.ObjectId,   // referencia a un ID de Mongo
	    ref: "Paciente",                        // nombre del modelo relacionado
	    required: true
  }

},{
    timestamps: true,
}
);


turnoSchema.set('toJSON', {
    transform: (documento, turnoRetorno) => {
        turnoRetorno.id = turnoRetorno._id;
        delete turnoRetorno._id;
        delete turnoRetorno.__v;
        delete turnoRetorno.createdAt; /*borra los campos agregados por el timestamps */
        delete turnoRetorno.updatedAt;
    }
});

/*transform: función para modificar el objeto antes de devolverlo.
virtuals: incluir campos virtuales en el JSON.
getters: aplicar getters definidos en el esquema.
versionKey: mostrar u ocultar el campo __v.
minimize: eliminar objetos vacíos o conservarlos.            <-----
depopulate: convertir documentos populados en ObjectId.
flattenMaps: convertir campos tipo Map en objetos planos.
useProjection: respetar la proyección (select) al convertir a JSON. */


module.exports = mongoose.model('Turno', turnoSchema);
