export default function validateSchema(schema, data) {
    const keys = Object.keys(schema);
    const errors = [];
    keys.forEach(key => {
        if (schema[key].required && !data[key]) {
            errors.push(`${key} is required`);
        }
    });

    if (errors.length) {
        return { error: errors };
    }
}

