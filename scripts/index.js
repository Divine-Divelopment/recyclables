function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const inputListener = function (e) {
	document.getElementById('weight-range').value = e.value
	e.value = numberWithSpaces(e.value) + 'кг'
	calculate()
}

const rangeListener = function (e) {
	document.getElementById('weight').value = numberWithSpaces(e.value) + ' кг'
	calculate()
}

const smoothScroll = () => {
	document.getElementById('calculator').scrollIntoView({
		behavior: 'smooth'
	});
}

const calculate = () => {
	const material = document.getElementById('material')
	const index = material.selectedIndex;
	const materialCost = material[index].value;
	const weight = document.getElementById('weight-range').value;
	const output = document.getElementById('result').textContent = numberWithSpaces(materialCost / 1000 * weight) + ' Р';
}

const scrollToCalculator = () => {
	const buttons = document.querySelectorAll('.types-list-item-button');
	const select = document.querySelector('#material');
	for(let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', function(e) {
			const material = e.target.dataset.material;
			const selectedItem = select.querySelector(`option[data-name="${material}"]`)
			selectedItem.selected = 'selected'

			const select2 = new TsSelect2(
				select, {
					width: `100%`,
					minimumResultsForSearch: -1,
				}
			);
			calculate()
			smoothScroll();
		})
	}
};

const onlyScrollToCalculator = () => {
	const items = document.querySelectorAll('.to-calculator');

	for(let i = 0; i < items.length; i++) {
		items[i].addEventListener('click', function(e) {
			console.log(e)
			calculate()
			smoothScroll();
		})
	}
}

const parallax = () => {
	window.addEventListener('scroll', function(e) {
		const target = document.querySelectorAll('.scroll');
		var index = 0, length = target.length;
		for (index; index < length; index++) {
			var pos = window.pageYOffset * target[index].dataset.rate;

			if (target[index].dataset.direction === 'vertical') {
					target[index].style.transform = 'translate3d(0px,'+pos+'px, 0px)';
			} else {
					var posX = window.pageYOffset * target[index].dataset.ratex;
					var posY = window.pageYOffset * target[index].dataset.ratey;
					
					target[index].style.transform = 'translate3d('+posX+'px, '+posY+'px, 0px)';
			}
		}
	});
};

const modalsBlock = function () {
	const modals = document.querySelectorAll('[data-modal]');
	const exits = document.querySelectorAll('.modal-exit');
	const body = document.body;

	modals.forEach(function(trigger) {
		trigger.addEventListener('click', function(event) {
			event.preventDefault();
			const modal = document.getElementById(trigger.dataset.modal);
			modal.classList.add('open');
			body.classList.add('no-scroll');
		});
	});
	exits.forEach(function(exit) {
		exit.addEventListener('click', function(event) {
			event.preventDefault();
			event.target.closest('.modal').classList.remove('open');
			body.classList.remove('no-scroll');
		});
	});
};

const sendForm = function () {
  let forms = document.querySelectorAll(".modal-form");
  let fields = document.querySelectorAll(".form-input");
  let sendButton = document.querySelector("input[type='submit']");

  fields.forEach((fieldForm) => {
    fieldForm.addEventListener("input", () => {
      let patternSidebar = fieldForm.getAttribute("pattern");
      let checkSidebar = new RegExp(patternSidebar);
      let isValidSidebar = true;
      if (patternSidebar !== null) {
        isValidSidebar = checkSidebar.test(fieldForm.value);
      }

      if (isValidSidebar) {
        fieldForm.classList.remove("errorField");
        sendButton.disabled = false;
      } else {
        fieldForm.classList.add("errorField");
        sendButton.disabled = true;
      }
    });
  });

  forms.forEach((form) => {
    form.addEventListener("submit", e => {
      console.log(form)
      e.preventDefault();

      let xhr = new XMLHttpRequest();
      let data = new FormData(form);
      let method = 'POST';
      let action = './telegram.php';
      const modal = document.getElementById('thanks-modal');
      const modalForm = document.getElementById('form-modal');
      const body = document.body;

      xhr.open(method, action);

      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;

        if (xhr.status === 200) {
          e.target.reset();
          modalForm.classList.remove('open');
          modal.classList.add('open');
          setTimeout(() => {
            modal.classList.remove('open')
            body.classList.remove('no-scroll');
          },5000);
        } else {
          console.log("HTTP error", xhr.status, xhr.statusText);
        }
      };
      xhr.send(data);
    });
  })
};

window.addEventListener("load", function() {
	parallax();
	modalsBlock();
	sendForm();
	scrollToCalculator();
	onlyScrollToCalculator();
	const select = document.querySelector('#material');

	const select2 = new TsSelect2(
		select, {
			width: `100%`,
			minimumResultsForSearch: -1,
		}
	);
	select.addEventListener('change', function (e) {
		calculate()
	});
});

