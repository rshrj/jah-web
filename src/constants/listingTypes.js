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
    color: 'warning'
  },
  {
    type: 'sellapartment',
    label: 'Apartment',
    labelCaption: '(resell homes)',
    schema: null,
    icon: MdMapsHomeWork,
    color: 'info'
  },
  {
    type: 'sellproject',
    label: 'Project',
    labelCaption: '(several flats)',
    schema: null,
    icon: MdLocationCity,
    color: 'success'
  }
];

export const listingObject = arrayToObject('type', listingTypes);
export const listingKeys = Object.keys(listingObject);

export default listingTypes;
