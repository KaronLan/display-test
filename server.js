import express from 'express';
import bodyParser from 'body-parser';
import api from './routes/api.js';
import cors from 'cors';
import push from './routes/push.js';
import multer from 'multer';
const app = express();

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(cors());

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Acess-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true); //allow cookies,such as sessions
    next();
})

//fetch basic information from github
app.use('/api', api); 

//upload to server api, save file to local folder `/uploads`
app.post('/upload', upload.single('file'), (req,res) =>{
  res.json(req.file);
  console.log("File uploaded to server.");
}) //path application will send the request to

//push to github api
app.use('/push', push);


app.get('/', function(req, res){
    res.send('HopeKcc Upload Test is up and running');
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})


