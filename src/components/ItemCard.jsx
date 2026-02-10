export default function ItemCard({ item }) {
  return (
    <div className="itemCard">
      <div className="itemTop">

        {/* Nombre + tamaños + desc */}
        <div className="itemText">
        {item.sizes?.length ? (
            <div className="sizes">
              {item.sizes.map((s) => (
                <div className="priceCol" key={s.size}>
                  <div className="sizeLabel">{s.size}</div>
                  <div className="priceValue">${s.price}</div>
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