import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';

const Oops404 = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
    };

    const textVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.6 } },
    };

    return (
        <Box mt={20}>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: "10%",
                }}
            >
                <motion.div variants={textVariants}>
                    <Typography variant="h3" fontWeight={'bold'} component="h1" gutterBottom>
                        Oops!
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom>
                        La page que vous recherchez n'existe pas.
                    </Typography>
                </motion.div>
                <motion.div variants={buttonVariants}>
                    <Button
                        onClick={() => window.history.back()}
                        variant="outlined"
                        color="primary"
                    >
                        Revenir en arrière
                    </Button>
                </motion.div>
            </motion.div>
        </Box>
    );
};

export default Oops404;