import express from 'express';
import axios from 'axios';

const router = express.Router();

const WEBFLOW_API_BASE_URL = 'https://api.webflow.com/v2';
const COLLECTION_ID = '675fee9ed66623e9cfb33744';
const WEBFLOW_API_KEY = '9589fcc5c3365f96a330d763a34d7b908b95c22760a0ae9b24a70d94e6bd34d3';

router.get('/update_popularity/:post_id', async (req, res) => {
    const { post_id } = req.params;

    try {
        const itemResponse = await axios.get(`${WEBFLOW_API_BASE_URL}/collections/${COLLECTION_ID}/items/${post_id}`, {
            headers: {
                Authorization: `Bearer ${WEBFLOW_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const currentData = itemResponse.data;
        const currentPopularity = currentData.fieldData.popularity || 0;

        const updatedPopularity = parseInt(currentPopularity, 10) + 1;

        const updateResponse = await axios.patch(
            `${WEBFLOW_API_BASE_URL}/collections/${COLLECTION_ID}/items/${post_id}`,
            {
                isArchived: false,
                isDraft: false,
                fieldData: {
                    ...currentData.fieldData,
                    popularity: updatedPopularity,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${WEBFLOW_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        res.status(200).json({
            message: 'Popularity updated successfully',
            updatedItem: updateResponse.data,
        });
    } catch (error) {
        console.error('Error updating popularity:', error.message);
        res.status(500).json({
            message: 'Failed to update popularity',
            error: error.response?.data || error.message,
        });
    }
});

export default router;
