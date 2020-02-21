'use strict'

function errorHandler(error){
    console.error(error)
    throw new Error('application error')
}