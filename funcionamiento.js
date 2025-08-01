// firebase-config.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "tienda-abarrotes-6a765.firebaseapp.com",
    databaseURL: "https://tienda-abarrotes-6a765-default-rtdb.firebaseio.com/",
    projectId: "tienda-abarrotes-6a765",
    storageBucket: "tienda-abarrotes-6a765.appspot.com",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Función para cargar productos desde Firebase
export function loadProducts() {
    const productsRef = ref(database, 'productos');
    const inventoryTable = document.getElementById("inventoryTable").getElementsByTagName('tbody')[0];

    onValue(productsRef, (snapshot) => {
        const productos = snapshot.val();
        inventoryTable.innerHTML = ''; // Limpiar la tabla antes de cargar los productos

        for (const id in productos) {
            const product = productos[id];
            addProductToTable(id, product.codigo, product.descripcion, product.costo, product.precioVenta, product.existencia, product.inventarioMinimo);
        }
    });
}

// Función para agregar un producto a la tabla
export function addProductToTable(id, codigo, descripcion, costo, precioVenta, existencia, inventarioMinimo) {
    const inventoryTable = document.getElementById("inventoryTable").getElementsByTagName('tbody')[0];
    const newRow = inventoryTable.insertRow();

    const cellCodigo = newRow.insertCell(0);
    const cellDescripcion = newRow.insertCell(1);
    const cellCosto = newRow.insertCell(2);
    const cellPrecioVenta = newRow.insertCell(3);
    const cellExistencia = newRow.insertCell(4);
    const cellInventarioMinimo = newRow.insertCell(5);
    const cellAcciones = newRow.insertCell(6);

    cellCodigo.innerHTML = codigo;
    cellDescripcion.innerHTML = descripcion;
    cellCosto.innerHTML = "$" + costo;
    cellPrecioVenta.innerHTML = "$" + precioVenta;
    cellExistencia.innerHTML = existencia;
    cellInventarioMinimo.innerHTML = inventarioMinimo;
    cellAcciones.innerHTML = `<button class="delete-btn" onclick="deleteProduct('${id}')">Eliminar</button>`;
}

// Función para agregar un producto a Firebase
export function submitProduct() {
    const codigo = document.getElementById("codigo").value;
    const descripcion = document.getElementById("descripcion").value;
    const costo = document.getElementById("costo").value;
    const precioVenta = document.getElementById("precioVenta").value;
    const existencia = document.getElementById("existencia").value;
    const inventarioMinimo = document.getElementById("inventarioMinimo").value;

    const productRef = ref(database, 'productos');
    const newProductRef = push(productRef);

    set(newProductRef, {
        codigo: codigo,
        descripcion: descripcion,
        costo: costo,
        precioVenta: precioVenta,
        existencia: existencia,
        inventarioMinimo: inventarioMinimo
    });

    modal.style.display = "none";
    productForm.reset();
}

// Función para eliminar un producto de Firebase
export function deleteProduct(id) {
    const productRef = ref(database, `productos/${id}`);
    remove(productRef);
}