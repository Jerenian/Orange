export interface IProduct  {
    id: string
    name: string
    price: number | null;
    description?: string
    fileName?: string
    typeId: string
    categoryId?: string
    IsPopular?: string
}
export interface IProductProps  {
    data:IProduct
}
export interface ITypes {
    id: string,
    name: string,
    img?: string
}
export interface ITypesProps {
    data: ITypes
}
