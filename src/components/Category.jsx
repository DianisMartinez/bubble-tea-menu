import ItemCard from "./ItemCard";

export default function Category({ category }) {
  return (
    <section>
      <h2 className="sectionTitle">{category.title}</h2>
      <div className="grid">
        {category.items.map((item) => (
          <ItemCard key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}