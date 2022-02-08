import multer from 'multer';
import { Privilege } from '../../models/privilege';
import { axiosHelper, APIResponse } from '../helpers/axiosHelper';

const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single('image');

export default function MarketPlaceImpl(privilege: Privilege) {
    function createPrivilege() {
        axiosHelper.post(`/privileges/create`, uploadStrategy)
            .then(function (response) {
                const data: APIResponse = response.data;
                console.log(data.data)
            })
    }
} 