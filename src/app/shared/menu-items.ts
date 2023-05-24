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
    {state: "category", name: "Categorias", type:"link", icon:"category", role:"admin"},
    {state: "product", name: "Productos", type:"link", icon:"inventory_2", role:"admin"},
    {state: "order", name: "Pedidos", type:"link", icon:"shopping_cart", role:""},
    {state: "bill", name: "Historial", type:"link", icon:"backup_table", role:""},
    {state: "user", name: "Usuarios", type:"link", icon:"people", role:"admin"}
]

@Injectable()
export class MenuItems{
    getMenuitem(): Menu[]{
        return MENUITEMS;
    }
}