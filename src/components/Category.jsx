import ItemCard from "./ItemCard";

export default function Category({ category }) {
  return (
    <section className={category.featured ? "category category--featured" : "category"}>
      <header className="categoryHead">
        <span className="seal" aria-hidden="true">{category.zh}</span>
        <h2 className="categoryTitle">{category.title}</h2>
      </header>
      <div className="grid">
        {category.items.map((item) => (
          <ItemCard key={item.name} item={item} featured={category.featured} />
        ))}
      </div>
    </section>
  );
}
