export default [
    {
        files: ['**/*.js'],    // Apply to all JavaScript files
        rules: {
            semi : 'error',    // Enforce semicolons at the end of statements
            'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],  // Warn on unused variables, ignoring those that start with uppercase letters or underscores
        }
    }
];