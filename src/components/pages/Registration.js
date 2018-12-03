import React, { Component } from 'react';

class Registration extends Component {
    render() {

        const centerStyle = {
            textAlign: "center"
        };

        const borderWidthStyle = {
            borderWidth : "0px"
        };   

        const formStyle = {
            display: "inline-block",
            padding: "4px",
            verticalAlign: "top"
        };

        return (
            <div className="container">
               <div className="row">
                  <div className="col-md-12">
                     <div className="jumbotron">
                        <h2 className="h2-responsive">SQAB Membership and Registration (2019)</h2><br/>
                        <p className="lead">Membership is $20 and is payable through PayPal or surface mail. The membership fee is separate from registration fees. </p>
                        <p className="lead">Membership includes six months of free electronic access to the Special Issue of Behavioural Processes, containing the proceedings of last year's SQAB meeting, beginning on the date of our conference. </p>
                        <p className="lead">Online registration is only available prior to May 1. All other registration will be onsite. As of October 31, 2018 both online and onsite fees will be the same amount.</p>
                        <p className="lead">Please see the table at the bottom of this page for details regarding registration costs <strong>without</strong> the inclusion of membership fees.</p>
                        <p className="lead">Please refer back to this page in the future regarding non-member fees and single-day conference registration.</p>
                     </div>
                  </div>
               </div>
            
               <div className="row">
                  <div className="col-sm-12">
                     <h2 className="h2-responsive text-center">Online Registration Options</h2><br/>
                  </div>
               </div>
            
               <div className="row">
                  <div className="col-sm-6">
                     <div className="well">
                        <h2 className="h2-responsive">Full 2019 Conference Registration</h2><br/>
                        <p className="lead">The fees here <strong>do not</strong> include the $20 Membership fee.</p>
            
                        <div className="panel panel-default noshadow">
                           <table className="table table-borderless">
                              <tbody>
                                 <tr>
                                    <td className="summary-heading">Type</td>
                                    <td className="summary-content">Flat Fee</td>
                                 </tr>
                                 <tr>
                                    <td className="summary-heading">Students</td>
                                    <td>$25</td>
                                 </tr>
                                 <tr>
                                    <td className="summary-heading">Post-docs</td>
                                    <td>$75</td>
                                 </tr>
                                 <tr>
                                    <td className="summary-heading">Full/Other*</td>
                                    <td>$100</td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
            
                        <h4 className="h3-responsive">Note:* "Other" registration is appropriate for faculty, professionals, or those not fitting the other categories​</h4>   
                     </div>         
                  </div>
            
                  <div className="col-md-6">
                     <div className="well">
                        <h2 className="h2-responsive">Not attending the annual symposium?</h2><br/>
                        <p className="lead">If you would like to maintain your SQAB membership, you can pay your 2019 membership dues here.</p>
                        <p className="lead"><strong>2019 Membership without Registration is $20.</strong></p>
                        <div className="wsb-element-paypal" data-type="element">
                           <div style = { centerStyle }>
                              <div style = { formStyle }>
                                 <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="paypal">
                                    <input type="hidden" name="cmd" value="_xclick"/>
                                    <input type="hidden" name="currency_code" value="USD"/>
                                    <input type="hidden" name="business" value="sqab1978@gmail.com"/>
                                    <input type="hidden" name="item_name" value="2017 SQAB Membership"/>
                                    <input type="hidden" name="item_number"/>
                                    <input type="hidden" name="amount" value="20.00"/>
                                    <input type="hidden" name="button_subtype" value="services"/>
                                    <input type="hidden" name="shipping"/>
                                    <input type="image" 
                                           src="//www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" 
                                           border="0" 
                                           name="submit" 
                                           alt="PayPal - The safer, easier way to pay online!"/>
                                    <input type="hidden" 
                                           name="bn" 
                                           value="godaddy_hosting_WPS_US"/>
                                    <img alt="" style = { borderWidthStyle } src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"/>
                                 </form>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            
               <div className="row">
                  <div className="col-sm-12">
                     <h2 className="h2-responsive text-center">Other Registration Options</h2><br/>
                  </div>
               </div>
            
               <div className="row">      
                  <div className="col-md-12">
                     <div className="well">
                        <h2 className="h2-responsive">Surface Mail Registration</h2><br/>
                        <p className="lead">If you wish to register and/or pay your membership fees using surface mail, please make checks payable to <strong>The Society for the Quantitative Analyses of Behavior</strong> or <strong>SQAB</strong>. Regarding payment information, please refer to the table listed above to determine the appropriate payment (i.e., Membership with/without Registration).</p>
            
                        <p className="lead">Please include the following along with your payment: Registration/membership type, name, current affiliation, mailing address, email address, and phone number.</p>
            
                        <p className="lead">2019 Membership/Registration can be sent to:<br/><br/>
                           Carla Lagorio<br/>
                           Psychology Department<br/>
                           University of Wisconsin-Eau Claire<br/>
                           Hibbard Humanities Hall 269<br/>
                           Eau Claire, WI 54702-4004​
                        </p>
                     </div>
                  </div>
               </div>
            </div>
        )
    }
}

export default Registration;