export class GlobalConstants{
    //Message
    public static genericError:string="No se pudo procesar, por favor intentelo de nuevo más tarde";

    public static unauthroized:string ="Acceso no autorizado";

    public static productExistError:string = "Producto ya existe";

    public static productAdded:string ="Producto agregado correctamente";


    //Regex
    public static nameRegex:string= "[a-zA-Z0-9 ]*";

    public static emailRegex:string= "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";

    public static contactNumberRegex:string= "^[e0-9]{10,10}$";

    //Variable
    public static error:string="error";

}