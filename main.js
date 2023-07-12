const firebaseConfig = {
    apiKey: "AIzaSyBLqdydUD_3VCYdrp0KTism9uzFFSGyo0g",
    authDomain: "paginaweb-b1f0c.firebaseapp.com",
    projectId: "paginaweb-b1f0c",
    storageBucket: "paginaweb-b1f0c.appspot.com",
    messagingSenderId: "815371419043",
    appId: "1:815371419043:web:ee105c9d65dfe37a9dee16"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//permite el registrar loggin
const auth = firebase.auth();
//llamar a la base de datos
const db = firebase.firestore();


//llamando al dom o al html 
const btnRegistrar = document.getElementById('btnRegistrar');
const btnIniciarSesion = document.getElementById('btnIniciarSesion');
const contenidoDeLaWeb = document.getElementById('contenidoDeLaWeb');
const formulario = document.getElementById('formulario');
const btnGoogle = document.getElementById('btnGoogle');
const btnFacebook = document.getElementById('btnFacebook');
const btnpublicar = document.getElementById('btnpublicar');
let verDatosEnPantalla=document.getElementById('verDatosEnPantalla');

//REGISTRAR
btnRegistrar.addEventListener('click', () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    console.log(email);
    console.log(password);

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log("Inicio de sesión correcto");
            cargarJSON();
            formulario.classList.replace('mostrar', 'ocultar');
            contenidoDeLaWeb.classList.replace('ocultar', 'mostrar');

            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            console.log(errorMessage);
            // ..
        });
})

//funcion iniciar sesion 
btnIniciarSesion.addEventListener('click', () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    console.log(email);
    console.log(password);


    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            formulario.classList.replace('mostrar', 'ocultar')
            contenidoDeLaWeb.classList.replace('ocultar', 'mostar');
            console.log("Inicio de sesión correcto");
            cargarJSON();
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            console.log(errorMessage);
        });

});

//funcion cerrar sesion
btnCerrarSesion.addEventListener('click', () => {//le digo que funcione cuando le dea click
    firebase.auth().signOut().then(() => {

        // Sign-out successful.
        console.log("Ha cerrado sesión correctamente");
        formulario.classList.replace('ocultar', 'mostrar');
        contenidoDeLaWeb.classList.replace('mostar', 'ocultar');


    }).catch((error) => {
        // An error happened.
    });
})
//funcion estado activo o inactivo 
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var uid = user.uid;
        formulario.classList.replace('mostrar', 'ocultar')
        contenidoDeLaWeb.classList.replace('ocultar', 'mostar');
        cargarJSON();

        // ...
    } else {
        // User is signed out
        formulario.classList.replace('ocultar', 'mostrar');
        contenidoDeLaWeb.classList.replace('mostrar', 'ocultar');
    }
});


//Funcion de google
btnGoogle.addEventListener('click', () => {
    //Crea una instancia del objeto del proveedor de Google-llamando de firebase
    var provider = new firebase.auth.GoogleAuthProvider();
    //Para acceder con una ventana emergente, llama a signInWithPopup
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            var user = result.user;
            console.log("Login con Google correcto");
            cargarJSON();
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);//alerta o reemplaza el console.log

        });

})

/* // Función llamar datos del Json
 function cargarJSON() {
     fetch("data.json")
         .then(function (res) {
             return res.json();
         })
         .then((data) => {
             console.log(data);

         })
 }*/

// Función llamar datos del Json
function cargarJSON() {
    fetch("data.json")
        .then(function (res) {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            let html = '';
            data.forEach((productos) => {
                html += `
<div class="producto">
  <p>  ${productos.producto} </p>
  <img src="${productos.img}" width="180px" height="180px" class="imgProducto">
  <br> <br>
  <strong> S/.${productos.precio} </strong>
  <br>
  <a href=" ${productos.webpage}" target="_blank"> Ver detalles</a>
</div>
`;
            })
            document.getElementById('resultado').innerHTML = html;
        })
}

//funcion publicar o agregar datos
btnpublicar.addEventListener('click', () => {
    db.collection("comentarios").add({
        titulo: txttitulo=document.getElementById('txttitulo').value,
        descripcion: txtdescripcion=document.getElementById('txtdescripcion').value,
    })
        .then((docRef) => {
            console.log("Se guardó tu comentario correctamente");
            verDatosEnPantalla();
        })
        .catch((error) => {
            console.error("Error al enviar tu comentario", error);
        });
})

//imrpimir datos de firestore en pantalla
/*verDatosEnPantalla.addEventListener('click',()=>{
    db.collection("comentarios").get().then((querySnapshot) => {
        let html='';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.data().titulo}`);
            console.log(`${doc.data().descripcion}`);
            var listarDatos=`
            <li class="listarDatos">
            <h5 class="listarDatosH5"> ${doc.data().titulo}</h5>
            <p> ${doc.data().descripcion} </p>
            </li>
            `;
            html +=listarDatos;
        }); document.getElementById('verDatosEnPantalla').innerHTML=html;
    });
})*/

