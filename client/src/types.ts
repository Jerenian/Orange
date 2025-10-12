export interface IProduct  {
    id: string
    name: string
    price: number | null;
    description?: string
    img?: string
    typeId: string
    categoryId?: string
    isPopular?: string
}
export interface IProductProps  {
    data:IProduct
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
    user: IUser,
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
    name?: string,
    file: Blob | undefined | string 
}