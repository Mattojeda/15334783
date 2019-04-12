export class Menu {
    icon!: string
    name!: string
    path!: string
    childs!: Menu[]
}

export const MenuItems: Menu[] = [
    {
        icon: "home",
        name: "home",
        path: "/home",
        childs: []
    },
    {
        icon: "person",
        name: "Usuarios",
        path: "/usuarios",
        childs: [{
            icon: "add",
            name: "Crear",
            path: "/usuarios/agregar",
            childs: []
        }, {
            icon: "search",
            name: "Consultar",
            path: "/usuarios",
            childs: []
        }]
    },
    {
        icon: "work",
        name: "Procesos",
        path: "/procesos",
        childs: [{
            icon: "add",
            name: "Crear",
            path: "/procesos/agregar",
            childs: []
        }, {
            icon: "search",
            name: "Consultar",
            path: "/procesos",
            childs: []
        }]
    }
]