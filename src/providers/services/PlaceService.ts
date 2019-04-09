import Data from '@/constants/Data';
import Place from '@/models/Place';

export default class PlaceService {
    public static get(place: Place): Place | undefined {
        for (let item of Data.places) {
            if (item.id == place.id
                || item.register == place.register) {
                return item
            }
        }
    }
}