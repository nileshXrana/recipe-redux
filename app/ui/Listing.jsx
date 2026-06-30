"use client"

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { fetchUsers } from '../lib/userSlice';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import './Listing.css';

export default function Listing() {
    const dispatch = useDispatch();
    const { data: users, loading, error } = useSelector((state) => state.users);
    const { ref, inView } = useInView({ threshold: 0 });

    const recipeList = users ? Object.values(users) : [];

    useEffect(() => {
        if (inView && !loading) {
            dispatch(fetchUsers());
        }
    }, [inView, loading, dispatch]);

    const isInitialLoad = loading && recipeList.length === 0;

    if (isInitialLoad) return <Typography>Loading data...</Typography>;
    if (error && recipeList.length === 0) return <Typography>Error: {error}</Typography>;

    return (
        <Box>
            <Box className="recipe-grid">
                {recipeList.map((recipe, index) => (
                    <Card key={`${recipe.id}-${index}`} className="recipe-card">
                        <CardMedia
                            component="img"
                            image={recipe.image}
                            alt={recipe.title || recipe.name}
                            className="recipe-image"
                        />
                        <CardContent className="recipe-content">
                            <Typography variant="h6" component="h2" className="recipe-title">
                                {recipe.title || recipe.name}
                            </Typography>

                            <Box className="recipe-footer">
                                {recipe.servings && (
                                    <Box className="recipe-servings">
                                        <RestaurantIcon fontSize="small" style={{ color: 'rgb(8, 8, 8)' }} />
                                        <Typography variant="caption" className="recipe-servings-text">
                                            {recipe.servings} servings
                                        </Typography>
                                    </Box>
                                )}
                                {recipe.caloriesPerServing && (
                                    <Box>
                                        <Typography variant="caption" className="recipe-calories">
                                            {recipe.caloriesPerServing} kcal
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
            <Box ref={ref} className="loading-more">
                {loading && (
                    <Typography variant="body2" className="loading-text">
                        Loading more recipes...
                    </Typography>
                )}
            </Box>
        </Box>
    );
}
