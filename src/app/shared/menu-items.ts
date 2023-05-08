import { Injectable } from "@angular/core";

export interface Menu{
    state:string;
    name:string;
    type:string;
    icon:string;
    role:string;
}

const MENUITEMS = [
    {state: "dashboard", name: "Página principal", type:"link", icon:"menu", role:""},
    {state: "category", name: "Categorias", type:"link", icon:"category", role:""}
]

@Injectable()
export class MenuItems{
    getMenuitem(): Menu[]{
        return MENUITEMS;
    }
}