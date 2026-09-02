const mongoose = require('mongoose');
medicoSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: [true,'El nombre del médico es obligatorio'],
        uppercase: true
         },
    dni:{
            type: String,
            unique: true,
            required: [true,'El DNI es obligatorio'],
            match: [/^\d[0-9]{7,8}$/, 'El DNI debe tener entre 7 y 8 dígitos']
        },

     especialidad: {
        type: mongoose.Schema.Types.ObjectId,   // referencia a un ID de Mongo
        ref: "Especialidad",                        // nombre del modelo relacionado
        required: [true,'La especialidad es obligatoria']
    },
 /*   especialidad:{
        type: String,
        required: [true,'La especialidad es obligatoria'],
        enum: {
            values: ['CARDIOLOGÍA', 'NEUROLOGÍA', 'PEDIATRÍA', 'TRAUMATOLOGÍA','ODONTOLOGÍA','OFTALMOLOGÍA'],
            message: '{VALUE} La especialidad no es válida' 
        }
*/
    numeroMatricula:{
        type: String,
        required: [true,'El Número de matrícula es obligatorio'],
    },
    
    /*array de las obras sociales que atiende */
    /*si hubiera otro esquema con obras sociales */
    //obrasSociales:[{ type: mongoose.Schema.Types.ObjectId, ref: 'obraSocial' }],   
    
     direccion: {
        calle: {
          type: String,
          required: [true, 'La calle es obligatoria']
         },
        numero: {
          type: String,
          required: [true, 'El número es obligatorio']
         },
        piso: {
          type: String
        },
        departamento: {
          type: String
        },
        barrio: {
          type: String
        }
      },
    telefono: {
        tipo: {
            type: String,
            enum: ['CELULAR', 'FIJO']
        },
        codigoPais: {   /*guardar sin el + */
            type: String,
            required: true,
            trim: true,
            match: [/^[1-9][0-9]{0,2}$/, 'El código de País no es válido']
        },
        codigoArea: {
            type: String,
            required: true,
            match: [/^[0-9]{2,5}$/, 'El código de área no es válido']
        },
        numero: {
            type: String,
            required: true,
            match: [/^[0-9]{6,10}$/, 'El número de teléfono no es válido'] /*620 669 SEIS DIGITOS*/
        }
    },
    
    email:{
        type: String,
        required: false,
        match: [/\S+@\S+\.\S+/, 'El correo electrónico no es válido'] 
    }
    /*se podria identificar a aquel medico que este de guardia o que se le pueda llamar por una urgencia */

},
{timesstamps: true},

);/*agrega createdAt y updatedAt automáticamente*/


medicoSchema.set('toJSON', {
    transform: (documento, medicoRetorno) => {
        medicoRetorno.id = medicoRetorno._id;
        delete medicoRetorno._id;
        delete medicoRetorno.__v;
        delete medicoRetorno.createdAt; /*borra los campos agregados por el timestamps */
        delete medicoRetorno.updatedAt;
    }
}
);


//nombre del modelo: Medico con mayúscula//
module.exports = mongoose.model("Medico", medicoSchema)