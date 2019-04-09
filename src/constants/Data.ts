import Role from '@/models/Role';
import Especiality from '@/models/Especiality';
import Corporation from '@/models/Corporation';
import Office from '@/models/Office';
import Descriptor from '@/models/Descriptor';
import User from '@/models/User';
import Departament from '@/models/Departament';
import City from '@/models/City';
import LawType from '@/models/LawType';
import ProcessClass from '@/models/ProcessClass';
import ProcessType from '@/models/ProcessType';
import SubjectType from '@/models/SubjectType';
import Subject from '@/models/Subject';
import IdentityStatus from '@/models/IdentityStatus';
import ProfessionalCard from '@/models/ProfessionalCard';
import FileType from '@/models/FileType';
import PlaceType from '@/models/PlaceType';
import Place from '@/models/Place';

const departaments: Departament[] = [{
    id: "DE1",
    name: "Cundinamarca"
}, {
    id: "DE2",
    name: "Tolima"
}, {
    id: "DE3",
    name: "Antioquia"
}]

const cities: City[] = [{
    id: "CY1",
    name: "Bogota",
    departament: departaments[0]
}, {
    id: "CY2",
    name: "Ibague",
    departament: departaments[1]
}, {
    id: "CY3",
    name: "Medellin",
    departament: departaments[2]
}]

const genders: Descriptor[] = [{
    id: "F",
    name: "Femenino"
}, {
    id: "M",
    name: "Masculino"
}]

const documentTypes: Descriptor[] = [{
    id: "CE",
    name: "Cedula de extranjeria"
}, {
    id: "CC",
    name: "Cedula de ciudadania"
}, {
    id: "PS",
    name: "Pasaporte"
}]

let identityTypes: Descriptor[] = [{
    id: "NIT",
    name: "Nit"
}]

const especialities: Especiality[] = [{
    id: "ES1",
    name: "Especialidad 1"
},
{
    id: "ES2",
    name: "Especialidad 2 (Penal)"
}]
const corporations: Corporation[] = [{
    id: "COR1",
    name: "Corporacion 1"
},
{
    id: "COR2",
    name: "Corporacion 2"
}]
const offices: Office[] = [
    {
        id: "OFF1",
        name: "Despacho 1",
        corporation: corporations[0],
        especiality: especialities[0]
    },
    {
        id: "OFF2",
        name: "Despacho 2",
        corporation: corporations[1],
        especiality: especialities[1]
    }
]

const roles: Role[] = [{
    id: "ROL1",
    name: "Juez",
    active: false,
    office: offices[0]
},
{
    id: "ROL2",
    name: "Secretaria",
    active: false,
    office: offices[1]
}]

const studyLevels : Descriptor[] = [{
    id: "SL1",
    name: "Profesional"
}, {
    id: "SL2",
    name: "Bachiller"
}]
/* var d = new Date();
d.setMonth(d.getMonth() - 3); */
let d = new Date().toISOString().substr(0, 10)
const users: User[] = [
    {
        userName: "mojeda",
        email: "mail1@gmail.com",
        password: "",
        roles: roles,
        role: roles[0],
        documentType: documentTypes[0],
        document: "123",
        firstName: "Mateo",
        secondName: "",
        lastName: "Ojeda",
        secondLastName: "Mieles",
        gender: genders[1],
        identityStatus: IdentityStatus.OK,
        birthDate: d,
        ubications: [{
            city: cities[0],
            address: {
                part1: "calle",
                part2: "1",
                part3: "A",
                part4: "2",
                part5: "B",
                part6: "28",
                part7: "Norte"
            }
        }],
        cellphone: "31446186415",
        phone: "0312456789",
        img: "https://cdn.vuetifyjs.com/images/john.jpg",
        status: "BLOCK",
        studyLevel: studyLevels[0]
    },
    {
        userName: "pternero",
        email: "mail2@gmail.com",
        password: "",
        roles: roles,
        role: roles[1],
        documentType: documentTypes[1],
        document: "1234",
        firstName: "Pedro",
        secondName: "Ternero",
        lastName: "Kernel",
        secondLastName: "Fernandez",
        gender: genders[1],
        identityStatus: IdentityStatus.BLOCK,
        birthDate: d,
        ubications: [{
            city: cities[1],
            address: {
                part1: "carrera",
                part2: "2",
                part3: "A",
                part4: "3",
                part5: "C",
                part6: "18",
                part7: "Sur"
            }
        }],
        cellphone: "3187984415",
        phone: "031545789",
        img: "https://cdn.vuetifyjs.com/images/john.jpg",
        status: "DISABLED",
        studyLevel: studyLevels[1]
    },
    {
        userName: "mteresa",
        email: "mail3@gmail.com",
        password: "",
        roles: roles,
        role: roles[0],
        documentType: documentTypes[2],
        document: "12345",
        firstName: "Maria",
        secondName: "Teresa",
        lastName: "Villas",
        secondLastName: "Samuels",
        gender: genders[0],
        identityStatus: IdentityStatus.BLOCK,
        birthDate: d,
        ubications: [{
            city: cities[2],
            address: {
                part1: "diagonal",
                part2: "1",
                part3: "A",
                part4: "2",
                part5: "D",
                part6: "12",
                part7: "Norte"
            },
        }],
        cellphone: "3171521515",
        phone: "0315789156",
        img: "https://cdn.vuetifyjs.com/images/john.jpg",
        status: "ACTIVE",
        studyLevel: studyLevels[0]
    }
]

const userList: any[] = [{
    userName: "mojeda",
    email: "mail2@gmail.com",
    documentType: documentTypes[0],
    document: "123",
    firstName: "Mateo",
    secondName: "",
    lastName: "Ojeda",
    secondLastName: "Mieles",
    cellphone: "31446186415",
    phone: "0312456789",
    img: "https://cdn.vuetifyjs.com/images/john.jpg",
    status: "ACTIVE"
}, {
    userName: "Villasmil",
    email: "mail3@gmail.com",
    documentType: documentTypes[1],
    document: "64576567",
    firstName: "Maria",
    secondName: "",
    lastName: "Villasmil",
    secondLastName: "Tenazas",
    cellphone: "123123123",
    phone: "1255435",
    img: "https://cdn.vuetifyjs.com/images/john.jpg",
    status: "DISABLED"
}, {
    userName: "Rerta",
    email: "mail1@gmail.com",
    documentType: documentTypes[2],
    document: "123123123",
    firstName: "Maria",
    secondName: "",
    lastName: "Rerta",
    secondLastName: "Zorta",
    cellphone: "123123123",
    phone: "5634189",
    img: "https://cdn.vuetifyjs.com/images/john.jpg",
    status: "BLOCK"
}, {
    userName: "Ojeda",
    email: "mail4@gmail.com",
    documentType: documentTypes[0],
    document: "123",
    firstName: "Mateo",
    secondName: "",
    lastName: "Ojeda",
    secondLastName: "Mieles",
    cellphone: "31446186415",
    phone: "0312456789",
    img: "https://cdn.vuetifyjs.com/images/john.jpg",
    status: "ACTIVE"
}, {
    userName: "Villas",
    email: "mail5@gmail.com",
    documentType: documentTypes[1],
    document: "64576567",
    firstName: "Maria",
    secondName: "",
    lastName: "Villasmil",
    secondLastName: "Tenazas",
    cellphone: "123123123",
    phone: "1255435",
    img: "https://cdn.vuetifyjs.com/images/john.jpg",
    status: "DISABLED"
}, {
    userName: "Mresta",
    userfirstName: "Maria",
    email: "mail6@gmail.com",
    documentType: documentTypes[2],
    document: "123123123",
    firstName: "Maria",
    secondName: "",
    lastName: "Rerta",
    secondLastName: "Zorta",
    cellphone: "123123123",
    phone: "5634189",
    img: "https://cdn.vuetifyjs.com/images/john.jpg",
    status: "BLOCK"
}, {
    userName: "mjuan",
    email: "mail7@gmail.com",
    documentType: documentTypes[0],
    document: "123",
    firstName: "Mateo",
    secondName: "",
    lastName: "Ojeda",
    secondLastName: "Mieles",
    cellphone: "31446186415",
    phone: "0312456789",
    img: "https://cdn.vuetifyjs.com/images/john.jpg",
    status: "ACTIVE"
}, {
    userName: "nazas",
    email: "mail8@gmail.com",
    documentType: documentTypes[1],
    document: "64576567",
    firstName: "Maria",
    secondName: "",
    lastName: "Villasmil",
    secondLastName: "Tenazas",
    cellphone: "123123123",
    phone: "1255435",
    img: "https://cdn.vuetifyjs.com/images/john.jpg",
    status: "DISABLED"
}, {
    userName: "nazas",
    email: "mail9@gmail.com",
    documentType: documentTypes[2],
    document: "123123123",
    firstName: "Maria",
    secondName: "",
    lastName: "Rerta",
    secondLastName: "Zorta",
    cellphone: "123123123",
    phone: "5634189",
    img: "https://cdn.vuetifyjs.com/images/john.jpg",
    status: "BLOCK"
}, {
    userName: "nazas",
    email: "mail10@gmail.com",
    documentType: documentTypes[0],
    document: "123",
    firstName: "Mateo",
    secondName: "",
    lastName: "Ojeda",
    secondLastName: "Mieles",
    cellphone: "31446186415",
    phone: "0312456789",
    img: "https://cdn.vuetifyjs.com/images/john.jpg",
    status: "ACTIVE"
}, {
    userName: "nazas",
    email: "mail11@gmail.com",
    documentType: documentTypes[1],
    document: "64576567",
    firstName: "Maria",
    secondName: "",
    lastName: "Villasmil",
    secondLastName: "Tenazas",
    cellphone: "123123123",
    phone: "1255435",
    img: "https://cdn.vuetifyjs.com/images/john.jpg",
    status: "DISABLED"
}, {
    userName: "nazas",
    email: "mail12@gmail.com",
    documentType: documentTypes[2],
    document: "123123123",
    firstName: "Maria",
    secondName: "",
    lastName: "Rerta",
    secondLastName: "Zorta",
    cellphone: "123123123",
    phone: "5634189",
    img: "https://cdn.vuetifyjs.com/images/john.jpg",
    status: "BLOCK"
}, {
    userName: "nazas",
    email: "mail13@gmail.com",
    documentType: documentTypes[0],
    document: "123",
    firstName: "Mateo",
    secondName: "",
    lastName: "Ojeda",
    secondLastName: "Mieles",
    cellphone: "31446186415",
    phone: "0312456789",
    img: "https://cdn.vuetifyjs.com/images/john.jpg",
    status: "ACTIVE"
}, {
    userName: "nazas",
    email: "mail14@gmail.com",
    documentType: documentTypes[1],
    document: "64576567",
    firstName: "Maria",
    secondName: "",
    lastName: "Villasmil",
    secondLastName: "Tenazas",
    cellphone: "123123123",
    phone: "1255435",
    img: "https://cdn.vuetifyjs.com/images/john.jpg",
    status: "DISABLED"
}, {
    userName: "nazas",
    email: "mail15@gmail.com",
    documentType: documentTypes[2],
    document: "123123123",
    firstName: "Maria",
    secondName: "",
    lastName: "Rerta",
    secondLastName: "Zorta",
    cellphone: "123123123",
    phone: "5634189",
    img: "https://cdn.vuetifyjs.com/images/john.jpg",
    status: "BLOCK"
}, {
    userName: "nazas",
    email: "mail16@gmail.com",
    documentType: documentTypes[0],
    document: "123",
    firstName: "Mateo",
    secondName: "",
    lastName: "Ojeda",
    secondLastName: "Mieles",
    cellphone: "31446186415",
    phone: "0312456789",
    img: "https://cdn.vuetifyjs.com/images/john.jpg",
    status: "ACTIVE"
}, {
    userName: "nazas",
    email: "mail17@gmail.com",
    documentType: documentTypes[1],
    document: "64576567",
    firstName: "Maria",
    secondName: "",
    lastName: "Villasmil",
    secondLastName: "Tenazas",
    cellphone: "123123123",
    phone: "1255435",
    img: "https://cdn.vuetifyjs.com/images/john.jpg",
    status: "DISABLED"
}, {
    userName: "nazas",
    email: "mail18@gmail.com",
    documentType: documentTypes[2],
    document: "123123123",
    firstName: "Maria",
    secondName: "",
    lastName: "Rerta",
    secondLastName: "Zorta",
    cellphone: "123123123",
    phone: "5634189",
    img: "https://cdn.vuetifyjs.com/images/john.jpg",
    status: "BLOCK"
}]

const part1Items = [
    "calle",
    "carrera",
    "diagonal"
]

const part3Y5Items = [
    "A",
    "B",
    "A bis"
]

const part7Items = [
    "Norte",
    "Sur"
]

const lawTypes: LawType[] = [{
    id: "LWT1",
    name: "Ley tipo 1"
},
{
    id: "LWT2",
    name: "Ley tipo 2"
},
{
    id: "LWT3",
    name: "Ley tipo 3"
}]

const processTypes: ProcessType[] = [{
    id: "PT1",
    name: "Tipo de proceso 1"
},
{
    id: "PT2",
    name: "Tipo de proceso 2"
},
{
    id: "PT3",
    name: "Tipo de proceso 3"
}]

const processClass: ProcessClass[] = [{
    id: "PC1",
    name: "Clase de proceso 1"
},
{
    id: "PC2",
    name: "Clase de proceso 2"
},
{
    id: "PC3",
    name: "Clase de proceso 3"
}]

const subjectTypes: SubjectType[] = [{
    id: "UT1",
    name: "abogado",
    defense: true,
    identified: true,
    autoDefense: false,
    canBeDefended: false,
    verifyProfessionalCard: true,
    company: false,
    emplace: false
},
{
    id: "UT2",
    name: "empresa demandada",
    defense: false,
    identified: true,
    autoDefense: true,
    canBeDefended: true,
    verifyProfessionalCard: false,
    company: true,
    emplace: false
},
{
    id: "UT3",
    name: "demandado",
    defense: false,
    identified: false,
    autoDefense: false,
    canBeDefended: true,
    verifyProfessionalCard: false,
    company: false,
    emplace: true
}, {
    id: "UT4",
    name: "demandante",
    defense: false,
    identified: true,
    autoDefense: true,
    canBeDefended: true,
    verifyProfessionalCard: false,
    company: false,
    emplace: false
}]

const usersAndCompanies: Subject[] = users;
usersAndCompanies.push({
    documentType: identityTypes[identityTypes.length - 1],
    document: "123",
    firstName: "Empresa 1",
    identityStatus: IdentityStatus.OK,
    secondName: "",
    lastName: "",
    secondLastName: "",
    gender: genders[1]
})
const professionalCards: ProfessionalCard[] = [{
    id: "123",
    status: IdentityStatus.OK
}, {
    id: "321",
    status: IdentityStatus.BLOCK
}]

const fileTypes: FileType[] = [{
    id: "TP1",
    name: "Demanda"
}, {
    id: "TP2",
    name: "Emplazamiento"
}]

const placeTypes: PlaceType[] = [{
    id: "PT1",
    name: "Rural"
}, {
    id: "PT2",
    name: "Urbano"
}]


const places: Place[] = [{
    id: "12345",
    name: "Lugar 1",
    register: "54321",
    type: placeTypes[0],
    ubication: {
        city: cities[0],
        address: {
            part1: "calle",
            part2: "1",
            part3: "A",
            part4: "2",
            part5: "B",
            part6: "28",
            part7: "Norte"
        }
    }
}, {
    id: "54321",
    name: "Lugar 2",
    register: "123",
    type: placeTypes[1],
    ubication: {
        city: cities[1],
        address: {
            part1: "calle",
            part2: "2",
            part3: "B",
            part4: "5",
            part5: "D",
            part6: "12",
            part7: "Sur"
        }
    }
}]

const measures: string[] = [
    "metros", "klometros", "Hectareas"
]

const microZones: string[] = [
    "Zona 1", "Zona 2", "Zona 3"
]

const Data = {
    roles: roles,
    offices: offices,
    corporations: corporations,
    especialities: especialities,
    documentTypes: documentTypes,
    identityTypes: identityTypes,
    users: users,
    genders: genders,
    departaments: departaments,
    cities: cities,
    userList: userList,
    part1Items: part1Items,
    part3Y5Items: part3Y5Items,
    part7Items: part7Items,
    lawTypes: lawTypes,
    processTypes: processTypes,
    processClass: processClass,
    subjectTypes: subjectTypes,
    usersAndCompanies: usersAndCompanies,
    professionalCards: professionalCards,
    fileTypes: fileTypes,
    placeTypes: placeTypes,
    places: places,
    measures: measures,
    microZones: microZones,
    studyLevels:studyLevels

}
export default Data 