export type ProductCategory = '服装' | '周边';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  taobaoUrl: string;
  images: string[];
}

export const BRAND = {
  name: 'PETZLIFE',
  tagline: 'Your cozy pet life',
  logo: './assets/logo.png',
  heroImage: './assets/hero-hd.webp',
  taobaoUrl: 'https://shop369177188.taobao.com/',
  xiaohongshuUrl:
    'https://www.xiaohongshu.com/user/profile/6315a61f000000001501fe6d?xsec_token=ABFCdaOumfktoa4JEEJPB8imKNOjxG0afwHKU4_NzHobk%3D&xsec_source=pc_search',
  wechatId: 'anmazhuli01',
  shippingRule: '包邮（偏远地区另计），实际以淘宝结算页为准',
} as const;

export const PRODUCTS: Product[] = [
  {
    id: '01',
    name: '芋泥朵朵毛衣',
    category: '服装',
    price: 166.47,
    taobaoUrl: 'https://item.taobao.com/item.htm?id=1097774663046',
    images: [
      './assets/products/01/01.webp',
      './assets/products/01/02.webp',
      './assets/products/01/03.webp',
    ],
  },
  {
    id: '02',
    name: '草莓巧巧毛衣',
    category: '服装',
    price: 166.47,
    taobaoUrl: 'https://item.taobao.com/item.htm?id=1097289519157',
    images: [
      './assets/products/02/01.webp',
      './assets/products/02/02.webp',
      './assets/products/02/03.webp',
    ],
  },
  {
    id: '03',
    name: '云边小暖壳加厚棉服',
    category: '服装',
    price: 131.47,
    taobaoUrl: 'https://item.taobao.com/item.htm?id=1096789946462',
    images: [
      './assets/products/03/01.webp',
      './assets/products/03/02.webp',
      './assets/products/03/03.webp',
      './assets/products/03/04.webp',
    ],
  },
  {
    id: '04',
    name: '云朵马甲棉服',
    category: '服装',
    price: 140.47,
    taobaoUrl: 'https://item.taobao.com/item.htm?id=1089615511539',
    images: [
      './assets/products/04/01.webp',
      './assets/products/04/02.webp',
      './assets/products/04/03.webp',
      './assets/products/04/04.webp',
    ],
  },
  {
    id: '05',
    name: '喜庆红毛衣',
    category: '服装',
    price: 103.64,
    taobaoUrl: 'https://item.taobao.com/item.htm?id=992438243793',
    images: [
      './assets/products/05/01.webp',
      './assets/products/05/02.webp',
      './assets/products/05/03.webp',
      './assets/products/05/04.webp',
    ],
  },
  {
    id: '06',
    name: '四季棉质宠物睡眠垫',
    category: '周边',
    price: 171.47,
    taobaoUrl: 'https://item.taobao.com/item.htm?id=1088785763576',
    images: [
      './assets/products/06/01.webp',
      './assets/products/06/02.webp',
      './assets/products/06/03.webp',
      './assets/products/06/04.webp',
    ],
  },
  {
    id: '07',
    name: '纯色中领打底毛衣',
    category: '服装',
    price: 66.64,
    taobaoUrl: 'https://item.taobao.com/item.htm?id=993063138668',
    images: [
      './assets/products/07/01.webp',
      './assets/products/07/02.webp',
      './assets/products/07/03.webp',
      './assets/products/07/04.webp',
    ],
  },
  {
    id: '08',
    name: '秋冬条纹连帽毛衣',
    category: '服装',
    price: 23.24,
    taobaoUrl: 'https://item.taobao.com/item.htm?id=994081085808',
    images: [
      './assets/products/08/01.webp',
      './assets/products/08/02.webp',
      './assets/products/08/03.webp',
    ],
  },
  {
    id: '09',
    name: '拉毛仿貂毛衣外套',
    category: '服装',
    price: 55.64,
    taobaoUrl: 'https://item.taobao.com/item.htm?id=992983063317',
    images: [
      './assets/products/09/01.webp',
      './assets/products/09/02.webp',
      './assets/products/09/03.webp',
    ],
  },
  {
    id: '10',
    name: '户外透气冲锋衣雨衣',
    category: '服装',
    price: 186.47,
    taobaoUrl: 'https://item.taobao.com/item.htm?id=1040271703376',
    images: [
      './assets/products/10/01.webp',
      './assets/products/10/02.webp',
    ],
  },
  {
    id: '11',
    name: '拼色按扣德绒四脚外套',
    category: '服装',
    price: 92.84,
    taobaoUrl: 'https://item.taobao.com/item.htm?id=993040570595',
    images: [
      './assets/products/11/01.webp',
      './assets/products/11/02.webp',
      './assets/products/11/03.webp',
    ],
  },
  {
    id: '12',
    name: '秋季薄款护肚背心',
    category: '服装',
    price: 87.9,
    taobaoUrl: 'https://item.taobao.com/item.htm?id=1038932866210',
    images: [
      './assets/products/12/01.webp',
      './assets/products/12/02.webp',
    ],
  },
  {
    id: '13',
    name: '透气华夫格防勒背心',
    category: '服装',
    price: 87.9,
    taobaoUrl: 'https://item.taobao.com/item.htm?id=1038496111731',
    images: [
      './assets/products/13/01.webp',
      './assets/products/13/02.webp',
    ],
  },
  {
    id: '14',
    name: '弹力条纹四脚连体衣',
    category: '服装',
    price: 86.24,
    taobaoUrl: 'https://item.taobao.com/item.htm?id=994776048442',
    images: [
      './assets/products/14/01.webp',
      './assets/products/14/02.webp',
    ],
  },
  {
    id: '15',
    name: '卡通可爱条纹薄背心',
    category: '服装',
    price: 57.9,
    taobaoUrl: 'https://item.taobao.com/item.htm?id=1039211074923',
    images: [
      './assets/products/15/01.webp',
      './assets/products/15/02.webp',
    ],
  },
  {
    id: '16',
    name: '背心式透气居家服',
    category: '服装',
    price: 86.0,
    taobaoUrl: 'https://item.taobao.com/item.htm?id=1039797393324',
    images: [
      './assets/products/16/01.webp',
      './assets/products/16/02.webp',
    ],
  },
  {
    id: '17',
    name: '星星防勒休闲背心',
    category: '服装',
    price: 87.9,
    taobaoUrl: 'https://item.taobao.com/item.htm?id=1040163745649',
    images: [
      './assets/products/17/01.webp',
      './assets/products/17/02.webp',
    ],
  },
  {
    id: '18',
    name: '户外轻薄条纹背心马甲',
    category: '服装',
    price: 87.9,
    taobaoUrl: 'https://item.taobao.com/item.htm?id=1040643682489',
    images: [
      './assets/products/18/01.webp',
      './assets/products/18/02.webp',
    ],
  },
  {
    id: '19',
    name: '可折叠耐咬宠物冰垫',
    category: '周边',
    price: 34.99,
    taobaoUrl: 'https://item.taobao.com/item.htm?id=1054560548790',
    images: [
      './assets/products/19/01.webp',
      './assets/products/19/02.webp',
      './assets/products/19/03.webp',
    ],
  },
  {
    id: '20',
    name: '紫边小白裙荷叶边背带裙',
    category: '服装',
    price: 156.47,
    taobaoUrl: 'https://item.taobao.com/item.htm?id=1070255662665',
    images: [
      './assets/products/20/01.webp',
      './assets/products/20/02.webp',
    ],
  },
];

export function formatPrice(price: number): string {
  return `¥${price.toFixed(2)}`;
}
