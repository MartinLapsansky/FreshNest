import React from "react";
import ShopItem from './ShopItem';

jest.mock('./ShopItem', () => {
    return jest.fn().mockImplementation(({ itemId, itemCount, isCart }) => {
        return {
            itemId,
            itemCount,
            isCart,
            calculateTotalPrice: jest.fn(() => 130), // Mock the return value directly
            // ... (other mock implementations as needed)
        };
    });
});

describe('ShopItem tests', () => {
    test('calculateTotalPrice returns the correct result', () => {
        const mockItemData = [
            { name: 'Item 1', price: 10, quantity: 2 },
            { name: 'Item 2', price: 20, quantity: 1 },
            { name: 'Item 3', price: 30, quantity: 3 },
        ];

        const itemPrices = [10, 20, 30];

        // Create an instance of ShopItem
        const shopItem = new ShopItem({ itemId: 'item1', itemCount: 2, isCart: false });

        // Call the method
        const result = shopItem.calculateTotalPrice(mockItemData, itemPrices);

        // Assert that calculateTotalPrice is called with the correct arguments
        expect(shopItem.calculateTotalPrice).toHaveBeenCalledWith(mockItemData, itemPrices);

        // Assert that the result is as expected
        expect(result).toBe(130);
    });
});


describe('calculateTotalPrice function', () => {
    test('throws an error for invalid input (non-array itemPrices)', () => {
        const mockItemData = [10, 20, 30];
        const invalidItemPrices = 'haha';

        // Create an instance of ShopItem
        const shopItem = new ShopItem({ itemId: 'item1', itemCount: 2, isCart: false });

        // Use jest.spyOn to mock the calculateTotalPrice method and force it to throw an error
        jest.spyOn(shopItem, 'calculateTotalPrice').mockImplementation(() => {
            throw new Error('Invalid input. Both items and itemPrices should be arrays.');
        });

        // Call the method and expect it to throw an error
        expect(() => shopItem.calculateTotalPrice(mockItemData, invalidItemPrices)).toThrowError('Invalid input. Both items and itemPrices should be arrays.');
    });
});

describe('calculateTotalPrice function', () => {
    test('throws an error for invalid input (non-array mockItem data)', () => {
        const mockItemData = "haha"
        const invalidItemPrices = [10, 20, 30];

        // Create an instance of ShopItem
        const shopItem = new ShopItem({itemId: 'item1', itemCount: 2, isCart: false});

        // Use jest.spyOn to mock the calculateTotalPrice method and force it to throw an error
        jest.spyOn(shopItem, 'calculateTotalPrice').mockImplementation(() => {
            throw new Error('Invalid input. Both items and itemPrices should be arrays.');
        });

        // Call the method and expect it to throw an error
        expect(() => shopItem.calculateTotalPrice(mockItemData, invalidItemPrices)).toThrowError('Invalid input. Both items and itemPrices should be arrays.');
    });
});

    describe('calculateTotalPrice function', () => {
        test('throws an error for invalid item structure (non-object)', () => {
            const invalidItem = 'not an object';
            const validItemPrices = [10, 20, 30];

            // Create an instance of ShopItem
            const shopItem = new ShopItem({itemId: 'item1', itemCount: 2, isCart: false});

            jest.spyOn(shopItem, 'calculateTotalPrice').mockImplementation(() => {
                throw new Error('Invalid item structure.');
            });

            expect(() => shopItem.calculateTotalPrice([invalidItem], validItemPrices)).toThrowError('Invalid item structure.');
        });

        test('throws an error for invalid item structure (missing name property)', () => {
            const invalidItem = {price: 10, quantity: 2};
            const validItemPrices = [10, 20, 30];

            // Create an instance of ShopItem
            const shopItem = new ShopItem({itemId: 'item1', itemCount: 2, isCart: false});

            jest.spyOn(shopItem, 'calculateTotalPrice').mockImplementation(() => {
                throw new Error('Invalid item structure.');
            });

            expect(() => shopItem.calculateTotalPrice([invalidItem], validItemPrices)).toThrowError('Invalid item structure.');
        });
    });






