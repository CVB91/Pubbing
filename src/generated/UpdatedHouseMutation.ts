/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { HouseInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdatedHouseMutation
// ====================================================

export interface UpdatedHouseMutation_updateHouse {
  __typename: "House";
  id: string;
  image: string;
  publicId: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  address: string;
}

export interface UpdatedHouseMutation {
  updateHouse: UpdatedHouseMutation_updateHouse | null;
}

export interface UpdatedHouseMutationVariables {
  id: string;
  input: HouseInput;
}
