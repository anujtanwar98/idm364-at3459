import { db } from '../../../firebase.js';
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
    try {
        const productsGet = collection(db, 'devices');
        const productSnapshot = await getDocs(productsGet);
        const productList = productSnapshot.docs.map(doc => doc.data());

        return new Response(JSON.stringify({ products: productList }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
