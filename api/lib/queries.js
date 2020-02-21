'use strict'

const connectDb = require('./db')
const {ObjectID} = require('mongodb')
const { errorHandler } = require('./errorHandler')

module.exports = {

  /* Domains */
  getDomain: async (root, {id}) => {
    let db = null;
    let domain = null
    try {
      db = await connectDb()
      domain = await db.collection('domain').findOne({_id:ObjectID(id)})
    } catch (e) {
      errorHandler(e)
    }

    return domain
  },


  getDomains: async () => {
    let db = null;
    let domains = []
    try {
      db = await connectDb()
      domains = await db.collection('domain').find().toArray()
    } catch (e) {
      errorHandler(e)
    }

    return domains
  },
  /*END Domains */

  /* Emails */

  getEmail: async (root, {id}) => {
    let db = null;
    let email = null
    try {
      db = await connectDb()
      email = await db.collection('email').findOne({_id:ObjectID(id)})
    } catch (e) {
      errorHandler(e)
    }

    return email
  },

  /*END Emails */

  // getCourses: async () => {
  //   let db = null;
  //   let courses = []
  //   try {
  //     db = await connectDb()
  //     courses = await db.collection('courses').find().toArray()
  //   } catch (e) {
  //     console.error(e)
  //   }

  //   return courses
  // },

  // getCourse: async (root, {id}) => {
  //   let db = []
  //   let course = null;
  //   try {
  //     db = await connectDb()
  //     course = await db.collection('courses').findOne({_id:ObjectID(id)})
  //   } catch (e) {
  //     console.error(e)
  //   }

  //   return course

  // },



  //   getStudents: async () => {
  //     let db = null;
  //     let students = []
  //     try {
  //       db = await connectDb()
  //       students = await db.collection('students').find().toArray()
  //     } catch (e) {
  //       console.error(e)
  //     }

  //     return students
  //   },

  //   getStudent: async (root, {id}) => {
  //     let db = []
  //     let student = null;
  //     try {
  //       db = await connectDb()
  //       student = await db.collection('students').findOne({_id:ObjectID(id)})
  //     } catch (e) {
  //       console.error(e)
  //     }

  //     return student

  //   }



}
