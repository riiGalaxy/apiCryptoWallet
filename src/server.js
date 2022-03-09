const { PORT, MONGODB_URL } = require('./env')
const app = require('./app')
const mongodb = require('./core/mongodb')



app.listen(PORT, () => {
    console.log(`Api runnning on port: ${PORT}`)

    mongodb.connection.on('open', () => console.log(`MongoDB connected to: ${MONGODB_URL}`)).on('error', () => console.log(`Error connected to mongodb: ${MONGODB_URL}`))
})

