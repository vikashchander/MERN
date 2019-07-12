const express = require('express'),
    routes = express.Router(),
    auth = require('../../middleware/auth'),
    profile = require('../../models/profile'),
    user = require('../../models/Users'),
    {check, validationResult } = require('express-validator');

// @routes Get  api/profile
// @des        Test route
//  @access    Public 


routes.get('/me', auth, async (req, res) => {
    try {
        const data = profile.findOne({
            user: req.userDat
        }).populate('user', ['name', 'avator']);
        if (!data) {
            return res.status(400).json({
                msg: ' no user profile data found'
            })
        }
        res.status(200).json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});
// @routes Get  api/profile
// @des        Test route
//  @access    Public 
  routes.post('/', [auth,[
      check('status', 'Status is required').not().isEmpty(),
      check('Skills', 'profile is required').not().isEmpty()
    ] ], async(req,res)=>{
   const errors = validationResult(req);
   if(!errors.isEmpty()){
       return res.status(400).json({error: errors.array()})
   }
   const {
       company, 
       website,
       location,
       bio,
       status,
       githubusername,
       skills,
       youtube,
       facebook,
       twitter,
       instagram,
       linkedin
   }     = req.body;
   const profileFields ={};
   profileFields.id = req.user.id;
   if(company) profileFields.company = company;
   if(website) profileFields.website = website;
   if(location) profileFields.bio = bio;
   if(status) profileFields.status = status;
   if(githubusername) profileFields.githubusername = githubusername;
   if(skills){
       profileFields.skills = skills.split(',').map(skill => skill.trim());
   };
    profileFields.social = { }
          if(youtube) profileFields.social.youtube = youtube;
          if(twitter) profileFields.twitter = twitter;
          if(linkedin) profileFields.linkedin =linkedin;
          if(facebook) profileFields.facebook = facebook;
          if(instagram) profileFields.instagram = instagram;
          try {
              let profile = await Profile.findOne({user: req.user.id});
                if(profile) {
                     profile = Profile.findOneAndUpdate({
                         user: req.user.id},
                         {$set:profileFields}, 
                         {new:true});
                     return res.json(profile);
                    }
         
                    //  Create
              profile  = new Profile(profileFields);
              await profile.save();
              res.send(200).json(profile);

          } catch (error) {
              console.error(error.message)
              res.status(500).send('server errors ');
          }
     } )

module.exports = routes;