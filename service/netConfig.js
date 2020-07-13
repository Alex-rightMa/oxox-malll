let user = process.argv[2] ;
let password = process.argv[3];

module.exports = {
    port: 3000,
    password: 'manguodbgreat',
    mongooseStr: `mongodb+srv://${user}:${password}@publicrog-kn7zd.mongodb.net/test?retryWrites=true&w=majority`,
    secret: 'zhihu-jwt-20200601',
}