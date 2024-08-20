//routing for pushing file to github
import express from 'express';
const router = express.Router();

import { githubUpload } from '../utilities/gitupload.js';
const user = "karonLan"; //should be hopekcc in our case

/**
 * user: branch name for each student
 * reponame: git repo for each class session
 * filename: filename that has already been uploaded to the server and now ready to be pushed
 */
router.put('/github/:user/:reponame/:filename',async function(req, res){
    const branch = req.params.user;
    const repo = req.params.reponame;
    const filename = req.params.filename;
    try {
        await githubUpload(user,repo,filename,branch);
        res.send("Github Uploaded!")
    }
    catch (err){
        res.status(500).send(`Github upload error: ${err}`);
    } 
})



export default router;