import FileType from './FileType';

export default class AppFile{
    applicationType?: FileType
    content?:File
    url:string | ArrayBuffer | null = ""
    image:boolean = false

    constructor() {
    }
}