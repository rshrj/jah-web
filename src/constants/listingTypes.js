import {
  MdAccountBalance,
  MdLocationCity,
  MdMapsHomeWork
} from 'react-icons/md';

import { arrayToObject } from '../utils/helpers';

const listingTypes = [
  {
    type: 'rentlease',
    label: 'Rent / Lease',
    labelCaption: undefined,
    schema: null,
    icon: MdAccountBalance
  },
  {
    type: 'sellapartment',
    label: 'Sell Apartment',
    labelCaption: '(resell homes)',
    schema: null,
    icon: MdMapsHomeWork
  },
  {
    type: 'sellproject',
    label: 'Sell Project',
    labelCaption: '(several flats)',
    schema: null,
    icon: MdLocationCity
  }
];

export const listingObject = arrayToObject('type', listingTypes);
export const listingKeys = Object.keys(listingObject);

export default listingTypes;
