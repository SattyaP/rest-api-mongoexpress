const productSchema = {
    name: { type: String, required: true },
    slug: { type: String },
    price: { type: Number, required: true },
    images: { type: [String] },
};

export default productSchema;
