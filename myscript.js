    //********************************************************************************//
    //* Name :                                                                       *//
    //* Zenit login : int222_141                                                     *//
    //********************************************************************************//

function validationForPayment() {   

    //********************************************************************************//
    //*   You will need to call the functions that validate the following:           *//
    //********************************************************************************//
    //*        (1)              (2)              (3)             (4)                 *//
    //********************************************************************************//
    //*   Property value  -  Down payment  -  Interest rate -  Amortization          *//
    //********************************************************************************//
    //*   If there are no errors, then call                                          *//
    //*                                                                              *//
    //*      detailPaymentCalculation(...., ......, ......, ......);                 *//
    //*                                                                              *//
    //*   and make sure to pass the four values in the order shown above.            *//
    //*                                                                              *//
    //********************************************************************************//
    //*   If there are errors, simply update the comments area with the message:     *//
    //*   Please complete the form first and then click on Calculate Monthly Payment *//
    //*                                                                              *//
    //********************************************************************************//

} // End of validationForPayment function

    //********************************************************************************//
    //*   Do not modify any statements in detailPaymentCalculation function          *//
    //********************************************************************************//

function detailPaymentCalculation(mortAmount,mortDownPayment,mortRate,mortAmortization) {

    //********************************************************************************//
    //*   This function calculates the monthly payment based on the following:       *//
    //*                                                                              *//
    //*               M = P [ i(1 + i)n ] / [ (1 +  i)n - 1]                         *//
    //*                                                                              *//
    //********************************************************************************//
     var paymentError = "";
     var v = mortAmount * 1;
     var d = mortDownPayment * 1;
     var i = mortRate * 1;
     var y = mortAmortization * 1;
     var a = v - d;
         i = i/100/12;
         n = y * 12;
     var f = Math.pow((1+i),n);

     var p = (a * ((i*f)/(f-1))).toFixed(2);

     if (p=="NaN" || p=="Infinity") {
         paymentError = "Please complete the form before attempting to calculate the monthly payment" 
         document.forms[0].comments.value = paymentError;
         document.forms[0].payment.value = "";
     }
     else {
           document.forms[0].payment.value = p;
          // document.forms[0].comments.value = "";
     }

} // End of detailPaymentCalculation function



function completeFormValidation() {

    //********************************************************************************//
    //*                                                                              *//
    //* This function calls the different functions to validate all required fields  *//
    //*                                                                              *//
    //* Once you have validated all field,                                           *//
    //* determine if any error(s) have been encountered                              *//
    //*                                                                              *//
    //* If any of the required fields are in error:                                  *//
    //*                                                                              *//
    //*    present the client with a list of all the errors in reserved area         *//
    //*         on the form and                                                      *//
    //*          don't submit the form to the CGI program in order to allow the      *//
    //*          client to correct the fields in error                               *//
    //*                                                                              *//
    //*    Error messages should be meaningful and reflect the exact error condition.*//
    //*                                                                              *//
    //*    Make sure to return false                                                 *//
    //*                                                                              *//
    //* Otherwise (if there are no errors)                                           *//
    //*                                                                              *//
    //*    Change the 1st. character in the field called client to upper case        *//
    //*                                                                              *//
    //*    Change the initial value in the field called jsActive from OFF to ON      *//
    //*                                                                              *//
    //*    When a browser submits a form to a CGI program, disabled fields           *//
    //*    like the payment field are not included. To insure that the payment field *//
    //*    is sent to the CGI, include the following JavaScript statement            *//
    //*    document.forms[0].payment.disabled = false;                               *//
    //*                                                                              *//
    //*    Make sure to return true in order for the form to be submitted to the CGI *//
    //*                                                                              *//
    //********************************************************************************//
	var errors="";
	errors=uidval(errors);
	errors=clientval(errors);
	errors=propval(errors);
	errors=morval(errors);
	errors=checkForm(errors);
	errors=radioval(errors);
	errors=yr(errors);
	errors=mnt(errors);
	errors= intr(errors);
	errors=amo(errors);
	errors=propdetails(errors);
	
			if(errors != "" ) {
		
				document.getElementById('er').innerHTML = errors;
				return false;
					}
				else {
					document.getElementById('jsActive').value="on";
					document.getElementById('er') ="";
					 }
					 

} // End of completeFormValidation
	function uidval(errors)
			{
				
			
			var id=document.mortgage.userId.value;
			var len=id.length;
			var sum=0;
			 for (i = 0; i < 3; i++) 
            sum += parseInt(id.charAt(i));
			
			var sum1=0;
			for (i = 5; i <=9 ; i++)
            sum1 += parseInt(id.charAt(i));
			
			if(len!=10)
			{
			
				verErrors(1);
				errors+="1.only 10 characters...<br/>";
			}
			else if(id.charAt(4)!="-")
			{
				verErrors(1);
				errors+="1.There is no - on fifth position<br/>";
			}
			else if(isNaN(id.substr(0,4)))
			{
				verErrors(1);
				errors+="1.First 4 numbers are not numeric<br/>";
			}
			else if(isNaN(id.substr(5,5)))
			{
				verErrors(1);
				errors+="1. 6 to 10 positions are not numeric<br/>";
			}
			else if(sum<=0)
			{
			verErrors(1);
			errors+="1.sum of first four characters doesnt meet requirement<br/>"
			}
			else if(sum1<=0)
			{
			verErrors(1);
			errors+="1.sum of last five  characters doesnt meet requirement<br/>"
			}
			else if((sum*2+1)!=sum1)
			{
			verErrors(1);
			errors+="1.Invalid number.....<br/>";
			}
			else
				 
					clears(1);
			return errors;
		}
		
		function clientval(errors)
		{
			var check=0;
			var name=document.mortgage.client.value;
			name=name.trim();
			var strlen=name.length;
			name=name.toUpperCase();
			
				
					for(var y=0;y<3;y++) {
				if( !( (name.charCodeAt(y) > '64') && (name.charCodeAt(y) < '91') ))
					{verErrors(2);
					errors+="2.You entered a non-alphabet on first 3 places<br/>";
				check=1;
				break;}
				}
				
				if(check == 0)
				{
				
				if( name[0]=="-" || name[strlen-1]=="-" || name[0]=="\'" || name[strlen-1]=="\'" )
						{
							
							verErrors(2);
							errors+="2.No - or \' in the beginnning and end<br/>";
							check=1;
						}
				else
				for(var z=0;z<strlen;z++) {
				if( (name[z]=="-" && name[z+1]=="\'" ) || (name[z]=="\'" && name[z+1]=="-"))
					{verErrors(2);
					errors+="2.no continious symbols... <br/>";
				check=1;
				break;}
				}
				}
				
				
				if(check == 0)
	 	
				clears(2);
		return errors;
		}
		
		function propval(errors)
		{
		var prop=document.mortgage.propValue.value;
		var mor=document.mortgage.downPay.value;
		
		if(isNaN(prop))
		{
			
			verErrors(3);
			errors+="3.Property value is numeric<br/>";
				}
				else if(prop<1) {
						verErrors(3);
						errors+="3.Property value should be greater than 0<br/>";
						}
						else if(prop<(65000+mor)){
						
							verErrors(3);
							errors+="3.Property value should be greater 65000 than mortgage value<br/>";
						}
					
							else 
				clears(3);
					
					return errors;
		}
		
		function morval(errors)
		{
		var prop1=document.mortgage.propValue.value;
		var mor1=document.mortgage.downPay.value;
		
		if(isNaN(mor1))
		{
			
			verErrors(4);
			errors+="4.Down Payment value has to be numeric numeric<br/>";
				}
				else if(mor1<1) {
						verErrors(4);
						errors+="4.Down Payment should be greater than 0<br/>";
						}
					else if(mor1<(prop1*0.10)){
						
							verErrors(4);
							errors+="4. 10% more than property value...<br/>";
						}
						else
			  {
			  clears(5);
			  }
						
					
					return errors;
		}
		
		 function checkForm(errors) {
               var NoOfOptions = document.mortgage.income.options.length;
               
               var whichOneSelected = document.mortgage.income.selectedIndex;
              

               if (whichOneSelected == -1) {   
					verErrors(5);
                    errors+= "<p>5.None selected</p>"; 
                     
                   
               }
              else
			  {
			  clears(5);
			  }
			  
			  return errors;
    } 
	
	function radioval(errors)
	{
		
               var NoOfRadio = document.mortgage.propLocation.length;
               var c=0;
               for (var i = 0; i < NoOfRadio; i++) {
                   if (document.mortgage.propLocation[i].checked  == false) { 
				   
                      verErrors(6);
					 
					  c=1;
                   } // end of if
				   } 
				    errors+="6.No radion button is marked<br/>";
				if(c==0)
				{
				clears(6);
				}
				return errors;
               

	}
	
	function yr(errors)
	{
		var year=document.mortgage.mortYear.value;
		var myDate = new Date();
		var myYear = myDate.getFullYear();
		
		if(isNaN(year))
		{
			verErrors(7);
			errors+="7. No alphabet...<br/>";
				}
				else if(year<1) {
						verErrors(7);
						errors+="7.not less than zero<br/>";
						}
						else if(year!=myYear || year!=(myYear+1))
						{
						verErrors(7);
						errors+="7.Must be current year or next year...<br/>";
						}
						else
			  {
			  clears(7);
			  }
						
					
					return errors;
	}
	function mnt(errors)
	{
		var month=document.mortgage.mortMonth.value;
		var myDate = new Date();
		var myMonth = myDate.getMonth();
		if(isNaN(month))
		{
			
			verErrors(8);
			errors+="8. No alphabet...<br/>";
				}
				else if(month <1 || month >12 ) {
						verErrors(8);
						errors+="8.not less <br/>";
						}
						else if(month!=myMonth || month!=(myMonth+1))
						{
						verErrors(8);
						errors+="8.Must be current month or next month...<br/>"
						}
						else
			  {
			  clears(8);
			  }
						
					
					return errors;
	}
	
	function intr(errors)
	{
		var irt=document.mortgage.intRate.value;
		
		if(isNaN(irt))
		{
			
			verErrors(9);
			errors+="9. No alphabet...<br/>";
				}
				else if(irt <2 || irt >11 ) {
						verErrors(9);
						errors+="9.not less <br/>";
						}
						
						else
			  {
			  clears(9);
			  }
						
					
					return errors;
	}
	function amo(errors)
	{
		var amor=document.mortgage.amortization.value;
		
		if(isNaN(amor))
		{
			
			verErrors(10);
			errors+="10. No alphabet...<br/>";
				}
				else if(amor<=5 || amor >20 ) {
						verErrors(10);
						errors+="9.not less <br/>";
						}
						
						else
			  {
			  clears(10);
			  }
						
					
					return errors;
	}
	
	function propdetails(errors) {
    
    var number=document.mortgage.propDetails.length;
   
	var k=0;
    for(var i=0;i<number;i++)
        if(document.mortgage.propDetails[i].checked==false) {
            verErrors(11);                                     
         
    }
    
	errors += "11.No Property Details selected<br/>";
    return errors;
}


	function toggle() {

    var num=document.mortgage.propDetails.length;
    if(document.mortgage.propDetails[num-1].checked==true) {
    for(var i=0;i<num-1;i++)
        document.mortgage.propDetails[i].checked=false;
    }
}
 
 function toggle2() {
    var num=document.mortgage.propDetails.length;
    for(var i=0;i<num-1;i++)
        if(document.mortgage.propDetails[i].checked==true) {
            document.mortgage.propDetails[num-1].checked=false;
            break;
    }
}    
	
		function clears(pos) {
	document.getElementById(pos).innerHTML = "";
}
		
		function verErrors(pos) {
	document.getElementById(pos).innerHTML = pos ;
		}