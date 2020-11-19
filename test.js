const db =require('./models')

db.fave.findAll().then(allUsers => {
    console.log(allUsers.get());
});