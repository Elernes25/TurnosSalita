const mongoose=require('mongoose');
const uri = process.env.DATABASE_URL_ATLAS || "mongodb://localhost:27017/salita_municipal"; // URI de conexión a la base de datos
//
console.log(`🔵💙Intentando conectar a la base de datos en: ${uri}`    
);
const connectDB=async()=>{
    try{
        await mongoose.connect(uri)
    } catch (err) {
        console.error('🔴💔Error al conectar a la base de datos:', err.message);
        process.exit(1); // Salir del proceso con un código de error
    }
}
mongoose.connection.on('connected',()=>{
    console.log('🟢💚Conexión a la base de datos establecida');
}); 
mongoose.connection.on('disconnected',(err)=>{
    console.error('💛Conexión a la base de datos perdida:', err.message);
});
process.on('SIGINT',async()=>{
    await mongoose.connection.close();
    console.log('🔴💔Conexión a la base de datos cerrada por terminación de la aplicación');
    process.exit(0);
});

/*
process.on(evento, callback) te permite engancharte a eventos del proceso.
Los más usados son: exit, uncaughtException, unhandledRejection, SIGINT, SIGTERM.
Es clave para hacer tu aplicación más robusta y controlada frente a errores o cierres inesperados.
*/

module.exports=connectDB;