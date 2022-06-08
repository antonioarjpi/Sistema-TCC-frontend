import { Route } from "react-router-dom";
import { AuthConsumer } from "../context/AuthContext";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    <AuthConsumer>
        { (context) => (<Route isUsuarioAutenticado={context.isAutenticado} />) }
    </AuthConsumer>
)