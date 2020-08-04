import ProductBody from '../components/Products/ProductBody';
import ProductDetailBody from '../components/ProductDetail/ProductDetailBody';
import DepartmentBody from '../components/Departments/DepartmentBody';
import DepartmentDetailBody from '../components/DepartmentDetail/DepartmentDetailBody';
import BrandBody from '../components/Brands/BrandBody';
import BrandDetailBody from '../components/BrandDetail/BrandDetailBody';
import StoreBody from '../components/Stores/StoreBody';
import StoreDetailBody from '../components/StoreDetail/StoreDetailBody';
import EzSmartBody from '../components/EzSmarts/EzSmartBody';
import ProductCommunityBody from '../components/ProductCommunity/ProductCommunityBody';
import StoreCommunityBody from '../components/StoreCommunity/StoreCommunityBody';
import ProductScannerDetailBody from '../components/ProductScanner/ProductScannerDetailBody';
import CheckoutDetailBody from '../components/Checkout/CheckoutDetailBody';

const appRoutes = [
  { path: '/', component: ProductBody },
  { path: '/products/:upc', component: ProductDetailBody },
  { path: '/departments', component: DepartmentBody },
  { path: '/departments/:departmentId', component: DepartmentDetailBody },
  { path: '/brands', component: BrandBody },
  { path: '/brands/:brandId', component: BrandDetailBody },
  { path: '/stores', component: StoreBody },
  { path: '/stores/:storeId', component: StoreDetailBody },
  { path: '/ezsmart', component: EzSmartBody },
  { path: '/community/products', component: ProductCommunityBody },
  { path: '/community/stores', component: StoreCommunityBody },
  { path: '/scanner', component: ProductScannerDetailBody },
  { path: '/checkout', component: CheckoutDetailBody }
];

export default appRoutes;
