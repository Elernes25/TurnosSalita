const mongoose = require('mongoose');
pacienteSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: [true,'El nombre del paciente es obligatorio'],
        uppercase: true
         },
     dni:{
            type: String,
            required: [true,'El DNI es obligatorio'],
            match: [/^\d[0-9]{7,8}$/, 'El DNI debe tener entre 7 y 8 dígitos'] 
        },
    fechaDeNacimiento:{
	    type: Date,
	    required:true
	},
    sexo:{ 
        type: String,      
	    enum: {
            values: ['FEMENINO', 'MASCULINO'],          //**//
            message: '(VALUE) El sexo no es válido'
        },
	    required:true
	},
    direccion:{
	    type: String,
	    required: [true,'La dirección es obligatoria'],
	},
    telefono:{
	    type: String,
	    required:false
	},
    tieneObraSocial:{
	    type: Boolean,
	    required: [true,'La información de obra social es obligatoria']
	},
    obraSocialNombre: {
	    type: String,
	    required: function() { return this.tieneObraSocial; } //referencia al campo tieneObraSocial para que sea obligatorio solo si el paciente tiene obra social
	},
    grupoSanguineo:{
	    type: String,
	    required:true,
	    match: /^(A|B|AB|O)[+-]$|^No sabe$/  // acepta A+, A-, B+, B-, AB+, AB-, O+, O- Hay gente que no se acuerda de su grupo sanguíneo, por lo que se permite "No sabe" como valor válido   
	},
    historiaClinica:{ //genero objetos separados para tener un mejor acceso y ordenamiento de la información ante consultas puntuales, 
                        //ya que la historia clínica puede ser extensa y compleja.
                        //otros campos a considerar podrian ser: antecedentes familiares, medicación actual, alergias a medicamentos, etc.
                        //podria haber datos relevantes segun la especialidad medica, por ej.: antecedentes obstetricos para ginecologia,
                        //antecedentes cardiacos para cardiologia, etc.
	    alergias: { type: String },
        cirugias: { type: String },
        enfermedadesCronicas: { type: String },
        historiaGeneral: { type: String } /* info no especifica pero relevante*/
	}
})

//nombre del modelo: Paciente con mayuscula//
module.exports = mongoose.model("Paciente", pacienteSchema)