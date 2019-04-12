import Descriptor from './Descriptor';

export default class ActType extends Descriptor {
    providence: boolean
    daysToEnd: number
    procedure?: string

    constructor() {
        super()
        this.providence = false
        this.daysToEnd = 0
    }
}