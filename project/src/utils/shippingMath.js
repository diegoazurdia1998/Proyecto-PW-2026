/**
 * Calcula el costo y tiempo de envío para AeroPaq
 * @param {Object} datos - Objeto con los datos del formulario de cotización
 * @returns {Object} - Desglose de costos, total y tiempo estimado
 */
export function calcularCotizacion(datos) {
    // Extraemos los datos que nos enviará el componente de React
    const {
        origenDestino, // 'local' (misma ciudad), 'nacional' (otro departamento), 'internacional'
        peso, // en libras
        nivelServicio, // 'estandar', 'expres'
        recoleccion, // booleano (true/false)
        seguro, // booleano (true/false)
        dimensiones // arreglo de 3 numeros representando [Largo, Ancho, Alto] con 2 decimales
    } = datos;

    // 1. Definir tarifas por distancia y tiempos estimados
    let costoBase = 0;
    let costoDistancia = 0;
    let tiempoEstimado = '';

    switch (origenDestino) {
        case 'local':
            costoBase = 25;
            costoDistancia = 0; // Sin recargo por ser misma ciudad
            tiempoEstimado = nivelServicio === 'expres' ? '2 a 6 horas' : '1 a 2 días hábiles';
            break;
        case 'nacional':
            costoBase = 35;
            costoDistancia = 20; // Recargo por enviar a otro departamento
            tiempoEstimado = nivelServicio === 'expres' ? '24 horas' : '2 a 4 días hábiles';
            break;
        case 'internacional':
            costoBase = 150;
            costoDistancia = 100; // Recargo mayor por cruzar fronteras
            tiempoEstimado = nivelServicio === 'expres' ? '3 a 5 días hábiles' : '7 a 15 días hábiles';
            break;
        default:
            costoBase = 25;
    }

    // 2. Costo por peso (Ej: Q5 por cada libra)
    const qLibra = 5;
    // Calculo de volumen por dimensiones
    let pesoFacturable = peso; // Por defecto, asumimos que cobraremos por el peso físico

    // Verificamos si el arreglo 'dimensiones' existe y si tiene exactamente 3 elementos
    if (dimensiones && dimensiones.length === 3) {
        const [largo, ancho, alto] = dimensiones;

        // Calculamos el volumen y lo dividimos por un factor logístico ficticio (ej. 2272)
        const pesoVolumetrico = (largo * ancho * alto) / 2272;

        // Si el paquete es muy grande pero ligero, cobramos por el espacio que ocupa
        if (pesoVolumetrico > peso) {
            pesoFacturable = pesoVolumetrico;
        }
    }

    const costoPeso = pesoFacturable * qLibra;

    // 3. Multiplicador por Nivel de Servicio
    // El servicio exprés incrementa el subtotal en un 50%
    const multiplicadorServicio = nivelServicio === 'expres' ? 1.5 : 1;

    // 4. Extras
    const costoRecoleccion = recoleccion ? 15 : 0;
    const costoSeguro = seguro ? 25 : 0;

    // 5. Aplicación de la fórmula matemática
    // Fórmula: Total = ((Base + Distancia + Peso) * Servicio) + Extras
    const subtotal = (costoBase + costoDistancia + costoPeso) * multiplicadorServicio;
    const total = subtotal + costoRecoleccion + costoSeguro;

    // 6. Retornar el desglose exacto que pide el requerimiento
    return {
        desglose: {
            base: costoBase,
            distancia: costoDistancia,
            peso: costoPeso,
            recargoServicio: subtotal - (costoBase + costoDistancia + costoPeso),
            extras: costoRecoleccion + costoSeguro
        },
        total: total,
        tiempoEstimado: tiempoEstimado
    };
}