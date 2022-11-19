import { useQuery } from "@apollo/client";
import { GET_OBJECTS, GET_PRODUCT } from "../graphql/queries/object.gql";
//import { IProduct } from '../models/ObjectModel'

export const ProductList = (search: string) => {
  const { data, loading, error, refetch } = useQuery(GET_OBJECTS, {
    variables: { search: "%Ленина%", limit: 10, offset: 0 },
  });

  return {
    dataObjects: data,
    loading,
    error,
    refetch,
  };
};

export const ProductGetById = (id: string) => {
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { getProductId: id },
  });
  return {
    data,
    loading,
    error,
  };
};
