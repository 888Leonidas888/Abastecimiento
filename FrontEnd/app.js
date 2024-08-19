const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.use(express.json());

// Configurar EJS como el motor de plantillas
app.set("view engine", "ejs");

// Configurar la carpeta de vistas
app.set("views", __dirname + "/views");

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static("public"));

// Ruta principal
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/menu", (req, res) => {
  res.render("menu");
});

app.get("/products", (req, res) => {
  res.render("products");
});

app.get("/users", (req, res) => {
  res.render("users");
});

app.get('/supply', (req, res) => {
  res.render('supply');
});

app.get("/dataUsers", async (req, res) => {
  try {
    const authorizationToken = req.headers.authorization;
    const { dni } = req.query;
    const response = await axios.get("http://localhost:8000/api/v1/users", {
      params: { dni },
      headers: {
        "Authorization": authorizationToken,
        "Content-Type": "application/json"
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error al obtener datos de usuarios:", error.message);
    res.status(500).json({ error: "Error al obtener los datos" });
  }
});

app.post("/addUser", async (req, res) => {
  const authorizationToken = req.headers.authorization;
  const { dni, user, name_user, last_name_user, permission, password } =
    req.body;
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/users",
      {
        dni: dni,
        user: user,
        name_user: name_user,
        last_name_user: last_name_user,
        permission: permission,
        password: password,
      },
      {
        headers: {
          "Authorization": authorizationToken,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error al llamar a la API externa:", error.message);
    res.status(error.response.status).send(error.response.data);
    alert(error.response.data);
  }
});

app.put("/updateUser/:dni", async (req, res) => {
  const authorizationToken = req.headers.authorization
  const { dni } = req.params;
  const { password, name_user, last_name_user, permission } = req.body;
  try {
    const response = await axios.put(
      `http://localhost:8000/api/v1/users/${dni}`,
      {
        password: password,
        name_user: name_user,
        last_name_user: last_name_user,
        permission: permission,
      },
      {
        headers: {
          "Authorization": authorizationToken,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error al actualizar el usuario:", error.message);
    res.status(500).send("Error en la solicitud a la API externa");
  }
});

app.delete("/updateUser/:dni", async (req, res) => {
  const authorizationToken = req.headers.authorization;
  const { dni } = req.params;
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/v1/users/${dni}`,
      {
        headers: {
          "Authorization": authorizationToken,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error al actualizar el usuario:", error.message);
    res.status(500).send("Error en la solicitud a la API externa");
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
