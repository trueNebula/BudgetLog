import { procedure } from "../trpc.ts";
import { withAuth } from "../middleware/with-auth.ts";

const authProcedure = procedure.use(withAuth);

export default authProcedure;
