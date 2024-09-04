var particle = new Particle();
var token;

// Iniciar sesión en Particle
particle.login({ username: 'spiderman_an2002@hotmail.com', password: 'Papirrin02' }).then(
    function(data) {
        token = data.body.access_token;
    },
    function(err) {
        console.log('Could not log in.', err);
    }
);

// Configurar el evento de cambio en el toggle switch
document.getElementById('Breaker1').addEventListener('change', function() {
    var isChecked = this.checked;
    var output = document.getElementById('state1');
    var body = document.body;

    // Actualizar el texto y el fondo según el estado del toggle
    output.innerText = isChecked ? 'Encendido' : 'Apagado';
    if (isChecked) {
        body.classList.remove('orange-bg');
        body.classList.add('blue-bg');
    } else {
        body.classList.remove('blue-bg');
        body.classList.add('orange-bg');
    }

    // Enviar comando a Particle
    var Salida1 = isChecked ? '1' : '0'; // 1 para On, 0 para Off
    particle.callFunction({
        deviceId: '350043000947313037363132',
        name: 'led',
        argument: Salida1,
        auth: token,
    }).then(
        function(data) {
            console.log('Function called successfully:', data);
        },
        function(err) {
            console.log('An error occurred:', err);
        }
    );
});
