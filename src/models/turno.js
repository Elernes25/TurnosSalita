const mongoose = require('mongoose');
turnoSchema = new mongoose.Schema({
    
    especialidad:{
        type: String,
        required: [true,'La especialidad es obligatoria'],
        enum: {
            values: ['Cardiología', 'Neurología', 'Pediatría', 'Traumatología','Odontología','Oftalmología'],
            message: '(VALUE) La especialidad no es válida'
        }
        },
    fechaTurno: {
        type: Date,
        required: [true, 'La fecha del turno es obligatoria'],
        validate: {
            validator: function(value) {
                return value >= new Date();
            },
            message: 'La fecha del turno debe ser una fecha futura'
        }
    },
    estado: {
        type: String,
        enum:{ 
            values:['pendiente', 'atendido', 'cancelado'],
            default: 'pendiente',   //opcional
            message: '{VALUE} El estado del turno no es válido'
        }
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


module.exports = mongoose.model('Turno', turnoSchema);
