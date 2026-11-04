import CupArt from "./CupArt";

export default function ItemCard({ item, featured }) {
  const base = import.meta.env.BASE_URL || "/";

  return (
    <article className={featured ? "card card--featured" : "card"} style={{ "--tint": item.tint }}>
      <div className="cardPhoto">
        {item.image ? (
          <img
            src={`${base}${item.image}`}
            alt={item.name}
            style={item.focus ? { objectPosition: item.focus } : undefined}
            loading={featured ? "eager" : "lazy"}
          />
        ) : (
          <CupArt id={`cup-${item.zh}`} {...item.art} />
        )}
        <span className="cardZh" aria-hidden="true">{item.zh}</span>
      </div>

      <div className="cardBody">
        <h3 className="cardName">{item.name}</h3>
        <p className="cardDesc">{item.desc}</p>
        <ul className="prices">
          {item.sizes.map((s) => (
            <li key={s.size}>
              <span className="priceSize">{s.size}</span>
              <span className="priceValue">${s.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
