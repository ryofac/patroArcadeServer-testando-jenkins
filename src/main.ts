import app from "./app";

/**
 * The port number on which the server will listen for incoming connections.
 * @constant {number}
 */
const PORT = 3001;

app.listen(PORT, () => {
  console.clear();
  console.log(`PatroTCC rodando: ${PORT}`);
});
