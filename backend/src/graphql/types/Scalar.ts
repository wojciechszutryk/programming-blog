import { gql } from 'apollo-server';

const scalarTypeDefs = gql`
  scalar UUID
  scalar Datetime
  scalar JSON
`;

export default scalarTypeDefs;