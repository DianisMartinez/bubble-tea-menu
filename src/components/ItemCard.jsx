import { useRef } from "react";

export default function ItemCard({ item }) {
  const cardRef = useRef(null);
  const base = import.meta.env.BASE_URL || "/";

  const handlePointerMove = (event) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const py = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    card.style.setProperty("--px", px.toFixed(3));
    card.style.setProperty("--py", py.toFixed(3));
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--px", 0);
    card.style.setProperty("--py", 0);
  };

  return (
    <div
      className="itemCard"
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="itemTop">

        {/* Texto del producto */}
        <div className="itemText">

          {item.sizes?.length ? (
            <div className="sizes">
              {item.sizes.map((s) => (
                <div className="priceCol" key={s.size}>
                <div className="priceValue">${s.price}</div>
                <div className="sizeLabel">{s.size}</div> 
                </div>
              ))}
            </div>
          ) : null}

          {/* Título */}
          <div className="itemName">{item.name}</div>

          {/* Descripción */}
          {item.desc ? (
            <div className="itemDesc">{item.desc}</div>
          ) : null}

        </div>

        {/* Imagen del producto */}
        {item.image ? (
          <img
            className="itemImage"
            src={`${base}${item.image}`}
            alt={item.name}
          />
        ) : null}

      </div>

      {/* Tags abajo */}
      {item.tags?.length ? (
        <div className="tags">
          {item.tags.map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
}