/* Home Reducer
 * handles state in the home feature
 */
import createReducer from 'app/lib/createReducer';

const initialState = {
    loading: false,
    userAddressList: null,
    shipmentAddress: {
        subdistrict: "",
        city: "",
        province: "",
        detail: "",
        postalCode: "",
    },
    shipmentDetail: {
        courier: "",
        reciever: "",
        sender: "",
        senderAddress: "",
    }
};

export const orderReducer = createReducer(initialState, {
    
});
