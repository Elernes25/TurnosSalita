const HistoriaClinica = require('../models/HistoriaClinica');
const Paciente = require('../models/paciente');

const createHistoriaClinica = async (req, res) => {
    try {
        const { paciente, diagnostico, tratamiento, medico, observaciones, fecha } = req.body;

        const existePaciente = await Paciente.findById(paciente);
        if (!existePaciente) {
            return res.status(404).json({
                success: false,
                message: 'No se encontró el paciente especificado para asociar la historia clínica.'
            });
        }

        const nuevaHistoria = new HistoriaClinica({
            paciente,
            diagnostico,
            tratamiento,
            medico,
            observaciones,
            fecha: fecha || Date.now()
        });

        const historiaGuardada = await nuevaHistoria.save();

        res.status(201).json({
            success: true,
            message: 'Registro de Historia Clínica creado con éxito',
            data: historiaGuardada
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            const mensajes = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Error de validación',
                errors: mensajes
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error en el servidor al registrar la historia clínica',
            error: error.message
        });
    }
};

const getHistoriasClinicas = async (req, res) => {
    try {
        // Usamos .populate() para traer los datos clave del paciente asociado
        const historias = await HistoriaClinica.find()
            .populate('paciente', 'nombre dni email obraSocial')
            .sort({ fecha: -1 });

        res.status(200).json({
            success: true,
            total: historias.length,
            data: historias
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los registros clínicos',
            error: error.message
        });
    }
};

const getHistoriaClinicaByPaciente = async (req, res) => {
    try {
        const { pacienteId } = req.params;

        const historial = await HistoriaClinica.find({ paciente: pacienteId })
            .populate('paciente', 'nombre dni email')
            .sort({ fecha: -1 });

        res.status(200).json({
            success: true,
            total: historial.length,
            data: historial
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el historial del paciente',
            error: error.message
        });
    }
};

module.exports = {
    createHistoriaClinica,
    getHistoriasClinicas,
    getHistoriaClinicaByPaciente
};