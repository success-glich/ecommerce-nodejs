type Create = (input:any)=>Promise<any>
type Find = (input:any)=>Promise<any>
type Update = (input:any)=>Promise<any>
type Delete = (input:any)=>Promise<any>

export type CartRepositoryType ={
    create:Create,
    find:Find,
    update:Update,
    delete:Delete
}