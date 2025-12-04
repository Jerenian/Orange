export interface IProduct  {
    id?: string
    name?: string
    price?: any;
    description?: string
    img?: string
    typeId?: string
    categoryId?: string
    isPopular?: string | boolean
    quantity?: number
    palette?: string 
    file?: File | null
    typeName?: string
}
export interface IProductProps  {
    data:IProduct
    column?: boolean
    allProduct?:IProduct[]
}
export interface ITypes {
    id: string,
    name: string,
    img?: string
    price?: number
}
export interface ITypesProps {
    data: ITypes
}
export interface IUser {
    activationLink?: string,
    id?: string
    isActivated?: boolean
    login: string
    name?: string
    password: string
    role?: string
}
export interface IUserResponse {
    data: IUser,
    token: string
}
export interface IAuthState  {
    user: IUser | null,
    token: string | null
}
export interface ILoginRequest {
    login: string,
    password: string
}
export interface IFavorite {  
    favoriteId: string,
    id: string,
    productId: string,
}
export interface IFavoriteData {
    data: IFavorite[]
    idList?: string[]
}
export interface ICreateType{
    id?: string
    name?: string
    file: Blob | undefined | string 
}
export interface IOrders {
    id?: string
    name?: string
    surname?: string
    phone?: string
    email?: string
    delivery?: boolean,
    address?: string,
    shop?: string,
    isHanded?: boolean,
    price?: number
    paid?: boolean
    products: IProduct[]
}
export interface IQuantity {
    id?: string
    productId?: string,
    quantity?: number,
    name?: string
}
export interface IOrdersData {
    data?: IOrders[],
    active?: IOrders[],
    quantity?: IQuantity[]
}
