var express = require('express');
var axios = require('axios');
var https = require('https');
var router = express.Router();
// const PaytmChecksum = require('./PaytmChecksum');
const PaytmChecksum = require('paytmchecksum');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('newone', { title: 'Express' });
});
router.get('/new', function (req, res, next) {
  res.render('newone', { title: 'Express' });
});

router.get('/send_payment',async function(req,res){


var paytmParams = {};

paytmParams["subwalletGuid"]      = "28054249-XXXX-XXXX-af8f-fa163e429e83";
paytmParams["orderId"]            = "ORDERID_98765";
paytmParams["transferMode"]       = "UPI";
paytmParams["beneficiaryVPA"]     = "8008700288@ybl";
paytmParams["amount"]             = "1.00";
paytmParams["purpose"]            = "BLOKPE PAYMENT";
paytmParams["date"]               = "2022-07-03";
paytmParams["transactionType"]    = "NON_CASHBACK";
paytmParams["purpose"]            = "OTHERS";
var post_data = JSON.stringify(paytmParams);

/**
* Generate checksum by parameters we have in body
* Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
*/
PaytmChecksum.generateSignature(post_data, "jc0MMQcdZF7jZz7E").then(function(checksum){
  console.log('checksum',checksum)

    var x_mid      = "aAqJYj53270806711058";
    var x_checksum = checksum;

    var options = {

        /* for Staging */
        hostname: 'dashboard.paytm.com',

        /* for Production */
        // hostname: 'dashboard.paytm.com',

        path: '/bpay/api/v1/disburse/order/bank',
        port: 443,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-mid': x_mid,
            'x-checksum': x_checksum,
            'Content-Length': post_data.length
        }
    };

    var response = "";
    
    var post_req = https.request(options, function(post_res) {
        post_res.on('data', function (chunk) {
            response += chunk;
        });

        post_res.on('end', function(){
            console.log('Response: ', response);
        });
    });

    post_req.write(post_data);
    post_req.end();
    console.log('post_data',post_data)
});
return res.status(200).json({message:'DOne'})
})
// router.get('/sendpayment', async function (req, res) {
//   // var data = JSON.stringify({

//   //   accountholdername: "Kryptwave",
//   //   accrefnumber: "4211172426",
//   //   acctype: "savings",
//   //   amount: "1.00",
//   //   approvalRef:"123456",
//   //   customerRefid: "4444444",
//   //   devicedetails: {
//   //     app: "blokpe",
//   //     capability: "1111",
//   //     gcmid: "string",
//   //     geocode: "12.02,17.03",
//   //     id: "string",
//   //     ip: "127.0.0.1",
//   //     location: "hyderabad",
//   //     mobile: "918008551266",
//   //     os: "iOS",
//   //     type: ""
//   //   },
//   //   ifsc: "PYTM0123456",
//   //   mcc: "1520",
//   //   merchaentrefid: "merm0001",
//   //   mobilenumber: "918008551266",
//   //   payeevpa: "8008551266@ybl",
//   //   payervpa: "8008551266@ybl",
//   //   remarks: "Merchant Prepay Test",
//   //   txnid:
//   //     "KMBMTEST310118124749000000010000002"

//   // });
//   // var config = {
//   //   "method": 'POST',
//   //   "url": 'https://apigwuat.kotak.com:8443/upi/Merchant/Pay',
//   //   "headers": {
//   //     'Authorization': 'Bearer b615e8e6-c5f1-42d9-8a6c-b06631999b7b',
//   //     'Content-Type': 'application/json'
//   //   },
//   //   "data": data
//   // };

//   await axios.post('https://apigwuat.kotak.com:8443/upi/Merchant/Pay',{

//     accountholdername: "Kryptwave",
//     accrefnumber: "4211172426",
//     acctype: "savings",
//     amount: "1.00",
//     approvalRef:"123456",
//     customerRefid: "4444444",
//     devicedetails: {
//       app: "blokpe",
//       capability: "1111",
//       gcmid: "string",
//       geocode: "12.02,17.03",
//       id: "string",
//       ip: "127.0.0.1",
//       location: "hyderabad",
//       mobile: "918008551266",
//       os: "iOS",
//       type: ""
//     },
//     ifsc: "PYTM0123456",
//     mcc: "1520",
//     merchaentrefid: "merm0001",
//     mobilenumber: "918008551266",
//     payeevpa: "8008551266@ybl",
//     payervpa: "8008551266@ybl",
//     remarks: "Merchant Prepay Test",
//     txnid:
//       "KMBMTEST3101181247490000000100000023"

//   },{
//     'Authorization': 'Bearer 692eaf26-6edb-4037-bac3-f5a6dcbe1826',
//     'Content-Type': 'application/json'
//   })
//     .then(function (response) {
//       console.log(JSON.stringify(response.data));
//       return res.status(200).json({'messgage':JSON.stringify(response.data)})
//     })
//     .catch(function (error) {
//       console.log(error);
//       return res.status(200).json({'error':error})
//     });
//   // var objforpayment = {
//   //   account_number: '918008551266',
//   //   amount: 5 * 100,
//   //   currency: 'INR',
//   //   mode: 'UPI',
//   //   purpose: 'refund',
//   //   fund_account: {
//   //     account_type: 'vpa',
//   //     vpa: {
//   //       address: '8008551266@ybl'
//   //     },
//   //     contact: {
//   //       name: 'Sai Kiran',
//   //       email: 'sai.kiran3500@gmail.com',
//   //       contact: '8008551266',
//   //       type: 'self',
//   //       reference_id: 'HUsfdwfbuweifejkfnefwe',
//   //     }
//   //   },
//   //   queue_if_low_balance: true,
//   //   narration: 'Payment',

//   // };
//   // const token = Buffer.from(
//   //   "rzp_live_U6UKMQtGY20aCC:zqUiGSAFQjeX7rct5HKh41Lk",
//   //   'utf8'
//   // ).toString('base64');

//   // await axios
//   // .post('https://api.razorpay.com/v1/payouts', objforpayment, {
//   //   headers: { Authorization: `Basic ${token}` }
//   // })
//   // .then(async response => {
//   //   console.log(response)
//   // }).catch((err)=>{
//   //   console.log(err)
//   // })
// })




module.exports = router;

// rzp_live_U6UKMQtGY20aCC  // Key Id


// zqUiGSAFQjeX7rct5HKh41Lk // Key secret