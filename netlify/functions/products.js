const { getStore } = require('@netlify/blobs');

const INITIAL_PRODUCTS = {
    bathtubs: [
        { id: "1", name: "Standard Alcove Tub", price: 450 },
        { id: "2", name: "Freestanding Soaking Tub", price: 1200 },
        { id: "3", name: "Walk-in Safety Tub", price: 3500 }
    ],
    showers: [
        { id: "1", name: "Standard Shower Stall", price: 800 },
        { id: "2", name: "Walk-in Shower", price: 1500 },
        { id: "3", name: "Custom Tile Shower", price: 3000 }
    ],
    trim: [
        { id: "1", name: "Chrome Faucet Set", price: 150 },
        { id: "2", name: "Brushed Nickel Fixtures", price: 200 },
        { id: "3", name: "Rainfall Showerhead", price: 250 }
    ],
    toilets: [
        { id: "1", name: "Standard Two-Piece", price: 250 },
        { id: "2", name: "One-Piece Elongated", price: 400 },
        { id: "3", name: "Wall-Mounted", price: 600 }
    ],
    sinks: [
        { id: "1", name: "Pedestal Sink", price: 200 },
        { id: "2", name: "Vanity with Sink", price: 500 },
        { id: "3", name: "Vessel Sink", price: 350 }
    ],
    tiles: [
        { id: "1", name: "Ceramic Floor Tile (per sq ft)", price: 5 },
        { id: "2", name: "Porcelain Wall Tile (per sq ft)", price: 8 },
        { id: "3", name: "Natural Stone (per sq ft)", price: 15 }
    ],
    labor: [
        { id: "1", name: "Basic Installation", price: 500 },
        { id: "2", name: "Full Bathroom Remodel", price: 5000 },
        { id: "3", name: "Plumbing Work (per hour)", price: 100 }
    ]
};

exports.handler = async (event, context) => {
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const store = getStore('products');

        // Get products from blob storage
        let productsData = await store.get('data', { type: 'json' });

        // Initialize with default data if not exists
        if (!productsData) {
            productsData = INITIAL_PRODUCTS;
            await store.set('data', JSON.stringify(productsData));
        }

        if (event.httpMethod === 'GET') {
            // Return all products
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(productsData)
            };
        }

        if (event.httpMethod === 'POST') {
            // Add new item
            const { category, name, price } = JSON.parse(event.body);

            if (!category || !name || !price) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'Missing required fields' })
                };
            }

            const newItem = {
                id: Date.now().toString(),
                name,
                price: parseFloat(price)
            };

            productsData[category].push(newItem);
            await store.set('data', JSON.stringify(productsData));

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ success: true, item: newItem })
            };
        }

        if (event.httpMethod === 'DELETE') {
            // Delete item
            const { category, id } = JSON.parse(event.body);

            if (!category || !id) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'Missing required fields' })
                };
            }

            productsData[category] = productsData[category].filter(item => item.id !== id);
            await store.set('data', JSON.stringify(productsData));

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ success: true })
            };
        }

        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message, stack: error.stack })
        };
    }
};
