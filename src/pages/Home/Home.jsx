import style from "./Home.module.css";
import { CiSearch } from "react-icons/ci";
import Card from "../../components/ProdactCard/ProdactCard";
export default function Home() {
const products = [
  {
    id: 1,
    title: "iPhone 14 Pro Max",
    price: 1199,
    rate: 4.8,
    description: "أحدث هواتف آبل مع كاميرا متطورة",
    image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae9025",
  },
  {
    id: 2,
    title: "Samsung Galaxy S23",
    price: 999,
    rate: 4.7,
    description: "هاتف ذكي بمعالج قوي وكاميرا متطورة",
    image: "https://images.unsplash.com/photo-1678911820864-e5c0c0575e31",
  },
  {
    id: 3,
    title: "MacBook Air M2",
    price: 1299,
    rate: 4.9,
    description: "حاسوب محمول خفيف وسريع",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
  },
  {
    id: 4,
    title: "AirPods Pro",
    price: 249,
    rate: 4.8,
    description: "سماعات لاسلكية مع خاصية إلغاء الضوضاء",
    image: "https://images.unsplash.com/photo-1588156979435-379b9d802921",
  },
  {
    id: 5,
    title: "iPad Pro 2023",
    price: 899,
    rate: 4.7,
    description: "جهاز لوحي احترافي للرسم والتصميم",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
  },
  {
    id: 6,
    title: "Sony WH-1000XM5",
    price: 399,
    rate: 4.9,
    description: "سماعات لاسلكية بجودة صوت مذهلة وإلغاء ضوضاء",
    image: "https://images.unsplash.com/photo-1596558450263-50fc4a9b4381",
  },
  {
    id: 7,
    title: "Dell XPS 15",
    price: 1899,
    rate: 4.8,
    description: "لابتوب قوي بشاشة 4K وأداء مميز",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef",
  },
  {
    id: 8,
    title: "Google Pixel 7 Pro",
    price: 899,
    rate: 4.7,
    description: "هاتف ذكي مع كاميرا متطورة وتجربة أندرويد نقية",
    image: "https://images.unsplash.com/photo-1576502200916-3808e07386a5",
  },
  {
    id: 9,
    title: "Apple Watch Series 8",
    price: 499,
    rate: 4.8,
    description: "ساعة ذكية بميزات صحية متقدمة",
    image: "https://images.unsplash.com/photo-1603973482329-6a753414d542",
  },
  {
    id: 10,
    title: "Samsung Galaxy Tab S8",
    price: 799,
    rate: 4.7,
    description: "جهاز لوحي بشاشة Super AMOLED وأداء متميز",
    image: "https://images.unsplash.com/photo-1598327105667-9269d42c2b05",
  },
  {
    id: 11,
    title: "Logitech MX Master 3",
    price: 99,
    rate: 4.9,
    description: "فأرة لاسلكية احترافية للمصممين والمبرمجين",
    image: "https://images.unsplash.com/photo-1589149098258-3d4d33b8e1d3",
  },
  {
    id: 12,
    title: "Razer BlackWidow V4",
    price: 179,
    rate: 4.8,
    description: "لوحة مفاتيح ميكانيكية للألعاب بإضاءة RGB",
    image: "https://images.unsplash.com/photo-1611510131244-0b76a2618b54",
  },
  {
    id: 1,
    title: "iPhone 14 Pro Max",
    price: 1199,
    rate: 4.8,
    description: "أحدث هواتف آبل مع كاميرا متطورة",
    image:
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-max-1.jpg",
  },
  {
    id: 2,
    title: "Samsung Galaxy S23",
    price: 999,
    rate: 4.7,
    description: "هاتف ذكي بمعالج قوي وكاميرا متطورة",
    image:
      "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s23-ultra-5g-1.jpg",
  },
  {
    id: 3,
    title: "MacBook Air",
    price: 1299,
    rate: 4.9,
    description: "حاسوب محمول خفيف وسريع",
    image:
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-macbook-air-m2-2022-1.jpg",
  },
  {
    id: 4,
    title: "Sony PlayStation 5",
    price: 499,
    rate: 4.8,
    description: "منصة ألعاب متطورة",
    image:
      "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21",
  },
  {
    id: 5,
    title: "Samsung Neo QLED TV",
    price: 1499,
    rate: 4.6,
    description: "تلفاز ذكي بجودة عالية",
    image:
      "https://images.samsung.com/is/image/samsung/p6pim/levant/qa65qn85bamxue/gallery/levant-neo-qled-qn85b-qa65qn85bamxue-533186124",
  },
  {
    id: 1,
    title: "Xiaomi 13 Pro",
    price: 899,
    rate: 4.7,
    description: "كاميرا ليكا الاحترافية مع معالج سناب دراجون 8",
    image: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-13-pro-2.jpg",
  },
  {
    id: 2,
    title: "OnePlus 11",
    price: 799,
    rate: 4.6,
    description: "شاشة AMOLED مع شحن فائق السرعة",
    image: "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-11-2.jpg",
  },
  {
    id: 3,
    title: "Nothing Phone 2",
    price: 699,
    rate: 4.5,
    description: "تصميم فريد مع واجهة مميزة",
    image: "https://fdn2.gsmarena.com/vv/pics/nothing/nothing-phone-2-1.jpg",
  },
  {
    id: 4,
    title: "Google Pixel 7 Pro",
    price: 899,
    rate: 4.8,
    description: "أفضل كاميرا هاتف ذكي مع ذكاء اصطناعي متطور",
    image: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel7-pro-2.jpg",
  },
  {
    id: 5,
    title: "Huawei P60 Pro",
    price: 999,
    rate: 4.6,
    description: "نظام كاميرا متطور مع تصميم فاخر",
    image: "https://fdn2.gsmarena.com/vv/pics/huawei/huawei-p60-pro-1.jpg",
  },
  {
    id: 6,
    title: "Oppo Find X6 Pro",
    price: 899,
    rate: 4.7,
    description: "شاشة منحنية مع كاميرا متطورة",
    image: "https://fdn2.gsmarena.com/vv/pics/oppo/oppo-find-x6-pro-2.jpg",
  },
  {
    id: 7,
    title: "Vivo X90 Pro+",
    price: 999,
    rate: 4.8,
    description: "معالج متطور مع كاميرا زايس",
    image: "https://fdn2.gsmarena.com/vv/pics/vivo/vivo-x90-pro-plus-2.jpg",
  },
  {
    id: 8,
    title: "Redmi Note 12 Pro+",
    price: 399,
    rate: 4.5,
    description: "أداء قوي بسعر منافس",
    image:
      "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-12-pro-plus-1.jpg",
  },
  {
    id: 9,
    title: "Samsung Galaxy A54",
    price: 449,
    rate: 4.6,
    description: "هاتف متوسط المدى بمواصفات ممتازة",
    image:
      "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a54-5g-1.jpg",
  },
  {
    id: 10,
    title: "Motorola Edge 40 Pro",
    price: 799,
    rate: 4.5,
    description: "شاشة منحنية مع شحن فائق السرعة",
    image:
      "https://fdn2.gsmarena.com/vv/pics/motorola/motorola-edge-40-pro-1.jpg",
  },
];

console.log(products);



    return (
        <section>
            <div className={style.filter}>
                <button> الاكثر مبيعا</button>
                <button> المنتجات الجديدة</button>
            </div>
            <div  className={style.search}>
                <input type="text" placeholder="بحث عن منتج" name="search"/> 
                <label htmlFor="search" >
                    <CiSearch  />
                </label>
                <p> البحث في منتج</p>
            </div>
            <div className={style.products}>
                {products.map((product) => (
                    <Card key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
