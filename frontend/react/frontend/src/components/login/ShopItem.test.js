import React from 'react';
import { render } from '@testing-library/react';
import ShopItem from './ShopItem';

describe('ShopItem component', () => {
    it('should render with discount tag if discount is true', () => {
        const item = {
            name: 'jacket',
            discount: true,
            image: 'napapijri.png',
            price: 300,
        };

        const { container } = render(<ShopItem {...item} />);
        const discountTag = container.querySelector('.discount-tag');

        expect(discountTag).toBeInTheDocument();
    });

    it('should not render discount tag if discount is false', () => {
        const item = {
            name: 'jacket',
            discount: false,
            image: 'napapijri.png',
            price: 300,
        };

        const { container } = render(<ShopItem {...item} />);
        const discountTag = container.querySelector('.discount-tag');

        expect(discountTag).toBeNull();
    });


});

describe('ShopItem component', () => {
    it('should render price in correct format', () => {
        const item = {
            name: 'jacket',
            discount: true,
            image: 'napapijri.png',
            price: 360, // Represents 3.60 €
        };

        const { container } = render(<ShopItem {...item} />);
        const priceElement = container.querySelector('.discount-tag span:nth-child(2)');

        expect(priceElement.textContent).toBe('3,60 €');
    });
    it('should calculate total price correctly', () => {
        const item = {
            name: 'jacket',
            discount: true,
            image: 'napapijri.png',
            price: 360, // 3.60 €
            quantity: 2,
        };

        const { container } = render(<ShopItem {...item} />);
        const totalPriceElement = container.querySelector('.shop-item p');

        expect(totalPriceElement.textContent).toBe('Total: 7.20 €');
    });
});


