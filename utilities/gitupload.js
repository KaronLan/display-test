//functions for github upload and converet file to base64
import { Octokit } from "@octokit/core";

import fs from 'fs';

//takes in a filename and find the file in the server
//then converts into Base64 string
function getBase64(filename) {
    return new Promise((resolve, reject) => {
        // Read the file from the filesystem
        const filePath = `./uploads/`+ filename;
        fs.readFile(filePath, (err, data) => {
            if (err) {
                // Reject the promise if an error occurs
                return reject(`Error reading file: ${err.message}`);
            }

            // Convert the file data to a Base64 string
            const base64String = data.toString('base64');
            resolve(base64String); // Resolve the promise with the Base64 string
        });
    });
}

// upload to git using Octokit
export async function githubUpload(user, repo, filename, branch) {
    console.log('githubUpload function');
    const octokit = new Octokit({ auth: "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" })
    try{
        console.log('Octokit created');
        return await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner:user,
            repo:repo,
            branch:branch,
            path:  filename,
            message: `Upload File - `+ filename,
            content: await getBase64(filename)
        })
    } catch(e){
        console.error(e);
        res.status(500).send('Octokit went wrong!');
    }
}
 