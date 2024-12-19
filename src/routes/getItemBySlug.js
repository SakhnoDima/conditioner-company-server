import express from 'express';
import axios from 'axios';

const router = express.Router();

const WEBFLOW_API_BASE_URL = 'https://api.webflow.com/v2';
const COLLECTION_ID = '675fee9ed66623e9cfb33744';
const WEBFLOW_API_KEY = '9589fcc5c3365f96a330d763a34d7b908b95c22760a0ae9b24a70d94e6bd34d3';

router.get('/get-item-by-slug/:slug', async (req, res) => {
    const { slug } = req.params;

    try {
        const response = await axios.get(`${WEBFLOW_API_BASE_URL}/collections/${COLLECTION_ID}/items`, {
            headers: {
                Authorization: `Bearer ${WEBFLOW_API_KEY}`,
                'Content-Type': 'application/json',
            },
            params: { slug },
        });

        const item = response.data?.items?.[0] || null;

        if (!item) {
            return res.status(404).json({
                message: `No item found with slug: ${slug}`,
            });
        }

        res.status(200).json({
            message: 'Item fetched successfully',
            item,
        });
    } catch (error) {
        console.error('Error fetching item by slug:', error.message);
        res.status(500).json({
            message: 'Failed to fetch item by slug',
            error: error.response?.data || error.message,
        });
    }
});

export default router;
