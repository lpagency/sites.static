
$(document).ready(function()
{
	$.cookie('shopping-cart', '');

	var sendToCheckout = function(price)
	{
		var facade = $('.products').data('ecommerce');

		// delete all other products
		facade.ecommerce.cart.clearCart();

		setTimeout(function() {
			// add the current product
			// id, sku, combination, price, name, upp, bullet1, bullet2, bullet3, img, callback
			facade.ecommerce.cart.addProduct(
				5688, // product.id, 
				"DONACION",
				"",
				price,// product.price, 
				"donacion", // product.name, 
				1, // product.upp, 
				"", // product.bullet1, 
				"", // product.bullet2, 
				"", // product.bullet3,
				"", // product.images, 
				function()
				{
					document.location.href = facade.ecommerce.cart.getCheckoutUrl() + 
						'?' +
						'site_id=' + facade.ecommerce.cart.getSiteId() +
						'&cart_id=' + facade.ecommerce.cart.getGUID();
				}
			);

			setTimeout(function() {
				// proceed to checkout
				// var checkout = facade.ecommerce.cart.view.getCheckoutData();
				// $("#checkout-iframe").attr('src', facade.ecommerce.cart.getCheckoutUrl() + 
				// 	'?' +
				// 	'site_id=' + facade.ecommerce.cart.getSiteId() +
				// 	'&cart_id=' + facade.ecommerce.cart.getGUID());

				// $('#myModal').modal('show');
				// var a = $('<a href="'+ facade.ecommerce.cart.getCheckoutUrl() + 
				// 	'?' +
				// 	'site_id=' + facade.ecommerce.cart.getSiteId() +
				// 	'&cart_id=' + facade.ecommerce.cart.getGUID() + '" target="_blank" ></a>')
				// a.click();
				// document.location.href = facade.ecommerce.cart.getCheckoutUrl() + 
				// 	'?' +
				// 	'site_id=' + facade.ecommerce.cart.getSiteId() +
				// 	'&cart_id=' + facade.ecommerce.cart.getGUID();
			});
		}, 1000);
	};

	var ecommerce = $('.products').ecommerce({
		app_public: 40,
		base_url: 'https://betaapi.loadingplay.com',
		checkout_url: 'https://betapay.loadingplay.com'
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
