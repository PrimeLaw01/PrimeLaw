// Configuración de Supabase
const supabaseUrl = 'https://geopgruedclsmwdfuebi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdlb3BncnVlZGNsc213ZGZ1ZWJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5ODc1MjIsImV4cCI6MjA5MjU2MzUyMn0.xwcFE6zs4FYIicIXVqQljHNAPxPAWBcDXl1jbCL3mdo';

const _supabase = supabase.createClient(supabaseUrl, supabaseKey);


// Inicializar EmailJS (debes incluir su script en el HTML)
(function() {
    emailjs.init("kXiBDG5kOPaKhjPX7");
})();

const formulario = document.querySelector('form');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const datos = {
        nombre: formulario.querySelector('input[placeholder*="José"]').value,
        telefono: formulario.querySelector('input[placeholder*="0000"]').value,
        asunto: formulario.querySelector('input[placeholder*="Asesoría"]').value,
        mensaje: formulario.querySelector('textarea').value
    };

    // PASO 1: Guardar en Supabase
    const { error } = await _supabase.from('consultas_contacto').insert([datos]);

    if (!error) {
        // PASO 2: Si se guardó bien, enviar el correo automático
        emailjs.send("service_v3t2fnl", "template_7j1x2ve", {
            nombre: datos.nombre,
            telefono: datos.telefono,
            asunto: datos.asunto,
            mensaje: datos.mensaje,
            reply_to: "primelaw.sv@gmail.com"
        })
        .then(() => {
            alert("¡Consulta enviada! Hemos guardado su información y le contactaremos pronto.");
            formulario.reset();
        }, (err) => {
            alert("Los datos se guardaron, pero hubo un error enviando el correo de aviso.");
            console.error("Error EmailJS:", err);
        });

    } else {
        alert("Error al guardar en la base de datos: " + error.message);
    }
});