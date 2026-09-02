const mongoose = require('mongoose');

/*es la forma correcta y recomendada usar const 
asegura que la referencia al esquema no se pueda reasignar más adelante.
El objeto interno sí puede modificarse, pero la variable siempre seguirá
apuntando al mismo esquema.*/

const historiaClinicaSchema = new mongoose.Schema({
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: [true, 'El paciente es obligatorio'],
    },
    /*  grupoSanguineo:{
	    type: String,
	    required:true,
	    match: /^(A|B|AB|O)[+-]$|^No sabe$/  // acepta A+, A-, B+, B-, AB+, AB-, O+, O- Hay gente que no se acuerda de su grupo sanguíneo, por lo que se permite "No sabe" como valor válido   
	}, */

    fecha: {
        type: Date,
        required: [true, 'La fecha es obligatoria']         
    },
    motivoConsulta: {
        type: String,
        required: [true, 'El motivo de la consulta es obligatorio'] 
    },
    diagnostico: {
        type: String,
        required: [true, 'El diagnóstico es obligatorio']
    },
    tratamiento: {
        type: String,
        required: [true, 'El tratamiento es obligatorio']
    },
    /*puede ser un medico de otro nosocomio?*/
    medico: {
        type: String,
        required: [true, 'El nombre del médico es obligatorio'] 
    }
}, {
    timestamps: true
}); 

    //historiaClinica:{ //genero objetos separados para tener un mejor acceso y ordenamiento de la información ante consultas puntuales, 
                        //ya que la historia clínica puede ser extensa y compleja.
                        //otros campos a considerar podrian ser: antecedentes familiares, medicación actual, alergias a medicamentos, etc.
                        //podria haber datos relevantes segun la especialidad medica, por ej.: antecedentes obstetricos para ginecologia,
                        //antecedentes cardiacos para cardiologia, etc.
	//    alergias: [{ type: String }], /*arreglo de strings para realizar busquedas refinadas */
    //   cirugias: [{ type: String }],
    //   enfermedadesCronicas: [{ type: String }],
    //   historiaGeneral: { type: String } /* info no especifica pero relevante*/
	//}



// Transformación del objeto a JSON
historiaClinicaSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('HistoriaClinica', historiaClinicaSchema);