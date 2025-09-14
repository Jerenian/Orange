export interface IProduct  {
    id: string
    name: string
    price: number | null;
    description?: string
    img?: string
    typeId: string
    categoryId?: string
    IsPopular?: string
}