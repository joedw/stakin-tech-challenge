module.exports = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        secret: 'bleb'
       
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api'  // 'http://ec2-13-245-2-71.af-south-1.compute.amazonaws.com:3000/api' // development api
            : 'http://localhost:3000/api' // production api
    }
}
