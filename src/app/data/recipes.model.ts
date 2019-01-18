export interface Recipe {
    _id: string;
    name: string;
    duration: number;
    category?: string;
    difficulty?: string;
    cost?: string;
    image?: string;
    quantity?: number;
    createdAt: any;
    ingredients: any[];
    author?: string;
    steps: any[];
}
