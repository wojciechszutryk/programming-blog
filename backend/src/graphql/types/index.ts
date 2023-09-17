import { mergeTypeDefs } from "@graphql-tools/merge";
import userTypeDefs from "./User";
import scalarTypeDefs from "./Scalar";

const typesArray = [userTypeDefs, scalarTypeDefs];

const mergedTypeDefs = mergeTypeDefs(typesArray);

export default mergedTypeDefs;
