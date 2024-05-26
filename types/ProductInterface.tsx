export type productMapInterface = {
    [category: string]: {
        [brandName: string]: {
            [model: string]: {
                [variation: string]: []
            }
        }
    }
}
export type productInterface = {
    category: string, brandName: string, model: string, variation: string
}