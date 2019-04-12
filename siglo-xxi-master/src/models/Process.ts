import Descriptor from './Descriptor';
import Corporation from './Corporation';
import SubEspeciality from './SubEspeciality';
import LawType from './LawType';
import SubProcessClass from './SubProcessClass';
import ProcessType from './ProcessType';
import Person from './Person';
import AppFile from './AppFile';
import Place from './Place';
import Office from './Office';
import Subject from './Subject';
import Fact from './Fact';
import Act from './Act';


export default class Process extends Descriptor {
    corporation?: Corporation
    subEspeciality?: SubEspeciality
    lawType?: LawType
    processType?: ProcessType
    subProcessClass?: SubProcessClass
    subjectList: Subject[] = []
    fileList: AppFile[] = []
    placeList: Place[] = []
    office?: Office
    judge?: Person
    creationDate?: Date
    status?: string
    factsList: Fact[] = []
    actList: Act[] = []

    constructor() {
        super()
        this.corporation = new Descriptor()
        this.subEspeciality = new Descriptor()
        this.lawType = new Descriptor()
        this.processType = new Descriptor()
        this.subProcessClass = new Descriptor()
    }

}