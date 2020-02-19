'use strict'

const connectDb = require('./db')

module.exports = {


  createDomain: async (root, {input}) => {
    const defaults = {
      status: false,
      created_at: new Date(),
      modified_at: new Date(),
      last_checked: new Date(),
      count_emails: 0
    }


    const newDomain = Object.assign(defaults, input)
    let db
    let domain
    try {
      db = await connectDb()
      domain = await db.collection('domain').insertOne(newDomain)
      newDomain._id = course.insertedId
    } catch (e) {
      console.error(e)
    }

    return newDomain
  },

  // createEmail: async (root, {input}) => {
  //   let db
  //   let student
  //   try {
  //     db = await connectDb()
  //     student = await db.collection('email').insertOne(newCourse)
  //     input._id = student.insertedId
  //   } catch (e) {
  //     console.error(e)
  //   }

  //   return input
  // }



 }
