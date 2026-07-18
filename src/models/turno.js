const mongoose = require('mongoose');
turnoSchema = new mongoose.Schema({
    paciente:{
        type: String,
        required: [true,'El nombre del paciente es obligatorio'],
        uppercase: true
             },
    
    dni:{
            type: String,
            required: [true,'El DNI es obligatorio'],
            //match: [/^\d{8,10}$/, 'El DNI debe tener 8 dígitos'] expresiones regulares para validar el formato del DNI    
            match: [/^\d[0-9]{7,8}$/, 'El DNI debe tener entre 7 y 8 dígitos'] // expresi ones regulares para validar el formato del DNI
        },
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
},{
    timestamps: true,
}
);


turnoSchema.set('toJSON', {
    transform: (documento, turnoRetorno) => {
        turnoRetorno.id = turnoRetorno._id;
        delete turnoRetorno._id;
        delete turnoRetorno.__v;
    }
});


module.exports = mongoose.model('Turno', turnoSchema);
