import { Schema } from "mongoose";

export const softErase = (schema) => {
    // schema.add({ isDeleted: { type: Boolean, default: false}}); //add more isDeleted Field
    //Create function softDelete(); Model can use it
    schema.statics.softDelete = async function(filter){
        const doc = await this.findOne(filter); // find 1 document is exists filter pass in
        if(doc){ // check 
            doc.isDeleted = true; //set field isDeleted = true
            return doc.save();
        }
        return null;
    }
    schema.statics.restore = async function(filter){
        const doc = await this.findOne(filter);  
        if(doc){ 
            doc.isDeleted = false;  
            return doc.save();
        }
        return null;
    }
    //add function query
    schema.query.isDeleted = function() {
        return this.where('isDeleted').ne(false);
    }
    schema.query.notDeleted = function() {
        return this.where('isDeleted').eq(false);
    } 
}


export const BaseSchema = new Schema({
    isDeleted: { type: Boolean, default: false },
    createAt: { type: Date, default: Date.now() },
    updateAt: { type: Date, default: Date.now() },
},{
    _id: true,
    timestamps: { createdAt: 'createAt', updatedAt: 'updateAt' },
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});