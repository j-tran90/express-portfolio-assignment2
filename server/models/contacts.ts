import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ContactSchema = new Schema
({
    name: String,
    email: String,
    phone: String
},
{
    collection: "contacts"
});

const Model = mongoose.model("Contacts", ContactSchema);
export default Model;
