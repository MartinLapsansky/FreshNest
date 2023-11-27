import React, { Component } from 'react';

class ShopItem extends Component {

    calculateTotalPrice(quantity) {
        const { price } = this.props;
        const totalPrice = (quantity * price) / 100;
        return totalPrice.toFixed(2);
    }

    showDiscount() {
        const { discount } = this.props;
        if (discount) {
            return (
                <div className="discount-tag" id="itemPrice">
                    <span className="discount">Discount!</span>
                    <span>{this.showPriceInCorrectFormat(this.props.price)}</span>
                </div>
            );
        }
        return (
            <div id="itemPrice">
                <span>{this.showPriceInCorrectFormat(this.props.price)} €</span>
            </div>
        );
    }

    showPriceInCorrectFormat(price) {
        const formattedPrice = (price / 100).toFixed(2);
        return `${formattedPrice.replace('.', ',')} €`;
    }

    render() {
        const { name, image, quantity } = this.props;

        return (
            <div className="shop-item">
                <img src={image} alt={name} />
                <h3>{name}</h3>
                {this.showDiscount()}
                <p>Total: {this.calculateTotalPrice(quantity)} €</p>
            </div>
        );
    }
}

export default ShopItem;
