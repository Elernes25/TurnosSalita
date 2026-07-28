const mongoose = require('mongoose');
pacienteSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: [true,'El nombre del paciente es obligatorio'],
        uppercase: true
         },
     dni:{
            type: String,
            unique: true,
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

/* telefono: {
        { tipo: type: String,
          enum: {
                values: ['CELULAR', 'FIJO'],
                 message: '(VALUE) TIPO DE CELULAR NO VALIDO'
           } , 
        codigoArea: { type: String },
        numero: { type: String }
        },
        required:false
    },*/
    
    email:{
        type: String,
        required: false,
        match: [/\S+@\S+\.\S+/, 'El correo electrónico no es válido'] 
    },

    tieneObraSocial:{
	    type: Boolean,
	    required: [true,'La información de obra social es obligatoria']
	},
    obraSocialNombre: {
	    type: String,
        /*enum: ['PAMI', 'OSDE', 'IOMA', 'NINGUNA'], //hay mas de 40 obras sociales en el pais 
        index: true,*/
	    required: function() { return this.tieneObraSocial; } //referencia al campo tieneObraSocial para que sea obligatorio solo si el paciente tiene obra social
	},
/*Obra social o prepaga (nombre de la entidad).
    Número de afiliado 
    Plan médico (determina el nivel de cobertura).
    categoría de afiliación (titular o familiar).
    obraSocial:{
        nombre: { type: String, required: function() { return this.tieneObraSocial; } },
        numeroAfiliado: { type: String, required: function() { return this.tieneObraSocial; } },
        planMedico: { type: String, required: function() { return this.tieneObraSocial; } }
    }
*/

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
	    alergias: [{ type: String }], /*arreglo de strings para realizar busquedas refinadas */
        cirugias: [{ type: String }],
        enfermedadesCronicas: [{ type: String }],
        historiaGeneral: { type: String } /* info no especifica pero relevante*/
	}
},
{timesstamps: true},

);/*agrega createdAt y updatedAt automáticamente*/


/*pacienteSchema.virtual('edad').get(function() 
    { // Calculamos los años de diferencia entre hoy y su fecha de nacimiento const hoy = new Date();
const nacimiento = new Date(this.fechaNacimiento); 
return hoy.getFullYear() - nacimiento.getFullYear(); 
}); // Para que el JSON final incluya estos campos "fantasma",
//  debemos avisarle al toJSON: 
// pacienteSchema.set('toJSON', { virtuals: true });*/


pacienteSchema.set('toJSON', {
    transform: (documento, pacienteRetorno) => {
        pacienteRetorno.id = pacienteRetorno._id;
        delete pacienteRetorno._id;
        delete pacienteRetorno.__v;
        delete pacienteRetorno.createdAt; /*borra los campos agregados por el timestamps */
        delete pacienteRetorno.updatedAt;
    }
    //<------- agregar virtuals despues  virtuals: true 
}
);


//nombre del modelo: Paciente con mayuscula//
module.exports = mongoose.model("Paciente", pacienteSchema)