const mongoose = require('mongoose');

/** ProjectSchema: Model to handle project collections in our database with instance of the 
 * relationship with client in our record
  */
const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 50,
        minlength: 4,
      },
    description: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 500,
        minlength: 10,
      },
    
    status: {
        type: String,
        enum: ['Not started', 'In Progress', 'Completed']
    },
    clientId: {
        // for relationship based on collection to map to Project model
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    }
})

module.exports = mongoose.model("Project", ProjectSchema)