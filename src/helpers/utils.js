const ProductStatus = {
  Valid: 'Valid',
  Pending: 'Pending for Review',
  NotFoundUpcItemDb: 'Not found in UPC ItemDB',
  NotFoundProductCatalog: 'Not found in Product Catalog Read',
  Archived: 'Archived'
};

const FilterStatus = {
  All: 'All',
  Valid: ProductStatus.Valid,
  Pending: ProductStatus.Pending,
  NotFoundUpcItemDb: ProductStatus.NotFoundUpcItemDb,
  NotFoundProductCatalog: ProductStatus.NotFoundProductCatalog,
  Archived: ProductStatus.Archived
};

const Units = [
  { name: 'BOX', value: 'BOX' },
  { name: 'CT', value: 'CT' },
  { name: 'EA', value: 'EA' },
  { name: 'FL OZ', value: 'FL OZ' },
  { name: 'GAL', value: 'GAL' },
  { name: 'GRAM', value: 'GRAM' },
  { name: 'KG', value: 'KG' },
  { name: 'LBS', value: 'LBS' },
  { name: 'LITER', value: 'LITER' },
  { name: 'ML', value: 'ML' },
  { name: 'OZ', value: 'OZ' },
  { name: 'PACK', value: 'PACK' },
  { name: 'PINT', value: 'PINT' },
  { name: 'PK', value: 'PK' },
  { name: 'PK BTL', value: 'PK BTL' },
  { name: 'PK CAN', value: 'PK CAN' },
  { name: 'QUART', value: 'QUART' },
  { name: 'SQ FEET', value: 'SQ FEET' },
  { name: 'STK', value: 'STK' }
];

export { ProductStatus, FilterStatus, Units };
