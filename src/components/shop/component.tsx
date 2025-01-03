import styles from "./styles.module.scss";
import ShopItem from "../shop-item/component";
import { Product } from "../../use-product";
import {
  useLoaderData,
  useNavigate,
  createSearchParams,
  useLocation,
  useNavigation,
} from "react-router-dom";

export default function Shop() {
  const [categories, items, sort, activeCategory] =
    useLoaderData() as readonly [string[], Product[], string, string];

  const navigate = useNavigate();
  const navigation = useNavigation();

  const location = useLocation();

  const changeLoadParams = (paramObj: Record<string, string>) => {
    const currentSearchParams = createSearchParams(location.search);

    const [name, value] = Object.entries(paramObj)[0];
    currentSearchParams.set(name, value);
    navigate({
      pathname: ".",
      search: currentSearchParams.toString(),
    });
  };

  return (
    <div className={styles.shopWrapper}>
      <div className={styles.categoriesWrapper}>
        <div className={styles.categories}>
          <h2>Categories</h2>
          <ul>
            <li>
              <a
                className={activeCategory == "all" ? styles.active : ""}
                onClick={() => changeLoadParams({ category: "all" })}
              >
                All
              </a>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <a
                  onClick={() => changeLoadParams({ category: category })}
                  key={category}
                  className={activeCategory == category ? styles.active : ""}
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.itemsWrapper}>
        <form action="">
          <label htmlFor="sort-option">Sort by</label>
          <select
            name="sort-option"
            id="sort-option"
            defaultValue={sort}
            onChange={(event) => {
              changeLoadParams({ sort: event.target.value });
            }}
          >
            <option value="asc">Oldest</option>
            <option value="desc">Newest</option>
          </select>
        </form>
        <h3>{items.length} items</h3>
        <ul className={navigation.state === "loading" ? styles.loading : ""}>
          {items.map((item) => (
            <li key={item.id}>
              <ShopItem
                id={item.id}
                imgSrc={item.image}
                title={item.title}
                rating={item.rating.rate}
                ratingCount={item.rating.count}
                price={`$${item.price}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
