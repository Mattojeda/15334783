import Descriptor from './Descriptor';
import Corporation from './Corporation';
import SubEspeciality from './SubEspeciality';
import LawType from './LawType';
import SubProcessClass from './SubProcessClass';
import ProcessType from './ProcessType';
import Person from './Person';
import AppFile from './AppFile';
import Place from './Place';


export default class Process extends Descriptor {
    corporation?: Corporation
    subEspeciality?: SubEspeciality
    lawType?: LawType
    processType?: ProcessType
    subProcessClass?: SubProcessClass
    personList: Person[] = []
    fileList: AppFile[] = []
    placeList: Place[] = []

    constructor() {
        super()
        this.corporation = new Descriptor()
        this.subEspeciality = new Descriptor()
        this.lawType = new Descriptor()
        this.processType = new Descriptor()
        this.subProcessClass = new Descriptor()
    }

}