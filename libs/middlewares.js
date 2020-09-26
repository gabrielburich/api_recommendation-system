import bodyParser from "body-parser";
import cors from "cors";

module.exports = server => {
    server.set('port', 3001);
    server.set('json spaces', 4);
    server.use(cors());
    server.use(bodyParser.json());
    // server.use(server.auth.initialize());
};
