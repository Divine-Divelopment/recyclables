const myFunction = function (input) {
	console.log('input changed')
	document.getElementById('weight-range').value = input.value
	input.value = input.value + 'кг'
}

const myFunction2 = function (input) {
	console.log(input.value)
	document.getElementById('weight').value = input.value + 'кг'
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
}

const modalsBlock = function () {
  const modals = document.querySelectorAll('[data-modal]');
  const body = document.body;

  modals.forEach(function(trigger) {
    trigger.addEventListener('click', function(event) {
      event.preventDefault();
      const modal = document.getElementById(trigger.dataset.modal);
      modal.classList.add('open');
      body.classList.add('no-scroll');
      const exits = modal.querySelectorAll('.modal-exit');
      exits.forEach(function(exit) {
        exit.addEventListener('click', function(event) {
          event.preventDefault();
          body.classList.remove('no-scroll');
          modal.classList.remove('open');
        });
        document.onkeydown = function(e) {
          if (e.key === 'Escape') {
          	body.classList.remove('no-scroll');
            modal.classList.remove('open');
          }
        };
      });
    });
  });
}

const sendForm = function () {
  let forms = document.querySelectorAll(".submit-form");
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
      let action = '../telegram.php';
      const modal = document.getElementById('thanks-modal');
      const modalForm = document.getElementById('form-modal');

      xhr.open(method, action);

      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;

        if (xhr.status === 200) {
          e.target.reset();
          modalForm.classList.remove('open');
          modal.classList.add('open');
          setTimeout(() => {
            modal.classList.remove('open')
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
	const select = document.querySelector('#material');

	const select2 = new TsSelect2(
		select, {
			width: `100%`,
			minimumResultsForSearch: -1
		}
	);
});

