import Process from '@/models/Process';
import Data from '@/constants/Data';

export default class ProcessService {
    public static get(user: Process): Process | undefined {
        for (let item of Data.processList) {
            if (item.id == user.id) {
                return item
            }
        }
    }
}