import styles from './Categories.module.css';

export type Category = {
  title: string;
  image: string;
  slug: string;
};

type CategoriesProps = {
  data: Category[];
};

const Categories = ({ data }: CategoriesProps) => {
  return (
    <div className={styles.categories__grid}>
      {data.map((item) => (
        <a href={`/category/${item.slug}`} key={item.slug} className={styles.categoryCard}>
          <img src={item.image} alt={item.title} />
          <h3>{item.title}</h3>
        </a>
      ))}
    </div>
  );
};

export default Categories;