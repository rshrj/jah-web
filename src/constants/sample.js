const listing1sample = {
  listingType: 'sellapartment',
  sellapartment: {
    societyName: 'Gokuldham Hillview',
    location: 'Mankhurd',
    landmark: 'Near HBCSE',
    apartmentType: '2bhk',
    price: '8345000',
    pricePerSqFt: '10000',
    allInclusivePrice: false,
    taxAndGovtChargesExcluded: true,
    priceNegotiable: true,
    numBathrooms: '2',
    numBalconies: '2',
    carpetArea: '834',
    builtUpArea: '',
    superBuiltUpArea: '1350',
    otherRooms: ['poojaRoom', 'studyRoom'],
    furnishing: 'furnished',
    coveredParking: '2',
    openParking: '0',
    totalFloors: '10',
    propertyOnFloor: '8',
    ageOfProperty: '0-1yrs',
    availabilityStatus: 'underConstruction',
    possessionBy: Date.now(),
    ownershipType: 'freehold',
    usp: 'A very nice place!',
    pictures: [
      'https://i.picsum.photos/id/164/800/600.jpg?hmac=PXOkqOXBrKf4yZjDeJ3q5KtnTSFO4DOIJKNhBRDlKiY',
      'https://i.picsum.photos/id/12/800/600.jpg?hmac=OnuvMhu3pBo7i6hErvnN-U922LRgjb8pBHux29xEv34',
      'https://i.picsum.photos/id/229/800/600.jpg?hmac=XBz4BdHCdXDT8GerLNU_gH41Hv6gKY0beR0wprsUesQ',
      'https://i.picsum.photos/id/41/500/900.jpg?hmac=anOtTY6nmGpH2yWQzb8DA9QMUktr6y8X5QVfpuYpHXY',
      'https://i.picsum.photos/id/950/600/500.jpg?hmac=NplsaUFi8hC7-nsbDSXR9b0QBGtfo7-g11beSBNBpUc',
      'https://i.picsum.photos/id/570/800/600.jpg?hmac=uKkwPFnmvK2ixiYuqFoYCJE8CoEWXxFTCDF0syKNm0I',
      'https://i.picsum.photos/id/182/800/600.jpg?hmac=tljGSjfYZx-pg_MFSQUL-Emf_FGXS3FCXB3nlEBYFtY',
      'https://i.picsum.photos/id/699/500/900.jpg?hmac=CC4usCtofVGSafR68gmrqfIoqKyUeWbqDfGXNlsnBMI',
      'https://i.picsum.photos/id/689/800/600.jpg?hmac=9Ewgx9LpNR5YK4XHAXstG8gMaBlRyWG-EirYYVkaEVU',
      'https://i.picsum.photos/id/187/600/800.jpg?hmac=TtgRrLawCBefKSnxolzreh-dUucf0jxrfN0cQJ4Vmzg'
    ],
    featuredPicture:
      'https://i.picsum.photos/id/164/800/600.jpg?hmac=PXOkqOXBrKf4yZjDeJ3q5KtnTSFO4DOIJKNhBRDlKiY',
    videoLink: 'https://www.youtube.com/watch?v=2YBtspm8j8M&ab_channel=Dissolve'
  },
  createdBy: '61c86363686210e7fe8ffde0',
  createdAt: Date.now()
};

const listing2sample = {
  listingType: 'rentlease',
  rentlease: {
    societyName: 'Gokuldham Hillview',
    location: 'Mankhurd',
    landmark: 'Near HBCSE',
    apartmentType: '2bhk',
    rent: '13500',
    electricityIncluded: true,
    priceNegotiable: true,
    deposit: '50000',
    numBathrooms: '2',
    numBalconies: '2',
    carpetArea: '834',
    builtUpArea: '',
    superBuiltUpArea: '1350',
    otherRooms: ['poojaRoom', 'studyRoom'],
    furnishing: 'furnished',
    coveredParking: '2',
    openParking: '0',
    totalFloors: '10',
    propertyOnFloor: '8',
    ageOfProperty: '0-1yrs',
    availableFrom: Date.now(),
    willingToRentOutTo: [
      'singleWomen',
      'unmarriedCouples',
      'singleMen',
      'family'
    ],
    pictures: [
      'https://i.picsum.photos/id/164/800/600.jpg?hmac=PXOkqOXBrKf4yZjDeJ3q5KtnTSFO4DOIJKNhBRDlKiY',
      'https://i.picsum.photos/id/12/800/600.jpg?hmac=OnuvMhu3pBo7i6hErvnN-U922LRgjb8pBHux29xEv34',
      'https://i.picsum.photos/id/229/800/600.jpg?hmac=XBz4BdHCdXDT8GerLNU_gH41Hv6gKY0beR0wprsUesQ',
      'https://i.picsum.photos/id/41/500/900.jpg?hmac=anOtTY6nmGpH2yWQzb8DA9QMUktr6y8X5QVfpuYpHXY',
      'https://i.picsum.photos/id/950/600/500.jpg?hmac=NplsaUFi8hC7-nsbDSXR9b0QBGtfo7-g11beSBNBpUc',
      'https://i.picsum.photos/id/570/800/600.jpg?hmac=uKkwPFnmvK2ixiYuqFoYCJE8CoEWXxFTCDF0syKNm0I',
      'https://i.picsum.photos/id/182/800/600.jpg?hmac=tljGSjfYZx-pg_MFSQUL-Emf_FGXS3FCXB3nlEBYFtY',
      'https://i.picsum.photos/id/699/500/900.jpg?hmac=CC4usCtofVGSafR68gmrqfIoqKyUeWbqDfGXNlsnBMI',
      'https://i.picsum.photos/id/689/800/600.jpg?hmac=9Ewgx9LpNR5YK4XHAXstG8gMaBlRyWG-EirYYVkaEVU',
      'https://i.picsum.photos/id/187/600/800.jpg?hmac=TtgRrLawCBefKSnxolzreh-dUucf0jxrfN0cQJ4Vmzg'
    ],
    featuredPicture:
      'https://i.picsum.photos/id/164/800/600.jpg?hmac=PXOkqOXBrKf4yZjDeJ3q5KtnTSFO4DOIJKNhBRDlKiY',
    videoLink: 'https://www.youtube.com/watch?v=2YBtspm8j8M&ab_channel=Dissolve'
  },
  createdBy: '61c86363686210e7fe8ffde0',
  createdAt: Date.now()
};

const listing3sample = {
  listingType: 'sellproject',
  sellproject: {
    name: 'Gokuldham Hillview',
    location: 'Mankhurd',
    landmark: 'Near HBCSE',
    apartmentTypes: ['2bhk', '1rk'],
    units: {
      '1rk': {
        price: '8345000',
        pricePerSqFt: '10000',
        allInclusivePrice: false,
        taxAndGovtChargesExcluded: true,
        priceNegotiable: true,
        numBathrooms: '2',
        numBalconies: '2',
        carpetArea: '834',
        builtUpArea: '',
        superBuiltUpArea: '1350',
        otherRooms: ['poojaRoom', 'studyRoom'],
        furnishing: 'furnished'
      },
      '2bhk': {
        price: '10950000',
        pricePerSqFt: '10000',
        allInclusivePrice: false,
        taxAndGovtChargesExcluded: true,
        priceNegotiable: true,
        numBathrooms: '2',
        numBalconies: '2',
        carpetArea: '1034',
        builtUpArea: '',
        superBuiltUpArea: '2350',
        otherRooms: ['poojaRoom', 'studyRoom', 'storeRoom'],
        furnishing: 'furnished'
      }
    },
    coveredParking: '2',
    openParking: '0',
    totalFloors: '10',
    propertyOnFloor: '8',
    ageOfProperty: '0-1yrs',
    availabilityStatus: 'underConstruction',
    possessionBy: Date.now(),
    ownershipType: 'freehold',
    usp: 'A very nice place!',
    pictures: [
      'https://i.picsum.photos/id/164/800/600.jpg?hmac=PXOkqOXBrKf4yZjDeJ3q5KtnTSFO4DOIJKNhBRDlKiY',
      'https://i.picsum.photos/id/12/800/600.jpg?hmac=OnuvMhu3pBo7i6hErvnN-U922LRgjb8pBHux29xEv34',
      'https://i.picsum.photos/id/229/800/600.jpg?hmac=XBz4BdHCdXDT8GerLNU_gH41Hv6gKY0beR0wprsUesQ',
      'https://i.picsum.photos/id/41/500/900.jpg?hmac=anOtTY6nmGpH2yWQzb8DA9QMUktr6y8X5QVfpuYpHXY',
      'https://i.picsum.photos/id/950/600/500.jpg?hmac=NplsaUFi8hC7-nsbDSXR9b0QBGtfo7-g11beSBNBpUc',
      'https://i.picsum.photos/id/570/800/600.jpg?hmac=uKkwPFnmvK2ixiYuqFoYCJE8CoEWXxFTCDF0syKNm0I',
      'https://i.picsum.photos/id/182/800/600.jpg?hmac=tljGSjfYZx-pg_MFSQUL-Emf_FGXS3FCXB3nlEBYFtY',
      'https://i.picsum.photos/id/699/500/900.jpg?hmac=CC4usCtofVGSafR68gmrqfIoqKyUeWbqDfGXNlsnBMI',
      'https://i.picsum.photos/id/689/800/600.jpg?hmac=9Ewgx9LpNR5YK4XHAXstG8gMaBlRyWG-EirYYVkaEVU',
      'https://i.picsum.photos/id/187/600/800.jpg?hmac=TtgRrLawCBefKSnxolzreh-dUucf0jxrfN0cQJ4Vmzg'
    ],
    featuredPicture:
      'https://i.picsum.photos/id/164/800/600.jpg?hmac=PXOkqOXBrKf4yZjDeJ3q5KtnTSFO4DOIJKNhBRDlKiY',
    videoLink:
      'https://www.youtube.com/watch?v=2YBtspm8j8M&ab_channel=Dissolve',
    brochureLink: 'https://arxiv.org/pdf/hep-th/0101102.pdf'
  },
  createdBy: '61c86363686210e7fe8ffde0',
  createdAt: Date.now()
};

export { listing1sample, listing2sample, listing3sample };
