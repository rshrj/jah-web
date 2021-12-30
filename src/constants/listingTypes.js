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
    icon: MdAccountBalance,
    color: 'success.main'
  },
  {
    type: 'sellapartment',
    label: 'Sell Apartment',
    labelCaption: '(resell homes)',
    schema: null,
    icon: MdMapsHomeWork,
    color: 'info.main'
  },
  {
    type: 'sellproject',
    label: 'Sell Project',
    labelCaption: '(several flats)',
    schema: null,
    icon: MdLocationCity,
    color: 'secondary.main'
  }
];

export const listingObject = arrayToObject('type', listingTypes);
export const listingKeys = Object.keys(listingObject);

export default listingTypes;
