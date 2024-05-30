/* eslint-disable react/prop-types */
import "../sass/components/_Item.scss";

/* Component function that returns the items from the home page */
function Item({ image, descriptionImage, title, description }) {
    return (
        <div className="feature-item">
            <img
                src={image}
                alt={descriptionImage}
                className="feature-item__icon"
            />
            <h3 className="feature-item__title">{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default Item;
