var express = require('express');
var router = express.Router();

var Assets = require('../models/assets');
var Users = require('../models/users');
var Evaluations = require('../models/assets');

const catchErrors = require('../lib/async-error');

var Data = require('./data')


// router.get('/detail/:id', catchErrors(async (req, res, next) => {
//     const eval = await Evaluations.findById(req.params.id);
//     console.log("??",eval);
//     const user = await Users.findById(req.session.user.id);
//     console.log("??????" , user);

//     const asset = Data.asset;

//     res.render('detail/eval_detail', {asset: asset, user: user});

// }))

router.get('/detail/:id', catchErrors(async (req,res, next) => {
    const asset = await Assets.findById(req.params.id);
    console.log("asset?? ", asset);
    const user = await Users.findById(req.session.user.id);
    console.log("user???", user);

    // const asset1 = Data.asset;
    res.render('detail/eval_detail', {asset: asset, user:user});
}))


router.get('/list', catchErrors(async (req, res, next) => {
    var evalHead = ['#', '분류', '자산명', '등록자', '등록일시']
    const eval = await Evaluations.find({is_evaluate: false}).populate('user_id')
    console.log(eval);
    res.render('list/eval_invest_list', {title: '평가되지 않은 리스트',check: 'eval', list: evalHead, eval: eval});
    
}));

module.exports = router;