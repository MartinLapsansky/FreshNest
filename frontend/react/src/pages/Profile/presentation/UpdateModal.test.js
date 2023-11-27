import React from "react";
// import UpdateModal from "./UpdateModal";
import {fireEvent, render, screen} from "@testing-library/react";
import UpdateModal from "./UpdateModal.jsx";


let data = {
    name: "",
    email: "martin.lapsa2@gmail.com",
    phone: "0904608208"
};

// jest.mock('./ShopItem', () => {
//     return jest.fn().mockImplementation(({ itemId, itemCount, isCart }) => {
//         return {
//             itemId,
//             itemCount,
//             isCart,
//             calculateTotalPrice: jest.fn(() => 130), // Mock the return value directly
//             // ... (other mock implementations as needed)
//         };
//     });
// });


// jest.mock("./UpdateModal", () => {
//     return jest.fn().mockImplementation(({user}) => {
//         return {
//             user,
//             validateFields: jest.fn(),
//         };
//     });
// });
const updateModalComponent = new UpdateModal(data);

describe('UpdateModal', () => {
    render(<UpdateModal user={data} />);
    describe('ValidateFields', () => {
        test('should throw error for empty name field', () => {
            // const spy = jest.spyOn(updateModalComponent, 'validateFields');
            fireEvent.click(screen.getByRole('button', { name: 'submitFormButton' }));
            // const result = updateModalComponent.validateFields()
            // const result = updateModalComponent.validateFields();
            // console.log("result", result);
        });
    });
})
