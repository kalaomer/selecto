/**
 * Created by kalaomer.
 */

'use strict';

(function(window, $) {

	var Selecto = function(element)
	{
		element = $(element);

		// Replace content with Selecto!
		var _select = element.clone(true, true),
			content = Selecto.prepareContent(element);

		element.replaceWith(content);
		content.append(_select);
		this.ele = content;

		// Set Place Holder Text
		this.placeHolder().text(this.selectSource().attr('placeholder'));

		this.setEvents();
	};

	Selecto.prototype.selectSource = function()
	{
		return this.ele.find('select');
	};

	Selecto.prototype.placeHolder = function()
	{
		return this.ele.find('.selecto-place-holder');
	};

	Selecto.prototype.selectList = function()
	{
		return this.ele.find('.selecto-select-list');
	};

	Selecto.prototype.open = function()
	{
		this.ele.addClass('selecto-active');
	};

	Selecto.prototype.close = function ()
	{
		this.ele.removeClass('selecto-active');
	};

	Selecto.prototype.select = function(index)
	{
		this.selectSource().find('option').attr('selected', false);

		var selected = this.selectSource()
			.find('option')
			.eq(index);
		
		selected.attr('selected', true);

		this.placeHolder().text(selected.text());

		this.close();
	};

	Selecto.prototype.setEvents = function()
	{
		var _selecto = this;

		this.placeHolder().click(function() {
			_selecto.open();
		});

		this.selectList()
			.find('li')
			.click(function()
			{
				_selecto.select($(this).index());
			});

		$(document).click(function (e)
		{
			var container = _selecto.ele;

			if (!container.is(e.target) // if the target of the click isn't the container...
				&& container.has(e.target).length === 0) // ... nor a descendant of the container
			{
				_selecto.close();
	    	}
		});
	};

	Selecto.prepareContent = function(selectElement)
	{
		var content = $("<div class=\"selecto\"></div>");

		var placeHolder = $("<div class=\"selecto-place-holder\"></div>");

		content.append(placeHolder);

		var selectList = $("<div class=\"selecto-select-list\"></div>")
			.append("<ul></ul>");

		selectList.find('ul')
			.append(function()
				{
					var list = [];

					selectElement
						.find('option')
						.each(function(index, element)
						{
							var listElement = $("<li></li>").text($(element).text());

							list.push(listElement);
						});

					return list;
				});

		content.append(selectList);

		// Move Class and ID Attributes
		content.attr('class', selectElement.attr('class'));
		content.attr('id', selectElement.attr('id'));
		selectElement.attr('id', '');

		content.addClass('selecto');

		return content;
	};

	$.fn.Selecto = function(opt)
	{
		this.each(function(index, element) {
			var _selecto = new Selecto(element);
		});

		return this;
	};

})(window, jQuery);
