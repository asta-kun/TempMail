'use strict'
const generateName = require('./utils/Email/generateName')
const connectDb = require('./db')
const {ObjectID} = require('mongodb')
const { errorHandler } = require('./errorHandler')


module.exports = {


  //add a new domain
  createDomain: async (root, {input}) => {

    //default values
    const defaults = {
      status: false,
      created_at: new Date(),
      modified_at: new Date(),
      last_checked: new Date(),
      count_emails: 0
    }

    //apply default values
    const newDomain = Object.assign(defaults, input)
    let db
    let domain


    try {
      //get db connection
      db = await connectDb()

      //find duplicate domains
      let duplicated = await db.collection('domain').find({
        "host":{
          "$eq":newDomain.host
        }
      }).count()

      //prevent duplicate domains
      if ( duplicated ){
        errorHandler('Duplicated domain')
      }

      //add new domain
      domain = await db.collection('domain').insertOne(newDomain)
      newDomain._id = domain.insertedId//add the generated id
    } catch (e) {
      errorHandler(e)
    }

    //return a OK domain added
    return newDomain
  },

 

    //add a new Email
    createEmail: async (root, {domain_id}) => {

      //Email
      const Email = {
        email: null,
        created_at: new Date(),
        remove_at: new Date(),
        mails: []
      }

  
      let db  
      try {
        //get db connection
        db = await connectDb()
  
        //get the domain
        let domain = await db.collection('domain').findOne({"_id":ObjectID(domain_id)})

        Email.email = generateName(domain.host)
  

  
        //add new Email
        let newEmail = await db.collection('email').insertOne(Email)
        Email._id = newEmail.insertedId//add the generated id
      } catch (e) {
        errorHandler(e)
      }
  
      //return a OK Email added
      return Email
    },
  


 }
