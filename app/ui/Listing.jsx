"use client"

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../lib/userSlice';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Card, CardMedia, CardContent, Typography, Box, Chip, Rating } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';

export default function Listing() {
    const dispatch = useDispatch();
    const { data: users, loading, error } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    if (loading) return <p>Loading data...</p>;
    if (error) return <p>Error: {error}</p>;

    const recipeList = users ? Object.values(users) : [];

    return (
        <List>
            {recipeList.map((recipe) => (
                <ListItem key={recipe.id}>
                    <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 3, overflow: 'hidden' }}>
                        <CardMedia
                            component="img"
                            height="194"
                            image={recipe.image}
                            alt={recipe.name}
                        />
                        <CardContent>

                            <Typography variant="h6" component="h2" noWrap sx={{ fontWeight: 'bold' }}>
                                {recipe.name}
                            </Typography>

                            <Box display="flex" mt={2} pt={2} sx={{ borderTop: '1px solid #e0e0e0' }}>

                                <Box display="flex" gap={0.5}>
                                    <RestaurantIcon fontSize="small" color="action" />
                                    <Typography variant="caption" color="text.secondary">
                                        {recipe.servings} servings
                                    </Typography>
                                </Box>
                                <Box display="flex">
                                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                        {recipe.caloriesPerServing} kcal
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </ListItem>
            ))}
        </List>


    );
}




