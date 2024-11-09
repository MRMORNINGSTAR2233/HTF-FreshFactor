import axios from 'axios';

const OPENFOODFACTS_API_URL = 'https://world.openfoodfacts.org/api/v0/product/';

interface NutritionalInfo{
    product_name: any;
    nutrients:{
        energy: number;
        fat: number;
        carbohydrates: number;
        fiber: number;
        sugars:number;
        salt:number;
        [key: string]: number;
    };
    ingredients_text?: string;
}

export const getProductNutrition = async (barcode: string): Promise<NutritionalInfo | null> =>{
    try{
        const response = await axios.get(`${OPENFOODFACTS_API_URL}${barcode}.json`);
        if(response.data.status === 1){
            const product = response.data.product;

            const nutritionalInfo: NutritionalInfo = {
                nutrients: {
                    energy: product.nutrients['energy-kcal'] || 0,
                    fat: product.nutrients['fat'] || 0,
                    sugars: product.nutrients['sugars'] || 0,
                    salt: product.nutrients['salt'] || 0,
                    carbohydrates: product.nutrients['carbohydrates'] || 0,
                    fiber: product.nutrients['fiber'] || 0
                },
                ingredients_text: product.ingredients_text,
                product_name: undefined
            };
            return nutritionalInfo;
        } else {
            console.log(`Error fetching product with barcode ${barcode}`);
            return null;
        }
    }catch(error){
        console.error(`Error fetching product data ${error}`);
        return null;
    }
};