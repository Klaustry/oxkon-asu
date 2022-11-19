import { gql } from "@apollo/client";

export const GET_OBJECTS = gql`
  query ($search: String!, $contract: String!, $limit: Int!, $offset: Int!) {
    objects(
      filter: {
        and: [
          {
            or: [
              { address: { like: $search } }
              { works: { work_name: { like: $search } } }
            ]
          }
          { or: [{ works: { contract_short: { like: $contract } } }] }
        ]
      }
      paging: { limit: $limit, offset: $offset }
    ) {
      nodes {
        address
        region
        works(filter: { work_name: { like: "%%" } }) {
          nodes {
            work_id
            work_name
            contract_short
            progress
            progress_id
          }
          totalCount
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($getProductId: ID!) {
    getProduct(id: $getProductId) {
      id
      title
      description
      price
      photos
      createdAt
    }
  }
`;
