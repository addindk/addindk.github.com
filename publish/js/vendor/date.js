function markupDate(b){var a="<div data-role='fieldcontain'>";a+="<label for='"+b.Id+"'>";b.Required==1&&(a+="<em>*</em>");a+=b.Name+"</label>";a+="<input type='date' id='"+b.Id+"' name='"+b.Id+"'";b.Required==1&&(a+=" class='required'");b.Permission==1&&(a+=" class='ui-disabled'");a+="/>";a+="</div>";return a};
