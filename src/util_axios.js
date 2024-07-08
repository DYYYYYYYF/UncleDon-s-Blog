import axios from 'axios'

axios.get('/Home')
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error);
    });

axios.post('/Home', {
        firstName: 'Don',
        secondName: 'Duck'
    }).then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error);
    })
