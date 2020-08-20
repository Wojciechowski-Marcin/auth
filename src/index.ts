import app from "./app";
import { PORT } from "./config";

app.listen(PORT, () => console.log(`Service listening on port ${PORT}.`));
