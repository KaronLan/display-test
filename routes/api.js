//routing for fetching basic info from github api
import express from 'express';
import https from 'https';
const router = express.Router();



router.get('/github/userinfo/:user',async function(req, res){
    const user = req.params.user;
    const options = {
        hostname: 'api.github.com',
        path:'/users/' + user,
        headers:{
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'
        },
        OAUth:"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"
    }
    https.get(options, function(apiResponse){
        apiResponse.pipe(res);
    }).on('error', (e) =>{
        console.log(e);
        res.status(500).send('Something went wrong!');
    })
})

router.get('/github/repoinfo/:user/:reponame',async function(req, res){
    const user = req.params.user;
    const reponame = req.params.reponame;
    const options = {
        hostname: 'api.github.com',
        path:'/repos/' + user + '/' + reponame,
        headers:{
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'
        },
        OAUth:"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"
    }
    https.get(options, function(apiResponse){
        apiResponse.pipe(res);
    }).on('error', (e) =>{
        console.log(e);
        res.status(500).send('Something went wrong!');
    })
})

router.get('/github/commitinfo/:user/:reponame',async function(req, res){
    const user = req.params.user;
    const reponame = req.params.reponame;
    const options = {
        hostname: 'api.github.com',
        path: '/repos/' + user + '/' + reponame + '/commits',
        headers:{
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'
        },
        OAUth:"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"
    }
    https.get(options, function(apiResponse){
        apiResponse.pipe(res);
    }).on('error', (e) =>{
        console.log(e);
        res.status(500).send('Something went wrong!');
    })
})


// router.put('/github/upload/:user/:reponame/:branchname/:filename', async function(req, res){
//     const user = req.params.user;
//     const reponame = req.params.reponame;
//     const branchname = req.params.branchname;
//     const filepath = '../upload' + req.params.filepath; 
//     const options = {
//         hostname: 'api.github.com',
//         path:'repos/' + user + '/' + reponame +'/contents'+ filepath,
//         headers:{
//             'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'
//         },
//         body:{
           
//         },
//         OAUth:"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"
//     }
// })

// module.exports = router;
export default router;