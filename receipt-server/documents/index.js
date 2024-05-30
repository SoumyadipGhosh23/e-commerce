module.exports = ({ name, razorpay_order_id, razorpay_signature, razorpay_payment_id, price, shippingFee}) => {
   const today = new Date();
   const totalPrice = parseInt(price) + parseInt(shippingFee);

   return `
       <!doctype html>
       <html>
           <head>
               <meta charset="utf-8">
               <title>Modern Invoice</title>
               <style>
                   body {
                       font-family: 'Arial', sans-serif;
                       background-color: #f4f4f4;
                       margin: 0;
                       padding: 0;
                   }

                   .invoice-box {
                       max-width: 800px;
                       margin: 20px auto;
                       background-color: #fff;
                       box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                       border: 1px solid #ccc;
                       padding: 30px;
                       font-size: 16px;
                       line-height: 24px;
                       color: #555;
                       border-radius: 10px;
                   }

                   .invoice-box img {
                       width: 100%;
                       max-width: 200px;
                       border-radius: 10px;
                   }

                   .invoice-box table {
                       width: 100%;
                       line-height: inherit;
                       text-align: left;
                       border-collapse: collapse;
                   }

                   .invoice-box table td {
                       padding: 15px;
                       vertical-align: top;
                       border: 1px solid #ddd;
                   }

                   .invoice-box table tr.top table td {
                       padding-bottom: 20px;
                       background-color: #f8f8f8;
                   }

                   .invoice-box table tr.top table td.title {
                       font-size: 45px;
                       line-height: 45px;
                       color: #333;
                   }

                   .invoice-box table tr.heading td {
                       background: #eee;
                       border-bottom: 1px solid #ddd;
                       font-weight: bold;
                   }

                   .invoice-box table tr.details td {
                       padding-bottom: 20px;
                   }

                   .invoice-box table tr.item td {
                       border-bottom: 1px solid #eee;
                       background-color: #f4f4f4;
                   }

                   .invoice-box table tr.item.last td {
                       border-bottom: none;
                   }

                   .invoice-box table tr.total td:nth-child(2) {
                       border-top: 2px solid #eee;
                       font-weight: bold;
                       background-color: #f8f8f8;
                   }

                   h1 {
                       color: #555;
                       text-align: right;
                       margin-top: 20px;
                   }

                   @media only screen and (max-width: 600px) {
                       .invoice-box table tr.top table td {
                           width: 100%;
                           display: block;
                           text-align: center;
                       }

                       .invoice-box table tr.information table td {
                           width: 100%;
                           display: block;
                           text-align: center;
                       }
                   }
               </style>
           </head>
           <body>
               <div class="invoice-box">
                   <table cellpadding="0" cellspacing="0">
                       <tr class="top">
                           <td colspan="2">
                               <table>
                                   <tr>
                                       <td class="title">
                                           <img src="https://images.pexels.com/photos/50987/money-card-business-credit-card-50987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Logo">
                                       </td>
                                       <td>
                                           Date: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}
                                       </td>
                                   </tr>
                               </table>
                           </td>
                       </tr>
                       <tr class="information">
                           <td colspan="2">
                               <table>
                                   <tr>
                                       <td>
                                           Customer Name: ${name}
                                       </td>
                                       <td>
                                           Receipt number: ${razorpay_order_id}
                                       </td>
                                   </tr>
                                   <tr>
                                       <td>
                                           Razorpay Order ID: ${razorpay_order_id}
                                       </td>
                                       <td>
                                           Razorpay Payment ID: ${razorpay_payment_id}
                                       </td>
                                   </tr>
                                   <tr>
                                       <td>
                                           Razorpay Signature: ${razorpay_signature}
                                       </td>
                                   </tr>
                               </table>
                           </td>
                       </tr>
                       <tr class="heading">
                           <td>Item</td>
                           <td>Price</td>
                       </tr>
                       <tr class="item">
                           <td>Price:</td>
                           <td>${price}₹</td>
                       </tr>
                       <tr class="item">
                           <td>Shipping Fee:</td>
                           <td>${shippingFee}₹</td>
                       </tr>
                   </table>
                   <br />
                   <h1>Total Price: ${totalPrice}₹</h1>
               </div>
           </body>
       </html>
   `;
};
