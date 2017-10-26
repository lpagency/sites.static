
$(document).ready(function()
{
	var sendToCheckout = function(price)
	{
		var facade = $('.products').data('ecommerce');

		// delete all other products
		facade.ecommerce.cart.clearCart(function()
		{

			// add the current product
			facade.ecommerce.cart.addProduct(
				5688, // product.id, 
				price,// product.price, 
				"donacion", // product.name, 
				1, // product.upp, 
				"", // product.bullet1, 
				"", // product.bullet2, 
				"", // product.bullet3,
				"", // product.images, 
				function()
				{
					// proceed to checkout
					var checkout = facade.ecommerce.cart.view.getCheckoutData();
					facade.ecommerce.cart.view.goToCheckout(checkout);
				});
		});
	};

	var ecommerce = $('.products').ecommerce({
		app_public: 40
		// base_url: 'https://betaapi.loadingplay.com'
	});

	$('select[name=select-donacion]').on('change', function()
	{
		console.log($(this).val());
		var val = $(this).val();

		if (val === 'otro')
		{
			// show textbox
			$("input[name=donacion]").attr("type", "text");
			$("input[name=donacion]").focus();
		}
		else
		{
			$("input[name=donacion]").attr("type", "hidden");
			$("input[name=donacion]").val(val);
		}
	});
	$(".single-donation-button").click(function(e)
	{
	  e.preventDefault();
	  var selected = $("input[name=radio-ammount]:checked").val();
	  var ammouunt = 0;

	  if (selected === "otro")
	  {
		var val = parseInt($("input[name=ammout]").val());
		// check if not a number
		if (isNaN(val))
		{
			$("input[name=ammout]").css('border', 'red solid 1px');
			return false;
		}
		else
		{
		  $("input[name=ammout]").css('border', 'black solid 1px');
		}

		selected = "" + val;

	  }

	  // clean
	  selected = selected.split('.').join('');
	  selected = selected.split('$').join('');

	  $(this).attr('disabled', 'disabled');
	  sendToCheckout(selected);

	});
});
